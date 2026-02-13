import { Raleway, Merriweather } from "next/font/google";

export const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-brand-display",
  display: "swap",
});

export const raleway = Raleway({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-brand-body",
  display: "swap",
});
