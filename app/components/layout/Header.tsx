"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Container,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import { keyframes } from "@mui/material/styles";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import BrandLogo from "../logo/BrandLogo";
import { colors } from "@/app/theme/colors";

const nav = [
  { href: "/sklep", label: "Sklep" },
  { href: "/#bestsellery", label: "Bestsellery" },
  { href: "/free", label: "Darmowe" },
  { href: "/kategorie", label: "Kategorie" },
  { href: "/kontakt", label: "Kontakt" },
];

const closeIconIn = keyframes`
  0% { transform: rotate(-80deg) scale(0.72); opacity: 0; }
  100% { transform: rotate(0deg) scale(1); opacity: 1; }
`;

const Header = ({ hidden }: { hidden?: boolean }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const toggleMobileMenu = () => setMobileOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileOpen(false);
  const openCartDrawer = () => {
    setMobileOpen(false);
    setCartOpen(true);
  };
  const closeCartDrawer = () => setCartOpen(false);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: colors.stickerBackground,
          color: "text.primary",
          transition: "transform 300ms ease, opacity 300ms ease",
          transform: hidden ? "translateY(-110%)" : "translateY(0)",
          opacity: hidden ? 0 : 1,
          pointerEvents: hidden ? "none" : "auto",
          boxShadow: "0px 5px 16px -12px #F09D85",
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
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1,
                ml: "auto",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              {nav.map((n) => (
                <Button
                  key={n.href}
                  component={Link}
                  href={n.href}
                  color="primary"
                  sx={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    px: 1.25,
                    minWidth: "auto",
                  }}
                >
                  {n.label}
                </Button>
              ))}
            </Box>

            <Box
              sx={{
                ml: { xs: "auto", md: 0 },
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <IconButton aria-label="Koszyk" onClick={openCartDrawer}>
                <ShoppingCartOutlinedIcon color="primary" />
              </IconButton>
              <IconButton
                aria-label="Otwórz menu"
                onClick={toggleMobileMenu}
                sx={{ display: { xs: "inline-flex", md: "none" } }}
              >
                <MenuRoundedIcon color="primary" />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={closeMobileMenu}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 280,
            bgcolor: colors.stickerBackground,
            p: 1,
          },
        }}
      >
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", px: 0.5, pt: 0.5 }}
        >
          <IconButton aria-label="Zamknij menu" onClick={closeMobileMenu}>
            <CloseRoundedIcon
              sx={{
                fontSize: 34,
                color: "primary.main",
                animation: mobileOpen
                  ? `${closeIconIn} 260ms ease-out`
                  : "none",
                transition: "transform 180ms ease",
                "&:hover": { transform: "rotate(90deg)" },
              }}
            />
          </IconButton>
        </Box>

        <List sx={{ mt: 1 }}>
          {nav.map((n) => (
            <ListItemButton
              key={n.href}
              component={Link}
              href={n.href}
              onClick={closeMobileMenu}
              sx={{ borderRadius: 2, my: 0.5 }}
            >
              <ListItemText
                primary={n.label}
                slotProps={{
                  primary: {
                    sx: {
                      color: "primary.main",
                      fontSize: "1.05rem",
                      fontWeight: 900,
                    },
                  },
                }}
              />
            </ListItemButton>
          ))}
          <Divider sx={{ my: 1.5 }} />
          <ListItemButton onClick={openCartDrawer} sx={{ borderRadius: 2 }}>
            <ListItemText
              primary="Koszyk"
              slotProps={{
                primary: {
                  sx: {
                    color: "primary.main",
                    fontSize: "1.05rem",
                    fontWeight: 900,
                  },
                },
              }}
            />
          </ListItemButton>
          <Divider sx={{ my: 1.5 }} />
          <ListItemButton
            component={Link}
            href="/"
            onClick={closeMobileMenu}
            sx={{ borderRadius: 2 }}
          >
            <ListItemText
              primary="Strona główna"
              slotProps={{
                primary: {
                  sx: {
                    color: "primary.main",
                    fontSize: "1.05rem",
                    fontWeight: 900,
                  },
                },
              }}
            />
          </ListItemButton>
        </List>
      </Drawer>

      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={closeCartDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "100%", sm: 380 },
            maxWidth: "100vw",
            bgcolor: colors.stickerBackground,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "primary.main", fontWeight: 900, letterSpacing: "0.03em" }}
          >
            Koszyk
          </Typography>
          <IconButton aria-label="Zamknij koszyk" onClick={closeCartDrawer}>
            <CloseRoundedIcon color="primary" />
          </IconButton>
        </Box>

        <Divider />

        <Box sx={{ p: 3, display: "grid", gap: 2 }}>
          <Typography sx={{ color: "primary.main", fontWeight: 700 }}>
            Twój koszyk jest pusty.
          </Typography>
          <Button
            component={Link}
            href="/sklep"
            variant="contained"
            onClick={closeCartDrawer}
            sx={{ alignSelf: "start", px: 2.5, py: 1 }}
          >
            Przejdź do sklepu
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;

