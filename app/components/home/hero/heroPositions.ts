import type { Breakpoint } from "@mui/material/styles";

type ResponsiveNumber = Partial<Record<Breakpoint, number>>;

export type CircleDef = {
    color: string;
    size: ResponsiveNumber;
    opacity?: number;
    center?: boolean;
    top?: ResponsiveNumber;
    left?: ResponsiveNumber;
    right?: ResponsiveNumber;
};

export type PositionedBox = {
    top?: ResponsiveNumber;
    left?: ResponsiveNumber;
    right?: ResponsiveNumber;
    bottom?: ResponsiveNumber;
    width: ResponsiveNumber;
    zIndex?: number;
};

export const heroAssets = {
    arrowDecor: "/images/home-hero/arrow.png",
    ben: "/images/home-hero/ben.png",
    bus: "/images/home-hero/bus.png",
    crown: "/images/home-hero/crown.png",
    flag: "/images/home-hero/flag.png",
    guard: "/images/home-hero/guard.png",
} as const;

export const heroLayout = {
    circles: [
        // CENTER CIRCLE
        {
            color: "#F09D85",
            size: { xs: 420, md: 580 },
            opacity: 0.95,
            center: true,
        },
        // LEFT TOP
        {
            color: "#F09D85",
            size: { xs: 260, md: 420 },
            opacity: 0.35,
            top: { xs: -60, md: -80 },
            left: { xs: -80, md: -60 },
        },
        // RIGHT TOP
        {
            color: "#374373",
            size: { xs: 260, md: 360 },
            opacity: 1,
            top: { xs: -60, md: -80 },
            right: { xs: -70, md: -60 },
        },
    ],

    movers: {
        bus: {
            left: { xs: 10, md: 30, lg: 30, xl: 30, },
            bottom: { xs: 24, md: 60, lg: 80, xl: 80, },
            width: { xs: 230, md: 280, lg: 420, xl: 420, },
            zIndex: 6,
        },
        guard: {
            right: { xs: 10, md: 50, lg: 50, xl: 50, },
            bottom: { xs: 34, md: 70, lg: 70, xl: 70, },
            width: { xs: 120, md: 160, lg: 200, xl: 200, },
            zIndex: 7,
        },
    },

    decor: {
        flag: {
            left: { xs: -180, md: -150, lg: -100, xl: -100 },
            top: { xs: -70, md: -70, lg: -50, xl: -50 },
            width: { xs: 400, md: 420, lg: 400, xl: 580 },
            zIndex: 3,
        },
        ben: {
            right: { xs: -70, md: -70, lg: 220, xl: 250 },
            bottom: { xs: -20, md: -20, lg: -30, xl: -10 },
            width: { xs: 0, md: 250, lg: 300, xl: 350 },
            zIndex: 4,
        },
        crown: {
            right: { xs: 10, md: 150, lg: 450, xl: 520 },
            top: { xs: 100, md: 50, lg: 40, xl: 30 },
            width: { xs: 130, md: 130, lg: 130, xl: 200 },
            zIndex: 5,
        },
        arrowDecor: {
            left: { xs: 0, md: 380, lg: 400, xl: 450 },
            top: { xs: 0, md: 30, lg: 40, xl: 50 },
            width: { xs: 0, md: 180, lg: 200, xl: 210 },
            zIndex: 6,
        },
    },
} satisfies {
    circles: CircleDef[];
    movers: { bus: PositionedBox; guard: PositionedBox };
    decor: { flag: PositionedBox; ben: PositionedBox; crown: PositionedBox, arrowDecor: PositionedBox };
};
