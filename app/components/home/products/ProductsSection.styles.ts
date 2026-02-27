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
  sliderViewport: {
    position: "relative",
    overflow: "visible",
  },
  sliderNavButton: (side: "left" | "right") => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 3,
    [side]: { xs: 6, sm: 10, md: -24, lg: -40, xl: -56 },
    border: "1px solid",
    borderColor: "rgba(55, 67, 115, 0.18)",
    backgroundColor: "rgba(255,255,255,0.55)",
    backdropFilter: "blur(2px)",
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.82)",
    },
  }),
  sliderMetaStack: {
    alignItems: "center",
    mt: 2,
  },
  sliderCounter: {
    fontWeight: 700,
    color: "primary.main",
    minWidth: 52,
    textAlign: "center",
  },
  sliderDotsRow: {
    justifyContent: "center",
    mb: 0.25,
  },
  sliderDot: (active: boolean) => ({
    width: active ? 20 : 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: active ? "primary.main" : "rgba(55, 67, 115, 0.25)",
    transition: "all 150ms ease",
  }),
} as const;
