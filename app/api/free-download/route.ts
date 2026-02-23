import { NextResponse } from "next/server";
import { getShopProductBySlug } from "@/app/lib/shopProducts.server";

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

    const response = NextResponse.redirect(product.freeDownloadUrl, 302);
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    const message = toErrorMessage(error);
    const status = message === "WooCommerce is not configured" ? 503 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
