import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { DOCTORS } from '../data/doctors';
import { CLINIC_LOCATIONS } from '../data/clinics';
import { useLanguage } from '../context/LanguageContext';

interface DoctorsPageProps {
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: (locId?: string, srvId?: string) => void;
}

export const DoctorsPage: React.FC<DoctorsPageProps> = ({ onNavigate, onOpenBooking }) => {
  const { language } = useLanguage();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="max-w-3xl">
        <p className="clinic-eyebrow">ARTEMIS in Leverkusen</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#173c78] sm:text-5xl">Das ärztliche Team</h1>
        <p className="mt-4 text-base leading-relaxed text-[#526873]">Hier finden Sie die Ärztinnen und Ärzte, die auf den ARTEMIS-Standortseiten für Leverkusen und Opladen aufgeführt sind. Angaben zu Rolle und Schwerpunkt beschränken sich auf diese öffentlichen Standortinformationen.</p>
      </header>

      <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {DOCTORS.map((doctor) => {
          const locations = CLINIC_LOCATIONS.filter((location) => doctor.locations.includes(location.id));
          return (
            <article className="clinic-card flex flex-col p-6" key={doctor.id}>
              <p className="clinic-eyebrow">{(language === 'de' ? doctor.specialties : doctor.specialtiesEn).join(' · ')}</p>
              <h2 className="mt-3 text-xl font-semibold text-[#173c78]">{doctor.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#526873]">{language === 'de' ? doctor.role : doctor.roleEn}</p>
              {doctor.surgeriesCount && <p className="mt-3 text-xs font-medium text-[#526873]">{doctor.surgeriesCount}</p>}
              <div className="mt-4 space-y-1 text-xs text-[#526873]">
                {locations.map((location) => <p className="flex items-center gap-1.5" key={location.id}><MapPin aria-hidden="true" className="h-3.5 w-3.5" />{location.name}</p>)}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-[#425864]">{language === 'de' ? doctor.bio : doctor.bioEn}</p>
              <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#e8eeed] pt-4">
                <button className="text-sm font-semibold text-[#087bb2] hover:underline" onClick={() => onNavigate('aerzte', doctor.slug)}>Profil ansehen <ArrowRight aria-hidden="true" className="ml-1 inline h-4 w-4" /></button>
                <button className="text-sm font-medium text-[#526873] hover:text-[#173c78]" onClick={() => onOpenBooking(doctor.locations[0])}>Kontakt</button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
