"use client";

import * as React from "react";
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

const CookieConsentContext = React.createContext<CookieConsentContextValue | null>(null);

const DEFAULT_PREFERENCES: CookiePreferences = {
  analytics: false,
  marketing: false,
};

export const CookieConsentProvider = ({ children }: { children: React.ReactNode }) => {
  const [consent, setConsent] = React.useState<CookieConsentState | null>(null);
  const [ready, setReady] = React.useState(false);
  const [isBannerOpen, setIsBannerOpen] = React.useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [preferences, setPreferences] = React.useState<CookiePreferences>(DEFAULT_PREFERENCES);

  React.useEffect(() => {
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

  const acceptAll = React.useCallback(() => {
    const next = saveCookieConsent({ analytics: true, marketing: true });
    setConsent(next);
    setPreferences({
      analytics: next.analytics,
      marketing: next.marketing,
    });
    setIsBannerOpen(false);
    setIsSettingsOpen(false);
  }, []);

  const rejectOptional = React.useCallback(() => {
    const next = saveCookieConsent({ analytics: false, marketing: false });
    setConsent(next);
    setPreferences({
      analytics: next.analytics,
      marketing: next.marketing,
    });
    setIsBannerOpen(false);
    setIsSettingsOpen(false);
  }, []);

  const savePreferences = React.useCallback((nextPreferences: CookiePreferences) => {
    const next = saveCookieConsent(nextPreferences);
    setConsent(next);
    setPreferences({
      analytics: next.analytics,
      marketing: next.marketing,
    });
    setIsBannerOpen(false);
    setIsSettingsOpen(false);
  }, []);

  const openSettings = React.useCallback(() => {
    setIsSettingsOpen(true);
  }, []);

  const closeSettings = React.useCallback(() => {
    setIsSettingsOpen(false);
  }, []);

  const value = React.useMemo<CookieConsentContextValue>(
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
  const context = React.useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used inside CookieConsentProvider");
  }
  return context;
};

