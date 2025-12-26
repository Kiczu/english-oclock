import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
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
          <Header />
          {children}
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
