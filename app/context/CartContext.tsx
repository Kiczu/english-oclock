"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartProduct = {
  id: string;
  wooProductId?: number;
  slug: string;
  title: string;
  priceLabel: string;
  unitPrice?: number;
  isFree?: boolean;
};

export type CartItem = CartProduct & {
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartProduct, quantity?: number) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "english-oclock-cart";

const CartContext = createContext<CartContextValue | null>(null);

const parsePrice = (priceLabel: string, isFree?: boolean, unitPrice?: number) => {
  if (typeof unitPrice === "number" && Number.isFinite(unitPrice)) {
    return Math.max(unitPrice, 0);
  }
  if (isFree) return 0;
  const match = priceLabel.match(/-?\d+(?:[.,]\d+)?/);
  if (!match) return 0;
  const value = Number(match[0].replace(",", "."));
  return Number.isFinite(value) ? value : 0;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) {
          setItems(parsed.filter((item) => item?.id && item.quantity > 0));
        }
      }
    } catch {
      setItems([]);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const addItem = useCallback((item: CartProduct, quantity = 1) => {
    if (quantity <= 0) return;
    setItems((prev) => {
      const existing = prev.find((entry) => entry.id === item.id);
      if (!existing) {
        return [...prev, { ...item, quantity }];
      }
      return prev.map((entry) =>
        entry.id === item.id
          ? { ...entry, quantity: entry.quantity + quantity }
          : entry,
      );
    });
  }, []);

  const incrementItem = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }, []);

  const decrementItem = useCallback((id: string) => {
    setItems((prev) =>
      prev.flatMap((item) => {
        if (item.id !== id) return [item];
        if (item.quantity <= 1) return [];
        return [{ ...item, quantity: item.quantity - 1 }];
      }),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const totalAmount = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum + parsePrice(item.priceLabel, item.isFree, item.unitPrice) * item.quantity,
        0,
      ),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      totalItems,
      totalAmount,
      isCartOpen,
      openCart,
      closeCart,
      addItem,
      incrementItem,
      decrementItem,
      removeItem,
      clearCart,
    }),
    [
      items,
      totalItems,
      totalAmount,
      isCartOpen,
      openCart,
      closeCart,
      addItem,
      incrementItem,
      decrementItem,
      removeItem,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};

