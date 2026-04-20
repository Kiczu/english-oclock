import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import LayoutShell from "./components/layout/LayoutShell";
import { CartProvider } from "./context/CartContext";
import { CookieConsentProvider } from "./context/CookieConsentContext";
import { merriweather, raleway } from "./lib/fonts";
import ThemeRegistry from "./theme/ThemeRegistry";

export const metadata: Metadata = {
  title: {
    default: "It's English O'Clock",
    template: "%s | It's English O'Clock",
  },
  description: "Materiały do angielskiego A1-C2",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="pl">
      <body
        className={`${raleway.className} ${raleway.variable} ${merriweather.variable}`}
      >
        <ThemeRegistry>
          <CookieConsentProvider>
            <CartProvider>
              <LayoutShell>{children}</LayoutShell>
            </CartProvider>
          </CookieConsentProvider>
        </ThemeRegistry>
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
