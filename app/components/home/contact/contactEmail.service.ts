import type { ContactValues } from "./contactForm.types";

type ContactSubmitMeta = {
  honeyPot: string;
  formStartedAt: number;
  turnstileToken?: string;
};

const CONTACT_API_URL = "/api/contact";

export const sendContactEmail = async (
  values: ContactValues,
  meta: ContactSubmitMeta,
) => {
  const response = await fetch(CONTACT_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
      honeyPot: meta.honeyPot.trim(),
      formStartedAt: meta.formStartedAt,
      turnstileToken: meta.turnstileToken ?? "",
      pageUrl: typeof window === "undefined" ? "" : window.location.href,
    }),
  });

  const payload = (await response.json().catch(() => null)) as
    | { error?: string }
    | null;

  if (!response.ok) {
    throw new Error(payload?.error || "Nie udało się wysłać formularza.");
  }
};
