import { keyframes, type SxProps, type Theme } from "@mui/material/styles";
import { colors } from "@/app/theme/colors";

const drift = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) rotate(-3deg); }
  50% { transform: translate3d(0, -6px, 0) rotate(-1deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.45; }
  50% { transform: scale(1.08); opacity: 0.9; }
`;

export const floatingFacebookButtonStyles = {
  root: {
    position: "fixed",
    right: { xs: 14, sm: 18, lg: 26 },
    bottom: { xs: 16, sm: 20, lg: 28 },
    zIndex: 1090,
  } satisfies SxProps<Theme>,
  link: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    gap: 1.25,
    px: { xs: 0.75, sm: 1, md: 1.1 },
    py: 0.75,
    pr: { xs: 0.75, sm: 1.35 },
    borderRadius: "999px",
    border: `3px solid ${colors.navy}`,
    textDecoration: "none",
    color: colors.navy,
    backgroundColor: colors.white,
    boxShadow: "0 14px 30px rgba(24,31,36,0.16)",
    overflow: "hidden",
    transform: "rotate(-3deg)",
    transition:
      "transform 220ms ease, box-shadow 220ms ease, background-color 220ms ease",
    animation: `${drift} 4.6s ease-in-out infinite`,
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      background: `linear-gradient(135deg, ${colors.powderBlue} 0%, rgba(255,255,255,0.96) 58%, ${colors.cream} 100%)`,
      opacity: 0.9,
    },
    "&:hover": {
      transform: "translateY(-4px) rotate(0deg)",
      boxShadow: "0 18px 38px rgba(24,31,36,0.2)",
      animation: "none",
    },
    "&:focus-visible": {
      outline: `3px solid ${colors.coral}`,
      outlineOffset: 4,
    },
    "@media (prefers-reduced-motion: reduce)": {
      animation: "none",
      transition: "none",
    },
  } satisfies SxProps<Theme>,
  content: {
    position: "relative",
    zIndex: 1,
    display: "inline-flex",
    alignItems: "center",
    gap: 1.15,
  } satisfies SxProps<Theme>,
  iconWrap: {
    position: "relative",
    display: "grid",
    placeItems: "center",
    width: 48,
    height: 48,
    borderRadius: "50%",
    backgroundColor: colors.powderBlue,
    border: `2px solid rgba(55,67,115,0.2)`,
    boxShadow: "inset 0 -4px 10px rgba(255,255,255,0.75)",
    flexShrink: 0,
  } satisfies SxProps<Theme>,
  icon: {
    fontSize: 30,
    color: colors.navy,
  } satisfies SxProps<Theme>,
  ping: {
    position: "absolute",
    right: 2,
    bottom: 2,
    width: 11,
    height: 11,
    borderRadius: "50%",
    backgroundColor: colors.coral,
    boxShadow: "0 0 0 3px rgba(240,157,133,0.18)",
    animation: `${pulse} 1.8s ease-in-out infinite`,
    "@media (prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  } satisfies SxProps<Theme>,
  textStack: {
    display: { xs: "none", sm: "flex" },
    flexDirection: "column",
    gap: 0.1,
    pr: 0.25,
  } satisfies SxProps<Theme>,
  eyebrow: {
    fontSize: 10,
    fontWeight: 900,
    letterSpacing: "0.18em",
    lineHeight: 1,
    textTransform: "uppercase",
    opacity: 0.65,
  } satisfies SxProps<Theme>,
  label: {
    fontFamily: "var(--font-brand-display)",
    fontSize: { sm: 17, md: 18 },
    fontWeight: 900,
    lineHeight: 1,
    whiteSpace: "nowrap",
  } satisfies SxProps<Theme>,
} as const;
