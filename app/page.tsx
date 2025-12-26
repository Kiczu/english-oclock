"use client";

import { Container, Box, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function HomePage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h2" sx={{ mb: 2 }}>
          Materiały do angielskiego A1–C2
        </Typography>
        <Typography sx={{ mb: 3 }}>
          PDF do druku • gotowe lekcje • klucze odpowiedzi
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" component={Link} href="/sklep">
            Zobacz sklep
          </Button>
          <Button variant="outlined" component={Link} href="/darmowe">
            Darmowe materiały
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
