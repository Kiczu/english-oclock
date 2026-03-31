"use client";

import type { KeyboardEvent, MouseEvent } from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import { productGalleryStyles } from "./ProductGallery.styles";
import { FALLBACK_PREVIEW_SRC } from "./ProductGallery.helpers";

type ProductGalleryMainPreviewProps = {
  title: string;
  label?: string;
  src?: string;
  hasImage: boolean;
  isZoomed: boolean;
  zoomOrigin: string;
  frame: string;
  frameMask: string;
  onToggleZoom: () => void;
  onMouseMove: (event: MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
  onImageError: () => void;
};

const ProductGalleryMainPreview = ({
  title,
  label,
  src,
  hasImage,
  isZoomed,
  zoomOrigin,
  frame,
  frameMask,
  onToggleZoom,
  onMouseMove,
  onMouseLeave,
  onImageError,
}: ProductGalleryMainPreviewProps) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onToggleZoom();
  };

  const interactionAriaLabel = hasImage
    ? isZoomed
      ? "Pomniejsz podgląd produktu"
      : "Przybliż podgląd produktu"
    : undefined;

  return (
    <Box sx={productGalleryStyles.mainFrame(frame)}>
      <Box sx={productGalleryStyles.mainImageClip(frameMask)}>
        <Box
          role={hasImage ? "button" : undefined}
          tabIndex={hasImage ? 0 : undefined}
          aria-label={interactionAriaLabel}
          onClick={hasImage ? onToggleZoom : undefined}
          onMouseMove={hasImage ? onMouseMove : undefined}
          onMouseLeave={isZoomed ? onMouseLeave : undefined}
          onKeyDown={hasImage ? handleKeyDown : undefined}
          sx={productGalleryStyles.mainImage(hasImage, isZoomed)}
        >
          <Image
            src={hasImage && src ? src : FALLBACK_PREVIEW_SRC}
            alt={label || title}
            onError={onImageError}
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
  );
};

export default ProductGalleryMainPreview;
