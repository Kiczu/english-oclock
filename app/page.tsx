"use client";

import { Container } from "@mui/material";
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
        <div id="home-next"></div>
        <FreeProductsSection />
        <BestSellersSection />
        <AboutSection />
        <ContactSection />
      </Container>
    </>
  );
};

export default HomePage;
