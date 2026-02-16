"use client";

import { Box, Container } from "@mui/material";
import HeroStack from "./components/home/HeroStack";
import BestSellersSection from "./components/home/BestSellersSection";
import FreeProductsSection from "./components/home/FreeProductsSection";
import AboutSection from "./components/home/AboutSection";
import ContactSection from "./components/home/ContactSection";

const HomePage = () => {
  return (
    <>
      <HeroStack />
      <Container maxWidth="xl">
        <Box id="home-next" />
        <Box id="kategorie" sx={{ scrollMarginTop: { xs: 96, md: 112 } }} />
        <FreeProductsSection id="darmowe" />
        <BestSellersSection id="bestsellery" />
        <AboutSection id="o-mnie" />
        <ContactSection id="kontakt" />
      </Container>
    </>
  );
};

export default HomePage;
