export const contactFormStyles = {
  submitButton: {
    px: 3,
    alignSelf: "flex-start",
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
} as const;
