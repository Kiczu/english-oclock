import { NextResponse } from "next/server";
import { getShopProducts } from "@/app/lib/shopProducts.server";

export const runtime = "nodejs";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") ?? 1);
    const perPage = Number(searchParams.get("perPage") ?? 24);
    const all = searchParams.get("all") === "1";

    try {
        const payload = await getShopProducts({ page, perPage, all });
        return NextResponse.json(payload);
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Unexpected products API error";
        const status = message === "WooCommerce is not configured" ? 503 : 502;
        return NextResponse.json({ error: message }, { status });
    }
}
