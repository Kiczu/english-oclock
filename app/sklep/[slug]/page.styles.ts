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
    "& p": {
      mt: 0.5,
    },
    "& p + p": {
      mt: 3.75,
    },
    "& ul, & ol": {
      my: 0.75,
      pl: 3,
    },
    "& li": {
      m: 0,
    },
    "& li + li": {
      mt: 0.2,
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
  descriptionPlain: {
    whiteSpace: "pre-line",
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
