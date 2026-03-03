import type { ShopProductsResponseDTO } from "@/app/types/commerce";
import type { ShopFilters } from "../types";

const toErrorMessage = async (response: Response) => {
  const payload = (await response.json().catch(() => null)) as { error?: string } | null;
  return payload?.error ?? "API products request failed";
};

type FetchShopProductsOptions = {
  page: number;
  perPage: number;
  filters: ShopFilters;
  signal?: AbortSignal;
};

const buildProductsUrl = ({ page, perPage, filters }: FetchShopProductsOptions) => {
  const params = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
    price: filters.price,
  });

  const trimmedQuery = filters.query.trim();
  if (trimmedQuery) {
    params.set("q", trimmedQuery);
  }

  if (filters.category !== "all") {
    params.set("category", filters.category);
  }

  if (filters.level !== "all") {
    params.set("level", filters.level);
  }

  return `/api/products?${params.toString()}`;
};

export const fetchShopProducts = async (
  options: FetchShopProductsOptions,
): Promise<ShopProductsResponseDTO> => {
  const response = await fetch(buildProductsUrl(options), {
    cache: "no-store",
    signal: options.signal,
  });

  if (!response.ok) {
    throw new Error(await toErrorMessage(response));
  }

  const payload = (await response.json()) as ShopProductsResponseDTO;

  return {
    source: payload.source,
    items: payload.items ?? [],
    categories: payload.categories ?? [],
    levels: payload.levels ?? [],
    total: payload.total ?? payload.items?.length ?? 0,
    page: payload.page ?? options.page,
    perPage: payload.perPage ?? options.perPage,
  };
};
