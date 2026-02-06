"use client";

import { Box, Grid, Stack, Typography } from "@mui/material";
import ProductCard from "../product/ProductCard";
import type { ProductUI } from "@/app/lib/product.mock";
import { getVariant } from "@/app/helpers/productCard";

type ProductsSectionProps = {
  title: string;
  subtitle?: string;
  products: ProductUI[];
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
  limit?: number;
  cardMaxWidth?: number;
  onPrimaryAction?: (product: ProductUI) => void;
};

const ProductsSection = ({
  title,
  subtitle,
  products,
  columns = { xs: 12, sm: 6, md: 4 },
  limit,
  cardMaxWidth,
  onPrimaryAction,
}: ProductsSectionProps) => {
  const list = typeof limit === "number" ? products.slice(0, limit) : products;

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Stack spacing={1.5} sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: 900, color: "primary.main" }}
        >
          {title}
        </Typography>

        {subtitle ? (
          <Typography sx={{ opacity: 0.8 }}>{subtitle}</Typography>
        ) : null}
      </Stack>

      <Grid container spacing={3}>
        {list.map((p) => (
          <Grid
            key={p.id}
            size={{
              xs: columns.xs ?? 12,
              sm: columns.sm ?? 6,
              md: columns.md ?? 4,
              lg: columns.lg,
            }}
          >
            <Box sx={{ maxWidth: cardMaxWidth ?? "none", mx: "auto" }}>
              <ProductCard
                id={p.id}
                href={`/shop/${p.slug}`}
                title={p.title}
                priceLabel={p.priceLabel}
                variant={getVariant(p)}
                onPrimaryAction={() => onPrimaryAction?.(p)}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductsSection;
