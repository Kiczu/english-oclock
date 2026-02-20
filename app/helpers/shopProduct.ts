import type { ShopProduct, WooProduct } from "@/app/types/commerce";

const stripHtml = (value?: string) =>
  value ? value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() : "";

const parsePrice = (value?: string) => {
  if (!value) return 0;
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
};

export const toPriceLabel = (price: number) => {
  if (price <= 0) return "0 zl";
  const hasFraction = Math.abs(price % 1) > 0;
  if (!hasFraction) return `${price} zl`;
  return `${price.toFixed(2).replace(".", ",")} zl`;
};

const pickAttributeValue = (product: WooProduct, names: string[]) => {
  const attribute = product.attributes?.find((entry) =>
    names.some((name) => entry.name.toLowerCase() === name.toLowerCase()),
  );
  return attribute?.options?.[0];
};

const getMetaString = (product: WooProduct, key: string) => {
  const value = product.meta_data?.find((entry) => entry.key === key)?.value;
  if (typeof value === "string") return value;
  return undefined;
};

const parseMetaList = (value?: string) => {
  if (!value) return undefined;

  try {
    const parsed = JSON.parse(value) as unknown;
    if (Array.isArray(parsed)) {
      const list = parsed.filter((item): item is string => typeof item === "string");
      return list.length ? list : undefined;
    }
  } catch {
    // Not JSON, fallback to split.
  }

  const list = value
    .split(/\r?\n|\|/)
    .map((part) => part.trim())
    .filter(Boolean);

  return list.length ? list : undefined;
};

const toTagLabel = (tagName: string) =>
  tagName
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const normalizeCategoryValue = (value?: string) =>
  (value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const hiddenCategoryNames = new Set(["bez kategorii", "uncategorized"]);
const hiddenCategorySlugs = new Set(["bez-kategorii", "uncategorized"]);

export const isShopCategoryVisible = (category: { name?: string; slug?: string }) => {
  const normalizedName = normalizeCategoryValue(category.name);
  const normalizedSlug = normalizeCategoryValue(category.slug);

  if (!normalizedName) return false;
  if (hiddenCategoryNames.has(normalizedName)) return false;
  if (normalizedSlug && hiddenCategorySlugs.has(normalizedSlug)) return false;
  return true;
};

export const toShopProduct = (product: WooProduct): ShopProduct => {
  const preferredPrice = product.on_sale && product.sale_price ? product.sale_price : product.price;
  const fallbackPrice = preferredPrice || product.regular_price || product.sale_price;
  const price = parsePrice(fallbackPrice);
  const isFree = price <= 0;

  const badge = getMetaString(product, "_custom_badge")?.toLowerCase();
  const isBestseller =
    badge === "bestseller" ||
    (product.tags ?? []).some((tag) => tag.name.toLowerCase() === "bestseller");

  const tags = (product.tags ?? [])
    .filter((tag) => tag.name.toLowerCase() !== "bestseller")
    .map((tag) => toTagLabel(tag.name));
  const categories = (product.categories ?? [])
    .filter((entry) => isShopCategoryVisible(entry))
    .map((entry) => entry.name?.trim())
    .filter((value): value is string => Boolean(value));

  return {
    id: String(product.id),
    wooProductId: product.id,
    slug: product.slug,
    title: product.name,
    subtitle: stripHtml(product.short_description),
    description: stripHtml(product.description) || stripHtml(product.short_description),
    price,
    priceLabel: toPriceLabel(price),
    isFree,
    isBestseller,
    categories: Array.from(new Set(categories)),
    level: pickAttributeValue(product, ["Poziom", "Level"]),
    tags,
    gallery:
      product.images?.map((image) => ({
        src: image.src,
        label: image.alt || "Podglad",
      })) ?? [],
    highlights: parseMetaList(getMetaString(product, "_highlights")),
    includes: parseMetaList(getMetaString(product, "_includes")),
  };
};
