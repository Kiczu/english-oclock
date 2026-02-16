"use client";

import Link from "next/link";
import { Box, Stack, Typography, Grid, Container } from "@mui/material";
import { useRouter } from "next/navigation";

import ProductCard from "@/app/components/product/ProductCard";
import { freeProductsMock } from "@/app/lib/product.mock";

const FreePage = () => {
  const router = useRouter();

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Stack spacing={1.5} sx={{ mb: 4 }}>
          <Typography
            variant="h2"
            sx={{ fontWeight: 900, color: "primary.main" }}
          >
            Darmowe materiały
          </Typography>

          <Typography sx={{ opacity: 0.8, maxWidth: 720 }}>
            Wszystkie darmówki w jednym miejscu. Kliknij i sprawdź format – bez
            koszyka, bez konta.
          </Typography>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Typography sx={{ fontWeight: 800, color: "primary.main" }}>
              ← Wróć na stronę główną
            </Typography>
          </Link>
        </Stack>

        <Grid container spacing={3}>
          {freeProductsMock.map((p) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p.id}>
              <ProductCard
                id={p.id}
                href={`/sklep/${p.slug}`}
                title={p.title}
                priceLabel={p.priceLabel}
                variant="free"
                onPrimaryAction={() => {
                  router.push(`/sklep/${p.slug}`);
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default FreePage;
