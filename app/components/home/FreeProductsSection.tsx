"use client";

import { useRouter } from "next/navigation";
import ProductsSection from "./ProductsSection";
import { freeProductsMock } from "@/app/lib/product.mock";

const FreeProductsSection = ({ id }: { id?: string }) => {
  const router = useRouter();

  return (
    <ProductsSection
      id={id}
      title="Freebies"
      subtitle="Pobierz za darmo i sprawdz, czy to dla Ciebie."
      products={freeProductsMock}
      cardMaxWidth={520}
      onPrimaryAction={(p) => {
        router.push(`/sklep/${p.slug}`);
      }}
    />
  );
};

export default FreeProductsSection;
