import LayoutShell from "./components/layout/LayoutShell";
import ThemeRegistry from "./theme/ThemeRegistry";

export const metadata = {
  title: "English o'clock",
  description: "Materiały do angielskiego A1–C2",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="pl">
      <body>
        <ThemeRegistry>
          <LayoutShell>{children}</LayoutShell>
        </ThemeRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
