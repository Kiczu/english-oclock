"use client";

import { useState, type MouseEvent } from "react";
import Image from "next/image";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import type { ShopProduct } from "@/app/types/commerce";
import ProductGalleryMainPreview from "./ProductGalleryMainPreview";
import { productGalleryStyles } from "./ProductGallery.styles";
import {
  DEFAULT_ZOOM_ORIGIN,
  FALLBACK_PREVIEW_SRC,
  canRenderImage,
  clampPercent,
  createMainFrame,
  createThumbFrame,
  resolveActiveItem,
  resolveThumbViewport,
  toSafeGalleryItems,
} from "./ProductGallery.helpers";

type ProductGalleryProps = {
  items: ShopProduct["gallery"];
  title: string;
};

const ProductGallery = ({ items, title }: ProductGalleryProps) => {
  const safeItems = toSafeGalleryItems(items);
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbPageIndex, setThumbPageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState(DEFAULT_ZOOM_ORIGIN);
  const [brokenSources, setBrokenSources] = useState<Set<string>>(
    new Set(),
  );

  const markImageAsBroken = (src?: string) => {
    if (!src) return;
    setBrokenSources((prev) => {
      if (prev.has(src)) return prev;
      const next = new Set(prev);
      next.add(src);
      return next;
    });
  };

  const { maxActiveIndex, activeResolvedIndex, active } = resolveActiveItem(
    safeItems,
    activeIndex,
  );
  const hasImage = canRenderImage(active.src, brokenSources);
  const {
    totalThumbPages,
    maxThumbPageIndex,
    activeThumbPageIndex,
    thumbStart,
    visibleThumbItems,
    canGoBack,
    canGoNext,
  } = resolveThumbViewport(safeItems, thumbPageIndex);
  const { frame, frameMask } = createMainFrame(title, active.src);

  const goToThumbPage = (nextPage: number) => {
    const safePage = Math.max(0, Math.min(maxThumbPageIndex, nextPage));
    setThumbPageIndex(safePage);
  };

  const resetZoom = () => {
    setIsZoomed(false);
    setZoomOrigin(DEFAULT_ZOOM_ORIGIN);
  };

  const goToImage = (nextIndex: number) => {
    const safeIndex = Math.max(0, Math.min(maxActiveIndex, nextIndex));
    resetZoom();
    setActiveIndex(safeIndex);
  };

  const toggleZoom = () => {
    if (!hasImage) return;
    setIsZoomed((prev) => !prev);
  };

  const handleMainImageMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;

    const x = clampPercent(((event.clientX - bounds.left) / bounds.width) * 100);
    const y = clampPercent(((event.clientY - bounds.top) / bounds.height) * 100);
    setZoomOrigin(`${x}% ${y}%`);
  };

  return (
    <Stack spacing={productGalleryStyles.rootStack.spacing}>
      <ProductGalleryMainPreview
        title={title}
        src={active.src}
        label={active.label}
        hasImage={hasImage}
        isZoomed={isZoomed}
        zoomOrigin={zoomOrigin}
        frame={frame}
        frameMask={frameMask}
        onToggleZoom={toggleZoom}
        onMouseMove={handleMainImageMouseMove}
        onMouseLeave={resetZoom}
        onImageError={() => markImageAsBroken(active.src)}
      />

      <Box sx={productGalleryStyles.thumbsViewport}>
        {totalThumbPages > 1 ? (
          <IconButton
            aria-label="Poprzednie podglądy"
            disabled={!canGoBack}
            onClick={() => goToThumbPage(activeThumbPageIndex - 1)}
            sx={productGalleryStyles.thumbsNavButton("left")}
          >
            <ChevronLeftRoundedIcon />
          </IconButton>
        ) : null}

        <Box sx={productGalleryStyles.thumbsGrid}>
          {visibleThumbItems.map((item, localIndex) => {
            const globalIndex = thumbStart + localIndex;
            const isActive = globalIndex === activeResolvedIndex;
            const thumbHasImage = canRenderImage(item.src, brokenSources);
            const thumbFrame = createThumbFrame(title, item, globalIndex, isActive);

            return (
              <Box
                key={`${item.src}-${globalIndex}`}
                component="button"
                type="button"
                onClick={() => goToImage(globalIndex)}
                aria-pressed={isActive}
                sx={productGalleryStyles.thumbButton(isActive, thumbFrame)}
              >
                <Box
                  sx={productGalleryStyles.thumbImage(thumbHasImage)}
                >
                  <Image
                    src={thumbHasImage ? item.src : FALLBACK_PREVIEW_SRC}
                    alt={item.label || title}
                    onError={() => markImageAsBroken(item.src)}
                    fill
                    sizes="(max-width: 900px) 30vw, 18vw"
                    style={productGalleryStyles.thumbImageElement(thumbHasImage)}
                  />
                </Box>
              </Box>
            );
          })}
        </Box>

        {totalThumbPages > 1 ? (
          <IconButton
            aria-label="Następne podglądy"
            disabled={!canGoNext}
            onClick={() => goToThumbPage(activeThumbPageIndex + 1)}
            sx={productGalleryStyles.thumbsNavButton("right")}
          >
            <ChevronRightRoundedIcon />
          </IconButton>
        ) : null}
      </Box>

      {totalThumbPages > 1 ? (
        <Stack spacing={0.5} sx={productGalleryStyles.thumbsMetaStack}>
          <Stack direction="row" spacing={1} sx={productGalleryStyles.thumbsDotsRow}>
            {Array.from({ length: totalThumbPages }).map((_, pageIndex) => (
              <Box
                key={`${title}-thumb-page-${pageIndex}`}
                sx={productGalleryStyles.thumbsDot(pageIndex === activeThumbPageIndex)}
              />
            ))}
          </Stack>
          <Typography sx={productGalleryStyles.thumbsCounter}>
            {activeThumbPageIndex + 1} / {totalThumbPages}
          </Typography>
        </Stack>
      ) : null}
    </Stack>
  );
};

export default ProductGallery;
