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
              Czesc! Mam na imie Wiola i od ponad 10 lat ucze jezyka
              angielskiego. Tworze materialy edukacyjne zarowno dla nauczycieli,
              jak i dla uczniow, ktorzy chca uczyc sie samodzielnie. Na co dzien
              aktywnie ucze, wiec wiem, czego potrzebuja uczniowie.
            </Typography>

            <Typography sx={aboutSectionStyles.paragraph}>
              Ukonczylam filologie angielska, a moja pasja jest kultura Wielkiej
              Brytanii - dlatego angielski to dla mnie cos wiecej niz tylko
              przedmiot. Stawiam na nieszablonowe, praktyczne materialy, ktore
              realnie pomagaja w nauce.
            </Typography>

            <Typography sx={aboutSectionStyles.paragraph}>
              Jesli szukasz materialow, ktore oszczedzaja czas i daja efekty,
              jestes w dobrym miejscu!
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
                Zobacz darmowe materialy
              </Button>

              <Button variant="text" href="/sklep" sx={aboutSectionStyles.secondaryButton}>
                Przejdz do sklepu
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutSection;
