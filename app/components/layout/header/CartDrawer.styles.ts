import { colors } from "@/app/theme/colors";

export const cartDrawerStyles = {
  drawer: {
    "& .MuiDrawer-paper": {
      width: { xs: "100%", sm: 420 },
      maxWidth: "100vw",
      bgcolor: colors.stickerBackground,
      display: "flex",
    },
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    p: 2,
  },
  title: {
    color: "primary.main",
    fontWeight: 900,
    letterSpacing: "0.03em",
  },
  emptyState: {
    p: 3,
    display: "grid",
    gap: 2,
  },
  emptyTitle: {
    color: "primary.main",
    fontWeight: 700,
  },
  emptyButton: {
    alignSelf: "start",
    px: 2.5,
    py: 1,
  },
  list: {
    p: 0,
  },
  item: {
    px: 2,
    py: 1.5,
    borderBottom: "1px dashed rgba(55,67,135,0.24)",
  },
  itemContent: {
    minWidth: 0,
  },
  itemLink: {
    textDecoration: "none",
    color: "primary.main",
    fontWeight: 800,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  itemPrice: {
    opacity: 0.8,
  },
  deleteIcon: {
    color: "primary.main",
  },
  footerBox: {
    p: 2,
    mt: "auto",
  },
  footerDivider: {
    mb: 2,
  },
  totalRow: {
    mb: 2,
  },
  totalLabel: {
    fontWeight: 700,
    color: "primary.main",
  },
  totalValue: {
    fontWeight: 900,
    color: "primary.main",
  },
  actionButton: {
    flex: 1,
  },
  checkoutError: {
    mt: 1.5,
    color: "error.main",
  },
} as const;
