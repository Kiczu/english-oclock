export const aboutSectionStyles = {
  section: {
    scrollMarginTop: { xs: 96, md: 112 },
  },
  container: {
    width: "100%",
    maxWidth: 1600,
    mx: "auto",
    px: { xs: 2, sm: 3, md: 0 },
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    alignItems: "center",
    justifyContent: { xs: "flex-start", md: "space-between" },
    rowGap: { xs: 4, md: 0 },
  },
  imageWrapper: {
    position: "relative",
    borderRadius: 3,
    overflow: "hidden",
    aspectRatio: { xs: "1 / 1", md: "3 / 4" },
    width: { xs: "50%", sm: "60%", md: "40%", lg: "30%" },
    flex: "0 0 auto",
  },
  image: {
    width: { xs: "100%", md: "80%", lg: "100%" },
    height: "100%",
    objectFit: "cover",
  },
  content: {
    maxWidth: 720,
    width: "100%",
  },
  title: {
    fontWeight: 900,
    color: "primary.main",
  },
  paragraph: {
    opacity: 0.85,
    fontSize: { xs: 16, md: 18 },
    lineHeight: 1.65,
  },
  actionsRow: {
    pt: 1,
  },
  primaryButton: {
    px: { xs: 3.5, md: 4.25 },
  },
  secondaryButton: {
    textTransform: "none",
    fontWeight: 900,
  },
} as const;
