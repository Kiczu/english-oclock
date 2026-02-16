import type { ShopProduct, ShopProductsResponseDTO } from "@/app/types/commerce";

const toErrorMessage = async (response: Response) => {
  const payload = (await response.json().catch(() => null)) as { error?: string } | null;
  return payload?.error ?? "API products request failed";
};

export const fetchShopProducts = async (
  signal?: AbortSignal,
): Promise<ShopProductsResponseDTO> => {
  const response = await fetch("/api/products?all=1&perPage=100&page=1", {
    cache: "no-store",
    signal,
  });

  if (!response.ok) {
    throw new Error(await toErrorMessage(response));
  }

  const payload = (await response.json()) as ShopProductsResponseDTO | ShopProduct[];

  if (Array.isArray(payload)) {
    return { source: "mock", items: payload };
  }

  return { source: payload.source, items: payload.items ?? [] };
};
