import React from 'react';
import { TREATMENTS } from '../data/treatments';
import { DOCTORS } from '../data/doctors';
import { DIAGNOSTICS } from '../data/diagnostics';
import { useLanguage } from '../context/LanguageContext';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  Shield,
  User,
  Activity,
  ArrowLeft,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface TreatmentDetailPageProps {
  slug: string;
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: (locId?: string, srvId?: string) => void;
  onOpenIOLGuide?: () => void;
  onOpenLaserQuiz?: () => void;
  onOpenAmsler?: () => void;
}

export const TreatmentDetailPage: React.FC<TreatmentDetailPageProps> = ({
  slug,
  onNavigate,
  onOpenBooking,
  onOpenIOLGuide,
  onOpenLaserQuiz,
  onOpenAmsler,
}) => {
  const { t, language } = useLanguage();
  const treatment = TREATMENTS.find((item) => item.slug === slug) || TREATMENTS[0];

  const doctors = DOCTORS.filter((d) => treatment.relatedDoctors.includes(d.id));
  const diagnostics = DIAGNOSTICS.filter((diag) =>
    treatment.relatedDiagnostics.includes(diag.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-20">
      
      {/* Back button & Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <button
          onClick={() => onNavigate('behandlungen')}
          className="hover:text-sky-800 flex items-center gap-1 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('Alle Behandlungen', 'All Treatments')}</span>
        </button>
        <span>/</span>
        <span className="text-slate-800 font-semibold truncate">
          {language === 'de' ? treatment.name : treatment.nameEn}
        </span>
      </div>

      {/* Hero Header */}
      <div className="bg-sky-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
            {treatment.category.toUpperCase()}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {language === 'de' ? treatment.name : treatment.nameEn}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {language === 'de' ? treatment.shortSummary : treatment.shortSummaryEn}
          </p>

          <div className="pt-4 flex flex-wrap gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-sky-400" />
              <span>Dauer: {treatment.procedure.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{treatment.procedure.inpatientOrOutpatient}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-sky-400" />
              <span>{treatment.procedure.anesthesia}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-3">
            <button
              onClick={() => onOpenBooking('leverkusen', treatment.id)}
              className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs md:text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t('Sprechstunde anfragen', 'Book Consultation')}</span>
            </button>

            {treatment.id === 'katarakt-grauer-star' && onOpenIOLGuide && (
              <button
                onClick={onOpenIOLGuide}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs md:text-sm rounded-xl border border-slate-700 flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{t('IOL-Linsenberater öffnen', 'Open IOL Guide')}</span>
              </button>
            )}

            {treatment.id === 'refraktive-chirurgie-augenlasern' && onOpenLaserQuiz && (
              <button
                onClick={onOpenLaserQuiz}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs md:text-sm rounded-xl border border-slate-700 flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{t('Eignungs-Check starten', 'Start Suitability Quiz')}</span>
              </button>
            )}

            {treatment.id === 'makuladegeneration-amd-ivom' && onOpenAmsler && (
              <button
                onClick={onOpenAmsler}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs md:text-sm rounded-xl border border-slate-700 flex items-center gap-1.5"
              >
                <span>{t('Amsler-Gitter-Test', 'Amsler Grid Test')}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Clinical Details */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Symptoms addressed */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              {t('Typische Symptome & Anzeichen', 'Typical Symptoms & Warning Signs')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(language === 'de' ? treatment.symptoms : treatment.symptomsEn).map((sym, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{sym}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suitable for */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              {t('Für wen ist die Behandlung geeignet?', 'Who is a suitable candidate?')}
            </h2>
            <div className="space-y-2">
              {(language === 'de' ? treatment.suitableFor : treatment.suitableForEn).map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Procedure Journey */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {t('Der Behandlungsablauf: Schritt für Schritt', 'Step-by-Step Treatment Journey')}
            </h2>
            <div className="space-y-4">
              {treatment.steps.map((st, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-3.5">
                  <span className="w-7 h-7 rounded-full bg-sky-100 text-sky-800 font-bold flex items-center justify-center shrink-0 text-xs">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 mb-1">
                      {language === 'de' ? st.title : st.titleEn}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {language === 'de' ? st.description : st.descriptionEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Aftercare & Recovery */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="font-bold text-base text-slate-900 mb-3">
              {t('Wichtige Hinweise zur Nachsorge', 'Important Aftercare Rules')}
            </h3>
            <ul className="space-y-2 text-xs text-slate-700">
              {(language === 'de' ? treatment.aftercare : treatment.aftercareEn).map((note, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-sky-700 font-bold">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Costs & Insurance */}
          <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs text-slate-700 space-y-2">
            <h3 className="font-bold text-base text-sky-950">
              {t('Kosten & Krankenkassenübernahme', 'Costs & Health Insurance')}
            </h3>
            <p className="leading-relaxed">
              {language === 'de' ? treatment.costInfo.details : treatment.costInfo.detailsEn}
            </p>
          </div>

          {/* Dedicated FAQs */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {t('Häufige Fragen zu dieser Behandlung', 'Frequently Asked Questions')}
            </h2>
            <div className="space-y-3">
              {treatment.faqs.map((faq, i) => (
                <details key={i} className="group bg-white rounded-xl border border-slate-200 p-4 open:border-sky-300">
                  <summary className="font-semibold text-xs sm:text-sm text-slate-900 cursor-pointer list-none flex items-center justify-between gap-4">
                    <span>{language === 'de' ? faq.q : faq.qEn}</span>
                    <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-3 text-xs text-slate-600 leading-relaxed pt-3 border-t border-slate-100">
                    {language === 'de' ? faq.a : faq.aEn}
                  </p>
                </details>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Specialists & Diagnostics */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Doctors Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
              <User className="w-4 h-4 text-sky-700" />
              <span>{t('Behandelnde Fachärzte', 'Specialist Physicians')}</span>
            </h3>
            <div className="space-y-3">
              {doctors.map((doc) => (
                <div key={doc.id} className="text-xs">
                  <h4 className="font-semibold text-slate-900">{doc.name}</h4>
                  <p className="text-[11px] text-slate-500">{language === 'de' ? doc.role : doc.roleEn}</p>
                  <button
                    onClick={() => onNavigate('aerzte', doc.slug)}
                    className="text-[11px] text-sky-800 hover:underline mt-0.5"
                  >
                    {t('Profil ansehen →', 'View profile →')}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostics Equipment Card */}
          {diagnostics.length > 0 && (
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3 text-xs">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200">
                <Activity className="w-4 h-4 text-sky-700" />
                <span>{t('Zugehörige Diagnostik', 'Associated Diagnostics')}</span>
              </h3>
              <div className="space-y-2">
                {diagnostics.map((diag) => (
                  <button
                    key={diag.id}
                    onClick={() => onNavigate('diagnostik', diag.slug)}
                    className="w-full text-left p-2.5 rounded-lg bg-white border border-slate-200 hover:border-sky-300 transition-colors flex items-center justify-between"
                  >
                    <span className="font-medium text-slate-800 truncate">
                      {language === 'de' ? diag.name : diag.nameEn}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Appointment Action */}
          <div className="p-5 rounded-2xl bg-sky-900 text-white space-y-3 text-xs">
            <h3 className="font-bold text-sm">
              {t('Persönliche Beratung vereinbaren', 'Book Consultation')}
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {t(
                'Lassen Sie Ihre Augen von unseren Spezialisten im Augenzentrum Leverkusen oder in der Praxis Opladen untersuchen.',
                'Have your eyes assessed by our experienced ophthalmic specialists.'
              )}
            </p>
            <button
              onClick={() => onOpenBooking('leverkusen', treatment.id)}
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
