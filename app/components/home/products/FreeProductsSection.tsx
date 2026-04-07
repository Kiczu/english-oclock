"use client";

import { useRouter } from "next/navigation";
import ProductsSection from "./ProductsSection";
import type { ShopProduct } from "@/app/types/commerce";

type FreeProductsSectionProps = {
  id?: string;
  products: ShopProduct[];
};

const FreeProductsSection = ({ id, products }: FreeProductsSectionProps) => {
  const router = useRouter();

  return (
    <ProductsSection
      id={id}
      title="Freebies"
      subtitle="Pobierz bezpłatne materiały i przekonaj się, czy spełnią Twoje oczekiwania."
      products={products}
      cardMaxWidth={520}
      useSlider
      onPrimaryAction={(p) => {
        router.push(`/sklep/${p.slug}`);
      }}
    />
  );
};

export default FreeProductsSection;
