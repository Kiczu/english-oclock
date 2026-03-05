import type { CartProduct } from "@/app/context/CartContext";
import type { ShopProduct } from "@/app/types/commerce";

type CartProductSource = Pick<
  ShopProduct,
  "id" | "wooProductId" | "slug" | "title" | "priceLabel" | "price" | "isFree"
>;

export const toCartProduct = (product: CartProductSource): CartProduct => ({
  id: product.id,
  wooProductId: product.wooProductId,
  slug: product.slug,
  title: product.title,
  priceLabel: product.priceLabel,
  unitPrice: product.price,
  isFree: product.isFree,
});
