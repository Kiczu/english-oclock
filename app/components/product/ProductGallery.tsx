"use client";

import { useState, type MouseEvent } from "react";
import Image from "next/image";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import type { ShopProduct } from "@/app/types/commerce";
import { hash01, roughFrameA, roughFrameB } from "@/app/helpers/productCard";
import { productGalleryStyles } from "./ProductGallery.styles";

const FALLBACK_PREVIEW_SRC = "/images/file.svg";
const DEFAULT_ZOOM_ORIGIN = "50% 50%";

const canRenderImage = (src?: string, brokenSources?: Set<string>) =>
  Boolean(src && src !== FALLBACK_PREVIEW_SRC && !brokenSources?.has(src));

const clampPercent = (value: number) => Math.max(0, Math.min(100, value));

const toFrameMask = (encodedFrame: string) => {
  const rawSvg = decodeURIComponent(encodedFrame);
  const filledShapeSvg = rawSvg
    .replace(/fill="none"/g, 'fill="white"')
    .replace(/stroke="#[^"]+"/g, 'stroke="none"')
    .replace(/stroke-width="[^"]+"/g, "")
    .replace(/stroke-linecap="[^"]+"/g, "")
    .replace(/stroke-linejoin="[^"]+"/g, "");

  return encodeURIComponent(filledShapeSvg);
};

type ProductGalleryProps = {
  items: ShopProduct["gallery"];
  title: string;
};

const ProductGallery = ({ items, title }: ProductGalleryProps) => {
  const safeItems = items.length
    ? items
    : [{ src: FALLBACK_PREVIEW_SRC, label: "Podglad" }];
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

  const maxActiveIndex = Math.max(0, safeItems.length - 1);
  const activeResolvedIndex = Math.min(activeIndex, maxActiveIndex);
  const active = safeItems[activeResolvedIndex] ?? safeItems[0];
  const hasImage = canRenderImage(active.src, brokenSources);
  const thumbsPerPage = 3;
  const totalThumbPages = Math.max(1, Math.ceil(safeItems.length / thumbsPerPage));
  const maxThumbPageIndex = totalThumbPages - 1;
  const activeThumbPageIndex = Math.min(thumbPageIndex, maxThumbPageIndex);
  const thumbStart = activeThumbPageIndex * thumbsPerPage;
  const visibleThumbItems = safeItems.slice(thumbStart, thumbStart + thumbsPerPage);
  const canGoBack = activeThumbPageIndex > 0;
  const canGoNext = activeThumbPageIndex < maxThumbPageIndex;

  const frameSeed = hash01(`${title}-${active.src}`);
  const frameBase = frameSeed > 0.5 ? roughFrameA : roughFrameB;
  const frame = frameBase
    .replace(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 220">',
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 220" preserveAspectRatio="none">',
    )
    .replace('stroke-width="6"', 'stroke-width="12"');
  const frameMask = toFrameMask(frameBase);

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
      <Box sx={productGalleryStyles.mainFrame(frame)}>
        <Box sx={productGalleryStyles.mainImageClip(frameMask)}>
          <Box
            role={hasImage ? "button" : undefined}
            tabIndex={hasImage ? 0 : undefined}
            aria-label={
              hasImage
                ? isZoomed
                  ? "Pomniejsz podglad produktu"
                  : "Przybliz podglad produktu"
                : undefined
            }
            onClick={hasImage ? toggleZoom : undefined}
            onMouseMove={hasImage ? handleMainImageMouseMove : undefined}
            onMouseLeave={isZoomed ? resetZoom : undefined}
            onKeyDown={
              hasImage
                ? (event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      toggleZoom();
                    }
                  }
                : undefined
            }
            sx={productGalleryStyles.mainImage(hasImage, isZoomed)}
          >
            <Image
              src={hasImage ? active.src : FALLBACK_PREVIEW_SRC}
              alt={active.label || title}
              onError={() => markImageAsBroken(active.src)}
              fill
              sizes="(max-width: 900px) 90vw, 52vw"
              style={productGalleryStyles.mainImageElement(
                hasImage,
                isZoomed,
                zoomOrigin,
              )}
            />
          </Box>
        </Box>
      </Box>

      <Box sx={productGalleryStyles.thumbsViewport}>
        {totalThumbPages > 1 ? (
          <IconButton
            aria-label="Poprzednie podglady"
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
            const thumbFrameSeed = hash01(`${title}-${item.src}-${globalIndex}`);
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
            aria-label="Nastepne podglady"
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
