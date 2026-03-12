import { keyframes, type SxProps, type Theme } from "@mui/material/styles";
import type { CircleDef, PositionedBox } from "./heroPositions";

const busRightToLeft = keyframes`
  0%   { transform: translate3d(160vw, 0, 0); opacity: 1; }
  70%  { transform: translate3d(-14px, 0, 0); opacity: 1; }
  100% { transform: translate3d(0, 0, 0); opacity: 1; }
`;

const guardLeftToRight = keyframes`
  0%   { transform: translate3d(-160vw, 0, 0); opacity: 1; }
  70%  { transform: translate3d(14px, 0, 0); opacity: 1; }
  100% { transform: translate3d(0, 0, 0); opacity: 1; }
`;

const slideInLeft = keyframes`
  0%   { opacity: 0; transform: translate3d(-60px, 0, 0) rotate(-2deg) scale(.98); }
  100% { opacity: 1; transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
`;

const wobble = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25%      { transform: rotate(1.2deg); }
  75%      { transform: rotate(-1.2deg); }
`;

const bounce = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0); }
  50%      { transform: translate3d(0, -10px, 0); }
`;

const crownDrop = keyframes`
  0%   { opacity: 0; transform: translate3d(0, -180px, 0) rotate(-8deg) scale(.98); }
  75%  { opacity: 1; transform: translate3d(0, 8px, 0) rotate(2deg) scale(1); }
  100% { opacity: 1; transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
`;

const baseLayer = (position: PositionedBox): SxProps<Theme> => ({
  position: "absolute",
  ...position,
  pointerEvents: "none",
});

export const heroStackStyles = {
  root: {
    position: "relative",
    width: "100%",
    height: "100dvh",
    overflow: "hidden",
    bgcolor: "rgba(245, 237, 233, 0.6)",
  } satisfies SxProps<Theme>,
  circlesLayer: {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    pointerEvents: "none",
  } satisfies SxProps<Theme>,
  circle: (circle: CircleDef): SxProps<Theme> => ({
    position: "absolute",
    width: circle.size,
    height: circle.size,
    borderRadius: "50%",
    bgcolor: circle.color,
    opacity: circle.opacity ?? 1,
    top: circle.center ? "50%" : circle.top,
    left: circle.center ? "50%" : circle.left,
    right: circle.right,
    transform: circle.center ? "translate(-50%, -55%)" : "none",
  }),
  staticLayer: (position: PositionedBox): SxProps<Theme> => baseLayer(position),
  flagLayer: (position: PositionedBox, canAnimate: boolean): SxProps<Theme> => ({
    ...baseLayer(position),
    ...(canAnimate
      ? {
          opacity: 1,
          animation: `${slideInLeft} 900ms cubic-bezier(.2,.9,.2,1) 80ms both, ${wobble} 4.2s ease-in-out 1100ms infinite`,
          transformOrigin: "20% 20%",
        }
      : { opacity: 1 }),
  }),
  crownLayer: (position: PositionedBox, canAnimate: boolean): SxProps<Theme> => ({
    ...baseLayer(position),
    transformOrigin: "50% 80%",
    ...(canAnimate
      ? {
          opacity: 0,
          transform: "translate3d(0, -180px, 0) rotate(-8deg) scale(.98)",
          animation: `${crownDrop} 900ms cubic-bezier(.2,.9,.2,1) 1700ms both`,
        }
      : { opacity: 1 }),
  }),
  busLayer: (position: PositionedBox, canAnimate: boolean): SxProps<Theme> => ({
    ...baseLayer(position),
    willChange: "transform",
    ...(canAnimate
      ? {
          opacity: 1,
          animation: `${busRightToLeft} 1400ms cubic-bezier(.2,.9,.2,1) 150ms both`,
        }
      : { opacity: 1 }),
  }),
  guardLayer: (position: PositionedBox, canAnimate: boolean): SxProps<Theme> => ({
    ...baseLayer(position),
    willChange: "transform",
    ...(canAnimate
      ? {
          opacity: 1,
          animation: `${guardLeftToRight} 1400ms cubic-bezier(.2,.9,.2,1) 150ms both`,
        }
      : { opacity: 1 }),
  }),
  centerContent: {
    position: "absolute",
    inset: 0,
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    p: 2,
    gap: 2.5,
    pointerEvents: "none",
  } satisfies SxProps<Theme>,
  title: {
    fontFamily: "var(--font-brand-display)",
    fontWeight: 900,
    color: "#374373",
    fontSize: { xs: 34, md: 56 },
    letterSpacing: 0.4,
    textShadow: "0 2px 12px rgba(255,255,255,0.75)",
    lineHeight: 1.05,
  } satisfies SxProps<Theme>,
  scrollButton: {
    pointerEvents: "auto",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 72,
    height: 72,
    bgcolor: "transparent",
    border: "none",
    boxShadow: "none",
    animation: `${bounce} 1.4s ease-in-out infinite`,
    "&:hover": { transform: "translateY(-2px)" },
    "@media (prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  } satisfies SxProps<Theme>,
  scrollIcon: {
    fontSize: 62,
    color: "#374373",
    filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.12))",
  } satisfies SxProps<Theme>,
};
