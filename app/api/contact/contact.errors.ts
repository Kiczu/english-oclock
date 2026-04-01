export const CONTACT_ERRORS = {
  invalidPayload: "Nieprawidłowe dane formularza.",
  invalidFields: "Formularz zawiera błędy.",
  formTooFast: "Wyślij formularz po chwili od jego otwarcia.",
  antiSpamFailed: "Nie udało się potwierdzić zabezpieczenia antyspamowego.",
  sendTooFast: "Wysyłasz za szybko. Spróbuj ponownie za chwilę.",
  tooManyAttempts: "Za dużo prób. Spróbuj ponownie później.",
  serviceUnavailable:
    "Kontakt chwilowo niedostępny. Spróbuj ponownie później.",
  sendFailed: "Nie udało się wysłać formularza. Spróbuj ponownie.",
} as const;

export class ContactRequestError extends Error {
  readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}
