import type { ContactErrors, ContactValues } from "./contactForm.types";

export const validateContactValues = (values: ContactValues): ContactErrors => {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (name.length < 2) {
    errors.name = "Podaj imię (min. 2 znaki).";
  }
  if (!email.includes("@") || !email.includes(".")) {
    errors.email = "Podaj poprawny e-mail.";
  }
  if (message.length < 10) {
    errors.message = "Wiadomość jest za krótka (min. 10 znaków).";
  }

  return errors;
};
