import { NextResponse } from "next/server";
import wooFetch from "@/app/lib/woo";
import { ProductCardDTO, WooProduct } from "@/app/types/commerce";

export const runtime = "nodejs";

const toDTO = (p: WooProduct): ProductCardDTO => {
    return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: Number(p.price || 0),
        imageUrl: p.images?.[0]?.src,
    };
}

const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const perPage = Number(searchParams.get("perPage") ?? 24);
    const page = Number(searchParams.get("page") ?? 1);

    const safePerPage = Math.min(Math.max(perPage, 1), 48);
    const safePage = Math.max(page, 1);

    const products = await wooFetch<WooProduct[]>(
        `/wp-json/wc/v3/products?status=publish&per_page=${safePerPage}&page=${safePage}`,
        { next: { revalidate: 300 } }
    );

    return NextResponse.json(products.map(toDTO));
}

export default { GET };