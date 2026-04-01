"use client";

import Link from "next/link";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import {
  clamp,
  hash01,
  roughFrameA,
  roughFrameB,
} from "@/app/helpers/productCard";
import { productCardStyles } from "./ProductCard.styles";

type ProductVariant = "paid" | "free" | "bestseller";

export type ProductCardProps = {
  id: string;
  href: string;
  title: string;
  priceLabel?: string;
  level?: string;
  variant?: ProductVariant;
  onPrimaryAction?: () => void;
  primaryLabel?: string;
};

const ProductCard = ({
  id,
  href,
  title,
  priceLabel,
  level,
  variant = "paid",
  onPrimaryAction,
  primaryLabel,
}: ProductCardProps) => {
  const t = hash01(id);
  const sign = t > 0.5 ? 1 : -1;

  const tiltDeg = clamp(0.7 + t * 0.9, 0.7, 1.6) * sign;
  const frame = t > 0.5 ? roughFrameA : roughFrameB;

  const badge =
    variant === "free" ? "FREE" : variant === "bestseller" ? "TOP" : undefined;

  const cta = primaryLabel ?? (variant === "free" ? "Pobierz" : "Do koszyka");
  const levelLabel = level?.trim().toUpperCase();

  const frameInset = 3;
  const safePadding = 45;

  return (
    <Box sx={productCardStyles.root(tiltDeg, frame, frameInset)}>
      <Box
        component={Link}
        href={href}
        aria-label={`Przejdz do produktu: ${title}`}
        sx={productCardStyles.cardLinkOverlay}
      />

      <Stack sx={productCardStyles.contentStack(safePadding)}>
        <Stack
          direction={productCardStyles.titleRow.direction}
          justifyContent={productCardStyles.titleRow.justifyContent}
          alignItems={productCardStyles.titleRow.alignItems}
          gap={productCardStyles.titleRow.gap}
        >
          <Typography variant="subtitle1" sx={productCardStyles.title}>
            {title}
          </Typography>

          {(badge || levelLabel) ? (
            <Stack direction="row" spacing={1} sx={productCardStyles.badgesRow}>
              {badge ? (
                <Chip label={badge} size="small" sx={productCardStyles.badgeChip(badge)} />
              ) : null}
              {levelLabel ? (
                <Chip label={levelLabel} size="small" sx={productCardStyles.levelChip} />
              ) : null}
            </Stack>
          ) : null}
        </Stack>
        <Stack
          direction={productCardStyles.footerRow.direction}
          justifyContent={productCardStyles.footerRow.justifyContent}
          alignItems={productCardStyles.footerRow.alignItems}
          gap={productCardStyles.footerRow.gap}
        >
          <Typography variant="subtitle2" sx={productCardStyles.price}>
            {variant === "free" ? "0 zl" : priceLabel ?? ""}
          </Typography>
          {onPrimaryAction ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={onPrimaryAction}
              sx={productCardStyles.ctaButton}
            >
              {cta}
            </Button>
          ) : (
            <Button
              component={Link}
              href={href}
              variant="contained"
              color="secondary"
              sx={productCardStyles.ctaButton}
            >
              {cta}
            </Button>
          )}
        </Stack>

      </Stack>
    </Box>
  );
};

export default ProductCard;

