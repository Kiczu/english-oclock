import type { ShopProduct } from "@/app/types/commerce";
import type { ShopFilterOptions, ShopFilters } from "../types";

const sortValues = (values: string[]) =>
  values.sort((a, b) => a.localeCompare(b, "pl", { sensitivity: "base" }));

const toSearchText = (product: ShopProduct) =>
  [
    product.title,
    product.subtitle ?? "",
    product.description ?? "",
    ...product.tags,
    product.category ?? "",
    product.level ?? "",
    product.format ?? "",
  ]
    .join(" ")
    .toLowerCase();

export const getFilterOptions = (products: ShopProduct[]): ShopFilterOptions => ({
  categories: sortValues(
    Array.from(new Set(products.map((product) => product.category).filter((value): value is string => Boolean(value)))),
  ),
  levels: sortValues(
    Array.from(new Set(products.map((product) => product.level).filter((value): value is string => Boolean(value)))),
  ),
  formats: sortValues(
    Array.from(new Set(products.map((product) => product.format).filter((value): value is string => Boolean(value)))),
  ),
});

export const filterProducts = (products: ShopProduct[], filters: ShopFilters) => {
  const normalizedQuery = filters.query.trim().toLowerCase();

  return products.filter((product) => {
    if (filters.category !== "all" && product.category !== filters.category) return false;
    if (filters.level !== "all" && product.level !== filters.level) return false;
    if (filters.format !== "all" && product.format !== filters.format) return false;
    if (filters.price === "free" && !product.isFree) return false;
    if (filters.price === "paid" && product.isFree) return false;
    if (normalizedQuery && !toSearchText(product).includes(normalizedQuery)) return false;
    return true;
  });
};

export const hasActiveFilters = (filters: ShopFilters) =>
  filters.query.trim().length > 0 ||
  filters.category !== "all" ||
  filters.level !== "all" ||
  filters.format !== "all" ||
  filters.price !== "all";

export const defaultFilters = (): ShopFilters => ({
  query: "",
  category: "all",
  level: "all",
  format: "all",
  price: "all",
});
