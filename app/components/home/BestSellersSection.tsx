"use client";

import ProductsSection from "./ProductsSection";
import { bestsellersMock } from "@/app/lib/product.mock";
import { useCart } from "@/app/context/CartContext";

const BestsellersSection = () => {
  const { addItem, openCart } = useCart();

  return (
    <ProductsSection
      title="Bestsellers"
      subtitle="Najczesciej wybierane materialy"
      products={bestsellersMock}
      onPrimaryAction={(p) => {
        addItem({
          id: p.id,
          slug: p.slug,
          title: p.title,
          priceLabel: p.priceLabel,
          isFree: p.isFree,
        });
        openCart();
      }}
    />
  );
};

export default BestsellersSection;

