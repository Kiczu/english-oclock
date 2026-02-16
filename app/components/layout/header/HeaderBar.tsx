"use client";

import Link from "next/link";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import BrandLogo from "@/app/components/logo/BrandLogo";
import { colors } from "@/app/theme/colors";
import type { HeaderNavItem } from "./navItems";

type HeaderBarProps = {
  hidden?: boolean;
  navItems: HeaderNavItem[];
  totalItems: number;
  onOpenCart: () => void;
  onOpenMobileMenu: () => void;
};

const HeaderBar = ({
  hidden,
  navItems,
  totalItems,
  onOpenCart,
  onOpenMobileMenu,
}: HeaderBarProps) => {
  return (
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
            {navItems.map((item) => (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                color="primary"
                sx={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  px: 1.25,
                  minWidth: "auto",
                }}
              >
                {item.label}
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
            <IconButton aria-label="Koszyk" onClick={onOpenCart}>
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCartOutlinedIcon color="primary" />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="Otworz menu"
              onClick={onOpenMobileMenu}
              sx={{ display: { xs: "inline-flex", md: "none" } }}
            >
              <MenuRoundedIcon color="primary" />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HeaderBar;
