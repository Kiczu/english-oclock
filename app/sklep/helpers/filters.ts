import type { ShopFilters } from "../types";

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
