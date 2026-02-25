import { Box, Stack, Typography } from "@mui/material";

const ContactFaqCard = () => {
  return (
    <Box
      sx={{
        borderRadius: 3,
        background: "#f5efe7",
        boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
        p: 3,
        height: "100%",
      }}
    >
      <Stack spacing={2.25}>
        <Stack spacing={1}>
          <Typography variant="h6" sx={{ fontWeight: 900 }}>
            Mini FAQ
          </Typography>

          <Typography sx={{ fontWeight: 900 }}>1) Co dostaje po zakupie?</Typography>
          <Typography sx={{ opacity: 0.85 }}>
            PDF do pobrania (docelowo przez WooCommerce).
          </Typography>

          <Typography sx={{ fontWeight: 900, pt: 1 }}>
            2) Czy darmowki sa bez konta?
          </Typography>
          <Typography sx={{ opacity: 0.85 }}>
            Tak. Docelowo klik i PDF otworzy sie w nowej karcie.
          </Typography>

          <Typography sx={{ fontWeight: 900, pt: 1 }}>
            3) Dla kogo sa materialy?
          </Typography>
          <Typography sx={{ opacity: 0.85 }}>
            Dla uczniow, nauczycieli i do nauki solo - wybierz kategorie.
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ContactFaqCard;
