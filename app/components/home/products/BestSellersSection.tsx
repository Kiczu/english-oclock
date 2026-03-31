"use client";

import ProductsSection from "./ProductsSection";
import { useCart } from "@/app/context/CartContext";
import { toCartProduct } from "@/app/helpers/cartProduct";
import type { ShopProduct } from "@/app/types/commerce";

type BestsellersSectionProps = {
  id?: string;
  products: ShopProduct[];
};

const BestsellersSection = ({ id, products }: BestsellersSectionProps) => {
  const { addItem, openCart } = useCart();

  return (
    <ProductsSection
      id={id}
      title="Bestsellers"
      subtitle="Najczęściej wybierane materiały"
      products={products}
      useSlider
      onPrimaryAction={(p) => {
        addItem(toCartProduct(p));
        openCart();
      }}
    />
  );
};

export default BestsellersSection;

