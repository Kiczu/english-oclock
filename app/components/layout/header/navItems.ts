export type HeaderNavItem = {
  href: string;
  label: string;
};

export const headerNavItems: HeaderNavItem[] = [
  { href: "/sklep", label: "Sklep" },
  { href: "/#bestsellery", label: "Bestsellery" },
  { href: "/sklep?price=free", label: "Darmowe" },
  { href: "/#kontakt", label: "Kontakt" },
];
