import { colors } from "@/app/theme/colors";

export const shopFiltersPanelStyles = {
  panel: {
    p: { xs: 2, md: 2.5 },
    borderRadius: 3,
    border: "1px solid rgba(55,67,135,0.22)",
    bgcolor: colors.stickerBackground,
    mb: 4,
  },
  priceFilterGridItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: { xs: "flex-start", lg: "flex-end" },
  },
  priceFilterStack: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: { xs: "flex-start", lg: "flex-end" },
    flexWrap: "wrap",
  },
  summaryRow: {
    mt: 2,
    gap: 1,
    flexWrap: "wrap",
  },
  summaryLeftStack: {
    alignItems: "center",
    flexWrap: "wrap",
  },
  resultsLabel: {
    fontWeight: 700,
    color: "primary.main",
  },
  sourceStack: {
    alignItems: "center",
    flexWrap: "wrap",
  },
  sourceLabel: {
    opacity: 0.75,
  },
  clearButton: {
    fontWeight: 800,
  },
} as const;
