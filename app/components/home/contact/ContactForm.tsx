"use client";

import Script from "next/script";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import StickerField from "../../stickerField/StickerField";
import {
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
const TURNSTILE_REQUIRED_MESSAGE = "Potwierdz zabezpieczenie antyspamowe.";
const TURNSTILE_FAILED_MESSAGE =
  "Nie udalo sie potwierdzic zabezpieczenia antyspamowego. Sprobuj ponownie.";
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

type TurnstileWidgetId = string | number;

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      size?: "normal" | "compact" | "flexible";
      appearance?: "always" | "interaction-only";
      theme?: "light" | "dark" | "auto";
      callback?: (token: string) => void;
      "error-callback"?: (errorCode?: string) => void;
      "expired-callback"?: () => void;
    },
  ) => TurnstileWidgetId;
  execute: (widgetId: TurnstileWidgetId) => void;
  reset: (widgetId: TurnstileWidgetId) => void;
  remove?: (widgetId: TurnstileWidgetId) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

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
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now());
  const [honeyPot, setHoneyPot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [touched, setTouched] =
    useState<Record<FieldName, boolean>>(initialTouched);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [statusMessage, setStatusMessage] =
    useState<string>(EMPTY_STATUS_MESSAGE);
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetIdRef = useRef<TurnstileWidgetId | null>(null);
  const isTurnstileRequired = Boolean(TURNSTILE_SITE_KEY);
  const isTurnstileVerified = !isTurnstileRequired || Boolean(turnstileToken);

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

  const resetTurnstile = () => {
    setTurnstileToken("");

    const widgetId = turnstileWidgetIdRef.current;
    if (widgetId !== null) {
      window.turnstile?.reset(widgetId);
    }
  };

  const initTurnstileWidget = useCallback(() => {
    if (!TURNSTILE_SITE_KEY) return;
    if (!window.turnstile) return;
    if (!turnstileContainerRef.current) return;
    if (turnstileWidgetIdRef.current !== null) return;

    turnstileWidgetIdRef.current = window.turnstile.render(
      turnstileContainerRef.current,
      {
        sitekey: TURNSTILE_SITE_KEY,
        appearance: "always",
        size: "flexible",
        theme: "light",
        callback: (token) => {
          setTurnstileToken(token);
          setStatus("idle");
          setStatusMessage(EMPTY_STATUS_MESSAGE);
        },
        "error-callback": (errorCode) => {
          if (process.env.NODE_ENV !== "production") {
            console.warn("[contact] turnstile error", errorCode);
          }
          setTurnstileToken("");
          setStatus("error");
          setStatusMessage(TURNSTILE_FAILED_MESSAGE);
        },
        "expired-callback": () => {
          setTurnstileToken("");
        },
      },
    );
  }, []);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    initTurnstileWidget();

    return () => {
      const widgetId = turnstileWidgetIdRef.current;
      if (widgetId !== null && window.turnstile?.remove) {
        window.turnstile.remove(widgetId);
      }

      turnstileWidgetIdRef.current = null;
    };
  }, [initTurnstileWidget]);

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

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setStatus("error");
      setStatusMessage(TURNSTILE_REQUIRED_MESSAGE);
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    setStatusMessage(EMPTY_STATUS_MESSAGE);

    try {
      await sendContactEmail(values, {
        honeyPot,
        formStartedAt,
        turnstileToken: turnstileToken || undefined,
      });
      setStatus("success");
      setStatusMessage(SUCCESS_MESSAGE);
      setValues(initialValues);
      setTouched(initialTouched);
      setHoneyPot("");
      setFormStartedAt(Date.now());
      resetTurnstile();
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : ERROR_MESSAGE);
      resetTurnstile();
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

      {isTurnstileRequired ? (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            strategy="afterInteractive"
            onLoad={initTurnstileWidget}
          />
        </>
      ) : null}

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

      {isTurnstileRequired ? (
        <>
          <Typography component="p" sx={contactFormStyles.turnstileLabel}>
            Potwierdz, ze jestes czlowiekiem
          </Typography>
          <Box sx={contactFormStyles.turnstileMount}>
            <div ref={turnstileContainerRef} />
          </Box>
        </>
      ) : null}

      <Button
        type="submit"
        variant="contained"
        color="secondary"
        disabled={isSubmitting || !isTurnstileVerified}
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
