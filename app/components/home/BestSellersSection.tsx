"use client";

import { Box, Grid, Stack, Typography } from "@mui/material";
import ProductCard from "../product/ProductCard";
import { bestsellersMock } from "@/app/lib/product.mock";
import { getVariant } from "@/app/helpers/productCard";

const BestsellersSection = () => {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Stack spacing={1.5} sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: 900, color: "primary.main" }}
        >
          Bestsellers
        </Typography>
        <Typography sx={{ opacity: 0.8 }}>
          Najczęściej wybierane materiały
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {bestsellersMock.map((p) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p.id}>
            <ProductCard
              id={p.id}
              href={`/shop/${p.slug}`}
              title={p.title}
              priceLabel={p.priceLabel}
              variant={getVariant(p)}
              onPrimaryAction={() => {
                window.location.href = `https://shop.twojadomena.pl/?add-to-cart=${p.id}`;
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BestsellersSection;
