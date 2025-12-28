"use client";

import { Container } from "@mui/material";
import HeroStack from "./components/home/HeroStack";

const HomePage = () => {
  return (
    <>
      <HeroStack />
      <Container maxWidth="lg">
        <div id="home-next"></div>
      </Container>
    </>
  );
};

export default HomePage;
