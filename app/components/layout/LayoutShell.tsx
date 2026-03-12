"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import { layoutShellStyles } from "./LayoutShell.styles";

const LayoutShell = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [hideHeaderAtTop, setHideHeaderAtTop] = useState(isHome);

  useEffect(() => {
    if (!isHome) return;

    const onScroll = () => setHideHeaderAtTop(window.scrollY < 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const hideHeader = isHome ? hideHeaderAtTop : false;

  return (
    <Box sx={layoutShellStyles.shell}>
      <Header hidden={hideHeader} />
      <Box component="main" sx={layoutShellStyles.main}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default LayoutShell;
