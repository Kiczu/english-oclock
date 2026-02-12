import { createTheme } from "@mui/material/styles";
import { colors } from "./colors";


export const theme = createTheme({
    palette: {
        mode: "light",
        background: {
            default: colors.cream,
            paper: colors.white,
        },
        text: {
            primary: colors.ink,
        },
        primary: {
            main: colors.navy,
        },
        secondary: {
            main: colors.coral,
        },
    },
    shape: {
        borderRadius: 16,
    },
    typography: {
        fontFamily:
            "var(--font-brand-body), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        h1: { fontFamily: "var(--font-brand-display)", fontWeight: 800 },
        h2: { fontFamily: "var(--font-brand-display)", fontWeight: 800 },
        h3: { fontFamily: "var(--font-brand-display)", fontWeight: 800 },
        h4: { fontFamily: "var(--font-brand-display)", fontWeight: 700 },
        h5: { fontFamily: "var(--font-brand-display)", fontWeight: 700 },
        h6: { fontFamily: "var(--font-brand-display)", fontWeight: 700 },
        button: { textTransform: "none", fontWeight: 700 },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: { borderRadius: 16 },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: { borderRadius: 22 },
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                html: { overflowX: "hidden" },
                body: {
                    overflowX: "hidden",
                    backgroundColor: "#F5EDE9",
                    backgroundImage: `
          linear-gradient(rgba(55, 67, 115, 0.10) 1px, transparent 1px),
          linear-gradient(90deg, rgba(55, 67, 115, 0.10) 1px, transparent 1px)
        `,
                    backgroundSize: "48px 48px",
                    backgroundPosition: "0 0",
                    backgroundRepeat: "repeat",
                    backgroundAttachment: "fixed",
                },
                h1: { fontFamily: "var(--font-brand-display)" },
                h2: { fontFamily: "var(--font-brand-display)" },
                h3: { fontFamily: "var(--font-brand-display)" },
                h4: { fontFamily: "var(--font-brand-display)" },
                h5: { fontFamily: "var(--font-brand-display)" },
                h6: { fontFamily: "var(--font-brand-display)" },
            },
        },
    },
});
