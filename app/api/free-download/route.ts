import { NextResponse } from "next/server";
import { getShopProductBySlug } from "@/app/lib/shopProducts.server";
import { WC_BASE_URL } from "@/app/lib/env";

export const runtime = "nodejs";

const toErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Unexpected free download error";

const isHttpUrl = (value: string) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
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

    if (!isHttpUrl(product.freeDownloadUrl)) {
      return NextResponse.json(
        { error: "Invalid free download URL" },
        { status: 422 },
      );
    }

    const sourceUrl = normalizeSourceUrl(product.freeDownloadUrl);
    const sourceResponse = await fetch(sourceUrl, {
      cache: "no-store",
      headers: {
        Accept: "application/pdf,*/*",
        ...(WC_BASE_URL ? { Referer: `${WC_BASE_URL}/` } : {}),
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      },
      redirect: "follow",
    });

    if (!sourceResponse.ok || !sourceResponse.body) {
      return NextResponse.json(
        { error: `Source file request failed (${sourceResponse.status})` },
        { status: sourceResponse.status || 502 },
      );
    }

    const fileName = toDownloadFileName(product.slug);
    const contentType = sourceResponse.headers.get("content-type") || "application/pdf";

    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set(
      "Content-Disposition",
      `inline; filename="${fileName.replace(/"/g, "")}"; filename*=UTF-8''${encodeURIComponent(fileName)}`,
    );
    headers.set("Cache-Control", "no-store");
    headers.set("X-Robots-Tag", "noindex, nofollow");

    return new NextResponse(sourceResponse.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    const message = toErrorMessage(error);
    const status = message === "WooCommerce is not configured" ? 503 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
