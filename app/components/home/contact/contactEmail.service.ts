import emailjs from "@emailjs/browser";
import type { ContactValues } from "./contactForm.types";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

export const isContactEmailConfigured = () =>
  Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);

export const sendContactEmail = async (values: ContactValues) => {
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
};
