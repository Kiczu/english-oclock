"use client";

import { Button } from "@mui/material";
import { useCart } from "@/app/context/CartContext";

type AddToCartButtonProps = {
  id: string;
  wooProductId?: number;
  slug: string;
  title: string;
  priceLabel: string;
  unitPrice?: number;
  isFree?: boolean;
  label?: string;
};

const AddToCartButton = ({
  id,
  wooProductId,
  slug,
  title,
  priceLabel,
  unitPrice,
  isFree,
  label = "Do koszyka",
}: AddToCartButtonProps) => {
  const { addItem, openCart } = useCart();

  const handleClick = () => {
    addItem({ id, wooProductId, slug, title, priceLabel, unitPrice, isFree });
    openCart();
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={handleClick}
      sx={{ px: 4, fontWeight: 900, color: "#fff" }}
    >
      {label}
    </Button>
  );
};

export default AddToCartButton;

