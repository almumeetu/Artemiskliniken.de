import React from 'react';
import { EYE_DISEASES } from '../data/diseases';
import { TREATMENTS } from '../data/treatments';
import { DIAGNOSTICS } from '../data/diagnostics';
import { useLanguage } from '../context/LanguageContext';
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Stethoscope,
  Shield,
  Calendar,
  Phone,
  HelpCircle,
  ChevronRight,
} from 'lucide-react';

interface DiseaseDetailPageProps {
  slug: string;
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: (locId?: string, srvId?: string) => void;
  onOpenAmsler?: () => void;
  onOpenGlaucomaCheck?: () => void;
}

export const DiseaseDetailPage: React.FC<DiseaseDetailPageProps> = ({
  slug,
  onNavigate,
  onOpenBooking,
  onOpenAmsler,
  onOpenGlaucomaCheck,
}) => {
  const { t, language } = useLanguage();
  const disease = EYE_DISEASES.find((d) => d.slug === slug) || EYE_DISEASES[0];

  const treatments = TREATMENTS.filter((t) => disease.treatmentsUsed.includes(t.id));
  const diagnostics = DIAGNOSTICS.filter((diag) => disease.diagnosticsUsed.includes(diag.id));

  const isUrgent = disease.urgencyLevel === 'urgent';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-20">
      
      {/* Back button & Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <button
          onClick={() => onNavigate('augenkrankheiten')}
          className="hover:text-sky-800 flex items-center gap-1 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('Alle Augenkrankheiten', 'All Eye Diseases')}</span>
        </button>
        <span>/</span>
        <span className="text-slate-800 font-semibold truncate">
          {language === 'de' ? disease.name : disease.nameEn}
        </span>
      </div>

      {/* Hero Header */}
      <div className={`rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden ${
        isUrgent ? 'bg-gradient-to-r from-red-950 to-slate-900' : 'bg-gradient-to-r from-sky-950 to-slate-900'
      }`}>
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-300 italic">{disease.medicalTerm}</span>
            {isUrgent && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white uppercase tracking-wider">
                {t('Akuter Notfall', 'Acute Medical Emergency')}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {language === 'de' ? disease.name : disease.nameEn}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {language === 'de' ? disease.shortSummary : disease.shortSummaryEn}
          </p>

          <div className="pt-4 flex flex-wrap gap-3">
            <button
              onClick={() => onOpenBooking('leverkusen', disease.id)}
              className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs md:text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t('Vorsorge / Abklärung buchen', 'Book Screening Examination')}</span>
            </button>

            {disease.id === 'makuladegeneration-amd' && onOpenAmsler && (
              <button
                onClick={onOpenAmsler}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs md:text-sm rounded-xl border border-slate-700"
              >
                {t('Amsler-Gitter Selbsttest', 'Amsler Grid Self-Test')}
              </button>
            )}

            {disease.id === 'glaukom' && onOpenGlaucomaCheck && (
              <button
                onClick={onOpenGlaucomaCheck}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs md:text-sm rounded-xl border border-slate-700"
              >
                {t('Glaukom-Risikocheck', 'Glaucoma Risk Check')}
              </button>
            )}

            {isUrgent && (
              <a
                href="tel:021444488"
                className="px-5 py-3 bg-red-700 hover:bg-red-600 text-white font-bold text-xs md:text-sm rounded-xl flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>0214 44488</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Symptoms List */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              {t('Symptome & Warnzeichen', 'Symptoms & Warning Signs')}
            </h2>
            <div className="space-y-2.5">
              {(language === 'de' ? disease.symptoms : disease.symptomsEn).map((sym, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{sym}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Factors */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              {t('Risikofaktoren & Ursachen', 'Risk Factors & Causes')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(language === 'de' ? disease.riskFactors : disease.riskFactorsEn).map((rf, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700">
                  <Shield className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                  <span>{rf}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prevention & Protection Tips */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
            <h3 className="font-bold text-base text-emerald-950 mb-3">
              {t('Prävention & augenärztliche Empfehlungen', 'Prevention & Professional Recommendations')}
            </h3>
            <div className="space-y-2 text-xs text-emerald-950">
              {(language === 'de' ? disease.preventionTips : disease.preventionTipsEn).map((tip, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dedicated Disease FAQs */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {t('Wichtige Patientenfragen', 'Patient Inquiries')}
            </h2>
            <div className="space-y-3">
              {disease.faqs.map((faq, i) => (
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

        {/* Right Column: Treatments & Diagnostics */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Linked Treatments Card */}
          {treatments.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <h3 className="font-bold text-sm text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-sky-700" />
                <span>{t('Therapie & Behandlung', 'Treatment & Therapy')}</span>
              </h3>
              <div className="space-y-2.5">
                {treatments.map((tr) => (
                  <button
                    key={tr.id}
                    onClick={() => onNavigate('behandlungen', tr.slug)}
                    className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-100 hover:border-sky-200 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-xs text-slate-900">{language === 'de' ? tr.name : tr.nameEn}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{language === 'de' ? tr.shortSummary : tr.shortSummaryEn}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Linked Diagnostics Card */}
          {diagnostics.length > 0 && (
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3 text-xs">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200">
                <Activity className="w-4 h-4 text-sky-700" />
                <span>{t('Diagnoseverfahren im Haus', 'Diagnostic Tests')}</span>
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
              {t('Frühzeitig vorsorgen', 'Early Preventive Care')}
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {t(
                'Vereinbaren Sie Ihren Untersuchungstermin im Augenzentrum Leverkusen oder in der Praxis Opladen.',
                'Schedule your specialized diagnostic check in Leverkusen or Opladen.'
              )}
            </p>
            <button
              onClick={() => onOpenBooking('leverkusen', disease.id)}
              className="w-full py-2.5 px-4 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg text-xs transition-colors shadow-sm"
            >
              {t('Termin vereinbaren', 'Book Appointment')}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
