export const contactFormStyles = {
  actionsRow: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    justifyContent: "space-between",
    alignItems: { xs: "flex-start", md: "center" },
    gap: 2,
  },
  submitButton: {
    px: 3,
    alignSelf: { xs: "flex-start", md: "auto" },
  },
  turnstileWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    alignItems: { xs: "flex-start", md: "flex-end" },
    width: { xs: "100%", md: "auto" },
  },
  turnstileLabel: {
    fontWeight: 700,
    color: "#1a254f",
    lineHeight: 1.2,
  },
  status: (isError: boolean) => ({
    minHeight: 24,
    fontWeight: 800,
    color: isError ? "#c24b4b" : "rgba(18,28,56,0.85)",
  }),
  honeypot: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "1px",
    height: "1px",
    margin: "-1px",
    border: 0,
    padding: 0,
    overflow: "hidden",
    whiteSpace: "nowrap",
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
  },
  turnstileMount: {
    width: "100%",
    maxWidth: 420,
  },
} as const;
