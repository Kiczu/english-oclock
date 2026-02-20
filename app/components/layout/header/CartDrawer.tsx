"use client";

import * as React from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  Stack,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import { colors } from "@/app/theme/colors";
import type { CartItem } from "@/app/context/CartContext";

type CartDrawerProps = {
  open: boolean;
  items: CartItem[];
  totalItems: number;
  totalAmountLabel: string;
  onClose: () => void;
  onIncrementItem: (id: string) => void;
  onDecrementItem: (id: string) => void;
  onRemoveItem: (id: string) => void;
  onClear: () => void;
};

const CartDrawer = ({
  open,
  items,
  totalItems,
  totalAmountLabel,
  onClose,
  onIncrementItem,
  onDecrementItem,
  onRemoveItem,
  onClear,
}: CartDrawerProps) => {
  const [checkoutPending, setCheckoutPending] = React.useState(false);
  const [checkoutError, setCheckoutError] = React.useState<string | null>(null);

  const handleCheckout = async () => {
    setCheckoutError(null);

    const orderItems = items
      .map((item) => {
        const productIdFromItem =
          typeof item.wooProductId === "number" && Number.isInteger(item.wooProductId)
            ? item.wooProductId
            : Number(item.id);
        const isValidProductId = Number.isInteger(productIdFromItem) && productIdFromItem > 0;
        if (!isValidProductId) return null;

        return {
          productId: productIdFromItem,
          quantity: item.quantity,
        };
      })
      .filter((item): item is { productId: number; quantity: number } => Boolean(item));

    if (orderItems.length === 0) {
      setCheckoutError("Brak produktow do rozliczenia.");
      return;
    }

    setCheckoutPending(true);

    try {
      const response = await fetch("/api/checkout-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: orderItems }),
      });
      const payload = (await response.json()) as { checkoutUrl?: string; error?: string };

      if (!response.ok || !payload.checkoutUrl) {
        throw new Error(payload.error || "Nie udalo sie przygotowac checkoutu.");
      }

      onClose();
      window.location.assign(payload.checkoutUrl);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Nieznany blad checkoutu.";
      setCheckoutError(message);
    } finally {
      setCheckoutPending(false);
    }
  };

  React.useEffect(() => {
    if (!open) setCheckoutError(null);
  }, [open]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
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
        <IconButton aria-label="Zamknij koszyk" onClick={onClose}>
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
            onClick={onClose}
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
                      onClick={onClose}
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
                    onClick={() => onRemoveItem(item.id)}
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
                      onClick={() => onDecrementItem(item.id)}
                      size="small"
                    >
                      <RemoveRoundedIcon fontSize="small" color="primary" />
                    </IconButton>
                    <Typography sx={{ minWidth: 20, textAlign: "center", fontWeight: 700 }}>
                      {item.quantity}
                    </Typography>
                    <IconButton
                      aria-label="Zwieksz ilosc"
                      onClick={() => onIncrementItem(item.id)}
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
              <Button variant="outlined" onClick={onClear} sx={{ flex: 1 }}>
                Wyczysc
              </Button>
              <Button variant="contained" onClick={handleCheckout} sx={{ flex: 1 }} disabled={checkoutPending}>
                {checkoutPending ? "Przetwarzanie..." : "Do kasy"}
              </Button>
            </Stack>
            {checkoutError ? (
              <Typography variant="body2" sx={{ mt: 1.5, color: "error.main" }}>
                {checkoutError}
              </Typography>
            ) : null}
          </Box>
        </>
      )}
    </Drawer>
  );
};

export default CartDrawer;
