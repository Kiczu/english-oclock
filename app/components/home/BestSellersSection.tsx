import makeMockProducts from "@/app/lib/mockProducts";
import { Container, Grid, Stack, Typography } from "@mui/material";
import ProductCard from "../product/ProductCard";

const BestSellersSection = () => {
  const products = makeMockProducts(12);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }} id="bestsellery">
      <Stack
        direction="row"
        alignItems="baseline"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 900, color: "primary.main" }}
        >
          Bestsellery
        </Typography>
        <Typography sx={{ opacity: 0.7 }}>
          Najczęściej wybierane materiały
        </Typography>
      </Stack>

      <Grid container spacing={2}>
        {products.map((p) => (
          <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BestSellersSection;
