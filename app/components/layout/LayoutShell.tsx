"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import { layoutShellStyles } from "./LayoutShell.styles";

const LayoutShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [hideHeader, setHideHeader] = React.useState(isHome);

  React.useEffect(() => {
    if (!isHome) {
      setHideHeader(false);
      return;
    }

    const onScroll = () => setHideHeader(window.scrollY < 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

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
