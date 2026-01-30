"use client";

import Link from "next/link";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import {
  clamp,
  hash01,
  roughFrameA,
  roughFrameB,
} from "@/app/helpers/productCard";

type ProductVariant = "paid" | "free" | "bestseller";

export type ProductCardProps = {
  id: string;
  href: string;
  title: string;
  priceLabel?: string;
  variant?: ProductVariant;
  onPrimaryAction?: () => void;
  primaryLabel?: string;
};

const ProductCard = ({
  id,
  href,
  title,
  priceLabel,
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

  const cta = primaryLabel ?? (variant === "free" ? "Pobierz" : "Kup teraz");

  const frameInset = 3;
  const safePadding = 45;

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 3,
        background: "#f5efe7",
        overflow: "hidden",
        boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
        transform: { xs: "none", md: `rotate(${tiltDeg}deg)` },
        transition: "transform 220ms ease, box-shadow 220ms ease",
        "&:hover": {
          transform: { xs: "none", md: "rotate(0deg) translateY(-6px)" },
          boxShadow: "0 16px 30px rgba(0,0,0,0.16)",
        },
        aspectRatio: "300 / 220",

        "&::before": {
          content: '""',
          pointerEvents: "none",
          position: "absolute",
          inset: frameInset,
          backgroundImage: `url("data:image/svg+xml,${frame}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          zIndex: 0,
        },
      }}
    >
      <Stack
        component={Link}
        href={href}
        sx={{
          textDecoration: "none",
          color: "inherit",
          position: "relative",
          zIndex: 1,
          height: "100%",
          p: `${safePadding}px`,
          justifyContent: "center",
          gap: 4,
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          gap={2}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: 18,
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: 0.2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </Typography>

          {badge ? (
            <Chip
              label={badge}
              size="small"
              sx={{
                fontWeight: 900,
                letterSpacing: 0.6,
                borderRadius: 2,
                height: 24,
                mt: 0.25,
                background:
                  badge === "FREE"
                    ? "rgba(60,150,140,0.16)"
                    : "rgba(240,160,80,0.18)",
              }}
            />
          ) : null}
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 900, fontSize: 20 }}
          >
            {variant === "free" ? "0 zł" : priceLabel ?? ""}
          </Typography>
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              onPrimaryAction?.();
            }}
            sx={{
              backgroundColor: "#F09D85",
              borderRadius: 999,
              textTransform: "none",
              fontWeight: 900,
              px: 2.4,
              boxShadow: "none",
              minWidth: 120,
            }}
          >
            {cta}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProductCard;
