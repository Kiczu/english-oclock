"use client";

import * as React from "react";
import { Box, Stack } from "@mui/material";
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

  React.useEffect(() => {
    setActiveIndex((prev) => Math.min(prev, safeItems.length - 1));
  }, [safeItems.length]);

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
  const hasImage = canRenderImage(active.src, brokenSources);

  const frameSeed = hash01(`${title}-${active.src}`);
  const frameBase = frameSeed > 0.5 ? roughFrameA : roughFrameB;
  const frame = frameBase
    .replace(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 220">',
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 220" preserveAspectRatio="none">',
    )
    .replace('stroke-width="6"', 'stroke-width="12"');

  return (
    <Stack spacing={2}>
      <Box
        sx={{
          position: "relative",
          borderRadius: 2,
          p: 0,
          bgcolor: "#f5efe7",
          width: "100%",
          aspectRatio: { xs: "4 / 3", md: "16 / 10" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          boxShadow: "0 16px 30px rgba(55,67,115,0.15)",
          "&::before": {
            content: '""',
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,${frame}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            opacity: 1,
            zIndex: 2,
          },
        }}
      >
        <Box
          component="img"
          src={hasImage ? active.src : FALLBACK_PREVIEW_SRC}
          alt={active.label || title}
          onError={() => markImageAsBroken(active.src)}
          sx={{
            width: hasImage
              ? { xs: "90%", sm: "70%", md: "60%" }
              : { xs: 140, md: 180 },
            height: hasImage ? "94%" : { xs: 140, md: 180 },
            objectFit: "contain",
            opacity: hasImage ? 0.98 : 0.85,
            position: "relative",
            zIndex: 0,
          }}
        />
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
          const thumbFrame = thumbFrameBase
            .replace(
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 220">',
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 220" preserveAspectRatio="none">',
            )
            .replace('stroke-width="6"', `stroke-width="${isActive ? 14 : 12}"`);

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
                  opacity: isActive ? 1 : 0.9,
                  zIndex: 2,
                },
              }}
            >
              <Box
                component="img"
                src={thumbHasImage ? item.src : FALLBACK_PREVIEW_SRC}
                alt={item.label || title}
                onError={() => markImageAsBroken(item.src)}
                sx={{
                  width: thumbHasImage ? "78%" : { xs: 58, sm: 66 },
                  height: thumbHasImage ? "90%" : { xs: 58, sm: 66 },
                  objectFit: "contain",
                  opacity: thumbHasImage ? 0.98 : 0.85,
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
