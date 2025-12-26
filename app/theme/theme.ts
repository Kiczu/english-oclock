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
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        h1: { fontWeight: 800 },
        h2: { fontWeight: 800 },
        h3: { fontWeight: 800 },
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
    },
});
