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
};

export const heroAssets = {
    bus: "/images/bus.png",
    guard: "/images/guard.png",
};

export const heroLayout: {
    circles: CircleDef[];
    movers: {
        bus: PositionedBox;
        guard: PositionedBox;
    };
} = {
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
            width: { xs: 190, md: 400 },
        },
        guard: {
            right: { xs: 10, md: 50 },
            bottom: { xs: 34, md: 70 },
            width: { xs: 120, md: 190 },
        },
    },
};
