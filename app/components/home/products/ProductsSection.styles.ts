export const productsSectionStyles = {
  section: {
    py: { xs: 6, md: 10 },
    scrollMarginTop: { xs: 96, md: 112 },
  },
  headingStack: {
    mb: 4,
  },
  title: {
    fontWeight: 900,
    color: "primary.main",
  },
  subtitle: {
    opacity: 0.8,
  },
  cardWrap: (cardMaxWidth?: number) => ({
    maxWidth: cardMaxWidth ?? "none",
    mx: "auto",
  }),
} as const;
