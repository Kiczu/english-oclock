import NextLink from "next/link";
import { Box, Container, Link, Stack, Typography } from "@mui/material";

const legalLinks = [
  { href: "/regulamin", label: "Regulamin" },
  { href: "/polityka-prywatnosci", label: "Polityka prywatności" },
  { href: "/#kontakt", label: "Kontakt" },
];

const Footer = () => {
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
              sx={{ fontSize: "0.95rem", opacity: 0.9 }}
            >
              {link.label}
            </Link>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
