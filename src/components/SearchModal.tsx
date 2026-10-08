import React, { useState, useMemo, useEffect } from 'react';
import { X, Search, ChevronRight } from 'lucide-react';
import { TREATMENTS } from '../data/treatments';
import { EYE_DISEASES } from '../data/diseases';
import { DIAGNOSTICS } from '../data/diagnostics';
import { DOCTORS } from '../data/doctors';
import { CLINIC_LOCATIONS } from '../data/clinics';
import { useLanguage } from '../context/LanguageContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (tab: string, slug?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
}) => {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const list: {
      type: 'treatment' | 'disease' | 'diagnostic' | 'doctor' | 'location';
      title: string;
      desc: string;
      tab: string;
      slug?: string;
    }[] = [];

    // Treatments
    TREATMENTS.forEach((item) => {
      const match =
        item.name.toLowerCase().includes(q) ||
        item.nameEn.toLowerCase().includes(q) ||
        item.shortSummary.toLowerCase().includes(q);
      if (match) {
        list.push({
          type: 'treatment',
          title: language === 'de' ? item.name : item.nameEn,
          desc: language === 'de' ? item.shortSummary : item.shortSummaryEn,
          tab: 'behandlungen',
          slug: item.slug,
        });
      }
    });

    // Diseases
    EYE_DISEASES.forEach((item) => {
      const match =
        item.name.toLowerCase().includes(q) ||
        item.nameEn.toLowerCase().includes(q) ||
        item.medicalTerm.toLowerCase().includes(q) ||
        item.shortSummary.toLowerCase().includes(q);
      if (match) {
        list.push({
          type: 'disease',
          title: language === 'de' ? item.name : item.nameEn,
          desc: language === 'de' ? item.shortSummary : item.shortSummaryEn,
          tab: 'augenkrankheiten',
          slug: item.slug,
        });
      }
    });

    // Diagnostics
    DIAGNOSTICS.forEach((item) => {
      const match =
        item.name.toLowerCase().includes(q) ||
        item.nameEn.toLowerCase().includes(q) ||
        item.shortSummary.toLowerCase().includes(q);
      if (match) {
        list.push({
          type: 'diagnostic',
          title: language === 'de' ? item.name : item.nameEn,
          desc: language === 'de' ? item.shortSummary : item.shortSummaryEn,
          tab: 'diagnostik',
          slug: item.slug,
        });
      }
    });

    // Doctors
    DOCTORS.forEach((doc) => {
      const match =
        doc.name.toLowerCase().includes(q) ||
        doc.role.toLowerCase().includes(q) ||
        doc.specialties.some((s) => s.toLowerCase().includes(q));
      if (match) {
        list.push({
          type: 'doctor',
          title: doc.name,
          desc: `${language === 'de' ? doc.role : doc.roleEn} (${doc.specialties.slice(0, 2).join(', ')})`,
          tab: 'aerzte',
          slug: doc.slug,
        });
      }
    });

    // Locations
    CLINIC_LOCATIONS.forEach((loc) => {
      const match =
        loc.name.toLowerCase().includes(q) ||
        loc.city.toLowerCase().includes(q) ||
        loc.street.toLowerCase().includes(q) ||
        loc.features.some((f) => f.toLowerCase().includes(q));
      if (match) {
        list.push({
          type: 'location',
          title: loc.name,
          desc: `${loc.street}, ${loc.postalCode} ${loc.city}`,
          tab: 'standorte',
          slug: loc.slug,
        });
      }
    });

    return list.slice(0, 12);
  }, [query, language]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      className="fixed inset-0 z-50 flex items-start justify-center p-3 pt-6 sm:p-4 sm:pt-16 bg-slate-950/70 backdrop-blur-sm overflow-y-auto"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto sm:my-0">
        <h2 id="search-modal-title" className="sr-only">{t('Website durchsuchen', 'Search the website')}</h2>
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(
              'Suchen nach Grauem Star, OCT, Dr. Arani, Glaukom, Opladen ...',
              'Search for cataracts, OCT, Dr. Arani, glaucoma, Opladen ...'
            )}
            aria-label={t('Suchbegriff', 'Search term')}
            className="w-full text-sm md:text-base text-slate-900 placeholder-slate-400 focus:outline-none"
            id="site-search"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
            aria-label={t('Suche schließen', 'Close search')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results list */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.trim() === '' ? (
            <div className="text-center py-8 text-xs text-slate-500">
              <p className="font-medium text-slate-700 mb-2">
                {t('Beliebte Suchbegriffe:', 'Popular Search Topics:')}
              </p>
              <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                {['Grauer Star', 'Dr. Arani', 'OCT', 'Glaukom', 'Makuladegeneration', 'Sehschule', 'Opladen'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-sky-50 hover:text-sky-800 text-slate-700 rounded text-xs transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              <p className="text-sm font-semibold text-slate-700 mb-1">
                {t('Keine Treffer gefunden für:', 'No results found for:')} „{query}“
              </p>
              <p>
                {t(
                  'Bitte versuchen Sie einen anderen Suchbegriff. Unter „Standorte“ finden Sie beide Telefonnummern.',
                  'Please try another search term. Both phone numbers are listed under Locations.'
                )}
              </p>
              <button className="mt-4 font-semibold text-[#176b68] hover:underline" onClick={() => { onSelectResult('standorte'); onClose(); }}>
                {t('Zu den Standorten', 'View locations')} <span aria-hidden="true">→</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {results.map((res, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onSelectResult(res.tab, res.slug);
                    onClose();
                  }}
                  className="w-full text-left p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                        {t(
                          res.type === 'treatment' ? 'Behandlung' : res.type === 'disease' ? 'Augenkrankheit' : res.type === 'diagnostic' ? 'Diagnostik' : res.type === 'doctor' ? 'Ärztliches Team' : 'Standort',
                          res.type === 'treatment' ? 'Treatment' : res.type === 'disease' ? 'Eye condition' : res.type === 'diagnostic' ? 'Diagnostics' : res.type === 'doctor' ? 'Medical team' : 'Location'
                        )}
                      </span>
                      <h4 className="font-semibold text-sm text-slate-900 group-hover:text-sky-800 truncate">
                        {res.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">{res.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-sky-700 shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
