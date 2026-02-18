"use client";

import * as React from "react";
import { Box, Stack, Typography } from "@mui/material";
import type { ShopProduct } from "@/app/types/commerce";
import { hash01, roughFrameA, roughFrameB } from "@/app/helpers/productCard";

const FALLBACK_PREVIEW_SRC = "/images/file.svg";

const canRenderImage = (src?: string, brokenSources?: Set<string>) =>
  Boolean(src && src !== FALLBACK_PREVIEW_SRC && !brokenSources?.has(src));

type ProductGalleryProps = {
  items: ShopProduct["gallery"];
  title: string;
};

const ProductGallery = ({ items, title }: ProductGalleryProps) => {
  const safeItems = items.length
    ? items
    : [{ src: FALLBACK_PREVIEW_SRC, label: "Podglad" }];
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [brokenSources, setBrokenSources] = React.useState<Set<string>>(
    new Set(),
  );

  const markImageAsBroken = React.useCallback((src?: string) => {
    if (!src) return;
    setBrokenSources((prev) => {
      if (prev.has(src)) return prev;
      const next = new Set(prev);
      next.add(src);
      return next;
    });
  }, []);

  const active = safeItems[activeIndex] ?? safeItems[0];
  const activeHasImage = canRenderImage(active.src, brokenSources);

  return (
    <Stack spacing={2}>
      <Box
        sx={{
          position: "relative",
          borderRadius: 2,
          p: activeHasImage ? 0 : { xs: 3, md: 4 },
          bgcolor: activeHasImage ? "transparent" : "#f5efe7",
          boxShadow: "0 20px 40px rgba(55,67,115,0.12)",
          minHeight: { xs: 260, md: 360 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {activeHasImage ? (
          <Box
            component="img"
            src={active.src}
            alt={active.label || title}
            onError={() => markImageAsBroken(active.src)}
            sx={{
              width: "100%",
              height: "100%",
              minHeight: { xs: 260, md: 360 },
              objectFit: "contain",
              display: "block",
              position: "relative",
              zIndex: 1,
            }}
          />
        ) : (
          <Box
            component="img"
            src={FALLBACK_PREVIEW_SRC}
            alt={active.label || title}
            sx={{
              width: "50%",
              maxWidth: 260,
              height: "auto",
              opacity: 0.75,
              position: "relative",
              zIndex: 1,
            }}
          />
        )}

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
          const thumbHasImage = canRenderImage(item.src, brokenSources);
          const thumbFrameSeed = hash01(`${title}-${item.src}-${idx}`);
          const thumbFrameBase =
            thumbFrameSeed > 0.5 ? roughFrameA : roughFrameB;
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
                src={thumbHasImage ? item.src : FALLBACK_PREVIEW_SRC}
                alt={item.label || title}
                onError={() => markImageAsBroken(item.src)}
                sx={{
                  width: thumbHasImage ? "70%" : { xs: 58, sm: 66 },
                  height: thumbHasImage ? "85%" : { xs: 58, sm: 66 },
                  objectFit: "contain",
                  opacity: thumbHasImage ? 0.96 : 0.85,
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
