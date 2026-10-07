import React from 'react';
import {
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Navigation,
  Car,
  Train,
  Award,
} from 'lucide-react';
import { CLINIC_LOCATIONS } from '../data/clinics';
import { DOCTORS } from '../data/doctors';
import { TREATMENTS } from '../data/treatments';
import { useLanguage } from '../context/LanguageContext';

interface LeverkusenPageProps {
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: (locId?: string, srvId?: string) => void;
}

export const LeverkusenPage: React.FC<LeverkusenPageProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  const { t, language } = useLanguage();
  const clinic = CLINIC_LOCATIONS.find((c) => c.id === 'leverkusen')!;
  const drArani = DOCTORS.find((d) => d.id === 'dr-masoud-arani')!;

  const leverkusenTreatments = TREATMENTS.filter((t) => t.locations.includes('leverkusen'));

  return (
    <div className="space-y-12 md:space-y-16 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-sky-900 to-slate-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-300 uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
              <span>Leverkusen-Wiesdorf · Ambulantes OP-Zentrum</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              {clinic.name}
            </h1>
            <p className="text-base text-slate-300 leading-relaxed">
              {language === 'de' ? clinic.subTitle : clinic.subTitleEn}
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span>{clinic.street}, {clinic.postalCode} {clinic.city}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-sky-400" />
                <span>Tel: {clinic.phoneDisplay}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>DIN EN ISO 9001 zertifiziert</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <button
                onClick={() => onOpenBooking('leverkusen')}
                className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs md:text-sm rounded-xl transition-all shadow-md"
              >
                {t('Termin in Leverkusen anfragen', 'Book in Leverkusen')}
              </button>
              <a
                href={`tel:${clinic.phone.replace(/\s+/g, '')}`}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs md:text-sm rounded-xl border border-slate-700"
              >
                0214 44488
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Clinical Capabilities */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* About Leverkusen OP Hub */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                {t('Ihr Kompetenzzentrum für Augenchirurgie in Leverkusen', 'Your Center for Eye Surgery in Leverkusen')}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {t(
                  'Das ARTEMIS Augenzentrum Leverkusen in der Friedrich-Ebert-Straße 17 verbindet modernste Medizintechnik mit jahrzehntelanger operativer Erfahrung. Unter der ärztlichen Leitung von Dr. med. Masoud Arani führen wir jährlich tausende erfolgreiche Katarakt-Operationen, intravitreale Medikamentengaben (IVOM) und Glaukomeingriffe schmerzfrei und ambulant durch.',
                  'The ARTEMIS Eye Center Leverkusen at Friedrich-Ebert-Straße 17 merges cutting-edge technology with decades of surgical proficiency. Led by Dr. Masoud Arani, we perform thousands of cataract surgeries, IVOM retinal injections, and glaucoma treatments painlessly on an outpatient basis.'
                )}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {clinic.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Operating Lead: Dr. Arani */}
            <div className="bg-sky-50/70 border border-sky-100 rounded-2xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-800 uppercase tracking-wider">
                <Award className="w-4 h-4 text-sky-700" />
                <span>{t('Leitender Operateur am Standort', 'Chief Surgeon on Site')}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {drArani.name} ({drArani.title})
              </h3>
              <p className="text-xs text-sky-900 font-medium">
                {drArani.role} · {drArani.surgeriesCount}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'de' ? drArani.bio : drArani.bioEn}
              </p>
              <button
                onClick={() => onNavigate('aerzte', drArani.slug)}
                className="text-xs font-semibold text-sky-800 hover:underline"
              >
                {t('Vollständiges Arztprofil von Dr. Arani ansehen →', 'View full profile of Dr. Arani →')}
              </button>
            </div>

            {/* Available Treatments in Leverkusen */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {t('Verfügbare Behandlungen am Standort Leverkusen', 'Available Treatments at Leverkusen Branch')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {leverkusenTreatments.map((treatment) => (
                  <div
                    key={treatment.id}
                    className="p-4 rounded-xl border border-slate-200 hover:border-sky-300 bg-white transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 mb-1">
                        {language === 'de' ? treatment.name : treatment.nameEn}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                        {language === 'de' ? treatment.shortSummary : treatment.shortSummaryEn}
                      </p>
                    </div>
                    <button
                      onClick={() => onNavigate('behandlungen', treatment.slug)}
                      className="text-xs font-semibold text-sky-800 hover:underline flex items-center gap-1 self-start"
                    >
                      <span>{t('Details zur Behandlung', 'Treatment details')}</span>
                      <span>→</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Contact, Hours & Directions */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Opening Hours & Contact Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-base text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-700" />
                <span>{t('Öffnungszeiten & Kontakt', 'Hours & Contact')}</span>
              </h3>

              <div className="space-y-2.5 text-xs">
                {clinic.openingHours.map((h, i) => (
                  <div key={i} className="flex justify-between py-1 border-b border-slate-100 last:border-0">
                    <span className="text-slate-600">{language === 'de' ? h.days : h.daysEn}</span>
                    <span className="font-semibold text-slate-900 text-right">{h.hours}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div>
                  <span className="text-slate-500 block">{t('Telefon:', 'Phone:')}</span>
                  <a href={`tel:${clinic.phone.replace(/\s+/g, '')}`} className="font-bold text-sky-800 text-sm hover:underline">
                    {clinic.phoneDisplay}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 block">{t('E-Mail:', 'Email:')}</span>
                  <a href={`mailto:${clinic.email}`} className="text-slate-700 hover:underline">
                    {clinic.email}
                  </a>
                </div>
              </div>

              <button
                onClick={() => onOpenBooking('leverkusen')}
                className="w-full py-2.5 px-4 bg-sky-800 hover:bg-sky-900 text-white font-semibold rounded-lg text-xs transition-colors"
              >
                {t('Online-Terminanfrage senden', 'Send Appointment Request')}
              </button>
            </div>

            {/* Directions & Accessibility Box */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4 text-xs">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-sky-700" />
                <span>{t('Anfahrt & Barrierefreiheit', 'Directions & Parking')}</span>
              </h3>

              <div className="space-y-3 text-slate-600">
                <div className="flex items-start gap-2">
                  <Train className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 block">{t('Öffentlicher Nahverkehr:', 'Public Transit:')}</strong>
                    <span>{clinic.publicTransport.train}</span>
                    <br />
                    <span>{clinic.publicTransport.bus}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Car className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 block">{t('Parkmöglichkeiten:', 'Parking:')}</strong>
                    <span>{clinic.publicTransport.parking}</span>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200 text-slate-700">
                  <strong>{t('Barrierefreier Zugang:', 'Accessibility:')}</strong>{' '}
                  {t(
                    'Unsere Praxis- und OP-Räume sind vollständig stufenlos erreichbar und verfügen über einen geräumigen Personenaufzug für Rollstühle und Liegen.',
                    'Fully step-free accessible facilities with spacious elevator accommodating wheelchairs and stretchers.'
                  )}
                </div>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Friedrich-Ebert-Stra%C3%9Fe+17+51373+Leverkusen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 bg-white hover:bg-slate-100 text-slate-800 font-semibold rounded-lg border border-slate-300 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5 text-sky-700" />
                  <span>{t('Route in Google Maps planen ↗', 'Plan route in Google Maps ↗')}</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
