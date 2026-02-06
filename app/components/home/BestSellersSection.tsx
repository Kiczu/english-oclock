"use client";

import ProductsSection from "./ProductsSection";
import { bestsellersMock } from "@/app/lib/product.mock";

const BestsellersSection = () => {
  return (
    <ProductsSection
      title="Bestsellers"
      subtitle="Najczęściej wybierane materiały"
      products={bestsellersMock}
      onPrimaryAction={(p) => {
        window.location.href = `https://shop.twojadomena.pl/?add-to-cart=${p.id}`;
      }}
    />
  );
};

export default BestsellersSection;
