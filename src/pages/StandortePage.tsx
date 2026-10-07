import React from 'react';
import { CLINIC_LOCATIONS } from '../data/clinics';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Clock, ShieldCheck, ArrowRight, Calendar, Train, Car } from 'lucide-react';

interface StandortePageProps {
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: (locId?: string) => void;
}

export const StandortePage: React.FC<StandortePageProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-20">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-sky-800">
          {t('Regionale Augenzentren im Rheinland', 'Regional Eye Care Facilities')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('Unsere Standorte in Leverkusen & Opladen', 'Our Clinic Locations in Leverkusen & Opladen')}
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          {t(
            'Zwei moderne Standorte mit klarer Schwerpunktaufteilung: Ambulante Hochleistungs-Augenchirurgie in Leverkusen-Wiesdorf und persönliche Grundversorgung mit Kinder-Sehschule in Leverkusen-Opladen.',
            'Two modern facilities with complementary clinical focus: High-precision outpatient ophthalmic surgery in Leverkusen-Wiesdorf, and community eye care with pediatric orthoptics in Opladen.'
          )}
        </p>
      </div>

      {/* Side-by-side Branches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {CLINIC_LOCATIONS.map((loc) => {
          const isLeverkusen = loc.id === 'leverkusen';
          return (
            <div
              key={loc.id}
              className={`rounded-3xl border p-8 bg-white shadow-sm flex flex-col justify-between ${
                isLeverkusen ? 'border-sky-300 ring-1 ring-sky-300/40' : 'border-emerald-300 ring-1 ring-emerald-300/40'
              }`}
            >
              <div className="space-y-6">
                
                {/* Badge & Title */}
                <div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      isLeverkusen ? 'bg-sky-100 text-sky-800' : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {isLeverkusen ? 'OP-Zentrum & Chirurgie' : 'Facharztpraxis & Sehschule'}
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-2 mb-1">
                    {loc.name}
                  </h2>
                  <p className="text-xs text-slate-600">
                    {language === 'de' ? loc.subTitle : loc.subTitleEn}
                  </p>
                </div>

                {/* NAP Details */}
                <div className="space-y-2.5 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                    <span>
                      {loc.street}, {loc.postalCode} {loc.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-sky-700 shrink-0" />
                    <a href={`tel:${loc.phone.replace(/\s+/g, '')}`} className="font-semibold text-slate-900 hover:underline">
                      Tel: {loc.phoneDisplay}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-sky-700 shrink-0" />
                    <span>
                      {isLeverkusen ? 'Mo–Do: 8–17 Uhr | Fr: 8–12 Uhr' : 'Mo, Di, Do: 8–12:30 & 14–17 Uhr | Mi, Fr: 8–12:30 Uhr'}
                    </span>
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <span className="text-xs font-bold text-slate-900 block mb-2">
                    {t('Klinische Besonderheiten:', 'Facility Features:')}
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {(language === 'de' ? loc.features : loc.featuresEn).slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-sky-700 font-bold">•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Transit & Parking */}
                <div className="text-xs text-slate-500 space-y-1.5 border-t border-slate-100 pt-3">
                  <div className="flex items-start gap-2">
                    <Train className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{loc.publicTransport.train}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Car className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{loc.publicTransport.parking}</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3 mt-6">
                <button
                  onClick={() => onNavigate('standorte', loc.slug)}
                  className="text-xs font-semibold text-sky-800 hover:underline flex items-center gap-1"
                >
                  <span>{t('Standortdetails & Ärzte ansehen', 'View branch details')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenBooking(loc.id)}
                  className="px-4 py-2 bg-sky-800 hover:bg-sky-900 text-white font-semibold rounded-lg text-xs transition-colors shadow-xs"
                >
                  {t('Termin vereinbaren', 'Book')}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
