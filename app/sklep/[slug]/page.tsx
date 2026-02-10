import { notFound } from "next/navigation";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import ProductGallery from "@/app/components/product/ProductGallery";
import { getVariant } from "@/app/helpers/productCard";
import {
  isWooProduct,
  normalizeMock,
  normalizeWoo,
} from "@/app/helpers/productPage";
import { productsMock } from "@/app/lib/product.mock";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = productsMock.find((p) => p.slug === slug);
  if (!product) notFound();

  const mapped = isWooProduct(product)
    ? normalizeWoo(product)
    : normalizeMock(product);
  const variant = getVariant(mapped);
  const topics = mapped.tags.slice(0, 4);

  const priceLabel = mapped.priceLabel;
  const ctaLabel = mapped.isFree ? "Pobierz za darmo" : "Kup teraz";
  const secondaryHref = mapped.isFree ? "/free" : "/sklep";
  const secondaryLabel = mapped.isFree ? "Zobacz darmowe" : "Wroc do sklepu";

  const highlights = mapped.highlights ?? [
    mapped.level ? `Poziom ${mapped.level}` : "Rozne poziomy",
    mapped.formatLabel ?? "PDF do druku",
    mapped.isFree ? "Darmowy dostep" : "Natychmiastowy dostep",
  ];

  return (
    <Container maxWidth="xl" sx={{ pt: { xs: 10, md: 12 }, pb: 8 }}>
      <Stack spacing={4}>
        <Box>
          <Button href="/sklep" sx={{ fontWeight: 800 }}>
            &lt;- Wroc do sklepu
          </Button>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <ProductGallery items={mapped.gallery} title={mapped.title} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              <Stack spacing={0.5}>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 900, color: "primary.main" }}
                >
                  {mapped.title}
                </Typography>
                {mapped.subtitle ? (
                  <Typography sx={{ opacity: 0.75 }}>
                    {mapped.subtitle}
                  </Typography>
                ) : null}
              </Stack>

              <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                {variant === "free" ? (
                  <Chip label="FREE" size="small" sx={{ fontWeight: 800 }} />
                ) : null}
                {variant === "bestseller" ? (
                  <Chip label="TOP" size="small" sx={{ fontWeight: 800 }} />
                ) : null}
                {mapped.level ? (
                  <Chip label={`Poziom ${mapped.level}`} size="small" />
                ) : null}
                {mapped.formatLabel ? (
                  <Chip label={mapped.formatLabel} size="small" />
                ) : null}
                {mapped.categoryLabel ? (
                  <Chip label={mapped.categoryLabel} size="small" />
                ) : null}
                {topics.map((t) => (
                  <Chip key={t} label={t} size="small" />
                ))}
              </Stack>

              <Typography
                variant="h4"
                sx={{ fontWeight: 900, color: "secondary.main" }}
              >
                {priceLabel}
              </Typography>

              <Typography sx={{ opacity: 0.85 }}>
                {mapped.description ??
                  "Praktyczny material do nauki angielskiego. Gotowy do druku i natychmiastowego uzycia."}
              </Typography>

              <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ px: 4, fontWeight: 900, color: "#fff" }}
                >
                  {ctaLabel}
                </Button>
                <Button href={secondaryHref} variant="outlined">
                  {secondaryLabel}
                </Button>
              </Stack>

              <Divider sx={{ my: 1 }} />

              <Stack spacing={1}>
                {highlights.map((item) => (
                  <Typography key={item} variant="body2">
                    - {item}
                  </Typography>
                ))}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default ProductPage;
