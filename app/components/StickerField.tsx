"use client";

import { Box, InputBase, Typography } from "@mui/material";
import {
  roughInputWideA_Thick,
  roughInputWideB_Thick,
  roughTextareaWideA_Thick,
  roughTextareaWideB_Thick,
} from "@/app/helpers/stickerField";

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

  const describedBy = error ? `${id}-error` : undefined;

  return (
    <Box sx={{ display: "grid", gap: 1 }}>
      <Box
        sx={{
          position: "relative",
          background: "#f5efe7",
          borderRadius: 2,
          boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
          overflow: "hidden",
          aspectRatio: multiline ? "1200 / 280" : "1200 / 110",

          "&::before": {
            content: '""',
            pointerEvents: "none",
            position: "absolute",
            inset: 0.5,
            backgroundImage: `url("data:image/svg+xml,${frame}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            transform: "translateX(-3px)",
            zIndex: 0,
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            display: "flex",
            alignItems: multiline ? "stretch" : "center",
            px: 5,
            pt: multiline ? 5 : 0,
            pb: multiline ? 3 : 0,
          }}
        >
          <InputBase
            value={value}
            multiline={multiline}
            minRows={multiline ? minRows : undefined}
            placeholder={placeholder}
            onChange={(e) => onChange(name, e.target.value)}
            onBlur={() => onBlur?.(name)}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            sx={{
              width: "100%",
              fontWeight: 700,
              fontSize: 18,
              color: "rgba(18,28,56,0.95)",

              "& textarea": {
                lineHeight: 1.6,
                resize: "none",
                paddingTop: "38px",
                boxSizing: "border-box",
              },

              "& input::placeholder, & textarea::placeholder": {
                color: "rgba(18,28,56,0.45)",
                fontWeight: 700,
                opacity: 1,
              },
            }}
          />
        </Box>
      </Box>

      {error ? (
        <Typography
          id={`${id}-error`}
          sx={{ fontSize: 13, fontWeight: 700, color: "#c24b4b", pl: 1 }}
        >
          {error}
        </Typography>
      ) : null}
    </Box>
  );
};

export default StickerField;
