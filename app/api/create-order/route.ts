import { WC_BASE_URL, WC_ENABLED } from "@/app/lib/env";
import wooFetch from "@/app/lib/woo";
import { CartItemInput } from "@/app/types/commerce";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type CreateOrderBody = {
    items: CartItemInput[];
    customer?: {
        email?: string;
        firstName?: string;
        lastName?: string;
    };
};

type WooOrderResponse = {
    id: number;
    order_key: string;
};

const assertValidItems = (items: CartItemInput[]) => {
    if (!Array.isArray(items) || items.length === 0) throw new Error("Cart is empty");

    for (const it of items) {
        if (!Number.isInteger(it.productId) || it.productId <= 0) throw new Error("Invalid productId");
        if (!Number.isInteger(it.quantity) || it.quantity <= 0 || it.quantity > 99) throw new Error("Invalid quantity");
    }
};

export async function POST(req: Request) {
    if (!WC_ENABLED) {
        return NextResponse.json(
            { error: "WooCommerce is not configured" },
            { status: 503 }
        );
    }
    try {
        const body = (await req.json()) as CreateOrderBody;

        assertValidItems(body.items);

        await Promise.all(
            body.items.map((it) =>
                wooFetch(`/wp-json/wc/v3/products/${it.productId}`, { next: { revalidate: 60 } })
            )
        );

        const orderPayload: any = {
            payment_method: "",
            payment_method_title: "",
            set_paid: false,
            line_items: body.items.map((it) => ({
                product_id: it.productId,
                quantity: it.quantity,
            })),
        };

        if (body.customer?.email) {
            orderPayload.billing = {
                email: body.customer.email,
                first_name: body.customer.firstName ?? "",
                last_name: body.customer.lastName ?? "",
            };
        }

        const order = await wooFetch<WooOrderResponse>(`/wp-json/wc/v3/orders`, {
            method: "POST",
            body: JSON.stringify(orderPayload),
        });

        const checkoutUrl = `${WC_BASE_URL}/checkout/order-pay/${order.id}/?pay_for_order=true&key=${order.order_key}`;

        return NextResponse.json({ checkoutUrl });
    } catch (e: any) {
        return NextResponse.json({ error: e?.message ?? "Unknown error" }, { status: 400 });
    }
}
