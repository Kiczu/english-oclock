"use client";

import * as React from "react";
import { Box, Stack } from "@mui/material";
import type { ShopProduct } from "@/app/types/commerce";
import { hash01, roughFrameA, roughFrameB } from "@/app/helpers/productCard";
import { productGalleryStyles } from "./ProductGallery.styles";

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
    <Stack spacing={productGalleryStyles.rootStack.spacing}>
      <Box sx={productGalleryStyles.mainFrame(frame)}>
        <Box
          component="img"
          src={hasImage ? active.src : FALLBACK_PREVIEW_SRC}
          alt={active.label || title}
          onError={() => markImageAsBroken(active.src)}
          sx={productGalleryStyles.mainImage(hasImage)}
        />
      </Box>

      <Box sx={productGalleryStyles.thumbsGrid}>
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
              sx={productGalleryStyles.thumbButton(isActive, thumbFrame)}
            >
              <Box
                component="img"
                src={thumbHasImage ? item.src : FALLBACK_PREVIEW_SRC}
                alt={item.label || title}
                onError={() => markImageAsBroken(item.src)}
                sx={productGalleryStyles.thumbImage(thumbHasImage)}
              />
            </Box>
          );
        })}
      </Box>
    </Stack>
  );
};

export default ProductGallery;
