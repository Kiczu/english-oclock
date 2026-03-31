export const productPageStyles = {
  container: {
    pt: { xs: 10, md: 12 },
    pb: 8,
  },
  backButton: {
    fontWeight: 800,
    fontSize: { xs: "1rem", sm: "1.1rem" },
    textTransform: "none",
  },
  title: {
    fontWeight: 900,
    color: "primary.main",
  },
  subtitle: {
    opacity: 0.75,
  },
  chipsRow: {
    flexWrap: "wrap",
  },
  badgeChip: {
    fontWeight: 800,
  },
  price: {
    fontWeight: 900,
    color: "secondary.main",
  },
  description: {
    opacity: 0.85,
    "& p": {
      m: 0,
    },
    "& p + p": {
      mt: 1.5,
    },
    "& ul, & ol": {
      my: 1.5,
      pl: 3,
    },
    "& li + li": {
      mt: 0.5,
    },
    "& strong, & b": {
      fontWeight: 800,
    },
    "& em, & i": {
      fontStyle: "italic",
    },
    "& a": {
      color: "secondary.main",
      textDecoration: "underline",
    },
  },
  actionsRow: {
    flexWrap: "wrap",
    alignItems: "center",
    rowGap: { xs: 1.25, sm: 0 },
  },
  freeActionButton: {
    px: 4,
    fontWeight: 900,
    color: "#fff",
  },
  divider: {
    my: 1,
  },
} as const;
