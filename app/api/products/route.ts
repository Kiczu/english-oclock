import { NextResponse } from "next/server";
import { getShopProducts } from "@/app/lib/shopProducts.server";

export const runtime = "nodejs";

const toPriceFilter = (value: string | null): "all" | "free" | "paid" => {
  if (value === "free" || value === "paid") return value;
  return "all";
};

const isWooNotConfiguredError = (error: unknown) =>
  error instanceof Error && error.message === "WooCommerce is not configured";

const toApiErrorResponse = (error: unknown) => {
  if (isWooNotConfiguredError(error)) {
    return NextResponse.json(
      { error: "Products are temporarily unavailable" },
      { status: 503 },
    );
  }

  return NextResponse.json(
    { error: "Unable to load products right now" },
    { status: 502 },
  );
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") ?? 1);
  const perPage = Number(searchParams.get("perPage") ?? 24);
  const all = searchParams.get("all") === "1";
  const query = searchParams.get("q")?.trim() || undefined;
  const category = searchParams.get("category")?.trim() || undefined;
  const level = searchParams.get("level")?.trim() || undefined;
  const price = toPriceFilter(searchParams.get("price"));

  try {
    const payload = await getShopProducts({
      page,
      perPage,
      all,
      query,
      category,
      level,
      price,
    });
    return NextResponse.json(payload);
  } catch (error) {
    console.error("[api/products] unexpected failure", error);
    return toApiErrorResponse(error);
  }
}
