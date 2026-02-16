"use client";

import { useState } from "react";
import CartDrawer from "./header/CartDrawer";
import HeaderBar from "./header/HeaderBar";
import MobileMenuDrawer from "./header/MobileMenuDrawer";
import { headerNavItems } from "./header/navItems";
import { useCart } from "@/app/context/CartContext";

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

  const closeMobileMenu = () => setMobileOpen(false);
  const openMobileMenu = () => setMobileOpen(true);
  const openCartFromMobileMenu = () => {
    closeMobileMenu();
    openCart();
  };

  const totalAmountLabel = `${totalAmount.toFixed(2).replace(".", ",")} zl`;

  return (
    <>
      <HeaderBar
        hidden={hidden}
        navItems={headerNavItems}
        totalItems={totalItems}
        onOpenCart={openCart}
        onOpenMobileMenu={openMobileMenu}
      />

      <MobileMenuDrawer
        open={mobileOpen}
        navItems={headerNavItems}
        onClose={closeMobileMenu}
        onOpenCart={openCartFromMobileMenu}
      />

      <CartDrawer
        open={isCartOpen}
        items={items}
        totalItems={totalItems}
        totalAmountLabel={totalAmountLabel}
        onClose={closeCart}
        onIncrementItem={incrementItem}
        onDecrementItem={decrementItem}
        onRemoveItem={removeItem}
        onClear={clearCart}
      />
    </>
  );
};

export default Header;
