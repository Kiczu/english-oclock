import "server-only";

import { toShopProduct } from "@/app/helpers/shopProduct";
import { productsMock } from "@/app/lib/product.mock";
import wooFetch from "@/app/lib/woo";
import { WC_ENABLED } from "@/app/lib/env";
import type { ShopProduct, WooProduct } from "@/app/types/commerce";

type ShopSourceMode = "auto" | "woo" | "mock";
type ShopResolvedSource = "woo" | "mock";

type GetShopProductsOptions = {
  source?: ShopSourceMode;
  page?: number;
  perPage?: number;
  all?: boolean;
};

type ShopProductsResult = {
  source: ShopResolvedSource;
  items: ShopProduct[];
};

const clampPositiveInt = (value: number, min: number, max: number) =>
  Math.min(Math.max(Number.isFinite(value) ? Math.floor(value) : min, min), max);

const paginate = <T>(items: T[], page: number, perPage: number) => {
  const from = (page - 1) * perPage;
  return items.slice(from, from + perPage);
};

const getMockProducts = (page: number, perPage: number): ShopProductsResult => ({
  source: "mock",
  items: paginate(productsMock, page, perPage).map(toShopProduct),
});

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

const fetchWooProductBySlug = async (slug: string): Promise<ShopProduct | null> => {
  const products = await wooFetch<WooProduct[]>(
    `/wp-json/wc/v3/products?status=publish&slug=${encodeURIComponent(slug)}&per_page=1`,
    { next: { revalidate: 300 } },
  );

  return products[0] ? toShopProduct(products[0]) : null;
};

const getMockProductBySlug = (slug: string): ShopProduct | null => {
  const product = productsMock.find((item) => item.slug === slug);
  return product ? toShopProduct(product) : null;
};

export const getShopProducts = async (
  options: GetShopProductsOptions = {},
): Promise<ShopProductsResult> => {
  const source = options.source ?? "auto";
  const safePage = clampPositiveInt(options.page ?? 1, 1, 9999);
  const safePerPage = clampPositiveInt(options.perPage ?? 24, 1, 100);
  const all = options.all ?? false;

  if (source === "mock") {
    return all
      ? { source: "mock", items: productsMock.map(toShopProduct) }
      : getMockProducts(safePage, safePerPage);
  }

  if (source === "woo") {
    if (!WC_ENABLED) {
      throw new Error("WooCommerce is not configured");
    }

    const items = all
      ? await fetchAllWooProducts(safePerPage)
      : await fetchWooProducts(safePage, safePerPage);
    return { source: "woo", items };
  }

  if (WC_ENABLED) {
    try {
      const items = all
        ? await fetchAllWooProducts(safePerPage)
        : await fetchWooProducts(safePage, safePerPage);
      return { source: "woo", items };
    } catch {
      // Auto mode falls back to mock.
    }
  }

  return all
    ? { source: "mock", items: productsMock.map(toShopProduct) }
    : getMockProducts(safePage, safePerPage);
};

export const getShopProductBySlug = async (
  slug: string,
  source: ShopSourceMode = "auto",
): Promise<ShopProduct | null> => {
  if (source === "mock") {
    return getMockProductBySlug(slug);
  }

  if (source === "woo") {
    if (!WC_ENABLED) {
      throw new Error("WooCommerce is not configured");
    }

    return fetchWooProductBySlug(slug);
  }

  if (WC_ENABLED) {
    try {
      const wooProduct = await fetchWooProductBySlug(slug);
      if (wooProduct) return wooProduct;
    } catch {
      // Auto mode falls back to mock.
    }
  }

  return getMockProductBySlug(slug);
};
