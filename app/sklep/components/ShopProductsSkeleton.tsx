import { Box, Grid, Skeleton, Stack } from "@mui/material";

type ShopProductsSkeletonProps = {
  count?: number;
};

const ShopProductsSkeleton = ({ count = 6 }: ShopProductsSkeletonProps) => {
  return (
    <Grid container spacing={4}>
      {Array.from({ length: count }).map((_, index) => (
        <Grid key={`shop-skeleton-${index}`} size={{ xs: 12, sm: 6, md: 4 }}>
          <Box
            sx={{
              borderRadius: 3,
              background: "#f5efe7",
              overflow: "hidden",
              boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
              aspectRatio: "300 / 220",
              p: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack spacing={2.5} sx={{ width: "100%", maxWidth: 260 }}>
              <Skeleton variant="rounded" width="100%" height={30} />
              <Skeleton variant="rounded" width="75%" height={24} />
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Skeleton variant="rounded" width={80} height={26} />
                <Skeleton
                  variant="rounded"
                  width={120}
                  height={40}
                  sx={{ borderRadius: 999 }}
                />
              </Stack>
            </Stack>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ShopProductsSkeleton;
