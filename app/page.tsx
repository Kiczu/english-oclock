"use client";

import { Container } from "@mui/material";
import HeroStack from "./components/home/HeroStack";
import BestSellersSection from "./components/home/BestSellersSection";
import FreeProductsSection from "./components/home/FreeProductsSection";
import AboutSection from "./components/home/AboutSection";

const HomePage = () => {
  return (
    <>
      <HeroStack />
      <Container maxWidth="lg">
        <div id="home-next"></div>
        <BestSellersSection />
        <FreeProductsSection />
        <AboutSection />
      </Container>
    </>
  );
};

export default HomePage;
