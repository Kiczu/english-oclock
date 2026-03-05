import "server-only";

import { unstable_cache } from "next/cache";
import { isShopCategoryVisible, toShopProduct } from "@/app/helpers/shopProduct";
import wooFetch, { wooFetchWithMeta } from "@/app/lib/woo";
import { WC_ENABLED } from "@/app/lib/env";
import type {
  ShopProduct,
  WooProduct,
  WooProductAttribute,
  WooProductAttributeTerm,
  WooProductCategory,
} from "@/app/types/commerce";

type ShopPriceFilter = "all" | "free" | "paid";

type GetShopProductsOptions = {
  page?: number;
  perPage?: number;
  all?: boolean;
  query?: string;
  category?: string;
  level?: string;
  price?: ShopPriceFilter;
};

type ShopProductsResult = {
  source: "woo";
  items: ShopProduct[];
  categories: string[];
  levels: string[];
  total: number;
  page: number;
  perPage: number;
};

export class WooNotConfiguredError extends Error {
  constructor() {
    super("WooCommerce is not configured");
    this.name = "WooNotConfiguredError";
  }
}

const clampPositiveInt = (value: number, min: number, max: number) =>
  Math.min(Math.max(Number.isFinite(value) ? Math.floor(value) : min, min), max);

const sortValues = (values: string[]) =>
  values.sort((a, b) => a.localeCompare(b, "pl", { sensitivity: "base" }));

const normalizeText = (value?: string) => (value ?? "").trim().toLowerCase();

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

const filterShopProducts = (
  products: ShopProduct[],
  filters: { query?: string; category?: string; level?: string; price: ShopPriceFilter },
) => {
  const normalizedQuery = normalizeText(filters.query);

  return products.filter((product) => {
    if (filters.category && !product.categories.some((category) => category === filters.category)) {
      return false;
    }

    if (filters.level && product.level !== filters.level) {
      return false;
    }

    if (filters.price === "free" && !product.isFree) {
      return false;
    }

    if (filters.price === "paid" && product.isFree) {
      return false;
    }

    if (normalizedQuery && !toSearchText(product).includes(normalizedQuery)) {
      return false;
    }

    return true;
  });
};

const fetchWooProductsPage = async (page: number, perPage: number) => {
  const { data, meta } = await wooFetchWithMeta<WooProduct[]>(
    `/wp-json/wc/v3/products?status=publish&per_page=${perPage}&page=${page}`,
    { next: { revalidate: 300 } },
  );

  return {
    items: data.map(toShopProduct),
    total: meta.total,
  };
};

const fetchAllWooProducts = async (perPage: number): Promise<ShopProduct[]> => {
  const safePerPage = clampPositiveInt(perPage, 1, 100);
  const items: ShopProduct[] = [];

  for (let page = 1; page <= 200; page += 1) {
    try {
      const chunk = await fetchWooProductsPage(page, safePerPage);
      items.push(...chunk.items);

      if (chunk.items.length < safePerPage) {
        break;
      }
    } catch (error) {
      // Woo returns 400 for out-of-range pages. In all-mode this means we are done.
      if (page === 1) {
        throw error;
      }
      break;
    }
  }

  return items;
};

const getCategoriesFromItems = (items: ShopProduct[]) =>
  sortValues(
    Array.from(
      new Set(
        items
          .flatMap((item) => item.categories)
          .map((category) => category.trim())
          .filter(Boolean),
      ),
    ),
  );

const getLevelsFromItems = (items: ShopProduct[]) =>
  sortValues(
    Array.from(
      new Set(
        items
          .map((item) => item.level?.trim())
          .filter((value): value is string => Boolean(value)),
      ),
    ),
  );

const fetchWooCategories = async (): Promise<string[]> => {
  const names: string[] = [];

  for (let page = 1; page <= 200; page += 1) {
    const categories = await wooFetch<WooProductCategory[]>(
      `/wp-json/wc/v3/products/categories?hide_empty=false&per_page=100&page=${page}`,
      { next: { revalidate: 300 } },
    );

    names.push(
      ...categories
        .filter((category) => isShopCategoryVisible(category))
        .map((category) => category.name?.trim())
        .filter((value): value is string => Boolean(value)),
    );

    if (categories.length < 100) {
      break;
    }
  }

  return sortValues(Array.from(new Set(names)));
};

const fetchWooLevels = async (): Promise<string[]> => {
  const attributes = await wooFetch<WooProductAttribute[]>(
    "/wp-json/wc/v3/products/attributes?per_page=100",
    { next: { revalidate: 300 } },
  );

  const levelAttribute = attributes.find((attribute) =>
    ["poziom", "level"].includes(normalizeText(attribute.name)),
  );

  if (!levelAttribute) {
    return [];
  }

  const names: string[] = [];

  for (let page = 1; page <= 200; page += 1) {
    const terms = await wooFetch<WooProductAttributeTerm[]>(
      `/wp-json/wc/v3/products/attributes/${levelAttribute.id}/terms?hide_empty=false&per_page=100&page=${page}`,
      { next: { revalidate: 300 } },
    );

    names.push(
      ...terms
        .map((term) => term.name?.trim())
        .filter((value): value is string => Boolean(value)),
    );

    if (terms.length < 100) {
      break;
    }
  }

  return sortValues(Array.from(new Set(names)));
};

const fetchWooProductBySlug = async (slug: string): Promise<ShopProduct | null> => {
  const products = await wooFetch<WooProduct[]>(
    `/wp-json/wc/v3/products?status=publish&slug=${encodeURIComponent(slug)}&per_page=1`,
    { next: { revalidate: 300 } },
  );

  return products[0] ? toShopProduct(products[0]) : null;
};

const getCachedAllWooProducts = unstable_cache(
  () => fetchAllWooProducts(100),
  ["shop-products-all"],
  { revalidate: 300 },
);

const getCachedWooCategories = unstable_cache(
  fetchWooCategories,
  ["shop-categories-all"],
  { revalidate: 300 },
);

const getCachedWooLevels = unstable_cache(
  fetchWooLevels,
  ["shop-levels-all"],
  { revalidate: 300 },
);

export const getShopProducts = async (
  options: GetShopProductsOptions = {},
): Promise<ShopProductsResult> => {
  const safePage = clampPositiveInt(options.page ?? 1, 1, 9999);
  const safePerPage = clampPositiveInt(options.perPage ?? 24, 1, 100);
  const all = options.all ?? false;
  const filters = {
    query: options.query?.trim() || undefined,
    category: options.category && options.category !== "all" ? options.category : undefined,
    level: options.level && options.level !== "all" ? options.level : undefined,
    price: options.price ?? "all",
  } as const;
  const hasFilters = Boolean(
    filters.query || filters.category || filters.level || filters.price !== "all",
  );

  if (!WC_ENABLED) {
    throw new WooNotConfiguredError();
  }

  const [categories, levels] = await Promise.all([
    getCachedWooCategories().catch(() => null),
    getCachedWooLevels().catch(() => null),
  ]);

  if (all || hasFilters) {
    const fullItems = await getCachedAllWooProducts();
    const filteredItems = filterShopProducts(fullItems, filters);
    const total = filteredItems.length;
    const items = all
      ? filteredItems
      : filteredItems.slice((safePage - 1) * safePerPage, safePage * safePerPage);

    return {
      source: "woo",
      items,
      categories: categories ?? getCategoriesFromItems(fullItems),
      levels: levels ?? getLevelsFromItems(fullItems),
      total,
      page: safePage,
      perPage: safePerPage,
    };
  }

  const pagePayload = await fetchWooProductsPage(safePage, safePerPage);

  return {
    source: "woo",
    items: pagePayload.items,
    categories: categories ?? getCategoriesFromItems(pagePayload.items),
    levels: levels ?? getLevelsFromItems(pagePayload.items),
    total: pagePayload.total ?? pagePayload.items.length,
    page: safePage,
    perPage: safePerPage,
  };
};

export const getShopProductBySlug = async (slug: string): Promise<ShopProduct | null> => {
  if (!WC_ENABLED) {
    throw new WooNotConfiguredError();
  }

  return fetchWooProductBySlug(slug);
};
