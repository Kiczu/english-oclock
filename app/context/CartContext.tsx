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

export type CartItem = CartProduct;

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartProduct) => void;
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

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const normalizeCartItems = (value: unknown): CartItem[] => {
  if (!Array.isArray(value)) return [];

  const seen = new Set<string>();
  const normalized: CartItem[] = [];

  for (const rawItem of value) {
    if (!rawItem || typeof rawItem !== "object") continue;

    const item = rawItem as Partial<CartItem>;
    if (!isNonEmptyString(item.id) || seen.has(item.id)) continue;
    if (
      !isNonEmptyString(item.slug) ||
      !isNonEmptyString(item.title) ||
      !isNonEmptyString(item.priceLabel)
    ) {
      continue;
    }

    normalized.push({
      id: item.id,
      wooProductId:
        typeof item.wooProductId === "number" &&
        Number.isInteger(item.wooProductId) &&
        item.wooProductId > 0
          ? item.wooProductId
          : undefined,
      slug: item.slug,
      title: item.title,
      priceLabel: item.priceLabel,
      unitPrice:
        typeof item.unitPrice === "number" && Number.isFinite(item.unitPrice)
          ? item.unitPrice
          : undefined,
      isFree: item.isFree === true ? true : undefined,
    });

    seen.add(item.id);
  }

  return normalized;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as unknown;
        setItems(normalizeCartItems(parsed));
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

  const addItem = useCallback((item: CartProduct) => {
    setItems((prev) => {
      if (prev.some((entry) => entry.id === item.id)) {
        return prev;
      }

      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const totalItems = items.length;
  const totalAmount = items.reduce(
    (sum, item) => sum + parsePrice(item.priceLabel, item.isFree, item.unitPrice),
    0,
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

