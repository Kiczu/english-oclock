"use client";

import { Box, Stack, Typography, Button } from "@mui/material";

const AboutSection = ({ id }: { id?: string }) => {
  return (
    <Box
      component="section"
      id={id}
      sx={{ scrollMarginTop: { xs: 96, md: 112 } }}
    >
      <Box
        sx={{
          width: "100%",
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
            aspectRatio: { xs: "1 / 1", md: "3 / 4" },
            width: { xs: "50%", sm: "60%", md: "40%", lg: "30%" },
            flex: "0 0 auto",
          }}
        >
          <Box
            component="img"
            src="/images/about-me.png"
            alt="English o'clock"
            sx={{
              width: { xs: "100%", md: "80%", lg: "100%" },
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
              Cześć! Mam na imię Wiola i od ponad 10 lat uczę języka
              angielskiego. Tworzę materiały edukacyjne zarówno dla nauczycieli,
              jak i dla uczniów, którzy chcą uczyć się samodzielnie. Na co dzień
              aktywnie uczę, więc wiem, czego potrzebują uczniowie.
            </Typography>

            <Typography
              sx={{
                opacity: 0.85,
                fontSize: { xs: 16, md: 18 },
                lineHeight: 1.65,
              }}
            >
              Ukończyłam filologię angielską, a moją pasją jest kultura Wielkiej
              Brytanii - dlatego angielski to dla mnie coś więcej niż tylko
              przedmiot. Stawiam na nieszablonowe, praktyczne materiały, które
              realnie pomagają w nauce.
            </Typography>
            <Typography
              sx={{
                opacity: 0.85,
                fontSize: { xs: 16, md: 18 },
                lineHeight: 1.65,
              }}
            >
              Jeśli szukasz materiałów, które oszczędzają czas i dają efekty,
              jesteś w dobrym miejscu!
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
                href="/sklep"
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
