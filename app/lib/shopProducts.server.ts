import "server-only";

import { isShopCategoryVisible, toShopProduct } from "@/app/helpers/shopProduct";
import wooFetch from "@/app/lib/woo";
import { WC_ENABLED } from "@/app/lib/env";
import type {
  ShopProduct,
  WooProduct,
  WooProductCategory,
} from "@/app/types/commerce";

type GetShopProductsOptions = {
  page?: number;
  perPage?: number;
  all?: boolean;
};

type ShopProductsResult = {
  source: "woo";
  items: ShopProduct[];
  categories: string[];
};

const clampPositiveInt = (value: number, min: number, max: number) =>
  Math.min(Math.max(Number.isFinite(value) ? Math.floor(value) : min, min), max);

const sortValues = (values: string[]) =>
  values.sort((a, b) => a.localeCompare(b, "pl", { sensitivity: "base" }));

const fetchWooProducts = async (page: number, perPage: number): Promise<ShopProduct[]> => {
  const products = await wooFetch<WooProduct[]>(
    `/wp-json/wc/v3/products?status=publish&per_page=${perPage}&page=${page}`,
    { next: { revalidate: 300 } },
  );

  return products.map(toShopProduct);
};

const fetchAllWooProducts = async (perPage: number): Promise<ShopProduct[]> => {
  const safePerPage = clampPositiveInt(perPage, 1, 100);
  const items: ShopProduct[] = [];

  for (let page = 1; page <= 200; page += 1) {
    try {
      const chunk = await fetchWooProducts(page, safePerPage);
      items.push(...chunk);

      if (chunk.length < safePerPage) {
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

const fetchWooProductBySlug = async (slug: string): Promise<ShopProduct | null> => {
  const products = await wooFetch<WooProduct[]>(
    `/wp-json/wc/v3/products?status=publish&slug=${encodeURIComponent(slug)}&per_page=1`,
    { next: { revalidate: 300 } },
  );

  return products[0] ? toShopProduct(products[0]) : null;
};

export const getShopProducts = async (
  options: GetShopProductsOptions = {},
): Promise<ShopProductsResult> => {
  const safePage = clampPositiveInt(options.page ?? 1, 1, 9999);
  const safePerPage = clampPositiveInt(options.perPage ?? 24, 1, 100);
  const all = options.all ?? false;

  if (!WC_ENABLED) {
    throw new Error("WooCommerce is not configured");
  }

  const items = all
    ? await fetchAllWooProducts(safePerPage)
    : await fetchWooProducts(safePage, safePerPage);
  const categories =
    (await fetchWooCategories().catch(() => null)) ?? getCategoriesFromItems(items);
  return { source: "woo", items, categories };
};

export const getShopProductBySlug = async (slug: string): Promise<ShopProduct | null> => {
  if (!WC_ENABLED) {
    throw new Error("WooCommerce is not configured");
  }

  return fetchWooProductBySlug(slug);
};
