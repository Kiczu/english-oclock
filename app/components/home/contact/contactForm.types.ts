export type ContactValues = {
  name: string;
  email: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;
export type FieldName = keyof ContactValues;
export type SubmitStatus = "idle" | "success" | "error";
