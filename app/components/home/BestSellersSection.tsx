"use client";

import ProductsSection from "./ProductsSection";
import { bestsellersMock } from "@/app/lib/product.mock";
import { useCart } from "@/app/context/CartContext";

const BestsellersSection = ({ id }: { id?: string }) => {
  const { addItem, openCart } = useCart();

  return (
    <ProductsSection
      id={id}
      title="Bestsellers"
      subtitle="Najczesciej wybierane materialy"
      products={bestsellersMock}
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

