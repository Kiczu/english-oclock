"use client";

import * as React from "react";
import Image from "next/image";
import { Box, IconButton, Typography } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { keyframes } from "@mui/material/styles";
import { heroAssets, heroLayout } from "./heroPositions";
import Wave from "./Wave";

const busRightToLeft = keyframes`
  0%   { transform: translate3d(160vw, 0, 0); opacity: 1; }
  70%  { transform: translate3d(-10px, 0, 0); opacity: 1; }
  100% { transform: translate3d(0, 0, 0); opacity: 1; }
`;

const guardLeftToRight = keyframes`
  0%   { transform: translate3d(-160vw, 0, 0); opacity: 1; }
  70%  { transform: translate3d(10px, 0, 0); opacity: 1; }
  100% { transform: translate3d(0, 0, 0); opacity: 1; }
`;

const bounce = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0); }
  50%      { transform: translate3d(0, -10px, 0); }
`;

const HeroStack = () => {
  const [play, setPlay] = React.useState(false);

  React.useEffect(() => setPlay(true), []);

  const scrollToNext = () => {
    document
      .getElementById("home-next")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const { circles, movers } = heroLayout;

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
      {/* WHEELS */}
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

      {/* Wave */}
      <Wave />

      {/* TEXT CENTER */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          p: 2,
          gap: 3,
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

        {/* ARROW */}
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
          zIndex: 4,
          ...movers.bus,
          willChange: "transform",
          opacity: 0,
          ...(play && {
            opacity: 1,
            animation: `${busRightToLeft} 1400ms cubic-bezier(.2,.9,.2,1) forwards`,
            animationDelay: "150ms",
          }),
        }}
      >
        <Image
          src={heroAssets.bus}
          alt="Bus"
          width={900}
          height={600}
          style={{ width: "100%", height: "auto" }}
        />
      </Box>

      {/* GUARD */}
      <Box
        sx={{
          position: "absolute",
          zIndex: 4,
          ...movers.guard,
          willChange: "transform",
          opacity: 0,
          ...(play && {
            opacity: 1,
            animation: `${guardLeftToRight} 1400ms cubic-bezier(.2,.9,.2,1) forwards`,
            animationDelay: "150ms",
          }),
        }}
      >
        <Image
          src={heroAssets.guard}
          alt="Guard"
          width={420}
          height={720}
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
    </Box>
  );
};

export default HeroStack;
