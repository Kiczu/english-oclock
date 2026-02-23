"use client";

import { Box, InputBase, Typography } from "@mui/material";
import {
  roughInputWideA_Thick,
  roughInputWideB_Thick,
  roughTextareaWideA_Thick,
  roughTextareaWideB_Thick,
} from "@/app/helpers/stickerField";
import { stickerFieldStyles } from "./StickerField.styles";

type FieldName = "name" | "email" | "message";

type StickerFieldProps = {
  id: string;
  name: FieldName;
  placeholder?: string;
  multiline?: boolean;
  minRows?: number;
  value: string;
  onChange: (name: FieldName, v: string) => void;
  onBlur?: (name: FieldName) => void;
  error?: string;
};

function hash01(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const u = h >>> 0;
  return (u % 10_000) / 10_000;
}

const StickerField = ({
  id,
  name,
  placeholder,
  multiline,
  minRows = 6,
  value,
  error,
  onChange,
  onBlur,
}: StickerFieldProps) => {
  const t = hash01(id);
  const useA = t > 0.5;

  const frame = multiline
    ? useA
      ? roughTextareaWideA_Thick
      : roughTextareaWideB_Thick
    : useA
      ? roughInputWideA_Thick
      : roughInputWideB_Thick;

  const describedBy = `${id}-error`;

  return (
    <Box sx={stickerFieldStyles.root}>
      <Box sx={stickerFieldStyles.frameBox(Boolean(multiline), frame)}>
        <Box sx={stickerFieldStyles.inputWrap(Boolean(multiline))}>
          <InputBase
            value={value}
            multiline={multiline}
            minRows={multiline ? minRows : undefined}
            placeholder={placeholder}
            onChange={(e) => onChange(name, e.target.value)}
            onBlur={() => onBlur?.(name)}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            sx={stickerFieldStyles.inputBase}
          />
        </Box>
      </Box>

      <Typography
        id={`${id}-error`}
        aria-live="polite"
        sx={stickerFieldStyles.errorText(Boolean(error))}
      >
        {error ?? "\u00A0"}
      </Typography>
    </Box>
  );
};

export default StickerField;
