import React from 'react';
import { DIAGNOSTICS } from '../data/diagnostics';
import { useLanguage } from '../context/LanguageContext';
import { Activity, Clock, ShieldCheck, ChevronRight, Car } from 'lucide-react';

interface DiagnosticsPageProps {
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: (locId?: string, srvId?: string) => void;
}

export const DiagnosticsPage: React.FC<DiagnosticsPageProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-20">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-sky-800">
          {t('Präzisionsdiagnostik', 'Precision Diagnostic Suite')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('Moderne apparative Diagnostik', 'Advanced Diagnostic Equipment')}
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          {t(
            'Modernste bildgebende Verfahren für berührungslose, schmerzfreie Untersuchungen der Hornhaut, des Sehnervs und der Netzhaut im Mikrometerbereich.',
            'State-of-the-art non-contact optical imaging providing micron-level precision for cornea, optic nerve, and retinal assessments.'
          )}
        </p>
      </div>

      {/* Diagnostics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DIAGNOSTICS.map((diag) => (
          <div
            key={diag.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {diag.equipment.split(' ')[0]}
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-1 mb-2">
                {language === 'de' ? diag.name : diag.nameEn}
              </h2>
              <p className="text-xs text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                {language === 'de' ? diag.shortSummary : diag.shortSummaryEn}
              </p>

              {/* Badges */}
              <div className="space-y-1.5 text-xs text-slate-500 mb-5">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Dauer: {diag.duration}</span>
                </div>
                {diag.drivingWarning ? (
                  <div className="flex items-center gap-1.5 text-amber-700">
                    <Car className="w-3.5 h-3.5" />
                    <span>{t('Keine Fahrtauglichkeit nach Tropfung', 'No driving after dilation')}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-emerald-700">
                    <Car className="w-3.5 h-3.5" />
                    <span>{t('Fahrtauglichkeit bleibt erhalten', 'Driving ability preserved')}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => onNavigate('diagnostik', diag.slug)}
                className="text-xs font-semibold text-sky-800 hover:underline flex items-center gap-1"
              >
                <span>{t('Verfahrensdetails', 'Procedure Details')}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onOpenBooking('leverkusen', diag.id)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-sky-50 text-slate-800 hover:text-sky-900 font-semibold rounded-lg text-xs transition-colors"
              >
                {t('Termin buchen', 'Book')}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
