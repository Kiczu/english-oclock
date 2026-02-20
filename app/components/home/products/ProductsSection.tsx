"use client";

import { Box, Grid, Stack, Typography } from "@mui/material";
import ProductCard from "../product/ProductCard";
import type { ShopProduct } from "@/app/types/commerce";
import { getVariant } from "@/app/helpers/productCard";
import { productsSectionStyles } from "./ProductsSection.styles";

type ProductsSectionProps = {
  id?: string;
  title: string;
  subtitle?: string;
  products: ShopProduct[];
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
  limit?: number;
  cardMaxWidth?: number;
  onPrimaryAction?: (product: ShopProduct) => void;
};

const ProductsSection = ({
  id,
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
    <Box
      component="section"
      id={id}
      sx={productsSectionStyles.section}
    >
      <Stack spacing={1.5} sx={productsSectionStyles.headingStack}>
        <Typography variant="h3" sx={productsSectionStyles.title}>
          {title}
        </Typography>

        {subtitle ? (
          <Typography sx={productsSectionStyles.subtitle}>{subtitle}</Typography>
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
            <Box sx={productsSectionStyles.cardWrap(cardMaxWidth)}>
              <ProductCard
                id={p.id}
                href={`/sklep/${p.slug}`}
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
