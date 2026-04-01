import { Grid } from "@mui/material";
import ProductCard from "@/app/components/product/ProductCard";
import { getVariant } from "@/app/helpers/productCard";
import type { ShopProduct } from "@/app/types/commerce";

type ShopProductsGridProps = {
  products: ShopProduct[];
  onPrimaryAction: (product: ShopProduct) => void;
};

const ShopProductsGrid = ({
  products,
  onPrimaryAction,
}: ShopProductsGridProps) => {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <ProductCard
            id={product.id}
            href={`/sklep/${product.slug}`}
            title={product.title}
            priceLabel={product.priceLabel}
            level={product.level}
            variant={getVariant(product)}
            onPrimaryAction={() => onPrimaryAction(product)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ShopProductsGrid;
