export type PriceFilter = "all" | "free" | "paid";

export type ShopFilters = {
  query: string;
  category: string;
  level: string;
  price: PriceFilter;
};

export type ShopFilterOptions = {
  categories: string[];
  levels: string[];
};
