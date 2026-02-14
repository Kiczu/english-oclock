"use client";

import { Button } from "@mui/material";
import { useCart } from "@/app/context/CartContext";

type AddToCartButtonProps = {
  id: string;
  slug: string;
  title: string;
  priceLabel: string;
  label?: string;
};

const AddToCartButton = ({
  id,
  slug,
  title,
  priceLabel,
  label = "Do koszyka",
}: AddToCartButtonProps) => {
  const { addItem, openCart } = useCart();

  const handleClick = () => {
    addItem({ id, slug, title, priceLabel });
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

