import React, { useState, useEffect } from 'react';
import { Shield, Settings, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CookieBannerProps {
  forceOpenModal?: boolean;
  onCloseModal?: () => void;
  onNavigatePrivacy: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({
  forceOpenModal = false,
  onCloseModal,
  onNavigatePrivacy,
}) => {
  const { t } = useLanguage();
  const [consentGiven, setConsentGiven] = useState<boolean>(true); // default true to avoid flash
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  
  const [allowAnalytics, setAllowAnalytics] = useState<boolean>(false);
  const [allowPreferences, setAllowPreferences] = useState<boolean>(true);

  useEffect(() => {
    const saved = localStorage.getItem('artemis_cookie_consent');
    if (!saved) {
      setConsentGiven(false);
    }
  }, []);

  useEffect(() => {
    if (forceOpenModal) {
      setShowSettingsModal(true);
    }
  }, [forceOpenModal]);

  const handleAcceptAll = () => {
    localStorage.setItem('artemis_cookie_consent', 'all');
    setConsentGiven(true);
    setShowSettingsModal(false);
    if (onCloseModal) onCloseModal();
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('artemis_cookie_consent', 'essential');
    setConsentGiven(true);
    setShowSettingsModal(false);
    if (onCloseModal) onCloseModal();
  };

  const handleSaveCustom = () => {
    localStorage.setItem(
      'artemis_cookie_consent',
      JSON.stringify({ essential: true, analytics: allowAnalytics, preferences: allowPreferences })
    );
    setConsentGiven(true);
    setShowSettingsModal(false);
    if (onCloseModal) onCloseModal();
  };

  return (
    <>
      {/* Floating Bottom Banner */}
      {!consentGiven && !showSettingsModal && (
        <aside
          role="region"
          aria-label={t('Cookie- und Datenschutzeinstellungen', 'Cookie and Privacy Settings')}
          className="fixed bottom-0 inset-x-0 z-50 p-4 bg-slate-900/95 backdrop-blur-md text-white border-t border-slate-800 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <p className="text-slate-300">
                {t(
                  'Wir nutzen essenzielle Technologien für den Betrieb dieser Website sowie optionale datenschutzfreundliche Dienste, um Ihnen ein optimales medizinisches Informationserlebnis zu bieten. Gesundheitsdaten werden niemals an Werbenetzwerke weitergegeben.',
                  'We utilize essential technologies for site operation and optional privacy-respecting tools to enhance your experience. Health inquiry data is never transferred to ad networks.'
                )}{' '}
                <button
                  onClick={onNavigatePrivacy}
                  className="underline text-sky-400 hover:text-sky-300 ml-1"
                >
                  {t('Mehr in der Datenschutzerklärung', 'Learn more in Privacy Policy')}
                </button>
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto justify-end">
              <button
                onClick={() => setShowSettingsModal(true)}
                className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors"
              >
                {t('Einstellungen', 'Settings')}
              </button>
              <button
                onClick={handleAcceptEssential}
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
              >
                {t('Nur essenzielle', 'Only Essential')}
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-sky-700 hover:bg-sky-600 text-white shadow-sm transition-colors"
              >
                {t('Alle akzeptieren', 'Accept All')}
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Modal Dialog for Granular Cookie Settings */}
      {showSettingsModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto"
        >
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 p-6 text-slate-800">
            <h3 id="cookie-modal-title" className="text-lg font-bold text-slate-900 mb-2">
              {t('Privatsphäre- & Cookie-Einstellungen', 'Privacy & Cookie Settings')}
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              {t(
                'Entscheiden Sie selbst, welche Kategorien Sie aktivieren möchten. Sie können diese Auswahl jederzeit über den Link im Footer ändern.',
                'Control which cookie categories you permit. You may modify your preferences at any time via the footer link.'
              )}
            </p>

            <div className="space-y-4 mb-6">
              {/* Essential */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-xs text-slate-900">
                    {t('Essenziell (Erforderlich)', 'Essential (Mandatory)')}
                  </span>
                  <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wider">
                    {t('Immer aktiv', 'Always Active')}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {t(
                    'Notwendig für die grundlegende Funktion, Formularübermittlung, Barrierefreiheits-Optionen und Sicherheitsfeatures.',
                    'Required for core functions, appointment form dispatch, accessibility state, and security.'
                  )}
                </p>
              </div>

              {/* Preferences */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-xs text-slate-900">
                    {t('Präferenzen & Spracheinstellungen', 'Preferences & Localization')}
                  </span>
                  <input
                    type="checkbox"
                    checked={allowPreferences}
                    onChange={(e) => setAllowPreferences(e.target.checked)}
                    className="rounded text-sky-700 focus:ring-sky-600"
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  {t(
                    'Speichert Ihre bevorzugte Sprache (DE/EN) und Barrierefreiheits-Einstellungen für Ihren nächsten Besuch.',
                    'Stores your preferred language (DE/EN) and font sizing choices across visits.'
                  )}
                </p>
              </div>

              {/* Analytics */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-xs text-slate-900">
                    {t('Anonyme Web-Analyse', 'Anonymous Web Analytics')}
                  </span>
                  <input
                    type="checkbox"
                    checked={allowAnalytics}
                    onChange={(e) => setAllowAnalytics(e.target.checked)}
                    className="rounded text-sky-700 focus:ring-sky-600"
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  {t(
                    'Hilft uns zu verstehen, welche Informationsbereiche für Patientinnen und Patienten am nützlichsten sind (IP-anonymisiert).',
                    'Helps us optimize patient guides with privacy-preserving, anonymized telemetry.'
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-200">
              <button
                onClick={() => {
                  setShowSettingsModal(false);
                  if (onCloseModal) onCloseModal();
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                {t('Abbrechen', 'Cancel')}
              </button>
              <button
                onClick={handleSaveCustom}
                className="px-4 py-2 text-xs font-semibold bg-sky-800 hover:bg-sky-900 text-white rounded-lg shadow-sm"
              >
                {t('Auswahl speichern', 'Save Preferences')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
