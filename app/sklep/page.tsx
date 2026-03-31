import {
  WooNotConfiguredError,
  getShopProducts,
} from "@/app/lib/shopProducts.server";
import type { ShopProduct } from "@/app/types/commerce";
import ShopPageClient from "./ShopPageClient";
import type { ShopFilterOptions, ShopFilters } from "./types";

const PAGE_SIZE = 9;

type ShopPageSearchParams = Record<string, string | string[] | undefined>;

const toParam = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const toPriceFilter = (value: string | undefined): ShopFilters["price"] => {
  if (value === "free" || value === "paid") return value;
  return "all";
};

const toPage = (value: string | undefined) => {
  const parsed = Number(value ?? 1);
  if (!Number.isFinite(parsed)) return 1;
  const normalized = Math.floor(parsed);
  return normalized > 0 ? normalized : 1;
};

const toFiltersFromSearchParams = (searchParams: ShopPageSearchParams): ShopFilters => ({
  query: toParam(searchParams.q)?.trim() ?? "",
  category: toParam(searchParams.category)?.trim() || "all",
  level: toParam(searchParams.level)?.trim() || "all",
  price: toPriceFilter(toParam(searchParams.price)?.trim()),
});

const toLoadErrorMessage = (error: unknown) => {
  if (error instanceof WooNotConfiguredError) {
    return "Sklep jest chwilowo niedostępny.";
  }

  return "Nie udało się pobrać produktów.";
};

const ShopPage = async ({
  searchParams,
}: {
  searchParams: Promise<ShopPageSearchParams>;
}) => {
  const resolvedSearchParams = await searchParams;
  const page = toPage(toParam(resolvedSearchParams.page));
  const filters = toFiltersFromSearchParams(resolvedSearchParams);

  let products: ShopProduct[] = [];
  let options: ShopFilterOptions = { categories: [], levels: [] };
  let totalResults = 0;
  let currentPage = page;
  let loadError: string | null = null;

  try {
    const payload = await getShopProducts({
      page,
      perPage: PAGE_SIZE,
      query: filters.query || undefined,
      category: filters.category !== "all" ? filters.category : undefined,
      level: filters.level !== "all" ? filters.level : undefined,
      price: filters.price,
    });

    products = payload.items ?? [];
    options = {
      categories: payload.categories ?? [],
      levels: payload.levels ?? [],
    };
    totalResults = payload.total ?? products.length;
    currentPage = payload.page ?? page;
  } catch (error) {
    loadError = toLoadErrorMessage(error);
  }

  return (
    <ShopPageClient
      key={`${filters.query}|${filters.category}|${filters.level}|${filters.price}|${currentPage}`}
      products={products}
      options={options}
      totalResults={totalResults}
      currentPage={currentPage}
      filters={filters}
      pageSize={PAGE_SIZE}
      loadError={loadError}
    />
  );
};

export default ShopPage;
