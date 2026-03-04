"use client";

import { Box, Grid, Stack, Typography } from "@mui/material";
import ContactForm from "./ContactForm";
import ContactFaqCard from "./ContactFaqCard";

const ContactSection = ({ id }: { id?: string }) => {
  return (
    <Box component="section" id={id} sx={{ py: { xs: 6, md: 10 } }}>
      <Stack spacing={1.5} sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 900, color: "primary.main" }}>
          Kontakt
        </Typography>
        <Typography sx={{ opacity: 0.8 }}>
          Masz pytanie? Napisz - odpisze.
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 12, lg: 7 }}>
          <ContactForm />
        </Grid>

        <Grid size={{ xs: 12, md: 12, lg: 5 }}>
          <ContactFaqCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactSection;
