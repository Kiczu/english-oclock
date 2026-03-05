import { NextResponse } from "next/server";
import { getShopProductBySlug } from "@/app/lib/shopProducts.server";
import { WC_BASE_URL } from "@/app/lib/env";

export const runtime = "nodejs";

const REQUEST_TIMEOUT_MS = 15_000;
const MAX_REDIRECTS = 4;
const DEFAULT_ALLOWED_DOWNLOAD_HOSTS = ["drive.google.com", "docs.google.com"];

class SourceValidationError extends Error {}

const parseAllowedHostsFromEnv = () =>
  (process.env.FREE_DOWNLOAD_ALLOWED_HOSTS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

const getWooBaseHost = () => {
  if (!WC_BASE_URL) return null;
  try {
    return new URL(WC_BASE_URL).hostname.toLowerCase();
  } catch {
    return null;
  }
};

const WOO_BASE_HOST = getWooBaseHost();

const ALLOWED_DOWNLOAD_HOSTS = new Set([
  ...DEFAULT_ALLOWED_DOWNLOAD_HOSTS,
  ...parseAllowedHostsFromEnv(),
  ...(WOO_BASE_HOST ? [WOO_BASE_HOST] : []),
]);

const matchesAllowedHost = (hostname: string) => {
  const normalizedHostname = hostname.toLowerCase();

  for (const allowedHost of ALLOWED_DOWNLOAD_HOSTS) {
    if (
      normalizedHostname === allowedHost ||
      normalizedHostname.endsWith(`.${allowedHost}`)
    ) {
      return true;
    }
  }

  return false;
};

const parseHttpUrl = (value: string) => {
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

const isAllowedDownloadUrl = (value: string) => {
  const parsed = parseHttpUrl(value);
  if (!parsed) return false;
  return matchesAllowedHost(parsed.hostname);
};

const toDownloadFileName = (slug: string) => {
  return `${slug}.pdf`;
};

const normalizeSourceUrl = (value: string) => {
  try {
    const parsed = new URL(value);

    if (parsed.hostname === "drive.google.com") {
      const filePathMatch = parsed.pathname.match(/^\/file\/d\/([^/]+)\//);
      const fileIdFromPath = filePathMatch?.[1];
      const fileIdFromQuery = parsed.searchParams.get("id")?.trim();
      const fileId = fileIdFromPath || fileIdFromQuery;

      if (fileId) {
        return `https://drive.google.com/uc?export=download&id=${encodeURIComponent(fileId)}`;
      }
    }
  } catch {
    // Fallback to original value.
  }

  return value;
};

const extractDispositionFileName = (value: string | null) => {
  if (!value) return undefined;

  const utf8Match = value.match(/filename\*=UTF-8''([^;]+)/i);
  if (utf8Match?.[1]) {
    try {
      return decodeURIComponent(utf8Match[1]).trim();
    } catch {
      return utf8Match[1].trim();
    }
  }

  const plainMatch = value.match(/filename="?([^";]+)"?/i);
  return plainMatch?.[1]?.trim();
};

const isPdfFileName = (value: string | undefined) =>
  Boolean(value && value.toLowerCase().endsWith(".pdf"));

const normalizeMimeType = (value: string | null) =>
  value?.split(";")[0]?.trim().toLowerCase() ?? "";

const isPdfLikeResponse = (response: Response) => {
  const mimeType = normalizeMimeType(response.headers.get("content-type"));
  if (mimeType === "application/pdf") return true;

  if (
    mimeType !== "application/octet-stream" &&
    mimeType !== "binary/octet-stream"
  ) {
    return false;
  }

  const fromDisposition = extractDispositionFileName(
    response.headers.get("content-disposition"),
  );
  if (isPdfFileName(fromDisposition)) return true;

  const fromUrlPath = (() => {
    try {
      const pathname = new URL(response.url).pathname;
      return decodeURIComponent(pathname.split("/").pop() ?? "");
    } catch {
      return "";
    }
  })();

  return isPdfFileName(fromUrlPath);
};

const fetchDownloadSource = async (sourceUrl: string) => {
  let currentUrl = sourceUrl;

  for (let redirectIndex = 0; redirectIndex <= MAX_REDIRECTS; redirectIndex += 1) {
    const response = await fetch(currentUrl, {
      cache: "no-store",
      headers: {
        Accept: "application/pdf,*/*",
        ...(WC_BASE_URL ? { Referer: `${WC_BASE_URL}/` } : {}),
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      },
      redirect: "manual",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (![301, 302, 303, 307, 308].includes(response.status)) {
      return response;
    }

    const location = response.headers.get("location");
    if (!location) {
      throw new SourceValidationError("Download source redirect is missing location");
    }

    const nextUrl = new URL(location, currentUrl).toString();
    if (!isAllowedDownloadUrl(nextUrl)) {
      throw new SourceValidationError("Download source redirect host is not allowed");
    }

    currentUrl = nextUrl;
  }

  throw new SourceValidationError("Download source exceeded redirect limit");
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug")?.trim();

  if (!slug) {
    return NextResponse.json(
      { error: "Missing slug" },
      { status: 400 },
    );
  }

  try {
    const product = await getShopProductBySlug(slug);
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 },
      );
    }

    if (!product.isFree) {
      return NextResponse.json(
        { error: "Only free products can be downloaded directly" },
        { status: 403 },
      );
    }

    if (!product.freeDownloadUrl) {
      return NextResponse.json(
        { error: "Free download URL is not configured for this product" },
        { status: 404 },
      );
    }

    const sourceUrl = normalizeSourceUrl(product.freeDownloadUrl);
    if (!isAllowedDownloadUrl(sourceUrl)) {
      return NextResponse.json(
        { error: "Unsupported free download host" },
        { status: 422 },
      );
    }

    const sourceResponse = await fetchDownloadSource(sourceUrl);

    if (!sourceResponse.ok || !sourceResponse.body) {
      return NextResponse.json(
        { error: "Source file request failed" },
        { status: 502 },
      );
    }

    if (!isPdfLikeResponse(sourceResponse)) {
      return NextResponse.json(
        { error: "Source file must be a PDF" },
        { status: 422 },
      );
    }

    const fileName = toDownloadFileName(product.slug);

    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");
    headers.set(
      "Content-Disposition",
      `inline; filename="${fileName.replace(/"/g, "")}"; filename*=UTF-8''${encodeURIComponent(fileName)}`,
    );
    headers.set("Cache-Control", "no-store");
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("X-Robots-Tag", "noindex, nofollow");

    return new NextResponse(sourceResponse.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    if (error instanceof SourceValidationError) {
      return NextResponse.json(
        { error: "Invalid source redirect configuration" },
        { status: 422 },
      );
    }

    if (error instanceof Error && error.message === "WooCommerce is not configured") {
      return NextResponse.json(
        { error: "Free downloads are temporarily unavailable" },
        { status: 503 },
      );
    }

    console.error("[api/free-download] unexpected failure", error);
    return NextResponse.json(
      { error: "Unable to process free download right now" },
      { status: 502 },
    );
  }
}
