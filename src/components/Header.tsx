import React, { useState } from 'react';
import { Search, Calendar, Phone, Globe, Menu, X, Eye, Type, Contrast, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAccessibility } from '../context/AccessibilityContext';

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
  const { language, setLanguage, t } = useLanguage();
  const { textSize, setTextSize, highContrast, setHighContrast } = useAccessibility();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showA11yMenu, setShowA11yMenu] = useState(false);

  const navLinks = [
    { id: 'behandlungen', label: t('Behandlungen', 'Treatments') },
    { id: 'augenkrankheiten', label: t('Augenkrankheiten', 'Conditions') },
    { id: 'diagnostik', label: t('Diagnostik', 'Diagnostics') },
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
      <header className="sticky top-0 z-40 bg-[#fbfaf7]/95 backdrop-blur-xl border-b border-[#d8e5e7]">
        <div className="hidden md:block bg-[#12304a] text-white/90 text-[11px]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 h-8 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <span className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#8bd3d9]" />Leverkusen &amp; Opladen</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#8bd3d9]" />Sprechzeiten: Mo–Fr 08:00–17:00</span>
            </div>
            <span className="text-white/70">Ihre Augen. Unser Anspruch.</span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-[4.5rem] sm:h-[5.25rem] flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Zone 1: Single text element Brand wordmark */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('home')}
              className="text-left group focus:outline-none focus:ring-2 focus:ring-sky-600 rounded-sm"
              aria-label="ARTEMIS Augenzentrum Leverkusen Startseite"
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#12304a] group-hover:text-[#176b87] transition-colors">
                  ARTEMIS
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#176b87] font-semibold border-l border-[#c9dadd] pl-1.5 sm:pl-2">
                  <span className="hidden sm:inline">Leverkusen & Opladen</span>
                  <span className="sm:hidden">Leverkusen</span>
                </span>
              </div>
              <span className="sr-only">Augenzentrum & Praxis Opladen</span>
            </button>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav
            aria-label="Hauptnavigation"
            className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-slate-700"
          >
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavLinkClick(link.id)}
                  className={`py-2 transition-colors relative whitespace-nowrap hover:text-[#176b87] ${
                    isActive ? 'text-[#176b87] font-semibold' : 'text-slate-600'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1689a5]"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions + functional tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Universal Search */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-600 hover:text-[#12304a] hover:bg-[#e8f3f3] rounded-lg transition-colors focus:ring-2 focus:ring-[#1689a5]"
              aria-label={t('Suche öffnen (Behandlungen, Ärzte, Symptome)', 'Open search')}
              title={t('Suche', 'Search')}
            >
              <Search className="w-5 h-5" aria-hidden="true" />
            </button>

            {/* Accessibility toggle dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowA11yMenu(!showA11yMenu)}
                className={`p-2 rounded-lg transition-colors focus:ring-2 focus:ring-sky-600 ${
                  highContrast || textSize !== 'normal'
                    ? 'bg-[#d8eff0] text-[#12304a]'
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
                  className="absolute right-0 mt-2 w-64 bg-[#fbfaf7] rounded-xl shadow-xl border border-[#d8e5e7] p-3 z-50 text-xs"
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

            {/* Language toggle DE / EN */}
            <button
              onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}
              className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-[#12304a] border border-[#c9dadd] rounded-lg hover:bg-[#e8f3f3] transition-colors flex items-center gap-1"
              aria-label={
                language === 'de'
                  ? 'Switch to English version'
                  : 'Zur deutschen Version wechseln'
              }
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
              <span>{language.toUpperCase()}</span>
            </button>

            {/* Primary Action CTA: Termin buchen */}
            <button
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs md:text-sm font-semibold text-white bg-[#176b87] hover:bg-[#12304a] active:bg-[#0c263a] rounded-lg transition-colors shadow-sm whitespace-nowrap focus:ring-2 focus:ring-[#1689a5]"
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>{t('Termin vereinbaren', 'Book Appointment')}</span>
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-[#e8f3f3] rounded-lg transition-colors focus:ring-2 focus:ring-[#1689a5]"
              aria-label={mobileMenuOpen ? t('Menü schließen', 'Close menu') : t('Menü öffnen', 'Open menu')}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 shadow-xl">
            <div className="flex flex-col space-y-1 mb-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavLinkClick(link.id)}
                  className={`text-left px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                    currentTab === link.id
                      ? 'bg-sky-50 text-sky-800 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 space-y-2">
              <button
                onClick={() => {
                  onOpenBooking();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-sky-700 hover:bg-sky-800 text-white font-semibold text-sm shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                {t('Termin online vereinbaren', 'Book Appointment Online')}
              </button>

              <button
                onClick={() => {
                  onOpenEmergency();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-red-50 text-red-700 font-medium text-xs border border-red-200"
              >
                <Phone className="w-4 h-4" />
                {t('Akutfall-Hotline (0214 44488)', 'Urgent Hotline (0214 44488)')}
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
