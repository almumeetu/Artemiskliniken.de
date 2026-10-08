import React from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, MapPin } from 'lucide-react';
import { TREATMENTS } from '../data/treatments';
import { CLINIC_LOCATIONS } from '../data/clinics';

interface TreatmentDetailPageProps {
  slug: string;
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: (locId?: string, srvId?: string) => void;
}

export const TreatmentDetailPage: React.FC<TreatmentDetailPageProps> = ({ slug, onNavigate, onOpenBooking }) => {
  const treatment = TREATMENTS.find((item) => item.slug === slug);
  if (!treatment) {
    return <section className="mx-auto max-w-3xl px-4 py-16"><h1 className="text-3xl font-semibold text-[#15344a]">Leistung nicht gefunden</h1><button className="mt-5 text-[#176b68] underline" onClick={() => onNavigate('behandlungen')}>Zurück zur Übersicht</button></section>;
  }

  const locations = CLINIC_LOCATIONS.filter((location) => treatment.locations.includes(location.id));
  const sourceUrl = 'https://www.artemiskliniken.de/standorte/' + (treatment.locations.includes('leverkusen') ? 'artemis-augenzentrum-leverkusen/' : 'artemis-augenarzt-praxis-opladen/');

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <button className="inline-flex items-center gap-2 text-sm font-medium text-[#176b68] hover:underline" onClick={() => onNavigate('behandlungen')}><ArrowLeft aria-hidden="true" className="h-4 w-4" />Alle Leistungen</button>
      <header className="mt-7 rounded-3xl bg-[#15344a] p-6 text-white sm:p-10">
        <p className="text-sm font-medium text-[#a8e0d8]">Leistung am ARTEMIS-Standort</p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">{treatment.name}</h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/85">{treatment.shortSummary}</p>
        <button className="button-light mt-6" onClick={() => onOpenBooking(treatment.locations[0])}>Standort kontaktieren <ArrowRight aria-hidden="true" className="h-4 w-4" /></button>
      </header>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section className="clinic-card p-6 sm:p-7">
          <p className="clinic-eyebrow">Standort</p>
          <h2 className="mt-2 text-xl font-semibold text-[#15344a]">Wo die Leistung angeboten wird</h2>
          <div className="mt-4 space-y-3">
            {locations.map((location) => (
              <article className="rounded-xl bg-[#f4f7f6] p-4" key={location.id}>
                <h3 className="font-semibold text-[#15344a]">{location.name}</h3>
                <p className="mt-1 text-sm text-[#526873]">{location.street}, {location.postalCode} {location.city}</p>
                <button className="mt-3 text-sm font-semibold text-[#176b68] hover:underline" onClick={() => onNavigate('standorte', location.slug)}>Öffnungszeiten und Kontakt <ArrowRight aria-hidden="true" className="ml-1 inline h-4 w-4" /></button>
              </article>
            ))}
          </div>
        </section>

        <section className="clinic-card p-6 sm:p-7">
          <p className="clinic-eyebrow">Persönliche Beratung</p>
          <h2 className="mt-2 text-xl font-semibold text-[#15344a]">Fragen zu Ablauf, Risiken oder Kosten?</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#526873]">Diese Website kann nicht beurteilen, ob eine Behandlung für Sie geeignet ist. Lassen Sie sich vor einer Entscheidung zu Nutzen, möglichen Risiken, Alternativen, Nachsorge und entstehenden Kosten persönlich beraten.</p>
          <a className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#176b68] hover:underline" href={sourceUrl} target="_blank" rel="noopener noreferrer">ARTEMIS-Standortseite ansehen <ExternalLink aria-hidden="true" className="h-4 w-4" /></a>
        </section>
      </div>

      <p className="mt-8 rounded-xl bg-[#f2f6f5] p-4 text-sm leading-relaxed text-[#526873]">
        Die Angaben auf dieser Seite geben den Leistungsüberblick der veröffentlichten ARTEMIS-Standortseiten wieder. Medizinische Entscheidungen trifft die behandelnde Ärztin oder der behandelnde Arzt nach Untersuchung und Aufklärung.
      </p>
    </div>
  );
};
