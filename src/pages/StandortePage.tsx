import React from 'react';
import { ArrowRight, CalendarDays, MapPin, Phone } from 'lucide-react';
import { CLINIC_LOCATIONS } from '../data/clinics';
import { useLanguage } from '../context/LanguageContext';

interface StandortePageProps {
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: (locId?: string, srvId?: string) => void;
}

export const StandortePage: React.FC<StandortePageProps> = ({ onNavigate, onOpenBooking }) => {
  const { language } = useLanguage();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="max-w-3xl">
        <p className="clinic-eyebrow">ARTEMIS vor Ort</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#15344a] sm:text-5xl">Standorte in Leverkusen</h1>
        <p className="mt-4 text-base leading-relaxed text-[#526873]">
          Wählen Sie den Standort, der zu Ihrem Anliegen passt. Das Augenzentrum Leverkusen ist zugleich ambulantes OP-Zentrum; die Praxis Opladen bietet augenärztliche Diagnostik und Vorsorge.
        </p>
      </header>

      <div className="mt-9 grid gap-6 lg:grid-cols-2">
        {CLINIC_LOCATIONS.map((location) => (
          <article className="clinic-card flex flex-col p-6 sm:p-8" key={location.id}>
            <p className="clinic-eyebrow">{location.isOpZentrum ? 'Praxis und ambulantes OP-Zentrum' : 'Augenarzt-Praxis'}</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#15344a]">{location.name}</h2>
            <p className="mt-2 text-sm text-[#526873]">{language === 'de' ? location.subTitle : location.subTitleEn}</p>

            <div className="mt-6 space-y-3 text-sm text-[#344b58]">
              <p className="flex items-start gap-3"><MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#16766f]" />{location.street}<br />{location.postalCode} {location.city}</p>
              <a className="flex items-center gap-3 font-semibold text-[#176b68] hover:underline" href={'tel:' + location.phone}><Phone aria-hidden="true" className="h-5 w-5" />{location.phoneDisplay}</a>
              <div className="pt-3">
                <h3 className="font-semibold text-[#15344a]">Leistungen</h3>
                <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                  {location.features.slice(0, 6).map((feature) => <li className="service-list-item service-list-item-compact" key={feature}><span aria-hidden="true" className="service-list-dot" /><span>{feature}</span></li>)}
                </ul>
              </div>
              <p className="border-t border-[#e0e8e7] pt-4 text-xs text-[#526873]">
                Öffnungszeiten: {location.openingHours.slice(0, 5).map((item) => item.hours).filter((item, index, items) => items.indexOf(item) === index).join(' · ')}
              </p>
            </div>

            <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row">
              <button className="button-primary button-primary-small" onClick={() => onNavigate('standorte', location.slug)}>
                Standortdetails <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </button>
              <button className="button-secondary button-secondary-small" onClick={() => onOpenBooking(location.id)}>
                <CalendarDays aria-hidden="true" className="h-4 w-4" />
                {location.bookingUrl ? 'Online-Termin' : 'Kontakt aufnehmen'}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
