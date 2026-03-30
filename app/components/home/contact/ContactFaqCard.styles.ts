export const contactFaqCardStyles = {
  root: {
    borderRadius: 3,
    background: "#f5efe7",
    boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
    p: { xs: 2.5, md: 3 },
    alignSelf: "flex-start",
  },
  title: {
    fontWeight: 900,
  },
  question: {
    fontWeight: 900,
  },
  questionSpaced: {
    fontWeight: 900,
    pt: 1,
  },
  answer: {
    opacity: 0.85,
  },
} as const;
