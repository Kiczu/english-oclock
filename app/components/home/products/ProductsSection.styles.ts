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
  sliderCardMotion: (
    direction: "next" | "prev",
    shouldAnimate: boolean,
    order: number,
    swaySide: "left" | "right",
  ) => ({
    animation: shouldAnimate
      ? `${direction === "next"
          ? swaySide === "left"
            ? "hangerCardNextLeft"
            : "hangerCardNextRight"
          : swaySide === "left"
            ? "hangerCardPrevLeft"
            : "hangerCardPrevRight"} 980ms cubic-bezier(0.18, 0.98, 0.24, 1) ${order * 170}ms both`
      : "none",
    transformOrigin: swaySide === "left" ? "12% 4%" : "88% 4%",
    willChange: "transform, opacity",
    "@media (prefers-reduced-motion: reduce)": {
      animation: "none",
    },
    "@keyframes hangerCardNextLeft": {
      "0%": {
        opacity: 0.18,
        transform: "translate3d(96px, 18px, 0) rotate(-9.2deg) scale(0.94)",
      },
      "32%": {
        opacity: 1,
        transform: "translate3d(-48px, -16px, 0) rotate(5.8deg) scale(1.02)",
      },
      "56%": {
        opacity: 1,
        transform: "translate3d(30px, 10px, 0) rotate(-3.6deg) scale(0.99)",
      },
      "74%": {
        opacity: 1,
        transform: "translate3d(-16px, -6px, 0) rotate(2.1deg) scale(1.01)",
      },
      "88%": {
        opacity: 1,
        transform: "translate3d(8px, 3px, 0) rotate(-0.9deg) scale(1)",
      },
      "100%": {
        opacity: 1,
        transform: "translate3d(0, 0, 0) rotate(0deg) scale(1)",
      },
    },
    "@keyframes hangerCardNextRight": {
      "0%": {
        opacity: 0.18,
        transform: "translate3d(96px, 18px, 0) rotate(9.2deg) scale(0.94)",
      },
      "32%": {
        opacity: 1,
        transform: "translate3d(-48px, -16px, 0) rotate(-5.8deg) scale(1.02)",
      },
      "56%": {
        opacity: 1,
        transform: "translate3d(30px, 10px, 0) rotate(3.6deg) scale(0.99)",
      },
      "74%": {
        opacity: 1,
        transform: "translate3d(-16px, -6px, 0) rotate(-2.1deg) scale(1.01)",
      },
      "88%": {
        opacity: 1,
        transform: "translate3d(8px, 3px, 0) rotate(0.9deg) scale(1)",
      },
      "100%": {
        opacity: 1,
        transform: "translate3d(0, 0, 0) rotate(0deg) scale(1)",
      },
    },
    "@keyframes hangerCardPrevLeft": {
      "0%": {
        opacity: 0.18,
        transform: "translate3d(-96px, 18px, 0) rotate(-9.2deg) scale(0.94)",
      },
      "32%": {
        opacity: 1,
        transform: "translate3d(48px, -16px, 0) rotate(5.8deg) scale(1.02)",
      },
      "56%": {
        opacity: 1,
        transform: "translate3d(-30px, 10px, 0) rotate(-3.6deg) scale(0.99)",
      },
      "74%": {
        opacity: 1,
        transform: "translate3d(16px, -6px, 0) rotate(2.1deg) scale(1.01)",
      },
      "88%": {
        opacity: 1,
        transform: "translate3d(-8px, 3px, 0) rotate(-0.9deg) scale(1)",
      },
      "100%": {
        opacity: 1,
        transform: "translate3d(0, 0, 0) rotate(0deg) scale(1)",
      },
    },
    "@keyframes hangerCardPrevRight": {
      "0%": {
        opacity: 0.18,
        transform: "translate3d(-96px, 18px, 0) rotate(9.2deg) scale(0.94)",
      },
      "32%": {
        opacity: 1,
        transform: "translate3d(48px, -16px, 0) rotate(-5.8deg) scale(1.02)",
      },
      "56%": {
        opacity: 1,
        transform: "translate3d(-30px, 10px, 0) rotate(3.6deg) scale(0.99)",
      },
      "74%": {
        opacity: 1,
        transform: "translate3d(16px, -6px, 0) rotate(-2.1deg) scale(1.01)",
      },
      "88%": {
        opacity: 1,
        transform: "translate3d(-8px, 3px, 0) rotate(0.9deg) scale(1)",
      },
      "100%": {
        opacity: 1,
        transform: "translate3d(0, 0, 0) rotate(0deg) scale(1)",
      },
    },
  }),
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
