export type StoredCartItem = {
  id: string;
  wooProductId?: number;
  slug: string;
  title: string;
  priceLabel: string;
  unitPrice?: number;
  isFree?: boolean;
};

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

export const parsePrice = (
  priceLabel: string,
  isFree?: boolean,
  unitPrice?: number,
) => {
  if (typeof unitPrice === "number" && Number.isFinite(unitPrice)) {
    return Math.max(unitPrice, 0);
  }
  if (isFree) return 0;
  const match = priceLabel.match(/-?\d+(?:[.,]\d+)?/);
  if (!match) return 0;
  const value = Number(match[0].replace(",", "."));
  return Number.isFinite(value) ? value : 0;
};

export const normalizeCartItems = (value: unknown): StoredCartItem[] => {
  if (!Array.isArray(value)) return [];

  const seen = new Set<string>();
  const normalized: StoredCartItem[] = [];

  for (const rawItem of value) {
    if (!rawItem || typeof rawItem !== "object") continue;

    const item = rawItem as Partial<StoredCartItem>;
    if (!isNonEmptyString(item.id) || seen.has(item.id)) continue;
    if (
      !isNonEmptyString(item.slug) ||
      !isNonEmptyString(item.title) ||
      !isNonEmptyString(item.priceLabel)
    ) {
      continue;
    }

    normalized.push({
      id: item.id,
      wooProductId:
        typeof item.wooProductId === "number" &&
        Number.isInteger(item.wooProductId) &&
        item.wooProductId > 0
          ? item.wooProductId
          : undefined,
      slug: item.slug,
      title: item.title,
      priceLabel: item.priceLabel,
      unitPrice:
        typeof item.unitPrice === "number" && Number.isFinite(item.unitPrice)
          ? item.unitPrice
          : undefined,
      isFree: item.isFree === true ? true : undefined,
    });

    seen.add(item.id);
  }

  return normalized;
};
