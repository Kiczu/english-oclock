import { Box, Container } from "@mui/material";
import HeroStack from "./components/home/hero/HeroStack";
import BestSellersSection from "./components/home/products/BestSellersSection";
import FreeProductsSection from "./components/home/products/FreeProductsSection";
import AboutSection from "./components/home/about/AboutSection";
import ContactSection from "./components/home/contact/ContactSection";
import { getShopProducts } from "@/app/lib/shopProducts.server";
import type { ShopProduct } from "@/app/types/commerce";

const HomePage = async () => {
  let items: ShopProduct[] = [];

  try {
    const payload = await getShopProducts({ all: true, perPage: 100 });
    items = payload.items;
  } catch (error) {
    console.error("[home] failed to load products from Woo", error);
  }

  const freeProducts = items.filter((product) => product.isFree);
  const bestsellerProducts = items.filter((product) => product.isBestseller);

  return (
    <>
      <HeroStack />
      <Container maxWidth="xl">
        <Box id="home-next" />
        <FreeProductsSection id="darmowe" products={freeProducts} />
        <BestSellersSection id="bestsellery" products={bestsellerProducts} />
        <AboutSection id="o-mnie" />
        <ContactSection id="kontakt" />
      </Container>
    </>
  );
};

export default HomePage;
