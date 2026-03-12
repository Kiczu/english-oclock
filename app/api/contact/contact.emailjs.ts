import {
  EMAILJS_PRIVATE_KEY,
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SEND_URL,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
} from "./contact.config";
import { CONTACT_ERRORS, ContactRequestError } from "./contact.errors";
import type { EmailSendParams } from "./contact.types";

export const sendEmailWithEmailJs = async (params: EmailSendParams) => {
  if (
    !EMAILJS_SERVICE_ID ||
    !EMAILJS_TEMPLATE_ID ||
    !EMAILJS_PUBLIC_KEY ||
    !EMAILJS_PRIVATE_KEY
  ) {
    console.error("[api/contact] emailjs config missing", {
      hasServiceId: Boolean(EMAILJS_SERVICE_ID),
      hasTemplateId: Boolean(EMAILJS_TEMPLATE_ID),
      hasPublicKey: Boolean(EMAILJS_PUBLIC_KEY),
      hasPrivateKey: Boolean(EMAILJS_PRIVATE_KEY),
    });
    throw new ContactRequestError(CONTACT_ERRORS.serviceUnavailable, 503);
  }

  const payload = {
    service_id: EMAILJS_SERVICE_ID,
    template_id: EMAILJS_TEMPLATE_ID,
    user_id: EMAILJS_PUBLIC_KEY,
    accessToken: EMAILJS_PRIVATE_KEY,
    template_params: {
      from_name: params.name,
      reply_to: params.email,
      message: params.message,
      page_url: params.pageUrl,
      source: "website-contact-form",
    },
  };

  const response = await fetch(EMAILJS_SEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    console.error("[api/contact] emailjs send failed", {
      status: response.status,
      body: errorText,
    });

    if (response.status === 429) {
      throw new ContactRequestError(CONTACT_ERRORS.sendTooFast, 429);
    }

    if (response.status === 401 || response.status === 403) {
      throw new ContactRequestError(CONTACT_ERRORS.serviceUnavailable, 503);
    }

    throw new ContactRequestError(CONTACT_ERRORS.sendFailed, 502);
  }
};
