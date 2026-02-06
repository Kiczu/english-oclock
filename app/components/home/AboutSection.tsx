"use client";

import { Box, Stack, Typography, Button } from "@mui/material";

const AboutSection = () => {
  return (
    <Box component="section">
      <Box
        sx={{
          width: { xs: "100%", md: "100%" },
          maxWidth: 1600,
          mx: "auto",
          px: { xs: 2, sm: 3, md: 0 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: { xs: "flex-start", md: "space-between" },
          rowGap: { xs: 4, md: 0 },
        }}
      >
        <Box
          sx={{
            position: "relative",
            borderRadius: 3,
            overflow: "hidden",
            aspectRatio: "3 / 4",
            width: { xs: "100%", sm: 360, md: 470 },
            flex: "0 0 auto",
          }}
        >
          <Box
            component="img"
            src="/images/about-me.png"
            alt="English o'clock"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box sx={{ maxWidth: 720, width: "100%" }}>
          <Stack spacing={2.5}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 900, color: "primary.main" }}
            >
              O mnie
            </Typography>

            <Typography
              sx={{
                opacity: 0.85,
                fontSize: { xs: 16, md: 18 },
                lineHeight: 1.65,
              }}
            >
              English o’clock to materiały do nauki angielskiego, które da się
              zrobić w realnym czasie — bez szkolnej waty i bez „przerabiania na
              później”.
            </Typography>

            <Typography
              sx={{
                opacity: 0.85,
                fontSize: { xs: 16, md: 18 },
                lineHeight: 1.65,
              }}
            >
              Tworzę krótkie, konkretne paczki PDF — do samodzielnej nauki, na
              lekcje i jako szybkie powtórki. Najpierw sprawdzasz darmówki,
              potem decydujesz.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ pt: 1 }}
            >
              <Button
                variant="contained"
                href="/free"
                sx={{
                  backgroundColor: "#F09D85",
                  borderRadius: 999,
                  textTransform: "none",
                  fontWeight: 900,
                  px: 3,
                  boxShadow: "none",
                  "&:hover": { backgroundColor: "#F09D85" },
                }}
              >
                Zobacz darmowe materiały
              </Button>

              <Button
                variant="text"
                href="/shop"
                sx={{
                  textTransform: "none",
                  fontWeight: 900,
                }}
              >
                Przejdź do sklepu →
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutSection;
