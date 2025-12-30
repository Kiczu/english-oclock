"use client";

import Link from "next/link";
import { AppBar, Toolbar, Box, Button, Container } from "@mui/material";

const nav = [
  { href: "/sklep", label: "Sklep" },
  { href: "/#bestsellery", label: "Bestsellery" },
  { href: "/darmowe", label: "Darmowe" },
  { href: "/kategorie", label: "Kategorie" },
  { href: "/kontakt", label: "Kontakt" },
];

const Header = ({ hidden }: { hidden?: boolean }) => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        transition: "transform 300ms ease, opacity 300ms ease",
        transform: hidden ? "translateY(-110%)" : "translateY(0)",
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 1, gap: 2 }}>
          <Box
            component={Link}
            href="/"
            sx={{
              fontWeight: 900,
              color: "primary.main",
              textDecoration: "none",
            }}
          >
            English o&apos;clock
          </Box>

          <Box
            sx={{ display: "flex", gap: 1, flex: 1, justifyContent: "center" }}
          >
            {nav.map((n) => (
              <Button
                key={n.href}
                component={Link}
                href={n.href}
                color="primary"
              >
                {n.label}
              </Button>
            ))}
          </Box>

          <Button variant="contained" color="primary">
            Koszyk
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
