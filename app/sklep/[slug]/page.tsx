import { notFound } from "next/navigation";
import { Box, Button, Chip, Container, Divider, Grid, Stack, Typography } from "@mui/material";

import ProductGallery from "@/app/components/product/ProductGallery";
import AddToCartButton from "@/app/components/product/AddToCartButton";
import { getVariant } from "@/app/helpers/productCard";
import { getShopProductBySlug } from "@/app/lib/shopProducts.server";

const ProductPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const mapped = await getShopProductBySlug(slug);
  if (!mapped) notFound();
  const variant = getVariant(mapped);
  const topics = mapped.tags.slice(0, 4);

  const priceLabel = mapped.priceLabel;
  const ctaLabel = mapped.isFree ? "Pobierz za darmo" : "Do koszyka";
  const secondaryHref = mapped.isFree ? "/free" : "/sklep";
  const secondaryLabel = mapped.isFree ? "Zobacz darmowe" : "Wroc do sklepu";

  const highlights = mapped.highlights ?? [
    mapped.level ? `Poziom ${mapped.level}` : "Rozne poziomy",
    "Material cyfrowy",
    mapped.isFree ? "Darmowy dostep" : "Natychmiastowy dostep",
  ];

  return (
    <Container maxWidth="xl" sx={{ pt: { xs: 10, md: 12 }, pb: 8 }}>
      <Stack spacing={4}>
        <Box>
          <Button
            href="/sklep"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1rem", sm: "1.1rem" },
              textTransform: "none",
            }}
          >
            {"<- Wroc do sklepu"}
          </Button>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 5 }}>
            <ProductGallery items={mapped.gallery} title={mapped.title} />
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={2}>
              <Stack spacing={0.5}>
                <Typography variant="h3" sx={{ fontWeight: 900, color: "primary.main" }}>
                  {mapped.title}
                </Typography>
                {mapped.subtitle ? <Typography sx={{ opacity: 0.75 }}>{mapped.subtitle}</Typography> : null}
              </Stack>

              <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                {variant === "free" ? <Chip label="FREE" size="small" sx={{ fontWeight: 800 }} /> : null}
                {variant === "bestseller" ? <Chip label="TOP" size="small" sx={{ fontWeight: 800 }} /> : null}
                {mapped.level ? <Chip label={`Poziom ${mapped.level}`} size="small" /> : null}
                {mapped.categories.map((category) => (
                  <Chip key={category} label={category} size="small" />
                ))}
                {topics.map((t) => (
                  <Chip key={t} label={t} size="small" />
                ))}
              </Stack>

              <Typography variant="h4" sx={{ fontWeight: 900, color: "secondary.main" }}>
                {priceLabel}
              </Typography>

              <Typography sx={{ opacity: 0.85 }}>
                {mapped.description ??
                  "Praktyczny material do nauki angielskiego. Gotowy do druku i natychmiastowego uzycia."}
              </Typography>

              <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
                {mapped.isFree ? (
                  <Button variant="contained" color="secondary" sx={{ px: 4, fontWeight: 900, color: "#fff" }}>
                    {ctaLabel}
                  </Button>
                ) : (
                  <AddToCartButton
                    id={mapped.id}
                    wooProductId={mapped.wooProductId}
                    slug={mapped.slug}
                    title={mapped.title}
                    priceLabel={mapped.priceLabel}
                    unitPrice={mapped.price}
                    isFree={mapped.isFree}
                    label={ctaLabel}
                  />
                )}
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

