type ResponsiveNumber = { xs: number; md: number };

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
            left: { xs: 10, md: 30 },
            bottom: { xs: 24, md: 80 },
            width: { xs: 190, md: 420 },
            zIndex: 6,
        },
        guard: {
            right: { xs: 10, md: 50 },
            bottom: { xs: 34, md: 70 },
            width: { xs: 120, md: 200 },
            zIndex: 7,
        },
    },

    decor: {
        flag: {
            left: { xs: -120, md: -80 },
            top: { xs: 70, md: 0 },
            width: { xs: 550, md: 580 },
            zIndex: 3,
        },
        ben: {
            right: { xs: -10, md: 250 },
            bottom: { xs: 0, md: -10 },
            width: { xs: 320, md: 350 },
            zIndex: 4,
        },
        crown: {
            right: { xs: 140, md: 520 },
            top: { xs: 70, md: 30 },
            width: { xs: 150, md: 200 },
            zIndex: 5,
        },
        arrowDecor: {
            left: { xs: 110, md: 450 },
            top: { xs: 40, md: 50 },
            width: { xs: 160, md: 210 },
            zIndex: 6,
        },
    },
} satisfies {
    circles: CircleDef[];
    movers: { bus: PositionedBox; guard: PositionedBox };
    decor: { flag: PositionedBox; ben: PositionedBox; crown: PositionedBox, arrowDecor: PositionedBox };
};
