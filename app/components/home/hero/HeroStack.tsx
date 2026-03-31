"use client";

import Image from "next/image";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { heroAssets, heroLayout, type PositionedBox } from "./heroPositions";
import { heroStackStyles } from "./HeroStack.styles";
import Wave from "./Wave";

type HeroLayerConfig = {
  key: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  position: PositionedBox;
  variant: "static" | "flag" | "crown" | "bus" | "guard";
};

const buildLayerSx = (
  variant: HeroLayerConfig["variant"],
  position: PositionedBox,
  canAnimate: boolean,
) => {
  switch (variant) {
    case "flag":
      return heroStackStyles.flagLayer(position, canAnimate);
    case "crown":
      return heroStackStyles.crownLayer(position, canAnimate);
    case "bus":
      return heroStackStyles.busLayer(position, canAnimate);
    case "guard":
      return heroStackStyles.guardLayer(position, canAnimate);
    default:
      return heroStackStyles.staticLayer(position);
  }
};

const HeroStack = () => {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const scrollToNext = () => {
    document
      .getElementById("home-next")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const { circles, movers, decor } = heroLayout;
  const canAnimate = !reducedMotion;

  const layers: HeroLayerConfig[] = [
    {
      key: "flag",
      src: heroAssets.flag,
      alt: "Flaga",
      width: 1200,
      height: 800,
      position: decor.flag,
      variant: "flag",
    },
    {
      key: "arrow",
      src: heroAssets.arrowDecor,
      alt: "Dekoracyjna strzałka",
      width: 600,
      height: 400,
      position: decor.arrowDecor,
      variant: "static",
    },
    {
      key: "ben",
      src: heroAssets.ben,
      alt: "Big Ben",
      width: 900,
      height: 1400,
      position: decor.ben,
      variant: "static",
    },
    {
      key: "crown",
      src: heroAssets.crown,
      alt: "Korona",
      width: 420,
      height: 320,
      position: decor.crown,
      variant: "crown",
    },
    {
      key: "bus",
      src: heroAssets.bus,
      alt: "Bus",
      width: 900,
      height: 600,
      position: movers.bus,
      variant: "bus",
    },
    {
      key: "guard",
      src: heroAssets.guard,
      alt: "Guard",
      width: 420,
      height: 720,
      position: movers.guard,
      variant: "guard",
    },
  ];

  return (
    <Box sx={heroStackStyles.root}>
      <Box sx={heroStackStyles.circlesLayer}>
        {circles.map((circle) => (
          <Box key={`${circle.color}-${JSON.stringify(circle.size)}`} sx={heroStackStyles.circle(circle)} />
        ))}
      </Box>

      {layers.map((layer) => (
        <Box
          key={layer.key}
          sx={buildLayerSx(layer.variant, layer.position, canAnimate)}
        >
          <Image
            src={layer.src}
            alt={layer.alt}
            width={layer.width}
            height={layer.height}
            priority
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
      ))}

      <Wave />

      <Box sx={heroStackStyles.centerContent}>
        <Typography sx={heroStackStyles.title}>
          It&apos;s English
          <br />
          o&apos;clock
        </Typography>

        <Box
          role="button"
          aria-label="Przewiń w dół"
          onClick={scrollToNext}
          sx={heroStackStyles.scrollButton}
        >
          <KeyboardArrowDownOutlinedIcon sx={heroStackStyles.scrollIcon} />
        </Box>
      </Box>
    </Box>
  );
};

export default HeroStack;
