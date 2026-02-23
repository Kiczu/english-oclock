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

const toDownloadFileName = (slug: string, url: string) => {
  try {
    const parsed = new URL(url);
    const fromPath = decodeURIComponent(parsed.pathname.split("/").pop() ?? "").trim();
    if (fromPath) return fromPath;
  } catch {
    // Ignore and fallback to slug.
  }

  return `${slug}.pdf`;
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

    const sourceResponse = await fetch(product.freeDownloadUrl, {
      cache: "no-store",
      headers: {
        Accept: "application/pdf,*/*",
        ...(WC_BASE_URL ? { Referer: `${WC_BASE_URL}/` } : {}),
      },
      redirect: "follow",
    });

    if (!sourceResponse.ok || !sourceResponse.body) {
      return NextResponse.json(
        { error: `Source file request failed (${sourceResponse.status})` },
        { status: sourceResponse.status || 502 },
      );
    }

    const fileName = toDownloadFileName(product.slug, product.freeDownloadUrl);
    const contentType = sourceResponse.headers.get("content-type") || "application/octet-stream";

    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set(
      "Content-Disposition",
      `attachment; filename="${fileName.replace(/"/g, "")}"`,
    );
    headers.set("Cache-Control", "no-store");

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
