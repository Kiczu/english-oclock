"use client";

import { useState } from "react";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import {
  Box,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ProductCard from "../../product/ProductCard";
import type { ShopProduct } from "@/app/types/commerce";
import { getVariant } from "@/app/helpers/productCard";
import { productsSectionStyles } from "./ProductsSection.styles";

type ProductsSectionProps = {
  id?: string;
  title: string;
  subtitle?: string;
  products: ShopProduct[];
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
  limit?: number;
  cardMaxWidth?: number;
  useSlider?: boolean;
  onPrimaryAction?: (product: ShopProduct) => void;
};

const toSlides = (items: ShopProduct[], perSlide: number) => {
  const slides: ShopProduct[][] = [];
  for (let index = 0; index < items.length; index += perSlide) {
    slides.push(items.slice(index, index + perSlide));
  }
  return slides;
};

const getSlideColumns = (cardsPerSlide: number) => {
  if (cardsPerSlide === 1) return { xs: 12, sm: 12, md: 12, lg: 12 };
  if (cardsPerSlide === 2) return { xs: 12, sm: 6, md: 6, lg: 6 };
  return { xs: 12, sm: 6, md: 4, lg: 4 };
};

const ProductsSection = ({
  id,
  title,
  subtitle,
  products,
  columns = { xs: 12, sm: 6, md: 4 },
  limit,
  cardMaxWidth,
  useSlider = false,
  onPrimaryAction,
}: ProductsSectionProps) => {
  const list = typeof limit === "number" ? products.slice(0, limit) : products;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), { noSsr: true });
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"), { noSsr: true });
  const cardsPerSlide = useSlider ? (isMobile ? 1 : isTablet ? 2 : 3) : Math.max(1, list.length);
  const slides = useSlider ? toSlides(list, cardsPerSlide) : [list];

  const [slideIndex, setSlideIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");
  const [hasSlideInteraction, setHasSlideInteraction] = useState(false);
  const maxSlideIndex = Math.max(0, slides.length - 1);
  const activeSlideIndex = Math.min(slideIndex, maxSlideIndex);

  const goToSlide = (nextIndex: number) => {
    const safeIndex = Math.max(0, Math.min(maxSlideIndex, nextIndex));
    if (safeIndex === activeSlideIndex) return;
    setSlideDirection(safeIndex > activeSlideIndex ? "next" : "prev");
    setHasSlideInteraction(true);
    setSlideIndex(safeIndex);
  };

  const visibleProducts = slides[activeSlideIndex] ?? [];
  const canGoBack = activeSlideIndex > 0;
  const canGoNext = activeSlideIndex < maxSlideIndex;

  const slideColumns = getSlideColumns(cardsPerSlide);

  const activeColumns = useSlider ? slideColumns : columns;

  return (
    <Box component="section" id={id} sx={productsSectionStyles.section}>
      <Stack spacing={1.5} sx={productsSectionStyles.headingStack}>
        <Typography variant="h3" sx={productsSectionStyles.title}>
          {title}
        </Typography>
        {subtitle ? <Typography sx={productsSectionStyles.subtitle}>{subtitle}</Typography> : null}
      </Stack>

      <Box sx={productsSectionStyles.sliderViewport}>
        {useSlider && slides.length > 1 ? (
          <IconButton
            aria-label="Poprzedni slajd"
            disabled={!canGoBack}
            onClick={() => goToSlide(activeSlideIndex - 1)}
            sx={productsSectionStyles.sliderNavButton("left")}
          >
            <ChevronLeftRoundedIcon />
          </IconButton>
        ) : null}

        <Grid container spacing={3}>
          {visibleProducts.map((product, order) => (
            <Grid
              key={`${product.id}-${activeSlideIndex}`}
              size={{
                xs: activeColumns.xs ?? 12,
                sm: activeColumns.sm ?? 6,
                md: activeColumns.md ?? 4,
                lg: activeColumns.lg,
              }}
            >
              <Box
                sx={[
                  productsSectionStyles.cardWrap(cardMaxWidth),
                  productsSectionStyles.sliderCardMotion(
                    slideDirection,
                    hasSlideInteraction && useSlider && slides.length > 1,
                    order,
                    (order + activeSlideIndex) % 2 === 0 ? "left" : "right",
                  ),
                ]}
              >
                <ProductCard
                  id={product.id}
                  href={`/sklep/${product.slug}`}
                  title={product.title}
                  priceLabel={product.priceLabel}
                  variant={getVariant(product)}
                  onPrimaryAction={() => onPrimaryAction?.(product)}
                />
              </Box>
            </Grid>
          ))}
        </Grid>

        {useSlider && slides.length > 1 ? (
          <IconButton
            aria-label="Nastepny slajd"
            disabled={!canGoNext}
            onClick={() => goToSlide(activeSlideIndex + 1)}
            sx={productsSectionStyles.sliderNavButton("right")}
          >
            <ChevronRightRoundedIcon />
          </IconButton>
        ) : null}
      </Box>

      {useSlider && slides.length > 1 ? (
        <Stack spacing={0.5} sx={productsSectionStyles.sliderMetaStack}>
          <Stack direction="row" spacing={1} sx={productsSectionStyles.sliderDotsRow}>
            {slides.map((_, index) => (
              <Box
                key={`${title}-dot-${index}`}
                sx={productsSectionStyles.sliderDot(index === activeSlideIndex)}
              />
            ))}
          </Stack>
          <Typography sx={productsSectionStyles.sliderCounter}>
            {activeSlideIndex + 1} / {slides.length}
          </Typography>
        </Stack>
      ) : null}
    </Box>
  );
};

export default ProductsSection;
