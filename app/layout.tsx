import LayoutShell from "./components/layout/LayoutShell";
import { CartProvider } from "./context/CartContext";
import { merriweather, raleway } from "./lib/fonts";
import ThemeRegistry from "./theme/ThemeRegistry";

export const metadata = {
  title: "English o'clock",
  description: "Materiały do angielskiego A1–C2",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="pl">
      <body
        className={`${raleway.className} ${raleway.variable} ${merriweather.variable}`}
      >
        <ThemeRegistry>
          <CartProvider>
            <LayoutShell>{children}</LayoutShell>
          </CartProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
