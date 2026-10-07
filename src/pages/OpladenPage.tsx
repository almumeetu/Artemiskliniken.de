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
  Heart,
  Baby,
  ArrowRight,
} from 'lucide-react';
import { CLINIC_LOCATIONS } from '../data/clinics';
import { DOCTORS } from '../data/doctors';
import { TREATMENTS } from '../data/treatments';
import { useLanguage } from '../context/LanguageContext';

interface OpladenPageProps {
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: (locId?: string, srvId?: string) => void;
}

export const OpladenPage: React.FC<OpladenPageProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  const { t, language } = useLanguage();
  const clinic = CLINIC_LOCATIONS.find((c) => c.id === 'opladen')!;
  const drShibata = DOCTORS.find((d) => d.id === 'dr-despina-shibata')!;
  const drDoermann = DOCTORS.find((d) => d.id === 'dr-doermann')!;

  const opladenTreatments = TREATMENTS.filter((t) => t.locations.includes('opladen'));

  return (
    <div className="space-y-12 md:space-y-16 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-teal-900 to-slate-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span>Leverkusen-Opladen · Facharztpraxis & Sehschule</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              {clinic.name}
            </h1>
            <p className="text-base text-slate-300 leading-relaxed">
              {language === 'de' ? clinic.subTitle : clinic.subTitleEn}
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>{clinic.street}, {clinic.postalCode} {clinic.city}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Tel: {clinic.phoneDisplay}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Baby className="w-4 h-4 text-emerald-400" />
                <span>Kinder-Sehschule & Orthoptik</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <button
                onClick={() => onOpenBooking('opladen')}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs md:text-sm rounded-xl transition-all shadow-md"
              >
                {t('Termin in Opladen anfragen', 'Book in Opladen')}
              </button>
              <a
                href={`tel:${clinic.phone.replace(/\s+/g, '')}`}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs md:text-sm rounded-xl border border-slate-700"
              >
                {clinic.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Practice Strengths & Team */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* About Opladen Hub */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                {t('Ihre Augenarztpraxis im Herzen von Leverkusen-Opladen', 'Your Ophthalmology Practice in Opladen')}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {t(
                  'Die ARTEMIS Augenarzt-Praxis Opladen in der Kölner Straße 56-58 ist Ihre vertraute Anlaufstelle für die gesamte Familie. Von der einfühlsamen Frühförderung von Kindern in unserer Sehschule über die regelmäßige Glaukom- und Netzhautvorsorge bis hin zur Diagnostik trockener Augen bieten wir Ihnen persönliche Medizin auf Augenhöhe.',
                  'The ARTEMIS Eye Practice Opladen at Kölner Straße 56-58 is your community ophthalmology hub for all generations. From child vision screening to glaucoma checks and dry eye management, we offer personalized diagnostic eye care.'
                )}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {clinic.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Section: Kinder-Sehschule in Opladen */}
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                <Baby className="w-4 h-4 text-emerald-700" />
                <span>{t('Schwerpunkt Opladen: Sehschule für Kinder & Orthoptik', 'Specialty: Vision School & Orthoptics')}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {t('Gesundes Sehen von klein auf fördern', 'Nurturing Healthy Vision from Early Childhood')}
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                {t(
                  'In unserer Sehschule untersuchen Frau Dr. Shibata und unsere erfahrene Orthoptistin Säuglinge, Kleinkinder und Schulkinder spielerisch und ohne Angst. Wir erkennen Schielen (Strabismus) und Sehschwächen (Amblyopie) rechtzeitig in den ersten Lebensjahren, in denen das Sehzentrum im Gehirn noch formbar ist.',
                  'In our orthoptic school, Dr. Shibata and our certified orthoptist examine infants and children gently. We detect strabismus and amblyopia early during critical brain development windows.'
                )}
              </p>
              <button
                onClick={() => onNavigate('behandlungen', 'sehschule-orthoptik')}
                className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1"
              >
                <span>{t('Mehr zur Kinder-Sehschule erfahren', 'Learn more about Orthoptics')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Surgical Linkage to Leverkusen OP Center */}
            <div className="bg-sky-50/70 border border-sky-200/80 rounded-2xl p-6 space-y-3">
              <h3 className="font-bold text-base text-slate-900">
                {t('Engmaschige OP-Anbindung an das Augenzentrum Leverkusen', 'Seamless Surgical Referral to Leverkusen OP Hub')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t(
                  'Sollte bei Ihnen eine Operation erforderlich sein – etwa beim Grauen Star (Katarakt), bei Makuladegeneration (IVOM-Spritzen) oder zur Brillenfreiheit –, führen wir alle Voruntersuchungen direkt bei uns in Opladen durch. Der eigentliche operative Eingriff erfolgt schmerzfrei und ambulant im hochmodernen Reinraum-OP von Dr. Arani im Augenzentrum Leverkusen, mit anschließender heimatnaher Nachsorge bei uns in Opladen.',
                  'If surgery is needed (cataract replacement, IVOM retinal therapy, or laser correction), pre-assessments take place in Opladen. Dr. Arani carries out the surgical procedure at the specialized Leverkusen center, followed by aftercare in Opladen.'
                )}
              </p>
            </div>

            {/* Opladen Doctors */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {t('Ihr Praxisteam in Opladen', 'Your Medical Team in Opladen')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[drShibata, drDoermann].map((doc) => (
                  <div key={doc.id} className="p-4 rounded-xl border border-slate-200 bg-white">
                    <h4 className="font-bold text-sm text-slate-900">{doc.name}</h4>
                    <p className="text-xs text-emerald-800 font-medium mb-2">{language === 'de' ? doc.role : doc.roleEn}</p>
                    <p className="text-xs text-slate-600 line-clamp-3 mb-3">{language === 'de' ? doc.bio : doc.bioEn}</p>
                    <button
                      onClick={() => onNavigate('aerzte', doc.slug)}
                      className="text-xs font-semibold text-sky-800 hover:underline"
                    >
                      {t('Arztprofil anzeigen →', 'View profile →')}
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
                <Clock className="w-4 h-4 text-emerald-700" />
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
                  <a href={`tel:${clinic.phone.replace(/\s+/g, '')}`} className="font-bold text-emerald-800 text-sm hover:underline">
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
                onClick={() => onOpenBooking('opladen')}
                className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg text-xs transition-colors"
              >
                {t('Termin in Opladen anfragen', 'Request Appointment in Opladen')}
              </button>
            </div>

            {/* Directions & Accessibility Box */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4 text-xs">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-emerald-700" />
                <span>{t('Anfahrt Opladen', 'Directions Opladen')}</span>
              </h3>

              <div className="space-y-3 text-slate-600">
                <div className="flex items-start gap-2">
                  <Train className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 block">{t('Bahn & Bus:', 'Transit:')}</strong>
                    <span>{clinic.publicTransport.train}</span>
                    <br />
                    <span>{clinic.publicTransport.bus}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Car className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 block">{t('Parken:', 'Parking:')}</strong>
                    <span>{clinic.publicTransport.parking}</span>
                  </div>
                </div>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=K%C3%B6lner+Str.+56-58+51379+Leverkusen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 bg-white hover:bg-slate-100 text-slate-800 font-semibold rounded-lg border border-slate-300 transition-colors flex items-center justify-center gap-1.5 shadow-xs mt-3"
                >
                  <Navigation className="w-3.5 h-3.5 text-emerald-700" />
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
