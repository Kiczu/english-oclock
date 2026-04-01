"use client";

import { Box, Stack, Typography, Button } from "@mui/material";
import { aboutSectionStyles } from "./AboutSection.styles";

const AboutSection = ({ id }: { id?: string }) => {
  return (
    <Box component="section" id={id} sx={aboutSectionStyles.section}>
      <Box sx={aboutSectionStyles.container}>
        <Box sx={aboutSectionStyles.imageWrapper}>
          <Box
            component="img"
            src="/images/about-me.png"
            alt="English o'clock"
            sx={aboutSectionStyles.image}
          />
        </Box>

        <Box sx={aboutSectionStyles.content}>
          <Stack spacing={2.5}>
            <Typography variant="h3" sx={aboutSectionStyles.title}>
              O mnie
            </Typography>

            <Typography sx={aboutSectionStyles.paragraph}>
              Cześć! Mam na imię Wiola i od ponad 10 lat uczę języka
              angielskiego. Tworzę materiały edukacyjne zarówno dla nauczycieli,
              jak i dla uczniów, którzy chcą uczyć się samodzielnie. Na co dzień
              aktywnie uczę, więc wiem, czego potrzebują uczniowie.
            </Typography>

            <Typography sx={aboutSectionStyles.paragraph}>
              Ukończyłam filologię angielską, a moją pasją jest kultura Wielkiej
              Brytanii - dlatego angielski to dla mnie coś więcej niż tylko
              przedmiot. Stawiam na nieszablonowe, praktyczne materiały, które
              realnie pomagają w nauce.
            </Typography>

            <Typography sx={aboutSectionStyles.paragraph}>
              Jeśli szukasz materiałów, które oszczędzają czas i dają efekty,
              jesteś w dobrym miejscu!
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={aboutSectionStyles.actionsRow}
            >
              <Button
                variant="contained"
                color="secondary"
                href="/sklep?price=free"
                sx={aboutSectionStyles.primaryButton}
              >
                Zobacz darmowe materiały
              </Button>

              <Button variant="text" href="/sklep" sx={aboutSectionStyles.secondaryButton}>
                Przejdź do sklepu
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutSection;
