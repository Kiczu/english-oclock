"use client";

import { Button } from "@mui/material";
import { useCart, type CartProduct } from "@/app/context/CartContext";

type AddToCartButtonProps = {
  product: CartProduct;
  label?: string;
};

const AddToCartButton = ({
  product,
  label = "Do koszyka",
}: AddToCartButtonProps) => {
  const { addItem, openCart } = useCart();

  const handleClick = () => {
    addItem(product);
    openCart();
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={handleClick}
      sx={{ px: 4.4, minHeight: 46 }}
    >
      {label}
    </Button>
  );
};

export default AddToCartButton;

