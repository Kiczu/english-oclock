"use client";

import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import StickerField from "../../stickerField/StickerField";

export type ContactValues = {
  name: string;
  email: string;
  message: string;
};

type ContactErrors = Partial<Record<keyof ContactValues, string>>;
type FieldName = keyof ContactValues;
type SubmitStatus = "idle" | "success" | "error";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";
const EMAILJS_CONFIGURED = Boolean(
  EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY,
);

const validate = (v: ContactValues): ContactErrors => {
  const e: ContactErrors = {};
  const name = v.name.trim();
  const email = v.email.trim();
  const msg = v.message.trim();

  if (name.length < 2) e.name = "Podaj imie (min. 2 znaki).";
  if (!email.includes("@") || !email.includes(".")) {
    e.email = "Podaj poprawny e-mail.";
  }
  if (msg.length < 10) e.message = "Wiadomosc jest za krotka (min. 10 znakow).";

  return e;
};

const ContactSection = ({ id }: { id?: string }) => {
  const [values, setValues] = useState<ContactValues>({
    name: "",
    email: "",
    message: "",
  });
  const [honeyPot, setHoneyPot] = useState("");
  const [touched, setTouched] = useState<Record<FieldName, boolean>>({
    name: false,
    email: false,
    message: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("\u00A0");

  const errors = useMemo(() => validate(values), [values]);

  const showError = (field: FieldName) => (touched[field] ? errors[field] : undefined);

  const handleChange = (name: FieldName, v: string) => {
    setValues((prev) => ({ ...prev, [name]: v }));
    if (status !== "idle") {
      setStatus("idle");
      setStatusMessage("\u00A0");
    }
  };

  const handleBlur = (name: FieldName) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async () => {
    setTouched({ name: true, email: true, message: true });

    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) return;

    // Basic anti-spam: bots often fill hidden fields.
    if (honeyPot.trim().length > 0) {
      setStatus("success");
      setStatusMessage("Dzieki! Wiadomosc poszla.");
      return;
    }

    if (!EMAILJS_CONFIGURED) {
      setStatus("error");
      setStatusMessage("Kontakt chwilowo niedostepny. Brak konfiguracji formularza.");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    setStatusMessage("\u00A0");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: values.name.trim(),
          reply_to: values.email.trim(),
          message: values.message.trim(),
          page_url: typeof window === "undefined" ? "" : window.location.href,
        },
        EMAILJS_PUBLIC_KEY,
      );

      setStatus("success");
      setStatusMessage("Dzieki! Wiadomosc poszla.");
      setValues({ name: "", email: "", message: "" });
      setTouched({ name: false, email: false, message: false });
      setHoneyPot("");
    } catch {
      setStatus("error");
      setStatusMessage("Cos nie poszlo. Sprobuj ponownie.");
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
        <Typography variant="h3" sx={{ fontWeight: 900, color: "primary.main" }}>
          Kontakt
        </Typography>
        <Typography sx={{ opacity: 0.8 }}>Masz pytanie? Napisz - odpisze.</Typography>
      </Stack>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 12, lg: 7 }}>
          <Stack spacing={2}>
            <Box
              aria-hidden="true"
              sx={{
                position: "absolute",
                width: 1,
                height: 1,
                overflow: "hidden",
                clipPath: "inset(50%)",
              }}
            >
              <label htmlFor="contact_company">Company</label>
              <input
                id="contact_company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeyPot}
                onChange={(event) => setHoneyPot(event.target.value)}
              />
            </Box>

            <StickerField
              id="contact_name"
              name="name"
              placeholder="Twoje imie"
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
              placeholder="Napisz, w czym pomoc..."
              multiline
              minRows={6}
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              error={showError("message")}
            />

            <Button
              variant="contained"
              color="secondary"
              disabled={isSubmitting}
              sx={{ px: 3, alignSelf: "flex-start" }}
              onClick={handleSubmit}
            >
              {isSubmitting ? "Wysylam..." : "Wyslij"}
            </Button>

            <Typography
              sx={{
                minHeight: 24,
                fontWeight: 800,
                color: status === "error" ? "#c24b4b" : "rgba(18,28,56,0.85)",
              }}
              aria-live="polite"
            >
              {statusMessage}
            </Typography>
          </Stack>
        </Grid>

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

                <Typography sx={{ fontWeight: 900 }}>1) Co dostaje po zakupie?</Typography>
                <Typography sx={{ opacity: 0.85 }}>
                  PDF do pobrania (docelowo przez WooCommerce).
                </Typography>

                <Typography sx={{ fontWeight: 900, pt: 1 }}>
                  2) Czy darmowki sa bez konta?
                </Typography>
                <Typography sx={{ opacity: 0.85 }}>
                  Tak. Docelowo klik i PDF otworzy sie w nowej karcie.
                </Typography>

                <Typography sx={{ fontWeight: 900, pt: 1 }}>
                  3) Dla kogo sa materialy?
                </Typography>
                <Typography sx={{ opacity: 0.85 }}>
                  Dla uczniow, nauczycieli i do nauki solo - wybierz kategorie.
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
