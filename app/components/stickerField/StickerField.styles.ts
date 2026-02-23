export const stickerFieldStyles = {
  root: {
    display: "grid",
    gap: { xs: 0.75, md: 1 },
  },
  frameBox: (multiline: boolean, frameDesktop: string, frameMobile: string) => ({
    position: "relative",
    background: "#f5efe7",
    borderRadius: 2,
    boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
    overflow: "hidden",
    aspectRatio: multiline
      ? { xs: "auto", md: "1200 / 280" }
      : { xs: "auto", md: "1200 / 110" },
    minHeight: multiline
      ? { xs: 136, sm: 148, md: 0 }
      : { xs: 56, sm: 60, md: 0 },
    "&::before": {
      content: '""',
      pointerEvents: "none",
      position: "absolute",
      inset: 0.5,
      backgroundImage: `url("data:image/svg+xml,${frameDesktop}")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% 100%",
      backgroundPosition: "center",
      transform: "translateX(-3px)",
      zIndex: 0,
    },
    "@media (max-width:899.95px)": {
      borderRadius: "16px",
      minHeight: multiline ? 158 : 62,
      "&::before": {
        inset: "1px -6px",
        backgroundImage: `url("data:image/svg+xml,${frameMobile}")`,
        backgroundSize: "100% 100%",
        transform: "none",
      },
    },
  }),
  inputWrap: (multiline: boolean) => ({
    position: "absolute",
    inset: 0,
    zIndex: 1,
    display: "flex",
    alignItems: multiline ? "stretch" : "center",
    px: { xs: 2.75, sm: 3.25, md: 5 },
    pt: multiline ? { xs: 2.25, sm: 2.5, md: 5 } : 0,
    pb: multiline ? { xs: 1.5, sm: 1.75, md: 3 } : 0,
    "@media (max-width:899.95px)": {
      px: 2.35,
      pt: multiline ? 2 : 0,
      pb: multiline ? 1.35 : 0,
    },
  }),
  inputBase: {
    width: "100%",
    fontWeight: 700,
    fontSize: { xs: 17, sm: 17, md: 18 },
    color: "rgba(18,28,56,0.95)",
    lineHeight: 1.3,
    "& input, & textarea": {
      padding: 0,
      margin: 0,
      boxSizing: "border-box",
    },
    "& input": {
      lineHeight: 1.35,
      paddingLeft: { xs: "7px", sm: "5px", md: "1px" },
      paddingTop: { xs: "7px", sm: "4px", md: "1px" },
    },
    "& textarea": {
      lineHeight: { xs: 1.45, md: 1.6 },
      resize: "none",
      height: "100% !important",
      maxHeight: "100%",
      overflowY: "auto",
      paddingLeft: { xs: "10px", sm: "7px", md: "1px" },
      paddingRight: { xs: "6px", sm: "4px", md: "1px" },
      paddingTop: { xs: "14px", sm: "10px", md: "14px", lg: "38px" },
      WebkitOverflowScrolling: "touch",
    },
    "& input::placeholder, & textarea::placeholder": {
      color: "rgba(18,28,56,0.45)",
      fontWeight: 700,
      opacity: 1,
    },
  },
  errorText: (hasError: boolean) => ({
    fontSize: 13,
    lineHeight: 1.3,
    fontWeight: 700,
    color: "#c24b4b",
    pl: 1,
    minHeight: "1.1em",
    visibility: hasError ? "visible" : "hidden",
  }),
} as const;
