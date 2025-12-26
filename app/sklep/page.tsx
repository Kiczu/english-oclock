"use client";

import * as React from "react";
import { Container, Typography, Grid } from "@mui/material";
import { ProductCardDTO } from "../types/commerce";

const ShopPage = () => {
  const [products, setProducts] = React.useState<ProductCardDTO[]>([]);

  React.useEffect(() => {
    fetch("/api/products?perPage=24&page=1")
      .then((r) => r.json())
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" sx={{ mb: 3 }}>
        Sklep
      </Typography>

      <Grid container spacing={2}>
        {products.map((p) => (
          <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <div style={{ padding: 16, borderRadius: 16, background: "white" }}>
              <strong>{p.name}</strong>
              <div>{p.price} zł</div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ShopPage;
