"use client";

import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import StickerField from "../StickerField";

export type ContactValues = {
  name: string;
  email: string;
  message: string;
};

type ContactErrors = Partial<Record<keyof ContactValues, string>>;
type FieldName = keyof ContactValues;

const validate = (v: ContactValues): ContactErrors => {
  const e: ContactErrors = {};
  const name = v.name.trim();
  const email = v.email.trim();
  const msg = v.message.trim();

  if (name.length < 2) e.name = "Podaj imię (min. 2 znaki).";
  if (!email.includes("@") || !email.includes("."))
    e.email = "Podaj poprawny e-mail.";
  if (msg.length < 10) e.message = "Wiadomość jest za krótka (min. 10 znaków).";

  return e;
};

const ContactSection = ({ id }: { id?: string }) => {
  const [values, setValues] = useState<ContactValues>({
    name: "",
    email: "",
    message: "",
  });

  const [touched, setTouched] = useState<Record<FieldName, boolean>>({
    name: false,
    email: false,
    message: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const errors = useMemo(() => validate(values), [values]);

  const showError = (field: FieldName) =>
    touched[field] ? errors[field] : undefined;

  const handleChange = (name: FieldName, v: string) => {
    setValues((prev) => ({ ...prev, [name]: v }));
    if (status !== "idle") setStatus("idle");
  };

  const handleBlur = (name: FieldName) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async () => {
    // oznacz wszystko jako touched
    setTouched({ name: true, email: true, message: true });

    const e = validate(values);
    if (Object.keys(e).length > 0) return;

    setIsSubmitting(true);
    setStatus("idle");

    try {
      // tymczasowo – tu później podmienisz na EmailJS albo /api/contact
      await new Promise((r) => setTimeout(r, 400));

      setStatus("success");
      setValues({ name: "", email: "", message: "" });
      setTouched({ name: false, email: false, message: false });
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="section"
      id={id}
      sx={{ py: { xs: 6, md: 10 }, scrollMarginTop: { xs: 96, md: 112 } }}
    >
      <Stack spacing={1.5} sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: 900, color: "primary.main" }}
        >
          Kontakt
        </Typography>
        <Typography sx={{ opacity: 0.8 }}>
          Masz pytanie? Napisz — odpiszę.
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {/* FORM */}
        <Grid size={{ xs: 12, md: 12, lg: 7 }}>
          <Stack spacing={2}>
            <StickerField
              id="contact_name"
              name="name"
              placeholder="Twoje imię"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={showError("name")}
            />

            <StickerField
              id="contact_email"
              name="email"
              placeholder="twoj@email.pl"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={showError("email")}
            />

            <StickerField
              id="contact_message"
              name="message"
              placeholder="Napisz, w czym pomóc..."
              multiline
              minRows={6}
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              error={showError("message")}
            />

            <Button
              variant="contained"
              disabled={isSubmitting}
              sx={{
                backgroundColor: "#F09D85",
                borderRadius: 999,
                textTransform: "none",
                fontWeight: 900,
                px: 3,
                boxShadow: "none",
                alignSelf: "flex-start",
                "&:hover": { backgroundColor: "#F09D85" },
              }}
              onClick={handleSubmit}
            >
              {isSubmitting ? "Wysyłam..." : "Wyślij"}
            </Button>

            {status === "success" ? (
              <Typography
                sx={{ fontWeight: 800, color: "rgba(18,28,56,0.85)" }}
              >
                Dzięki! Wiadomość poszła ✅
              </Typography>
            ) : null}

            {status === "error" ? (
              <Typography sx={{ fontWeight: 800, color: "#c24b4b" }}>
                Coś nie poszło. Spróbuj ponownie.
              </Typography>
            ) : null}
          </Stack>
        </Grid>

        {/* FAQ */}
        <Grid size={{ xs: 12, md: 12, lg: 5 }}>
          <Box
            sx={{
              borderRadius: 3,
              background: "#f5efe7",
              boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
              p: 3,
              height: "100%",
            }}
          >
            <Stack spacing={2.25}>
              <Stack spacing={1}>
                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                  Mini FAQ
                </Typography>

                <Typography sx={{ fontWeight: 900 }}>
                  1) Co dostaję po zakupie?
                </Typography>
                <Typography sx={{ opacity: 0.85 }}>
                  PDF do pobrania (docelowo przez WooCommerce).
                </Typography>

                <Typography sx={{ fontWeight: 900, pt: 1 }}>
                  2) Czy darmówki są bez konta?
                </Typography>
                <Typography sx={{ opacity: 0.85 }}>
                  Tak. Docelowo klik i PDF otworzy się w nowej karcie.
                </Typography>

                <Typography sx={{ fontWeight: 900, pt: 1 }}>
                  3) Dla kogo są materiały?
                </Typography>
                <Typography sx={{ opacity: 0.85 }}>
                  Dla uczniów, nauczycieli i do nauki solo — wybierz kategorię.
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactSection;
