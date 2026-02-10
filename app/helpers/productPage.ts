import type { ProductUI } from "@/app/lib/product.mock";
import type { ProductPageData, WooProduct } from "@/app/types/commerce";

const formatLabels: Record<string, string> = {
  worksheet: "Karta pracy",
  bundle: "Zestaw",
  game: "Gra",
  test: "Test",
  cheatsheet: "Sciaga",
};

const categoryLabels: Record<string, string> = {
  student: "Dla ucznia",
  teacher: "Dla nauczyciela",
  self: "Samodzielna nauka",
  exam: "Egzamin",
};

const toTopicLabel = (topic: string) =>
  topic
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const stripHtml = (value?: string) =>
  value ? value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() : "";

const toPriceLabel = (value?: string) => {
  if (!value) return "";
  const normalized = value.replace(",", ".");
  return `${normalized} zl`;
};

const pickAttribute = (
  attrs: WooProduct["attributes"] | undefined,
  name: string,
) => attrs?.find((attr) => attr.name.toLowerCase() === name.toLowerCase());

const getMetaValue = (meta: WooProduct["meta_data"] | undefined, key: string) =>
  meta?.find((item) => item.key === key)?.value;

export const normalizeWoo = (product: WooProduct): ProductPageData => {
  const levelAttr = pickAttribute(product.attributes, "Poziom");
  const formatAttr = pickAttribute(product.attributes, "Format");
  const level = levelAttr?.options?.[0];
  const formatLabel = formatAttr?.options?.[0];

  const metaBadge = getMetaValue(product.meta_data, "_custom_badge");
  const isBestseller =
    metaBadge?.toLowerCase() === "bestseller" ||
    product.tags?.some((tag) => tag.name.toLowerCase() === "bestseller");

  const priceLabel = product.on_sale
    ? toPriceLabel(product.sale_price)
    : toPriceLabel(product.price);

  return {
    id: String(product.id),
    slug: product.slug,
    title: product.name,
    subtitle: stripHtml(product.short_description),
    description: stripHtml(product.description) || stripHtml(product.short_description),
    priceLabel,
    isFree: product.price === "0" || product.price === "0.00",
    isBestseller,
    categoryLabel: product.categories?.[0]?.name,
    tags: product.tags?.map((tag) => tag.name) ?? [],
    level,
    formatLabel,
    gallery:
      product.images?.map((image) => ({
        src: image.src,
        label: image.alt || image.name || "Podglad",
      })) ?? [],
  };
};

export const normalizeMock = (product: ProductUI): ProductPageData => {
  const formatLabel = product.format ? formatLabels[product.format] : undefined;
  const categoryLabel = categoryLabels[product.category];

  return {
    id: product.id,
    slug: product.slug,
    title: product.title,
    subtitle: product.subtitle,
    description: product.description,
    priceLabel: product.priceLabel,
    isFree: product.isFree,
    isBestseller: product.isBestseller,
    categoryLabel,
    tags: (product.topics ?? []).map(toTopicLabel),
    level: product.level,
    formatLabel,
    gallery: product.gallery ?? [],
    highlights: product.highlights,
    includes: product.includes,
  };
};

export const isWooProduct = (product: unknown): product is WooProduct =>
  typeof product === "object" &&
  product !== null &&
  "name" in product &&
  "slug" in product;
