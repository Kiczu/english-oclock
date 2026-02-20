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
    ...product.categories,
    product.level ?? "",
  ]
    .join(" ")
    .toLowerCase();

export const getFilterOptions = (
  products: ShopProduct[],
  categoriesFromSource: string[] = [],
): ShopFilterOptions => {
  const categoriesFromProducts = products.flatMap((product) => product.categories);
  const categories = sortValues(
    Array.from(
      new Set(
        [...categoriesFromSource, ...categoriesFromProducts]
          .map((value) => value.trim())
          .filter(Boolean),
      ),
    ),
  );

  const levels = sortValues(
    Array.from(new Set(products.map((product) => product.level).filter((value): value is string => Boolean(value)))),
  );

  return { categories, levels };
};

export const filterProducts = (products: ShopProduct[], filters: ShopFilters) => {
  const normalizedQuery = filters.query.trim().toLowerCase();

  return products.filter((product) => {
    if (
      filters.category !== "all" &&
      !product.categories.some((value) => value === filters.category)
    ) {
      return false;
    }
    if (filters.level !== "all" && product.level !== filters.level) return false;
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
  filters.price !== "all";

export const defaultFilters = (): ShopFilters => ({
  query: "",
  category: "all",
  level: "all",
  price: "all",
});
