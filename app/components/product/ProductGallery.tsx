"use client";

import * as React from "react";
import { Box, Stack, Typography } from "@mui/material";
import type { ShopProduct } from "@/app/types/commerce";
import { hash01, roughFrameA, roughFrameB } from "@/app/helpers/productCard";

type ProductGalleryProps = {
  items: ShopProduct["gallery"];
  title: string;
};

const ProductGallery = ({ items, title }: ProductGalleryProps) => {
  const safeItems = items.length
    ? items
    : [{ src: "/images/file.svg", label: "Podglad" }];
  const [activeIndex, setActiveIndex] = React.useState(0);
  const active = safeItems[activeIndex] ?? safeItems[0];

  return (
    <Stack spacing={2}>
      <Box
        sx={{
          position: "relative",
          borderRadius: 2,
          p: { xs: 3, md: 4 },
          bgcolor: "#f5efe7",
          boxShadow: "0 20px 40px rgba(55,67,115,0.12)",
          minHeight: { xs: 260, md: 360 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={active.src}
          alt={active.label || title}
          sx={{
            width: "70%",
            maxWidth: 320,
            height: "auto",
            opacity: 0.9,
            position: "relative",
            zIndex: 1,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            left: 18,
            bottom: 16,
            bgcolor: "rgba(245,239,231,0.95)",
            borderRadius: 999,
            px: 2,
            py: 0.5,
            fontWeight: 700,
            border: "1px dashed rgba(55,67,115,0.35)",
            zIndex: 1,
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 700 }}>
            {active.label}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: { xs: 1.5, sm: 2 },
        }}
      >
        {safeItems.map((item, idx) => {
          const isActive = idx === activeIndex;
          const thumbFrameSeed = hash01(`${title}-${item.src}-${idx}`);
          const thumbFrameBase = thumbFrameSeed > 0.5 ? roughFrameA : roughFrameB;
          const thumbFrame = thumbFrameBase.replace(
            'stroke-width="6"',
            `stroke-width="${isActive ? 14 : 12}"`,
          );
          return (
            <Box
              key={`${item.src}-${idx}`}
              component="button"
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-pressed={isActive}
              sx={{
                position: "relative",
                cursor: "pointer",
                borderRadius: 1,
                border: "none",
                p: 0,
                bgcolor: "#f5efe7",
                width: "100%",
                height: { xs: 136, sm: 152 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                boxShadow: isActive
                  ? "0 16px 30px rgba(240,157,133,0.32)"
                  : "0 10px 20px rgba(55,67,115,0.15)",
                transition: "transform 180ms ease, box-shadow 180ms ease",
                "&:hover": { transform: "translateY(-2px)" },
                "&::before": {
                  content: '""',
                  pointerEvents: "none",
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url("data:image/svg+xml,${thumbFrame}")`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                  opacity: isActive ? 1 : 0.86,
                  zIndex: 2,
                },
                "&::after": {
                  content: '""',
                  pointerEvents: "none",
                  position: "absolute",
                  inset: 1,
                  backgroundImage: `url("data:image/svg+xml,${thumbFrame}")`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                  opacity: isActive ? 0.94 : 0.7,
                  zIndex: 1,
                },
              }}
            >
              <Box
                component="img"
                src={item.src}
                alt={item.label || title}
                sx={{
                  width: { xs: 58, sm: 66 },
                  height: { xs: 58, sm: 66 },
                  opacity: 0.88,
                  position: "relative",
                  zIndex: 0,
                }}
              />
            </Box>
          );
        })}
      </Box>
    </Stack>
  );
};

export default ProductGallery;
