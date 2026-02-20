"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Stack, Typography } from "@mui/material";
import { useCart } from "@/app/context/CartContext";
import type { ShopProduct } from "@/app/types/commerce";
import ShopFiltersPanel from "./components/ShopFiltersPanel";
import ShopProductsGrid from "./components/ShopProductsGrid";
import ShopStateNotice from "./components/ShopStateNotice";
import {
  defaultFilters,
  filterProducts,
  getFilterOptions,
  hasActiveFilters,
} from "./helpers/filters";
import { fetchShopProducts } from "./services/fetchShopProducts";
import type { ShopFilters } from "./types";

const toErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return "Nie udalo sie pobrac listy produktow.";
};

const ShopPage = () => {
  const router = useRouter();
  const { addItem, openCart } = useCart();

  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [source, setSource] = useState<"mock" | "woo" | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ShopFilters>(() => defaultFilters());

  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const payload = await fetchShopProducts(controller.signal);
        setProducts(payload.items ?? []);
        setCategories(payload.categories ?? []);
        setSource(payload.source ?? null);
      } catch (loadError) {
        if (controller.signal.aborted) return;
        setProducts([]);
        setCategories([]);
        setSource(null);
        setError(toErrorMessage(loadError));
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void loadProducts();

    return () => controller.abort();
  }, []);

  const options = useMemo(
    () => getFilterOptions(products, categories),
    [products, categories],
  );
  const filteredProducts = useMemo(
    () => filterProducts(products, filters),
    [products, filters],
  );
  const filtersActive = hasActiveFilters(filters);

  const updateFilters = (partial: Partial<ShopFilters>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  };

  const clearFilters = () => setFilters(defaultFilters());

  const handlePrimaryAction = (product: ShopProduct) => {
    if (product.isFree) {
      router.push(`/sklep/${product.slug}`);
      return;
    }

    addItem({
      id: product.id,
      wooProductId: product.wooProductId,
      slug: product.slug,
      title: product.title,
      priceLabel: product.priceLabel,
      unitPrice: product.price,
      isFree: product.isFree,
    });
    openCart();
  };

  return (
    <Container maxWidth="xl" sx={{ pt: { xs: 14, md: 16 }, pb: 7 }}>
      <Stack spacing={1.5} sx={{ mb: 4 }}>
        <Typography
          variant="h2"
          sx={{ fontWeight: 900, color: "primary.main" }}
        >
          Sklep
        </Typography>
        <Typography sx={{ opacity: 0.8 }}>
          Wybierz materialy po temacie, poziomie i kategorii. Mozesz szybko
          przefiltrowac darmowe lub platne produkty.
        </Typography>
      </Stack>

      <ShopFiltersPanel
        filters={filters}
        options={options}
        resultsCount={filteredProducts.length}
        source={source}
        hasActiveFilters={filtersActive}
        onQueryChange={(value) => updateFilters({ query: value })}
        onCategoryChange={(value) => updateFilters({ category: value })}
        onLevelChange={(value) => updateFilters({ level: value })}
        onPriceChange={(value) => updateFilters({ price: value })}
        onClear={clearFilters}
      />

      {loading ? <ShopStateNotice title="Ladowanie produktow..." /> : null}

      {!loading && error ? (
        <ShopStateNotice
          title="Nie udalo sie pobrac produktow."
          description={error}
        />
      ) : null}

      {!loading && !error && filteredProducts.length === 0 ? (
        <ShopStateNotice
          title="Brak produktow dla wybranych filtrow."
          description="Sprobuj zmienic poziom lub usunac czesc filtrow."
        />
      ) : null}

      {!loading && !error && filteredProducts.length > 0 ? (
        <ShopProductsGrid
          products={filteredProducts}
          onPrimaryAction={handlePrimaryAction}
        />
      ) : null}
    </Container>
  );
};

export default ShopPage;
