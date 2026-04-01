import { Box, Grid, Stack, Typography } from "@mui/material";
import ContactForm from "./ContactForm";
import ContactFaqCard from "./ContactFaqCard";
import { contactSectionStyles } from "./ContactSection.styles";

const ContactSection = ({ id }: { id?: string }) => {
  return (
    <Box component="section" id={id} sx={contactSectionStyles.section}>
      <Stack spacing={1.5} sx={contactSectionStyles.headingStack}>
        <Typography variant="h3" sx={contactSectionStyles.title}>
          Kontakt
        </Typography>
        <Typography sx={contactSectionStyles.subtitle}>
          Masz pytanie? Napisz - chętnie odpowiem.
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
