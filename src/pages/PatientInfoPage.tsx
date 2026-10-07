import React from 'react';
import { PATIENT_FAQS } from '../data/faqs';
import { ARTEMIS_NETWORK_STATS } from '../data/clinics';
import { useLanguage } from '../context/LanguageContext';
import {
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  FileText,
  Car,
  CreditCard,
  Calendar,
} from 'lucide-react';

import { PatientExperienceForm } from '../components/PatientExperienceForm';

interface PatientInfoPageProps {
  onOpenBooking: () => void;
  onOpenEmergency: () => void;
}

export const PatientInfoPage: React.FC<PatientInfoPageProps> = ({
  onOpenBooking,
  onOpenEmergency,
}) => {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14 pb-20">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-sky-800">
          {t('Service & Orientierung', 'Service & Patient Guidance')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('Patienten-Informationen & Erstbesuch', 'Patient Information & First Visit')}
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          {t(
            'Alles, was Sie für Ihren Besuch im ARTEMIS Augenzentrum Leverkusen und der Praxis Opladen wissen müssen: Checklisten, Fahrtauglichkeit, Kosten und Antworten auf die häufigsten Fragen.',
            'Everything you need to know for your appointment at ARTEMIS Eye Center Leverkusen and Opladen Practice: checklists, driving notices, insurance, and FAQs.'
          )}
        </p>
      </div>

      {/* 1. Checklist Erstbesuch */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
        <div className="flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-sky-800">
          <FileText className="w-4 h-4" />
          <span>{t('Checkliste für Ihren Termin', 'Appointment Checklist')}</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          {t('Was sollten Sie zu Ihrem Termin mitbringen?', 'What to Bring to Your Visit')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 text-sm block mb-1">
                {t('Elektronische Gesundheitskarte (eGK)', 'Health Insurance Card')}
              </strong>
              <span>{t('Ihre gültige Versichertenkarte für gesetzlich versicherte Patienten.', 'Your valid chip card for statutory insurance verification.')}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 text-sm block mb-1">
                {t('Aktuelle Brillen & Brillenpass', 'Current Spectacles & Prescription')}
              </strong>
              <span>{t('Bringen Sie Fern-, Lese- und Arbeitsplatzbrillen sowie Kontaktlinsenwerte mit.', 'Bring current distance/reading glasses and contact lens parameters.')}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 text-sm block mb-1">
                {t('Medikamentenplan & Augentropfen', 'Medication List & Eye Drops')}
              </strong>
              <span>{t('Insbesondere Blutverdünner, Blutdruckmittel und alle bisher angewendeten Augentropfen.', 'Especially blood thinners, glaucoma drops, or artificial tears.')}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 text-sm block mb-1">
                {t('Vorbefunde & OP-Berichte', 'Medical History & Prior Reports')}
              </strong>
              <span>{t('Relevante Berichte früherer Augenuntersuchungen oder chirurgischer Eingriffe.', 'Reports of past retinal scans, cataract surgeries, or laser therapies.')}</span>
            </div>
          </div>
        </div>

        {/* Driving warning notice */}
        <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
          <Car className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>{t('Hinweis zur Fahrtauglichkeit bei Netzhautuntersuchungen:', 'Notice on Driving Fitness After Dilation:')}</strong>{' '}
            {t(
              'Werden für eine fundierte Netzhautuntersuchung pupillenerweiternde Augentropfen verabreicht, dürfen Sie für ca. 4 bis 5 Stunden kein Kraftfahrzeug, E-Bike oder Fahrrad im Straßenverkehr führen. Bitte reisen Sie mit öffentlichen Verkehrsmitteln an oder lassen Sie sich begleiten.',
              'If dilating eye drops are administered, you are legally prohibited from driving cars or bikes for approximately 4 to 5 hours. Please organize public transport or an escort.'
            )}
          </div>
        </div>
      </section>

      {/* 2. Insurance & Costs */}
      <section className="bg-slate-50 rounded-3xl border border-slate-200 p-8">
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-sky-800">
          <CreditCard className="w-4 h-4" />
          <span>{t('Transparenz', 'Transparency')}</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          {t('Krankenkassen, Kosten & IGeL-Leistungen', 'Insurance, Costs & Elective Upgrades')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-700">
          <div className="p-5 bg-white rounded-2xl border border-slate-200">
            <h3 className="font-bold text-sm text-slate-900 mb-2">
              {t('Gesetzliche Kassen (GKV)', 'Public Insurance (GKV)')}
            </h3>
            <p className="leading-relaxed text-slate-600">
              {t(
                'Alle medizinisch indizierten Grundleistungen, Katarakt-Operationen mit Standardlinse, IVOM-Therapien und Glaukombehandlungen werden vollständig von den gesetzlichen Krankenkassen übernommen.',
                'Medically necessary basic treatments, standard cataract surgery, and IVOM therapy are 100% covered by public health funds.'
              )}
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200">
            <h3 className="font-bold text-sm text-slate-900 mb-2">
              {t('Private Kassen (PKV)', 'Private Insurance (PKV)')}
            </h3>
            <p className="leading-relaxed text-slate-600">
              {t(
                'Private Krankenversicherungen und die Beihilfe erstatten in der Regel alle apparativen Diagnoseverfahren (OCT, IOL-Master, etc.) sowie Premium-Linsen bei entsprechender tariflicher Vereinbarung.',
                'Private insurances typically reimburse advanced diagnostics (OCT, optical biometry) and premium lenses depending on your plan.'
              )}
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200">
            <h3 className="font-bold text-sm text-slate-900 mb-2">
              {t('Selbstzahler & IGeL', 'Elective Care & Upgrades')}
            </h3>
            <p className="leading-relaxed text-slate-600">
              {t(
                'Refraktive Eingriffe zur Brillenfreiheit (Femto-LASIK, EVO Visian ICL), vorsorgliche OCT-Früherkennungen sowie Premium-Linsenupgrades werden transparent nach GOÄ abgerechnet.',
                'Refractive surgery (LASIK, ICL) and preventative OCT scans without prior diagnosis are transparently billed according to GOÄ.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Hygiene & Quality Standards */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8">
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-sky-800">
          <ShieldCheck className="w-4 h-4" />
          <span>{t('Patientensicherheit', 'Patient Safety')}</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          {t('Qualitätsmanagement & Hygiene im OP-Zentrum', 'Quality Management & Surgical Hygiene')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-700">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="font-bold text-sky-800 text-sm mb-1">DIN EN ISO 9001</div>
            <p className="text-slate-600">Zertifiziertes Qualitätsmanagement aller klinischen und operativen Abläufe.</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="font-bold text-sky-800 text-sm mb-1">RKI-Hygienestandards</div>
            <p className="text-slate-600">Strikte Sterilitätsüberwachung und Reinraum-Lüftungstechnik im OP Leverkusen.</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="font-bold text-sky-800 text-sm mb-1">BDOC Qualitätssiegel</div>
            <p className="text-slate-600">Anerkannter Qualitätsstandard des Bundes Deutscher OphthalmoChirurgen.</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="font-bold text-sky-800 text-sm mb-1">FEBO Zertifizierung</div>
            <p className="text-slate-600">Dr. Arani führt das höchste europäische Facharztexamen für Augenheilkunde.</p>
          </div>
        </div>
      </section>

      {/* 4. Anonymous Patient Experience Feedback Form */}
      <PatientExperienceForm />

      {/* 5. Categorized FAQs */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-800">
            {t('Wissensdatenbank', 'Knowledge Base')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            {t('Alle Patienten-FAQs im Überblick', 'All Frequently Asked Questions')}
          </h2>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {PATIENT_FAQS.map((faq) => (
            <details
              key={faq.id}
              className="group bg-white rounded-xl border border-slate-200 p-4 open:border-sky-300"
            >
              <summary className="font-semibold text-xs sm:text-sm text-slate-900 cursor-pointer list-none flex items-center justify-between gap-4">
                <span>{language === 'de' ? faq.question : faq.questionEn}</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform shrink-0">▼</span>
              </summary>
              <div className="mt-3 text-xs text-slate-600 leading-relaxed pt-3 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 block mb-1">
                  Kategorie: {language === 'de' ? faq.category : faq.categoryEn}
                </span>
                <p>{language === 'de' ? faq.answer : faq.answerEn}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

    </div>
  );
};
