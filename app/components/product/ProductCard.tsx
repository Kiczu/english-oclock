import Link from "next/link";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { ProductDTO } from "@/app/types/commerce";

const ProductCard = ({ product }: { product: ProductDTO }) => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: 3,
        border: "1px solid rgba(55,67,115,0.12)",
        boxShadow: "0 10px 20px rgba(0,0,0,0.06)",
        overflow: "hidden",
      }}
    >
      {/* IMG */}
      <Box
        sx={{
          height: 160,
          bgcolor: "rgba(55,67,115,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ opacity: 0.5, fontWeight: 700 }}>preview</Typography>
      </Box>

      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <Chip size="small" label={product.level} />
          <Chip size="small" label={product.format} variant="outlined" />
        </Stack>

        <Typography sx={{ fontWeight: 800, lineHeight: 1.15 }}>
          {product.title}
        </Typography>

        <Typography sx={{ mt: 0.5, fontSize: 13, opacity: 0.75 }}>
          {product.type} • {product.pages} stron • klucz
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 1.5 }}
        >
          <Typography sx={{ fontWeight: 900 }}>{product.price} zł</Typography>

          <Button
            size="small"
            variant="contained"
            component={Link}
            href={`/sklep/${product.slug}`}
          >
            Zobacz
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProductCard;
