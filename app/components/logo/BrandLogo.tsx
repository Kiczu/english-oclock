"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Box, ButtonBase, Typography } from "@mui/material";
import { raleway } from "@/app/lib/fonts";

type BrandLogoProps = {
  iconSize?: number;
  gap?: number;
  href?: string;
  titleSize?: number;
  subtitleSize?: number;
  disabled?: boolean;
};

const BrandLogo = ({
  iconSize = 66,
  href = "/",
  titleSize = 24,
  subtitleSize = 14,
  disabled = false,
}: BrandLogoProps) => {
  const router = useRouter();

  return (
    <ButtonBase
      disabled={disabled}
      onClick={() => router.push(href)}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        textAlign: "left",
        borderRadius: 1,
        "&:focus-visible": {
          outline: "2px solid",
          outlineColor: "rgba(55, 67, 135, 0.6)",
        },
      }}
      aria-label="Przejdź na stronę główną"
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ display: "inline-flex", flexShrink: 0 }}>
          <Image
            src="/images/menu/logo.png"
            alt="English o'clock"
            width={iconSize}
            height={iconSize}
            priority={false}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              fontFamily: "var(--font-brand-display)",
              fontSize: {
                xs: `${Math.round(titleSize * 0.8)}px`,
                sm: `${titleSize}px`,
              },
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: { xs: "0.04em", sm: "0.06em" },
              color: "#374387",
              mt: { xs: "6px", sm: "10px" },
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            ENGLISH O&apos;CLOCK
          </Typography>

          <Typography
            className={raleway.className}
            sx={{
              fontSize: {
                xs: `${Math.round(subtitleSize * 0.86)}px`,
                sm: `${subtitleSize}px`,
              },
              lineHeight: 1.1,
              letterSpacing: { xs: "0.2em", sm: "0.32em" },
              color: "#DE9A90",
              whiteSpace: "nowrap",
            }}
          >
            Wioleta Jedziniak
          </Typography>
        </Box>
      </Box>
    </ButtonBase>
  );
};

export default BrandLogo;
