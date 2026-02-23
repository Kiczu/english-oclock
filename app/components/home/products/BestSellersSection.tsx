"use client";

import ProductsSection from "./ProductsSection";
import { useCart } from "@/app/context/CartContext";
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
      subtitle="Najczesciej wybierane materialy"
      products={products}
      onPrimaryAction={(p) => {
        addItem({
          id: p.id,
          wooProductId: p.wooProductId,
          slug: p.slug,
          title: p.title,
          priceLabel: p.priceLabel,
          unitPrice: p.price,
          isFree: p.isFree,
        });
        openCart();
      }}
    />
  );
};

export default BestsellersSection;

