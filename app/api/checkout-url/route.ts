import { createHmac, randomBytes } from "node:crypto";
import {
    HEADLESS_CHECKOUT_MAX_AGE_SECONDS,
    HEADLESS_SHARED_SECRET,
    WC_BASE_URL,
    WC_CHECKOUT_BASE_PATH,
    WC_ENABLED,
} from "@/app/lib/env";
import wooFetch from "@/app/lib/woo";
import type { CartItemInput } from "@/app/types/commerce";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type CheckoutUrlBody = {
    items: CartItemInput[];
};

type WooProductProbe = {
    id: number;
};

const assertValidItems = (items: CartItemInput[]) => {
    if (!Array.isArray(items) || items.length === 0) {
        throw new Error("Cart is empty");
    }

    for (const item of items) {
        if (!Number.isInteger(item.productId) || item.productId <= 0) {
            throw new Error("Invalid productId");
        }
        if (!Number.isInteger(item.quantity) || item.quantity <= 0 || item.quantity > 99) {
            throw new Error("Invalid quantity");
        }
    }
};

const toSignedCheckoutUrl = (items: CartItemInput[]) => {
    const bridgeItems = items.map((item) => ({
        product_id: item.productId,
        quantity: item.quantity,
    }));

    const itemsPayloadBase64 = Buffer.from(
        JSON.stringify(bridgeItems),
        "utf8",
    ).toString("base64");

    const ts = String(Math.floor(Date.now() / 1000));
    const nonce = randomBytes(8).toString("hex");
    const sig = createHmac("sha256", HEADLESS_SHARED_SECRET)
        .update(`${itemsPayloadBase64}.${ts}.${nonce}`)
        .digest("hex");

    const checkoutUrl = new URL(`${WC_BASE_URL}${WC_CHECKOUT_BASE_PATH}/`);
    checkoutUrl.searchParams.set("headless_checkout", "1");
    checkoutUrl.searchParams.set("items", itemsPayloadBase64);
    checkoutUrl.searchParams.set("sig", sig);
    checkoutUrl.searchParams.set("ts", ts);
    checkoutUrl.searchParams.set("nonce", nonce);
    checkoutUrl.searchParams.set("max_age", String(HEADLESS_CHECKOUT_MAX_AGE_SECONDS));

    return checkoutUrl.toString();
};

export async function POST(req: Request) {
    if (!WC_BASE_URL) {
        return NextResponse.json(
            { error: "WooCommerce base URL is not configured" },
            { status: 503 },
        );
    }

    if (!HEADLESS_SHARED_SECRET) {
        return NextResponse.json(
            { error: "HEADLESS_SHARED_SECRET is not configured" },
            { status: 503 },
        );
    }

    try {
        const body = (await req.json()) as CheckoutUrlBody;
        assertValidItems(body.items);

        if (WC_ENABLED) {
            await Promise.all(
                body.items.map((item) =>
                    wooFetch<WooProductProbe>(`/wp-json/wc/v3/products/${item.productId}`, {
                        next: { revalidate: 60 },
                    }),
                ),
            );
        }

        const checkoutUrl = toSignedCheckoutUrl(body.items);
        return NextResponse.json({ checkoutUrl });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown checkout bridge error";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
