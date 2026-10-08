import React from 'react';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import { DIAGNOSTICS } from '../data/diagnostics';
import { CLINIC_LOCATIONS } from '../data/clinics';

interface DiagnosticDetailPageProps {
  slug: string;
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: (locId?: string, srvId?: string) => void;
}

export const DiagnosticDetailPage: React.FC<DiagnosticDetailPageProps> = ({ slug, onNavigate, onOpenBooking }) => {
  const diagnostic = DIAGNOSTICS.find((item) => item.slug === slug);
  if (!diagnostic) {
    return <section className="mx-auto max-w-3xl px-4 py-16"><h1 className="text-3xl font-semibold text-[#15344a]">Untersuchung nicht gefunden</h1><button className="mt-5 text-[#176b68] underline" onClick={() => onNavigate('diagnostik')}>Zurück zur Diagnostik</button></section>;
  }

  const locations = CLINIC_LOCATIONS.filter((location) => diagnostic.locations.includes(location.id));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <button className="inline-flex items-center gap-2 text-sm font-medium text-[#176b68] hover:underline" onClick={() => onNavigate('diagnostik')}><ArrowLeft aria-hidden="true" className="h-4 w-4" />Alle Untersuchungen</button>
      <header className="mt-7 rounded-3xl bg-[#15344a] p-6 text-white sm:p-10">
        <p className="text-sm font-medium text-[#a8e0d8]">Diagnostik am ARTEMIS-Standort</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">{diagnostic.name}</h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/85">{diagnostic.shortSummary}</p>
        <button className="button-light mt-6" onClick={() => onOpenBooking(diagnostic.locations[0])}>Standort kontaktieren <ArrowRight aria-hidden="true" className="h-4 w-4" /></button>
      </header>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <article className="clinic-card p-6 sm:p-7">
          <p className="clinic-eyebrow">Standort</p>
          <h2 className="mt-2 text-xl font-semibold text-[#15344a]">Wo die Untersuchung angeboten wird</h2>
          <div className="mt-4 space-y-3">
            {locations.map((location) => <div className="rounded-xl bg-[#f4f7f6] p-4" key={location.id}><h3 className="font-semibold text-[#15344a]">{location.name}</h3><p className="mt-1 text-sm text-[#526873]">{location.street}, {location.postalCode} {location.city}</p><button className="mt-3 text-sm font-semibold text-[#176b68] hover:underline" onClick={() => onNavigate('standorte', location.slug)}>Kontakt und Öffnungszeiten <ArrowRight aria-hidden="true" className="ml-1 inline h-4 w-4" /></button></div>)}
          </div>
        </article>
        <article className="clinic-card p-6 sm:p-7">
          <p className="clinic-eyebrow">Ärztliche Einschätzung</p>
          <h2 className="mt-2 text-xl font-semibold text-[#15344a]">Fragen zur Untersuchung?</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#526873]">Ob eine Untersuchung notwendig ist und ob eine Vorbereitung erforderlich ist, hängt von Ihrem Anliegen ab. Bitte fragen Sie das Praxisteam vor Ihrem Termin. Diese Seite enthält keine individuelle Diagnose oder medizinische Empfehlung.</p>
          <div className="mt-5 space-y-2">{locations.map((location) => <a className="flex items-center gap-2 text-sm font-semibold text-[#176b68] hover:underline" href={'tel:' + location.phone} key={location.id}><MapPin aria-hidden="true" className="h-4 w-4" />{location.name}: {location.phoneDisplay}</a>)}</div>
        </article>
      </section>
    </div>
  );
};
