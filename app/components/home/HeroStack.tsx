"use client";

import * as React from "react";
import Image from "next/image";
import { Box, Typography, useMediaQuery } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { keyframes } from "@mui/material/styles";
import { heroAssets, heroLayout } from "./heroPositions";
import Wave from "./Wave";

const busRightToLeft = keyframes`
  0%   { transform: translate3d(160vw, 0, 0); opacity: 1; }
  70%  { transform: translate3d(-14px, 0, 0); opacity: 1; }
  100% { transform: translate3d(0, 0, 0); opacity: 1; }
`;

const guardLeftToRight = keyframes`
  0%   { transform: translate3d(-160vw, 0, 0); opacity: 1; }
  70%  { transform: translate3d(14px, 0, 0); opacity: 1; }
  100% { transform: translate3d(0, 0, 0); opacity: 1; }
`;

const slideInLeft = keyframes`
  0%   { opacity: 0; transform: translate3d(-60px, 0, 0) rotate(-2deg) scale(.98); }
  100% { opacity: 1; transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
`;

const wobble = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25%      { transform: rotate(1.2deg); }
  75%      { transform: rotate(-1.2deg); }
`;

const bounce = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0); }
  50%      { transform: translate3d(0, -10px, 0); }
`;

const crownDrop = keyframes`
  0%   { opacity: 0; transform: translate3d(0, -180px, 0) rotate(-8deg) scale(.98); }
  75%  { opacity: 1; transform: translate3d(0, 8px, 0) rotate(2deg) scale(1); }
  100% { opacity: 1; transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
`;

const doodleIn = keyframes`
  0%   { opacity: 0; transform: translate3d(-40px, -15px, 0) rotate(-6deg) scale(.92); }
  100% { opacity: 1; transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
`;

const HeroStack = () => {
  const [play, setPlay] = React.useState(false);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  React.useEffect(() => setPlay(true), []);

  const scrollToNext = () => {
    document
      .getElementById("home-next")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const { circles, movers, decor } = heroLayout;

  const canAnimate = play && !reducedMotion;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        overflow: "hidden",
        bgcolor: "rgba(245, 237, 233, 0.6)",
      }}
    >
      {/* CIRCLES */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        {circles.map((c, idx) => (
          <Box
            key={idx}
            sx={{
              position: "absolute",
              width: c.size,
              height: c.size,
              borderRadius: "50%",
              bgcolor: c.color,
              opacity: c.opacity ?? 1,
              top: c.center ? "50%" : c.top,
              left: c.center ? "50%" : c.left,
              right: c.right,
              transform: c.center ? "translate(-50%, -55%)" : "none",
            }}
          />
        ))}
      </Box>

      {/* DECOR: FLAG */}
      <Box
        sx={{
          position: "absolute",
          ...decor.flag,
          pointerEvents: "none",
          ...(canAnimate
            ? {
                opacity: 1,
                animation: `${slideInLeft} 900ms cubic-bezier(.2,.9,.2,1) 80ms both, ${wobble} 4.2s ease-in-out 1100ms infinite`,
                transformOrigin: "20% 20%",
              }
            : { opacity: 1 }),
        }}
      >
        <Image
          src={heroAssets.flag}
          alt="Flaga"
          width={1200}
          height={800}
          priority
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
      {/* DECOR: ARROW */}
      <Box
        sx={{
          position: "absolute",
          ...decor.arrowDecor,
          pointerEvents: "none",
        }}
      >
        <Image
          src={heroAssets.arrowDecor}
          alt="Dekoracyjna strzałka"
          width={600}
          height={400}
          priority
          style={{ width: "100%", height: "auto" }}
        />
      </Box>

      {/* DECOR: BIG BEN */}
      <Box
        sx={{
          position: "absolute",
          ...decor.ben,
          pointerEvents: "none",
        }}
      >
        <Image
          src={heroAssets.ben}
          alt="Big Ben"
          width={900}
          height={1400}
          priority
          style={{ width: "100%", height: "auto" }}
        />
      </Box>

      {/* DECOR: CROWN */}
      <Box
        sx={{
          position: "absolute",
          ...decor.crown,
          pointerEvents: "none",
          transformOrigin: "50% 80%",

          ...(canAnimate
            ? {
                opacity: 0,
                transform: "translate3d(0, -180px, 0) rotate(-8deg) scale(.98)",
                animation: `${crownDrop} 900ms cubic-bezier(.2,.9,.2,1) 1700ms both`,
              }
            : { opacity: 1 }),
        }}
      >
        <Image
          src={heroAssets.crown}
          alt="Korona"
          width={420}
          height={320}
          priority
          style={{ width: "100%", height: "auto" }}
        />
      </Box>

      {/* WAVE */}
      <Wave />

      {/* CENTER TEXT + ARROW PNG */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          p: 2,
          gap: 2.5,
          pointerEvents: "none",
        }}
      >
        <Typography
          sx={{
            fontWeight: 900,
            color: "#374373",
            fontSize: { xs: 34, md: 56 },
            letterSpacing: 0.4,
            textShadow: "0 2px 12px rgba(255,255,255,0.75)",
            lineHeight: 1.05,
          }}
        >
          It&apos;s English
          <br />
          o&apos;clock
        </Typography>

        <Box
          role="button"
          aria-label="Przewiń w dół"
          onClick={scrollToNext}
          sx={{
            pointerEvents: "auto",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 72,
            height: 72,
            bgcolor: "transparent",
            border: "none",
            boxShadow: "none",
            animation: `${bounce} 1.4s ease-in-out infinite`,
            "&:hover": { transform: "translateY(-2px)" },

            "@media (prefers-reduced-motion: reduce)": {
              animation: "none",
            },
          }}
        >
          <KeyboardArrowDownRoundedIcon
            sx={{
              fontSize: 64,
              color: "#374373",
              filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.12))",
            }}
          />
        </Box>
      </Box>

      {/* BUS */}
      <Box
        sx={{
          position: "absolute",
          ...movers.bus,
          willChange: "transform",
          ...(canAnimate
            ? {
                opacity: 1,
                animation: `${busRightToLeft} 1400ms cubic-bezier(.2,.9,.2,1) 150ms both`,
              }
            : { opacity: 1 }),
        }}
      >
        <Image
          src={heroAssets.bus}
          alt="Bus"
          width={900}
          height={600}
          priority
          style={{ width: "100%", height: "auto" }}
        />
      </Box>

      {/* GUARD */}
      <Box
        sx={{
          position: "absolute",
          ...movers.guard,
          willChange: "transform",
          ...(canAnimate
            ? {
                opacity: 1,
                animation: `${guardLeftToRight} 1400ms cubic-bezier(.2,.9,.2,1) 150ms both`,
              }
            : { opacity: 1 }),
        }}
      >
        <Image
          src={heroAssets.guard}
          alt="Guard"
          width={420}
          height={720}
          priority
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
    </Box>
  );
};

export default HeroStack;
