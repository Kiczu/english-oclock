"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Container, Pagination, Stack, Typography } from "@mui/material";
import { useCart } from "@/app/context/CartContext";
import { toCartProduct } from "@/app/helpers/cartProduct";
import type { ShopProduct } from "@/app/types/commerce";
import ShopFiltersPanel from "./components/ShopFiltersPanel";
import ShopProductsGrid from "./components/ShopProductsGrid";
import ShopProductsSkeleton from "./components/ShopProductsSkeleton";
import ShopStateNotice from "./components/ShopStateNotice";
import { defaultFilters, hasActiveFilters } from "./helpers/filters";
import { shopPageStyles } from "./page.styles";
import type { ShopFilterOptions, ShopFilters } from "./types";

type ShopPageClientProps = {
  products: ShopProduct[];
  options: ShopFilterOptions;
  totalResults: number;
  currentPage: number;
  filters: ShopFilters;
  pageSize: number;
  loadError: string | null;
};

const QUERY_DEBOUNCE_MS = 250;

const buildSearchParams = (filters: ShopFilters, page: number) => {
  const params = new URLSearchParams();

  if (page > 1) {
    params.set("page", String(page));
  }

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

  if (filters.price !== "all") {
    params.set("price", filters.price);
  }

  return params.toString();
};

const ShopPageClient = ({
  products,
  options,
  totalResults,
  currentPage,
  filters,
  pageSize,
  loadError,
}: ShopPageClientProps) => {
  const router = useRouter();
  const { addItem, openCart } = useCart();
  const [isPending, startTransition] = useTransition();
  const [queryDraft, setQueryDraft] = useState(() => filters.query);

  const navigateToFilters = useCallback((nextFilters: ShopFilters, nextPage: number) => {
    const query = buildSearchParams(nextFilters, nextPage);
    const href = query ? `/sklep?${query}` : "/sklep";

    startTransition(() => {
      router.replace(href, { scroll: false });
    });
  }, [router]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (queryDraft === filters.query) return;

      navigateToFilters({ ...filters, query: queryDraft }, 1);
    }, QUERY_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [queryDraft, filters, navigateToFilters]);

  const filtersInUi: ShopFilters = { ...filters, query: queryDraft };
  const filtersActive = hasActiveFilters(filtersInUi);
  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));

  const handlePrimaryAction = (product: ShopProduct) => {
    if (product.isFree) {
      router.push(`/sklep/${product.slug}`);
      return;
    }

    addItem(toCartProduct(product));
    openCart();
  };

  return (
    <Container maxWidth="xl" sx={shopPageStyles.container}>
      <Stack spacing={1.5} sx={shopPageStyles.headingStack}>
        <Typography variant="h2" sx={shopPageStyles.title}>
          Sklep
        </Typography>
        <Typography sx={shopPageStyles.subtitle}>
          Wybierz materialy po temacie, poziomie i kategorii. Mozesz szybko
          przefiltrowac darmowe lub platne produkty.
        </Typography>
      </Stack>

      <ShopFiltersPanel
        filters={filtersInUi}
        options={options}
        resultsCount={totalResults}
        hasActiveFilters={filtersActive}
        onQueryChange={(value) => setQueryDraft(value)}
        onCategoryChange={(value) =>
          navigateToFilters({ ...filtersInUi, category: value }, 1)
        }
        onLevelChange={(value) =>
          navigateToFilters({ ...filtersInUi, level: value }, 1)
        }
        onPriceChange={(value) =>
          navigateToFilters({ ...filtersInUi, price: value }, 1)
        }
        onClear={() => {
          const defaults = defaultFilters();
          setQueryDraft(defaults.query);
          navigateToFilters(defaults, 1);
        }}
      />

      {isPending ? <ShopProductsSkeleton count={pageSize} /> : null}

      {!isPending && loadError ? (
        <ShopStateNotice title="Nie udalo sie pobrac produktow." description={loadError} />
      ) : null}

      {!isPending && !loadError && totalResults === 0 ? (
        <ShopStateNotice
          title={filtersActive ? "Brak produktow dla wybranych filtrow." : "Brak produktow."}
          description={
            filtersActive
              ? "Sprobuj zmienic poziom lub usunac czesc filtrow."
              : "Nie znaleziono produktow w WooCommerce."
          }
        />
      ) : null}

      {!isPending && !loadError && products.length > 0 ? (
        <ShopProductsGrid products={products} onPrimaryAction={handlePrimaryAction} />
      ) : null}

      {!isPending && !loadError && totalResults > pageSize ? (
        <Stack sx={shopPageStyles.paginationWrap}>
          <Pagination
            count={totalPages}
            page={Math.min(currentPage, totalPages)}
            onChange={(_, page) => navigateToFilters(filtersInUi, page)}
            color="primary"
            shape="rounded"
            siblingCount={0}
          />
        </Stack>
      ) : null}
    </Container>
  );
};

export default ShopPageClient;
