"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import { useState, type FormEvent } from "react";
import StickerField from "../../stickerField/StickerField";
import {
  isContactEmailConfigured,
  sendContactEmail,
} from "./contactEmail.service";
import type {
  ContactValues,
  FieldName,
  SubmitStatus,
} from "./contactForm.types";
import { validateContactValues } from "./contactForm.validation";
import { contactFormStyles } from "./ContactForm.styles";

const EMPTY_STATUS_MESSAGE = "\u00A0";
const SUCCESS_MESSAGE = "Dzieki! Wiadomosc poszla.";
const ERROR_MESSAGE = "Cos nie poszlo. Sprobuj ponownie.";
const CONFIG_ERROR_MESSAGE =
  "Kontakt chwilowo niedostepny. Brak konfiguracji formularza.";

const initialValues: ContactValues = {
  name: "",
  email: "",
  message: "",
};

const initialTouched: Record<FieldName, boolean> = {
  name: false,
  email: false,
  message: false,
};

const ContactForm = () => {
  const [values, setValues] = useState<ContactValues>(initialValues);
  const [honeyPot, setHoneyPot] = useState("");
  const [touched, setTouched] =
    useState<Record<FieldName, boolean>>(initialTouched);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [statusMessage, setStatusMessage] =
    useState<string>(EMPTY_STATUS_MESSAGE);

  const errors = validateContactValues(values);

  const showError = (field: FieldName) =>
    touched[field] ? errors[field] : undefined;

  const resetStatus = () => {
    if (status !== "idle") {
      setStatus("idle");
      setStatusMessage(EMPTY_STATUS_MESSAGE);
    }
  };

  const handleChange = (name: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    resetStatus();
  };

  const handleBlur = (name: FieldName) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTouched({ ...initialTouched, name: true, email: true, message: true });

    const validationErrors = validateContactValues(values);
    if (Object.keys(validationErrors).length > 0) return;

    if (honeyPot.trim().length > 0) {
      setStatus("success");
      setStatusMessage(SUCCESS_MESSAGE);
      return;
    }

    if (!isContactEmailConfigured()) {
      setStatus("error");
      setStatusMessage(CONFIG_ERROR_MESSAGE);
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    setStatusMessage(EMPTY_STATUS_MESSAGE);

    try {
      await sendContactEmail(values);
      setStatus("success");
      setStatusMessage(SUCCESS_MESSAGE);
      setValues(initialValues);
      setTouched(initialTouched);
      setHoneyPot("");
    } catch {
      setStatus("error");
      setStatusMessage(ERROR_MESSAGE);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Stack component="form" noValidate spacing={2} onSubmit={handleSubmit}>
      <Box aria-hidden="true" sx={contactFormStyles.honeypot}>
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
        type="submit"
        variant="contained"
        color="secondary"
        disabled={isSubmitting}
        sx={contactFormStyles.submitButton}
      >
        {isSubmitting ? "Wysylam..." : "Wyslij"}
      </Button>

      <Typography
        sx={contactFormStyles.status(status === "error")}
        aria-live="polite"
      >
        {statusMessage}
      </Typography>
    </Stack>
  );
};

export default ContactForm;
