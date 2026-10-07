import React from 'react';
import { DIAGNOSTICS } from '../data/diagnostics';
import { CLINIC_LOCATIONS } from '../data/clinics';
import { useLanguage } from '../context/LanguageContext';
import {
  ArrowLeft,
  Activity,
  Clock,
  Car,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Shield,
  MapPin,
  ChevronRight,
} from 'lucide-react';

interface DiagnosticDetailPageProps {
  slug: string;
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: (locId?: string, srvId?: string) => void;
}

export const DiagnosticDetailPage: React.FC<DiagnosticDetailPageProps> = ({
  slug,
  onNavigate,
  onOpenBooking,
}) => {
  const { t, language } = useLanguage();
  const diag = DIAGNOSTICS.find((d) => d.slug === slug) || DIAGNOSTICS[0];

  const locations = CLINIC_LOCATIONS.filter((l) => diag.locations.includes(l.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-20">
      
      {/* Back button & Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <button
          onClick={() => onNavigate('diagnostik')}
          className="hover:text-sky-800 flex items-center gap-1 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('Alle Diagnoseverfahren', 'All Diagnostics')}</span>
        </button>
        <span>/</span>
        <span className="text-slate-800 font-semibold truncate">
          {language === 'de' ? diag.name : diag.nameEn}
        </span>
      </div>

      {/* Hero Header */}
      <div className="bg-sky-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <span className="text-xs font-mono text-sky-400">
            {diag.equipment}
          </span>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {language === 'de' ? diag.name : diag.nameEn}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {language === 'de' ? diag.shortSummary : diag.shortSummaryEn}
          </p>

          <div className="pt-4 flex flex-wrap gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-sky-400" />
              <span>Dauer: {diag.duration}</span>
            </div>
            {diag.drivingWarning ? (
              <div className="flex items-center gap-1.5 text-amber-300">
                <Car className="w-4 h-4" />
                <span>{t('Pupillenerweiterung: Fahrtauglichkeit 4–5 Std. eingeschränkt', 'Pupil Dilation: Driving impaired 4–5 hrs')}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-300">
                <Car className="w-4 h-4" />
                <span>{t('Keine Pupillenerweiterung nötig: Fahrtauglich', 'No Dilation: Driving permitted')}</span>
              </div>
            )}
          </div>

          <div className="pt-4 flex flex-wrap gap-3">
            <button
              onClick={() => onOpenBooking('leverkusen', diag.id)}
              className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs md:text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t('Untersuchungstermin anfragen', 'Book Diagnostic Examination')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* What it does */}
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              {t('Was leistet dieses Diagnoseverfahren?', 'What does this examination measure?')}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {language === 'de' ? diag.whatItDoes : diag.whatItDoesEn}
            </p>
          </div>

          {/* Why needed */}
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              {t('Warum und wann ist die Untersuchung sinnvoll?', 'Clinical Indication & Benefit')}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {language === 'de' ? diag.whyNeeded : diag.whyNeededEn}
            </p>
          </div>

          {/* Preparation & Driving Ability Card */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-sky-700" />
              <span>{t('Vorbereitung für Ihren Untersuchungstermin', 'Preparation for Your Visit')}</span>
            </h3>

            <p className="text-xs text-slate-700 leading-relaxed">
              {language === 'de' ? diag.preparationRequired : diag.preparationRequiredEn}
            </p>

            {diag.drivingWarning && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong>{t('Wichtiger Hinweis zur Fahrtauglichkeit:', 'Important Driving Notice:')}</strong>{' '}
                  {t(
                    'Durch pupillenerweiternde Augentropfen sind Sie für ca. 4 bis 5 Stunden blendempfindlich und sehen unscharf. Führen Sie bitte kein Auto oder Fahrrad und bringen Sie eine Begleitperson mit.',
                    'Due to dilating drops, your vision will be blurred and sensitive to glare for 4 to 5 hours. Please arrange public transport or an escort.'
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Insurance Information */}
          <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs text-slate-700 space-y-2">
            <h3 className="font-bold text-base text-sky-950">
              {t('Kosten & Abrechnung', 'Costs & Coverage')}
            </h3>
            <p className="leading-relaxed">
              {language === 'de' ? diag.insuranceNote : diag.insuranceNoteEn}
            </p>
          </div>

        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Available locations */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-700" />
              <span>{t('Verfügbar an den Standorten', 'Available at Branches')}</span>
            </h3>
            <div className="space-y-2 text-xs">
              {locations.map((loc) => (
                <div key={loc.id} className="p-3 bg-slate-50 rounded-xl">
                  <div className="font-semibold text-slate-900">{loc.name}</div>
                  <div className="text-[11px] text-slate-500">{loc.street}, {loc.city}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Direct CTA */}
          <div className="p-5 rounded-2xl bg-sky-900 text-white space-y-3 text-xs">
            <h3 className="font-bold text-sm">
              {t('Diagnostik-Termin vereinbaren', 'Book Diagnostic Slot')}
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {t(
                'Nutzen Sie unsere digitale Terminanfrage für eine zügige Terminvergabe.',
                'Use our online appointment wizard for rapid scheduling.'
              )}
            </p>
            <button
              onClick={() => onOpenBooking('leverkusen', diag.id)}
              className="w-full py-2.5 px-4 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg text-xs transition-colors shadow-sm"
            >
              {t('Termin anfragen', 'Request Appointment')}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
