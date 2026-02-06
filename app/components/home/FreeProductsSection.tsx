"use client";

import { useRouter } from "next/navigation";
import ProductsSection from "./ProductsSection";
import { freeProductsMock } from "@/app/lib/product.mock";

const FreeProductsSection = () => {
  const router = useRouter();

  return (
    <ProductsSection
      title="Freebies"
      subtitle="Pobierz za darmo i zobacz, czy Ci siada format."
      products={freeProductsMock}
      cardMaxWidth={520}
      onPrimaryAction={(p) => {
        router.push(`/shop/${p.slug}`);
      }}
    />
  );
};

export default FreeProductsSection;
