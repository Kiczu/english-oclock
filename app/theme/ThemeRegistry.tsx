"use client";

import * as React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { theme } from "./theme";

const ThemeRegistry = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default ThemeRegistry;
