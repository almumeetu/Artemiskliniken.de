import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { DIAGNOSTICS } from '../data/diagnostics';
import { CLINIC_LOCATIONS } from '../data/clinics';
import { getDiagnosticImage } from '../data/imageAssets';

interface DiagnosticsPageProps {
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: (locId?: string, srvId?: string) => void;
}

export const DiagnosticsPage: React.FC<DiagnosticsPageProps> = ({ onNavigate, onOpenBooking }) => (
  <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
    <header className="max-w-3xl">
      <p className="clinic-eyebrow">Augenuntersuchungen</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#173c78] sm:text-5xl">Diagnostik</h1>
      <p className="mt-4 text-base leading-relaxed text-[#526873]">Die Standortseiten von ARTEMIS nennen Basis- und Spezialdiagnostik sowie ausgewählte bildgebende Verfahren. Welche Untersuchung in Ihrem Fall benötigt wird, besprechen Sie mit dem ärztlichen Team.</p>
    </header>

    <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {DIAGNOSTICS.map((item) => {
        const locations = CLINIC_LOCATIONS.filter((location) => item.locations.includes(location.id));
        const image = getDiagnosticImage(item.slug);
        return (
          <article className="clinic-card flex flex-col overflow-hidden" key={item.id}>
            <img className="clinic-card-image" src={image.src} alt={image.alt} loading="lazy" />
            <div className="flex flex-1 flex-col p-6">
              <p className="clinic-eyebrow">Untersuchung</p>
              <h2 className="mt-2 text-xl font-semibold text-[#173c78]">{item.name}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[#526873]">{item.shortSummary}</p>
              <div className="mt-5 space-y-2 border-t border-[#e8eeed] pt-4 text-xs text-[#526873]">
                {locations.map((location) => <p className="flex items-center gap-2" key={location.id}><MapPin aria-hidden="true" className="h-3.5 w-3.5 text-[#087bb2]" />{location.name}</p>)}
              </div>
              <div className="mt-5 flex flex-wrap gap-4">
                <button className="text-sm font-semibold text-[#087bb2] hover:underline" onClick={() => onNavigate('diagnostik', item.slug)}>Informationen <ArrowRight aria-hidden="true" className="ml-1 inline h-4 w-4" /></button>
                <button className="text-sm font-medium text-[#526873] hover:text-[#173c78]" onClick={() => onOpenBooking(item.locations[0])}>Standort kontaktieren</button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  </div>
);
