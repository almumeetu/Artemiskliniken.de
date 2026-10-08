import React, { useState } from 'react';
import { Search, Calendar, Phone, Menu, X, Eye, Type, Contrast, MapPin, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { ARTEMIS_IMAGES } from '../data/imageAssets';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: () => void;
  onOpenSearch: () => void;
  onOpenEmergency: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenBooking,
  onOpenSearch,
  onOpenEmergency,
}) => {
  const { t } = useLanguage();
  const { textSize, setTextSize, highContrast, setHighContrast } = useAccessibility();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showA11yMenu, setShowA11yMenu] = useState(false);

  const navLinks = [
    { id: 'behandlungen', label: t('Behandlungen', 'Treatments') },
    { id: 'aerzte', label: t('Ärzte', 'Doctors') },
    { id: 'standorte', label: t('Standorte', 'Locations') },
    { id: 'patienten-info', label: t('Patienten-Info', 'Patient Info') },
  ];

  const handleNavLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const cycleTextSize = () => {
    if (textSize === 'normal') setTextSize('large');
    else if (textSize === 'large') setTextSize('xlarge');
    else setTextSize('normal');
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#dce3ec] bg-white/95 backdrop-blur-xl">
        <div className="hidden md:block bg-[#173c78] text-white/90 text-[11px]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 h-8 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <span className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#8bd3d9]" />Augenzentrum Leverkusen &amp; Praxis Opladen</span>
            </div>
            <span className="text-white/70">Standorte, Leistungen und Kontakt auf einen Blick</span>
          </div>
        </div>
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-[4px] px-[12px] sm:h-[84px] sm:gap-4 sm:px-6 lg:px-8">
          
          {/* Brand wordmark from the supplied ARTEMIS assets */}
          <div className="min-w-0 shrink-0">
            <button
              onClick={() => onNavigate('home')}
              className="rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
              aria-label="ARTEMIS Augenzentrum Leverkusen Startseite"
            >
              <img className="h-auto w-[144px] min-[380px]:w-[160px] sm:w-[224px]" src={ARTEMIS_IMAGES.logo} alt="ARTEMIS Augenkliniken und medizinische Versorgungszentren" />
              <span className="sr-only">Leverkusen und Opladen</span>
            </button>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav
            aria-label="Hauptnavigation"
            className="hidden xl:flex items-center gap-5 text-sm font-medium text-slate-700"
          >
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavLinkClick(link.id)}
                  className={`py-2 transition-colors relative whitespace-nowrap hover:text-[#087bb2] ${
                    isActive ? 'text-[#087bb2] font-semibold' : 'text-slate-600'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#28a9d8]"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions + functional tools */}
          <div className="flex items-center gap-[4px] sm:gap-3">
            
            {/* Universal Search */}
            <button
              onClick={onOpenSearch}
              className="grid h-[40px] w-[40px] place-items-center rounded-full text-[#173c78] transition-colors hover:bg-[#e8f3f3] focus:ring-2 focus:ring-[#28a9d8] sm:h-auto sm:w-auto sm:rounded-lg sm:p-2 sm:text-slate-600"
              aria-label={t('Suche öffnen (Behandlungen, Ärzte, Symptome)', 'Open search')}
              title={t('Suche', 'Search')}
            >
              <Search className="w-5 h-5" aria-hidden="true" />
            </button>

            {/* Accessibility toggle dropdown */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setShowA11yMenu(!showA11yMenu)}
                className={`rounded-lg p-1.5 transition-colors focus:ring-2 focus:ring-sky-600 sm:p-2 ${
                  highContrast || textSize !== 'normal'
                    ? 'bg-[#d8eff0] text-[#173c78]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                aria-label={t('Barrierefreiheit & Schriftgröße anpassen', 'Accessibility options')}
                aria-expanded={showA11yMenu}
                title={t('Barrierefreiheit', 'Accessibility')}
              >
                <Eye className="w-5 h-5" aria-hidden="true" />
              </button>

              {showA11yMenu && (
                <div
                  className="absolute right-0 z-50 mt-2 w-64 rounded-xl border border-[#dce3ec] bg-white p-3 text-xs shadow-xl"
                  role="dialog"
                  aria-label={t('Optionen für Barrierefreiheit', 'Accessibility settings')}
                >
                  <p className="font-semibold text-slate-800 mb-2">
                    {t('Barrierefreiheit & Lesbarkeit', 'Accessibility & Readability')}
                  </p>
                  
                  <div className="space-y-2">
                    <button
                      onClick={cycleTextSize}
                      className="w-full flex items-center justify-between p-2 rounded bg-slate-50 hover:bg-slate-100 text-slate-700"
                    >
                      <span className="flex items-center gap-2">
                        <Type className="w-4 h-4 text-sky-700" />
                        {t('Schriftgröße', 'Font Size')}:
                      </span>
                      <span className="font-bold text-sky-800 uppercase">
                        {textSize}
                      </span>
                    </button>

                    <button
                      onClick={() => setHighContrast(!highContrast)}
                      className={`w-full flex items-center justify-between p-2 rounded transition-colors ${
                        highContrast
                          ? 'bg-sky-700 text-white font-semibold'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Contrast className="w-4 h-4" />
                        {t('Hoher Kontrast', 'High Contrast')}
                      </span>
                      <span>{highContrast ? t('An', 'On') : t('Aus', 'Off')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Primary Action CTA: Termin buchen */}
            <button
              onClick={onOpenBooking}
              aria-label={t('Termin vereinbaren', 'Book an appointment')}
              title={t('Termin vereinbaren', 'Book an appointment')}
              className="hidden items-center gap-2 whitespace-nowrap rounded-lg bg-[#087bb2] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#173c78] active:bg-[#0a3268] focus:ring-2 focus:ring-[#28a9d8] sm:inline-flex md:text-sm"
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>{t('Termin', 'Book')}</span>
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`grid h-[40px] w-[40px] place-items-center rounded-full transition-colors focus:ring-2 focus:ring-[#28a9d8] xl:hidden ${
                mobileMenuOpen ? 'bg-[#173c78] text-white' : 'bg-[#eef5f8] text-[#173c78] hover:bg-[#dcecf2]'
              }`}
              aria-label={mobileMenuOpen ? t('Menü schließen', 'Close menu') : t('Menü öffnen', 'Open menu')}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Navigation */}
        {mobileMenuOpen && (
          <div id="mobile-navigation" className="border-t border-slate-200 bg-white shadow-xl xl:hidden">
            <div className="mx-auto max-w-7xl px-4 pb-5 pt-4 sm:px-6">
            <div className="mb-4 flex flex-col space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavLinkClick(link.id)}
                  className={`rounded-lg px-3 py-2.5 text-left text-[0.95rem] font-medium transition-colors ${
                    currentTab === link.id
                      ? 'bg-[#edf6fa] font-semibold text-[#173c78]'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="space-y-2 border-t border-slate-200 pt-4">
              <button
                onClick={() => {
                  onOpenBooking();
                  setMobileMenuOpen(false);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#087bb2] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#173c78] sm:hidden"
              >
                <Calendar className="w-4 h-4" />
                {t('Termin online vereinbaren', 'Book Appointment Online')}
              </button>

              <div className="grid grid-cols-2 gap-2 sm:hidden">
                <a
                  href="tel:+4921444488"
                  className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#dce3ec] bg-white px-3 py-2.5 text-sm font-semibold text-[#173c78]"
                  aria-label="ARTEMIS Augenzentrum Leverkusen anrufen: 0214 44488"
                >
                  <Phone className="h-4 w-4 text-[#087bb2]" aria-hidden="true" />
                  Anrufen
                </a>
                <button
                  type="button"
                  onClick={() => setShowA11yMenu(!showA11yMenu)}
                  className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#dce3ec] bg-white px-3 py-2.5 text-sm font-semibold text-[#173c78]"
                  aria-expanded={showA11yMenu}
                  aria-controls="mobile-accessibility"
                >
                  <Eye className="h-4 w-4 text-[#087bb2]" aria-hidden="true" />
                  Lesbarkeit
                </button>
              </div>

              {showA11yMenu && (
                <div id="mobile-accessibility" className="grid gap-2 rounded-lg bg-[#f3f7fa] p-3 sm:hidden">
                  <button
                    type="button"
                    onClick={cycleTextSize}
                    className="flex items-center justify-between rounded-md bg-white px-3 py-2.5 text-sm text-slate-700"
                  >
                    <span className="flex items-center gap-2"><Type className="h-4 w-4 text-[#087bb2]" />Schriftgröße</span>
                    <span className="font-bold uppercase text-[#173c78]">{textSize}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setHighContrast(!highContrast)}
                    className={`flex items-center justify-between rounded-md px-3 py-2.5 text-sm ${highContrast ? 'bg-[#173c78] text-white' : 'bg-white text-slate-700'}`}
                  >
                    <span className="flex items-center gap-2"><Contrast className="h-4 w-4" />Hoher Kontrast</span>
                    <span className="font-semibold">{highContrast ? 'An' : 'Aus'}</span>
                  </button>
                </div>
              )}

              <button
                onClick={() => {
                  onOpenEmergency();
                  setMobileMenuOpen(false);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-medium text-slate-700"
              >
                <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                {t('Akute Beschwerden – Notfallhinweise', 'Urgent symptoms – emergency guidance')}
              </button>
            </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
