import React from 'react';
import { ArrowLeft, ArrowRight, MapPin, Phone } from 'lucide-react';
import { DOCTORS } from '../data/doctors';
import { CLINIC_LOCATIONS } from '../data/clinics';
import { useLanguage } from '../context/LanguageContext';

interface DoctorDetailPageProps {
  slug: string;
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: (locId?: string, srvId?: string) => void;
}

export const DoctorDetailPage: React.FC<DoctorDetailPageProps> = ({ slug, onNavigate, onOpenBooking }) => {
  const { language } = useLanguage();
  const doctor = DOCTORS.find((item) => item.slug === slug);

  if (!doctor) {
    return <section className="mx-auto max-w-3xl px-4 py-16"><h1 className="text-3xl font-semibold text-[#15344a]">Profil nicht gefunden</h1><button className="mt-5 text-[#176b68] underline" onClick={() => onNavigate('aerzte')}>Zurück zum ärztlichen Team</button></section>;
  }

  const locations = CLINIC_LOCATIONS.filter((location) => doctor.locations.includes(location.id));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <button className="inline-flex items-center gap-2 text-sm font-medium text-[#176b68] hover:underline" onClick={() => onNavigate('aerzte')}><ArrowLeft aria-hidden="true" className="h-4 w-4" />Alle Ärztinnen und Ärzte</button>
      <header className="mt-7 rounded-3xl bg-[#15344a] p-6 text-white sm:p-10">
        <p className="text-sm font-medium text-[#a8e0d8]">{(language === 'de' ? doctor.specialties : doctor.specialtiesEn).join(' · ')}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">{doctor.name}</h1>
        <p className="mt-3 text-base leading-relaxed text-white/80">{language === 'de' ? doctor.role : doctor.roleEn}</p>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/85">{language === 'de' ? doctor.bio : doctor.bioEn}</p>
        {doctor.surgeriesCount && <p className="mt-5 text-sm font-medium text-[#a8e0d8]">{doctor.surgeriesCount} · laut ARTEMIS-Standortseite</p>}
        <button className="button-light mt-6" onClick={() => onOpenBooking(doctor.locations[0])}>Standort kontaktieren <ArrowRight aria-hidden="true" className="h-4 w-4" /></button>
      </header>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section className="clinic-card p-6 sm:p-7">
          <h2 className="text-xl font-semibold text-[#15344a]">Schwerpunkt</h2>
          <ul className="mt-4 space-y-2 text-sm text-[#425864]">
            {(language === 'de' ? doctor.specialties : doctor.specialtiesEn).map((specialty) => <li key={specialty} className="flex gap-2"><span aria-hidden="true" className="text-[#16766f]">•</span>{specialty}</li>)}
          </ul>
          <div className="mt-6 border-t border-[#e0e8e7] pt-5">
            <h3 className="font-semibold text-[#15344a]">Berufsbezeichnung</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#526873]">{(language === 'de' ? doctor.qualifications : doctor.qualificationsEn).join(' · ')}</p>
          </div>
        </section>

        <section className="clinic-card p-6 sm:p-7">
          <h2 className="text-xl font-semibold text-[#15344a]">Standort und Kontakt</h2>
          <div className="mt-4 space-y-3">
            {locations.map((location) => (
              <article className="rounded-xl bg-[#f4f7f6] p-4" key={location.id}>
                <h3 className="font-semibold text-[#15344a]">{location.name}</h3>
                <p className="mt-1 text-sm text-[#526873]">{location.street}, {location.postalCode} {location.city}</p>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <a className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#176b68] hover:underline" href={'tel:' + location.phone}><Phone aria-hidden="true" className="h-4 w-4" />{location.phoneDisplay}</a>
                  <button className="inline-flex items-center gap-1 text-sm font-semibold text-[#176b68] hover:underline" onClick={() => onNavigate('standorte', location.slug)}><MapPin aria-hidden="true" className="h-4 w-4" />Öffnungszeiten und Anfahrt</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
