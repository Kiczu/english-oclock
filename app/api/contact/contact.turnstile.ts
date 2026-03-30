import {
  TURNSTILE_SECRET_KEY,
  TURNSTILE_SITE_KEY,
  TURNSTILE_VERIFY_URL,
} from "./contact.config";
import { CONTACT_ERRORS, ContactRequestError } from "./contact.errors";
import type { TurnstileVerifyPayload } from "./contact.types";

export const verifyTurnstile = async (token: string, ip: string) => {
  const hasSiteKey = Boolean(TURNSTILE_SITE_KEY);
  const hasSecretKey = Boolean(TURNSTILE_SECRET_KEY);

  // Turnstile is optional only when both keys are missing.
  if (!hasSiteKey && !hasSecretKey) return;

  // If one key is missing, configuration is broken and protection is unreliable.
  if (hasSiteKey !== hasSecretKey) {
    console.error("[api/contact] turnstile config mismatch", {
      hasSiteKey,
      hasSecretKey,
    });
    throw new ContactRequestError(CONTACT_ERRORS.serviceUnavailable, 503);
  }

  if (!token) {
    throw new ContactRequestError(CONTACT_ERRORS.antiSpamFailed, 400);
  }

  const form = new URLSearchParams();
  form.set("secret", TURNSTILE_SECRET_KEY);
  form.set("response", token);

  if (ip && ip !== "unknown") {
    form.set("remoteip", ip);
  }

  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString(),
    cache: "no-store",
  });

  const rawPayload = await response.text().catch(() => "");
  let payload: TurnstileVerifyPayload | null = null;
  if (rawPayload.length > 0) {
    try {
      payload = JSON.parse(rawPayload) as TurnstileVerifyPayload;
    } catch {
      payload = null;
    }
  }

  if (!response.ok) {
    console.warn("[api/contact] turnstile verify non-2xx response", {
      status: response.status,
      body: rawPayload,
    });
    throw new ContactRequestError(CONTACT_ERRORS.antiSpamFailed, 400);
  }

  if (!payload?.success) {
    console.warn("[api/contact] turnstile rejected token", {
      errorCodes: payload?.["error-codes"] ?? [],
    });
    throw new ContactRequestError(CONTACT_ERRORS.antiSpamFailed, 400);
  }
};
