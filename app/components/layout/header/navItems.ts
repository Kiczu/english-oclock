export type HeaderNavItem = {
  href: string;
  label: string;
};

export const headerNavItems: HeaderNavItem[] = [
  { href: "/sklep", label: "Sklep" },
  { href: "/#bestsellery", label: "Bestsellery" },
  { href: "/sklep?price=free", label: "Darmowe" },
  { href: "/#kategorie", label: "Kategorie" },
  { href: "/#kontakt", label: "Kontakt" },
];
