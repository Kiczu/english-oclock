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
  const frameSeed = hash01(`${title}-${active.src}`);
  const frame = frameSeed > 0.5 ? roughFrameA : roughFrameB;

  return (
    <Stack spacing={2}>
      <Box
        sx={{
          position: "relative",
          borderRadius: 2,
          p: { xs: 3, md: 4 },
          bgcolor: "#f5efe7",
          border: "1px solid rgba(55,67,115,0.16)",
          boxShadow: "0 20px 40px rgba(55,67,115,0.12)",
          minHeight: { xs: 260, md: 360 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          "&::before": {
            content: '""',
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,${frame}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            zIndex: 0,
          },
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

      <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
        {safeItems.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <Box
              key={`${item.src}-${idx}`}
              component="button"
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-pressed={isActive}
              sx={{
                cursor: "pointer",
                borderRadius: 3,
                border: isActive
                  ? "2px solid rgba(240,157,133,0.9)"
                  : "2px solid rgba(55,67,115,0.12)",
                bgcolor: "#f5efe7",
                width: 96,
                height: 88,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: isActive
                  ? "0 12px 24px rgba(240,157,133,0.24)"
                  : "0 8px 16px rgba(55,67,115,0.12)",
                transition: "transform 180ms ease, box-shadow 180ms ease",
                "&:hover": { transform: "translateY(-2px)" },
              }}
            >
              <Box
                component="img"
                src={item.src}
                alt={item.label || title}
                sx={{ width: 36, height: 36, opacity: 0.85 }}
              />
            </Box>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default ProductGallery;
