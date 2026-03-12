import type { CartItemInput } from "@/app/types/commerce";

type CheckoutSourceItem = {
  id: string;
  wooProductId?: number;
};

export const toCheckoutItems = (
  items: CheckoutSourceItem[],
): CartItemInput[] => {
  return items
    .map((item) => {
      const productId =
        typeof item.wooProductId === "number" &&
        Number.isInteger(item.wooProductId)
          ? item.wooProductId
          : Number(item.id);
      const isValidProductId = Number.isInteger(productId) && productId > 0;
      if (!isValidProductId) return null;

      return {
        productId,
        quantity: 1,
      };
    })
    .filter((item): item is CartItemInput => Boolean(item));
};
