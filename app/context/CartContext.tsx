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
import { usePathname } from "next/navigation";
import { normalizeCartItems, parsePrice } from "./cartStorage";

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
const CHECKOUT_SUCCESS_COOKIE = "its_checkout_success";
const CHECKOUT_SUCCESS_QUERY_PARAM = "checkout";
const CHECKOUT_SUCCESS_QUERY_VALUE = "success";

const hasCheckoutSuccessCookie = () =>
  document.cookie
    .split(";")
    .map((entry) => entry.trim())
    .some((entry) => entry === `${CHECKOUT_SUCCESS_COOKIE}=1`);

const clearCheckoutSuccessCookie = () => {
  const expires = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = `${CHECKOUT_SUCCESS_COOKIE}=; ${expires}; path=/`;

  const { hostname } = window.location;
  if (hostname && hostname !== "localhost") {
    document.cookie = `${CHECKOUT_SUCCESS_COOKIE}=; ${expires}; path=/; domain=${hostname}`;
  }
};

const removeCheckoutSuccessParam = (searchParams: URLSearchParams) => {
  if (!searchParams.has(CHECKOUT_SUCCESS_QUERY_PARAM)) {
    return;
  }

  searchParams.delete(CHECKOUT_SUCCESS_QUERY_PARAM);

  const nextQuery = searchParams.toString();
  const nextUrl = `${window.location.pathname}${
    nextQuery ? `?${nextQuery}` : ""
  }${window.location.hash}`;

  window.history.replaceState(window.history.state, "", nextUrl);
};

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const pathname = usePathname();

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

  useEffect(() => {
    if (!ready) return;

    const searchParams = new URLSearchParams(window.location.search);
    const checkoutStatus =
      searchParams.get(CHECKOUT_SUCCESS_QUERY_PARAM) ===
      CHECKOUT_SUCCESS_QUERY_VALUE;
    const checkoutCookie = hasCheckoutSuccessCookie();

    if (!checkoutStatus && !checkoutCookie) {
      return;
    }

    setItems([]);
    clearCheckoutSuccessCookie();

    if (checkoutStatus) {
      removeCheckoutSuccessParam(searchParams);
    }
  }, [pathname, ready]);

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

