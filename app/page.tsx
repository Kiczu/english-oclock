"use client";

import { Container } from "@mui/material";
import HeroStack from "./components/home/HeroStack";
import BestSellersSection from "./components/home/BestSellersSection";

const HomePage = () => {
  return (
    <>
      <HeroStack />
      <Container maxWidth="lg">
        <div id="home-next"></div>
        <BestSellersSection />
      </Container>
    </>
  );
};

export default HomePage;
