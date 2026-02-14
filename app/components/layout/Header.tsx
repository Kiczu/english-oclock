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
  Badge,
  Stack,
} from "@mui/material";
import { keyframes } from "@mui/material/styles";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import BrandLogo from "../logo/BrandLogo";
import { colors } from "@/app/theme/colors";
import { useCart } from "@/app/context/CartContext";

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
  const {
    items,
    totalItems,
    totalAmount,
    isCartOpen,
    openCart,
    closeCart,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
  } = useCart();

  const toggleMobileMenu = () => setMobileOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileOpen(false);

  const openCartFromMobileMenu = () => {
    closeMobileMenu();
    openCart();
  };

  const totalAmountLabel = `${totalAmount.toFixed(2).replace(".", ",")} zl`;

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
              <IconButton aria-label="Koszyk" onClick={openCart}>
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCartOutlinedIcon color="primary" />
                </Badge>
              </IconButton>
              <IconButton
                aria-label="Otworz menu"
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
        ModalProps={{ disableScrollLock: true }}
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
          <ListItemButton onClick={openCartFromMobileMenu} sx={{ borderRadius: 2 }}>
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
              primary="Strona glowna"
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
        open={isCartOpen}
        onClose={closeCart}
        ModalProps={{ disableScrollLock: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "100%", sm: 420 },
            maxWidth: "100vw",
            bgcolor: colors.stickerBackground,
            display: "flex",
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
            Koszyk ({totalItems})
          </Typography>
          <IconButton aria-label="Zamknij koszyk" onClick={closeCart}>
            <CloseRoundedIcon color="primary" />
          </IconButton>
        </Box>

        <Divider />

        {items.length === 0 ? (
          <Box sx={{ p: 3, display: "grid", gap: 2 }}>
            <Typography sx={{ color: "primary.main", fontWeight: 700 }}>
              Twoj koszyk jest pusty.
            </Typography>
            <Button
              component={Link}
              href="/sklep"
              variant="contained"
              onClick={closeCart}
              sx={{ alignSelf: "start", px: 2.5, py: 1 }}
            >
              Przejdz do sklepu
            </Button>
          </Box>
        ) : (
          <>
            <List sx={{ p: 0 }}>
              {items.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    px: 2,
                    py: 1.5,
                    borderBottom: "1px dashed rgba(55,67,135,0.24)",
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" gap={1.5}>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        component={Link}
                        href={`/sklep/${item.slug}`}
                        onClick={closeCart}
                        sx={{
                          textDecoration: "none",
                          color: "primary.main",
                          fontWeight: 800,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {item.priceLabel}
                      </Typography>
                    </Box>
                    <IconButton
                      aria-label="Usun z koszyka"
                      onClick={() => removeItem(item.id)}
                      size="small"
                    >
                      <DeleteOutlineRoundedIcon sx={{ color: "primary.main" }} />
                    </IconButton>
                  </Stack>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mt: 1.25 }}
                  >
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <IconButton
                        aria-label="Zmniejsz ilosc"
                        onClick={() => decrementItem(item.id)}
                        size="small"
                      >
                        <RemoveRoundedIcon fontSize="small" color="primary" />
                      </IconButton>
                      <Typography sx={{ minWidth: 20, textAlign: "center", fontWeight: 700 }}>
                        {item.quantity}
                      </Typography>
                      <IconButton
                        aria-label="Zwieksz ilosc"
                        onClick={() => incrementItem(item.id)}
                        size="small"
                      >
                        <AddRoundedIcon fontSize="small" color="primary" />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Box>
              ))}
            </List>

            <Box sx={{ p: 2, mt: "auto" }}>
              <Divider sx={{ mb: 2 }} />
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography sx={{ fontWeight: 700, color: "primary.main" }}>Razem</Typography>
                <Typography sx={{ fontWeight: 900, color: "primary.main" }}>
                  {totalAmountLabel}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Button variant="outlined" onClick={clearCart} sx={{ flex: 1 }}>
                  Wyczysc
                </Button>
                <Button
                  component={Link}
                  href="/sklep"
                  variant="contained"
                  onClick={closeCart}
                  sx={{ flex: 1 }}
                >
                  Do sklepu
                </Button>
              </Stack>
            </Box>
          </>
        )}
      </Drawer>
    </>
  );
};

export default Header;
