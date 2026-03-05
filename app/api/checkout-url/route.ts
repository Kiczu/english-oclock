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

class CheckoutValidationError extends Error {}
const MAX_CHECKOUT_ITEMS = 100;

const assertValidItems = (items: CartItemInput[]) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new CheckoutValidationError("Cart is empty");
  }
  if (items.length > MAX_CHECKOUT_ITEMS) {
    throw new CheckoutValidationError("Too many cart items");
  }

  const uniqueProductIds = new Set<number>();

  for (const item of items) {
    if (!Number.isInteger(item.productId) || item.productId <= 0) {
      throw new CheckoutValidationError("Invalid productId");
    }
    if (item.quantity !== 1) {
      throw new CheckoutValidationError("Invalid quantity");
    }
    if (uniqueProductIds.has(item.productId)) {
      throw new CheckoutValidationError("Duplicate productId");
    }

    uniqueProductIds.add(item.productId);
  }
};

const parseBody = async (req: Request): Promise<CheckoutUrlBody> => {
  try {
    return (await req.json()) as CheckoutUrlBody;
  } catch {
    throw new CheckoutValidationError("Invalid request body");
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
  checkoutUrl.searchParams.set(
    "max_age",
    String(HEADLESS_CHECKOUT_MAX_AGE_SECONDS),
  );

  return checkoutUrl.toString();
};

const verifyPublishedProducts = async (items: CartItemInput[]) => {
  const productIds = items.map((item) => item.productId);
  const productsQuery = new URLSearchParams({
    status: "publish",
    include: productIds.join(","),
    per_page: String(productIds.length),
  });

  const publishedProducts = await wooFetch<WooProductProbe[]>(
    `/wp-json/wc/v3/products?${productsQuery.toString()}`,
    {
      next: { revalidate: 60 },
    },
  );

  const publishedProductIds = new Set(publishedProducts.map((product) => product.id));
  if (productIds.some((productId) => !publishedProductIds.has(productId))) {
    throw new CheckoutValidationError("One or more products are unavailable");
  }
};

export async function POST(req: Request) {
  if (!WC_BASE_URL || !HEADLESS_SHARED_SECRET) {
    console.error("[api/checkout-url] missing checkout configuration", {
      hasBaseUrl: Boolean(WC_BASE_URL),
      hasSharedSecret: Boolean(HEADLESS_SHARED_SECRET),
    });
    return NextResponse.json(
      { error: "Checkout is temporarily unavailable" },
      { status: 503 },
    );
  }

  try {
    const body = await parseBody(req);
    assertValidItems(body.items);

    if (WC_ENABLED) {
      try {
        await verifyPublishedProducts(body.items);
      } catch (error) {
        if (error instanceof CheckoutValidationError) {
          throw error;
        }

        console.error("[api/checkout-url] product verification failed", error);
        throw new Error("Checkout product verification failed");
      }
    } else {
      console.error("[api/checkout-url] product verification skipped", {
        reason: "WC api credentials are missing",
      });
      return NextResponse.json(
        { error: "Checkout is temporarily unavailable" },
        { status: 503 },
      );
    }

    try {
      const checkoutUrl = toSignedCheckoutUrl(body.items);
      return NextResponse.json({ checkoutUrl });
    } catch (error) {
      if (error instanceof CheckoutValidationError) {
        throw error;
      }

      console.error("[api/checkout-url] signing failed", error);
      throw new Error("Checkout signing failed");
    }
  } catch (error) {
    if (error instanceof CheckoutValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.error("[api/checkout-url] unexpected failure", error);
    return NextResponse.json(
      { error: "Unable to prepare checkout right now" },
      { status: 502 },
    );
  }
}
