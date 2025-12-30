import { NextResponse } from "next/server";
import wooFetch from "@/app/lib/woo";
import { ProductListItemDTO, WooProduct } from "@/app/types/commerce";
import { WC_ENABLED } from "@/app/lib/env";

export const runtime = "nodejs";

const toListItemDTO = (p: WooProduct): ProductListItemDTO => ({
    id: p.id,
    slug: p.slug,
    title: p.name,
    price: Number(p.price || 0),
    imageUrl: p.images?.[0]?.src,
});

export async function GET(req: Request) {
    if (!WC_ENABLED) {
        return NextResponse.json(
            { error: "WooCommerce is not configured" },
            { status: 503 }
        );
    }
    const { searchParams } = new URL(req.url);
    const perPage = Number(searchParams.get("perPage") ?? 24);
    const page = Number(searchParams.get("page") ?? 1);

    const safePerPage = Math.min(Math.max(perPage, 1), 48);
    const safePage = Math.max(page, 1);

    const products = await wooFetch<WooProduct[]>(
        `/wp-json/wc/v3/products?status=publish&per_page=${safePerPage}&page=${safePage}`,
        { next: { revalidate: 300 } }
    );

    return NextResponse.json(products.map(toListItemDTO));
}
