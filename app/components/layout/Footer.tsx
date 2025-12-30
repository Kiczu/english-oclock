"use client";

import { Box, Container, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ mt: 8, py: 6, bgcolor: "primary.main", color: "common.white" }}>
      <Container maxWidth="lg">
        <Typography variant="body2">
          English o&apos;clock • Regulamin • Polityka prywatności • Kontakt
        </Typography>
      </Container>
    </Box>
  );
}
