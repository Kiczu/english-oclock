"use client";

import Link from "next/link";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { keyframes } from "@mui/material/styles";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { colors } from "@/app/theme/colors";
import type { HeaderNavItem } from "./navItems";

const closeIconIn = keyframes`
  0% { transform: rotate(-80deg) scale(0.72); opacity: 0; }
  100% { transform: rotate(0deg) scale(1); opacity: 1; }
`;

type MobileMenuDrawerProps = {
  open: boolean;
  navItems: HeaderNavItem[];
  onClose: () => void;
  onOpenCart: () => void;
};

const MobileMenuDrawer = ({
  open,
  navItems,
  onClose,
  onOpenCart,
}: MobileMenuDrawerProps) => {
  const openCartFromMenu = () => {
    onClose();
    onOpenCart();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
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
      <Box sx={{ display: "flex", justifyContent: "flex-end", px: 0.5, pt: 0.5 }}>
        <IconButton aria-label="Zamknij menu" onClick={onClose}>
          <CloseRoundedIcon
            sx={{
              fontSize: 34,
              color: "primary.main",
              animation: open ? `${closeIconIn} 260ms ease-out` : "none",
              transition: "transform 180ms ease",
              "&:hover": { transform: "rotate(90deg)" },
            }}
          />
        </IconButton>
      </Box>

      <List sx={{ mt: 1 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.href}
            component={Link}
            href={item.href}
            onClick={onClose}
            sx={{ borderRadius: 2, my: 0.5 }}
          >
            <ListItemText
              primary={item.label}
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
        <ListItemButton onClick={openCartFromMenu} sx={{ borderRadius: 2 }}>
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
        <ListItemButton component={Link} href="/" onClick={onClose} sx={{ borderRadius: 2 }}>
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
  );
};

export default MobileMenuDrawer;
