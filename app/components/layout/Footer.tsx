"use client";

import NextLink from "next/link";
import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";
import { useCookieConsent } from "@/app/context/CookieConsentContext";

const legalLinks = [
  { href: "/regulamin", label: "Regulamin" },
  { href: "/polityka-prywatnosci", label: "Polityka prywatności" },
  { href: "/#kontakt", label: "Kontakt" },
];

const footerLinkSx = {
  fontSize: "0.95rem",
  opacity: 0.9,
};

const Footer = () => {
  const { openSettings } = useCookieConsent();

  return (
    <Box sx={{ mt: 8, py: 6, bgcolor: "primary.main", color: "common.white" }}>
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2 }}
          sx={{ alignItems: { xs: "flex-start", sm: "center" } }}
        >
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            English o&apos;clock
          </Typography>

          {legalLinks.map((link) => (
            <Link
              key={link.href}
              component={NextLink}
              href={link.href}
              color="inherit"
              underline="hover"
              sx={footerLinkSx}
            >
              {link.label}
            </Link>
          ))}

          <Button
            variant="text"
            color="inherit"
            onClick={openSettings}
            sx={{ ...footerLinkSx, p: 0, minWidth: "auto", textTransform: "none" }}
          >
            Ustawienia cookies
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;

