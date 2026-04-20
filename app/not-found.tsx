import Image from "next/image";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

const NotFoundPage = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{ pt: { xs: 12, md: 14 }, pb: { xs: 8, md: 10 } }}
    >
      <Stack spacing={{ xs: 3, md: 4 }} sx={{ alignItems: "center" }}>
        <Box sx={{ width: "100%", maxWidth: 920 }}>
          <Image
            src="/images/errors/404-its-english-oclock.webp"
            alt="Ilustracja błędu 404 z książkami i szkolnymi akcesoriami"
            width={536}
            height={124}
            priority
            sizes="(max-width: 899px) calc(100vw - 32px), 920px"
            style={{
              width: "40%",
              height: "auto",
              display: "block",
              margin: "0 auto",
            }}
          />
        </Box>

        <Stack
          spacing={1.5}
          sx={{ alignItems: "center", textAlign: "center", maxWidth: 760 }}
        >
          <Typography
            variant="h1"
            sx={{
              color: "primary.main",
              fontWeight: 900,
              fontSize: { xs: "2.6rem", md: "4rem" },
              lineHeight: 1.05,
            }}
          >
            Upsi, tej strony tutaj nie ma.
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.primary", opacity: 0.84, maxWidth: 640 }}
          >
            Możliwe, że link jest już nieaktualny albo materiał został
            przeniesiony. Najszybciej wrócisz na stronę główną albo zajrzysz do
            sklepu.
          </Typography>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          <Button
            href="/"
            variant="contained"
            color="secondary"
            sx={{ width: { xs: "100%", sm: "auto" }, minWidth: { sm: 220 } }}
          >
            Wróć na stronę główną
          </Button>
          <Button
            href="/sklep"
            variant="outlined"
            color="primary"
            sx={{
              width: { xs: "100%", sm: "auto" },
              minWidth: { sm: 220 },
              bgcolor: "rgba(255,255,255,0.72)",
            }}
          >
            Przejdź do sklepu
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default NotFoundPage;
