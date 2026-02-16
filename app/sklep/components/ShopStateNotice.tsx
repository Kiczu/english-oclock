import { Box, Typography } from "@mui/material";

type ShopStateNoticeProps = {
  title: string;
  description?: string;
};

const ShopStateNotice = ({ title, description }: ShopStateNoticeProps) => (
  <Box
    sx={{
      borderRadius: 3,
      border: "1px dashed rgba(55,67,135,0.3)",
      p: 3,
      textAlign: "center",
    }}
  >
    <Typography sx={{ fontWeight: 700, color: "primary.main" }}>
      {title}
    </Typography>
    {description ? (
      <Typography sx={{ mt: 0.5, opacity: 0.8 }}>{description}</Typography>
    ) : null}
  </Box>
);

export default ShopStateNotice;
