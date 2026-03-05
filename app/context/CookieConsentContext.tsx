"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import CookieConsentBanner from "@/app/components/cookies/CookieConsentBanner";
import CookieConsentSettingsDialog from "@/app/components/cookies/CookieConsentSettingsDialog";
import {
  readCookieConsent,
  saveCookieConsent,
  type CookieConsentState,
  type CookiePreferences,
} from "@/app/lib/cookieConsent";

type CookieConsentContextValue = {
  consent: CookieConsentState | null;
  openSettings: () => void;
  acceptAll: () => void;
  rejectOptional: () => void;
  savePreferences: (preferences: CookiePreferences) => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

const DEFAULT_PREFERENCES: CookiePreferences = {
  analytics: false,
  marketing: false,
};

export const CookieConsentProvider = ({ children }: { children: ReactNode }) => {
  const [consent, setConsent] = useState<CookieConsentState | null>(null);
  const [ready, setReady] = useState(false);
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);

  /* eslint-disable react-hooks/set-state-in-effect -- cookie consent is read from browser cookies after mount. */
  useEffect(() => {
    const storedConsent = readCookieConsent();
    setConsent(storedConsent);
    if (storedConsent) {
      setPreferences({
        analytics: storedConsent.analytics,
        marketing: storedConsent.marketing,
      });
      setIsBannerOpen(false);
    } else {
      setIsBannerOpen(true);
    }
    setReady(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const acceptAll = useCallback(() => {
    const next = saveCookieConsent({ analytics: true, marketing: true });
    setConsent(next);
    setPreferences({
      analytics: next.analytics,
      marketing: next.marketing,
    });
    setIsBannerOpen(false);
    setIsSettingsOpen(false);
  }, []);

  const rejectOptional = useCallback(() => {
    const next = saveCookieConsent({ analytics: false, marketing: false });
    setConsent(next);
    setPreferences({
      analytics: next.analytics,
      marketing: next.marketing,
    });
    setIsBannerOpen(false);
    setIsSettingsOpen(false);
  }, []);

  const savePreferences = useCallback((nextPreferences: CookiePreferences) => {
    const next = saveCookieConsent(nextPreferences);
    setConsent(next);
    setPreferences({
      analytics: next.analytics,
      marketing: next.marketing,
    });
    setIsBannerOpen(false);
    setIsSettingsOpen(false);
  }, []);

  const openSettings = useCallback(() => {
    setIsSettingsOpen(true);
  }, []);

  const closeSettings = useCallback(() => {
    setIsSettingsOpen(false);
  }, []);

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      consent,
      openSettings,
      acceptAll,
      rejectOptional,
      savePreferences,
    }),
    [consent, openSettings, acceptAll, rejectOptional, savePreferences],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}

      {ready && isBannerOpen ? (
        <CookieConsentBanner
          onAcceptAll={acceptAll}
          onRejectOptional={rejectOptional}
          onOpenSettings={openSettings}
        />
      ) : null}

      {ready ? (
        <CookieConsentSettingsDialog
          open={isSettingsOpen}
          preferences={preferences}
          onClose={closeSettings}
          onPreferencesChange={setPreferences}
          onSave={() => savePreferences(preferences)}
        />
      ) : null}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used inside CookieConsentProvider");
  }
  return context;
};

