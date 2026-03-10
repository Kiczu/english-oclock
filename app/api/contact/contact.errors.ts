export const CONTACT_ERRORS = {
  invalidPayload: "Nieprawidlowe dane formularza.",
  invalidFields: "Formularz zawiera bledy.",
  formTooFast: "Wyslij formularz po chwili od jego otwarcia.",
  antiSpamFailed: "Nie udalo sie potwierdzic zabezpieczenia antyspamowego.",
  sendTooFast: "Wysylasz za szybko. Sprobuj ponownie za chwile.",
  tooManyAttempts: "Za duzo prob. Sprobuj ponownie pozniej.",
  serviceUnavailable:
    "Kontakt chwilowo niedostepny. Sprobuj ponownie pozniej.",
  sendFailed: "Nie udalo sie wyslac formularza. Sprobuj ponownie.",
} as const;

export class ContactRequestError extends Error {
  readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}
