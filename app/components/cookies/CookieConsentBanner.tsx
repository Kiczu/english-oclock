"use client";

import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { colors } from "@/app/theme/colors";

type CookieConsentBannerProps = {
  onAcceptAll: () => void;
  onRejectOptional: () => void;
  onOpenSettings: () => void;
};

const CookieConsentBanner = ({
  onAcceptAll,
  onRejectOptional,
  onOpenSettings,
}: CookieConsentBannerProps) => {
  return (
    <Box
      sx={{
        position: "fixed",
        left: { xs: 12, sm: 20 },
        right: { xs: 12, sm: 20 },
        bottom: { xs: 12, sm: 20 },
        zIndex: 1300,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "rgba(55, 67, 115, 0.2)",
          p: { xs: 2.5, sm: 3.25, md: 3.5 },
          bgcolor: colors.stickerBackground,
        }}
      >
        <Stack spacing={2}>
          <Typography
            variant="h4"
            sx={{
              color: "primary.main",
              fontWeight: 900,
              fontSize: { xs: "1.4rem", sm: "1.7rem" },
              lineHeight: 1.08,
            }}
          >
            Pliki cookies
          </Typography>

          <Typography sx={{ opacity: 0.9, fontSize: { xs: "0.95rem", sm: "1.02rem" } }}>
            Używamy cookies niezbędnych do działania sklepu (np. koszyk). Cookies
            analityczne i marketingowe uruchomimy tylko za Twoją zgodą.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            sx={{ alignItems: { xs: "stretch", sm: "center" }, pt: 0.75 }}
          >
            <Button variant="contained" color="secondary" onClick={onAcceptAll}>
              Akceptuj wszystkie
            </Button>
            <Button variant="outlined" color="primary" onClick={onRejectOptional}>
              Odrzuć opcjonalne
            </Button>
            <Button
              variant="text"
              color="primary"
              onClick={onOpenSettings}
              sx={{ fontWeight: 700 }}
            >
              Ustawienia cookies
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default CookieConsentBanner;

