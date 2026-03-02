"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import type { CookiePreferences } from "@/app/lib/cookieConsent";

type CookieConsentSettingsDialogProps = {
  open: boolean;
  preferences: CookiePreferences;
  onClose: () => void;
  onPreferencesChange: (preferences: CookiePreferences) => void;
  onSave: () => void;
};

const CookieConsentSettingsDialog = ({
  open,
  preferences,
  onClose,
  onPreferencesChange,
  onSave,
}: CookieConsentSettingsDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 900, color: "primary.main" }}>
        Ustawienia cookies
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2.25}>
          <Typography sx={{ opacity: 0.9 }}>
            Możesz zmienić zgodę dla kategorii opcjonalnych. Cookies niezbędne
            są zawsze aktywne, ponieważ bez nich sklep nie będzie działał
            poprawnie.
          </Typography>

          <FormControlLabel
            control={<Switch checked disabled />}
            label="Niezbędne (zawsze aktywne)"
          />

          <FormControlLabel
            control={
              <Switch
                checked={preferences.analytics}
                onChange={(_, checked) =>
                  onPreferencesChange({
                    ...preferences,
                    analytics: checked,
                  })
                }
              />
            }
            label="Analityczne"
          />

          <FormControlLabel
            control={
              <Switch
                checked={preferences.marketing}
                onChange={(_, checked) =>
                  onPreferencesChange({
                    ...preferences,
                    marketing: checked,
                  })
                }
              />
            }
            label="Marketingowe"
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose} color="primary" variant="text">
          Anuluj
        </Button>
        <Button onClick={onSave} color="secondary" variant="contained">
          Zapisz wybór
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CookieConsentSettingsDialog;

