"use client";

import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Container,
  IconButton,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import BrandLogo from "../logo/BrandLogo";

const nav = [
  { href: "/sklep", label: "Sklep" },
  { href: "/#bestsellery", label: "Bestsellery" },
  { href: "/free", label: "Darmowe" },
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
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1, gap: 2 }}>
          <Box
            component={Link}
            href="/"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              textDecoration: "none",
              height: 60,
            }}
          >
            <BrandLogo />
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
          <IconButton aria-label="Koszyk">
            <ShoppingCartOutlinedIcon color="primary" />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
