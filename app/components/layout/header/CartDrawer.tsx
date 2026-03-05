"use client";

import { useEffect, useState } from "react";
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
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import type { CartItem } from "@/app/context/CartContext";
import { cartDrawerStyles } from "./CartDrawer.styles";

type CartDrawerProps = {
  open: boolean;
  items: CartItem[];
  totalItems: number;
  totalAmountLabel: string;
  onClose: () => void;
  onRemoveItem: (id: string) => void;
  onClear: () => void;
};

const CartDrawer = ({
  open,
  items,
  totalItems,
  totalAmountLabel,
  onClose,
  onRemoveItem,
  onClear,
}: CartDrawerProps) => {
  const [checkoutPending, setCheckoutPending] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setCheckoutError(null);

    const orderItems = items
      .map((item) => {
        const productIdFromItem =
          typeof item.wooProductId === "number" &&
          Number.isInteger(item.wooProductId)
            ? item.wooProductId
            : Number(item.id);
        const isValidProductId =
          Number.isInteger(productIdFromItem) && productIdFromItem > 0;
        if (!isValidProductId) return null;

        return {
          productId: productIdFromItem,
          quantity: 1,
        };
      })
      .filter((item): item is { productId: number; quantity: number } =>
        Boolean(item),
      );

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
      const payload = (await response.json()) as {
        checkoutUrl?: string;
        error?: string;
      };

      if (!response.ok || !payload.checkoutUrl) {
        throw new Error(
          payload.error || "Nie udalo sie przygotowac checkoutu.",
        );
      }

      onClose();
      window.location.assign(payload.checkoutUrl);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Nieznany blad checkoutu.";
      setCheckoutError(message);
    } finally {
      setCheckoutPending(false);
    }
  };

  useEffect(() => {
    if (!open) setCheckoutError(null);
  }, [open]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{ disableScrollLock: true }}
      sx={cartDrawerStyles.drawer}
    >
      <Box sx={cartDrawerStyles.headerRow}>
        <Typography variant="h6" sx={cartDrawerStyles.title}>
          Koszyk ({totalItems})
        </Typography>
        <IconButton aria-label="Zamknij koszyk" onClick={onClose}>
          <CloseRoundedIcon color="primary" />
        </IconButton>
      </Box>

      <Divider />

      {items.length === 0 ? (
        <Box sx={cartDrawerStyles.emptyState}>
          <Typography sx={cartDrawerStyles.emptyTitle}>
            Twoj koszyk jest pusty.
          </Typography>
          <Button
            component={Link}
            href="/sklep"
            variant="contained"
            onClick={onClose}
            sx={cartDrawerStyles.emptyButton}
          >
            Przejdz do sklepu
          </Button>
        </Box>
      ) : (
        <>
          <List sx={cartDrawerStyles.list}>
            {items.map((item) => (
              <Box key={item.id} sx={cartDrawerStyles.item}>
                <Stack direction="row" justifyContent="space-between" gap={1.5}>
                  <Box sx={cartDrawerStyles.itemContent}>
                    <Typography
                      component={Link}
                      href={`/sklep/${item.slug}`}
                      onClick={onClose}
                      sx={cartDrawerStyles.itemLink}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={cartDrawerStyles.itemPrice}>
                      {item.priceLabel}
                    </Typography>
                  </Box>
                  <IconButton
                    aria-label="Usun z koszyka"
                    onClick={() => onRemoveItem(item.id)}
                    size="small"
                  >
                    <DeleteOutlineRoundedIcon
                      sx={cartDrawerStyles.deleteIcon}
                    />
                  </IconButton>
                </Stack>
              </Box>
            ))}
          </List>

          <Box sx={cartDrawerStyles.footerBox}>
            <Divider sx={cartDrawerStyles.footerDivider} />
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={cartDrawerStyles.totalRow}
            >
              <Typography sx={cartDrawerStyles.totalLabel}>Razem</Typography>
              <Typography sx={cartDrawerStyles.totalValue}>
                {totalAmountLabel}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                onClick={onClear}
                sx={cartDrawerStyles.actionButton}
              >
                Wyczysc
              </Button>
              <Button
                variant="contained"
                onClick={handleCheckout}
                sx={cartDrawerStyles.actionButton}
                disabled={checkoutPending}
              >
                {checkoutPending ? "Przetwarzanie..." : "Do kasy"}
              </Button>
            </Stack>
            {checkoutError ? (
              <Typography variant="body2" sx={cartDrawerStyles.checkoutError}>
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
