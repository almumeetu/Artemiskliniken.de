import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { EYE_DISEASES } from '../data/diseases';
import { getDiseaseImage } from '../data/imageAssets';

interface DiseasesPageProps {
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: (locId?: string, srvId?: string) => void;
}

export const DiseasesPage: React.FC<DiseasesPageProps> = ({ onNavigate }) => (
  <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
    <header className="max-w-3xl">
      <p className="clinic-eyebrow">Patienteninformation</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#173c78] sm:text-5xl">Augenkrankheiten im Überblick</h1>
      <p className="mt-4 text-base leading-relaxed text-[#526873]">Kurze Einordnungen zu häufigen Augenerkrankungen. Die ausführlichen Informationen sind mit den entsprechenden Ratgeberseiten auf der ARTEMIS-Website verlinkt. Diese Inhalte ersetzen keine Untersuchung oder Diagnose.</p>
    </header>

    <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {EYE_DISEASES.map((disease) => {
        const image = getDiseaseImage(disease.slug);
        return (
          <article className="clinic-card flex flex-col overflow-hidden" key={disease.id}>
            <img className="clinic-card-image" src={image.src} alt={image.alt} loading="lazy" />
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-xl font-semibold text-[#173c78]">{disease.name}</h2>
                {disease.urgencyLevel === 'urgent' && <span className="shrink-0 rounded-full bg-[#fff0e8] px-2.5 py-1 text-xs font-semibold text-[#8b3d2d]">Dringend abklären</span>}
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[#526873]">{disease.shortSummary}</p>
              <div className="mt-5 flex flex-wrap gap-4 border-t border-[#e8eeed] pt-4">
                <button className="text-sm font-semibold text-[#087bb2] hover:underline" onClick={() => onNavigate('augenkrankheiten', disease.slug)}>Kurzinfo <ArrowRight aria-hidden="true" className="ml-1 inline h-4 w-4" /></button>
                <a className="inline-flex items-center gap-1 text-sm font-medium text-[#526873] hover:text-[#173c78]" href={disease.sourceUrl} target="_blank" rel="noopener noreferrer">ARTEMIS-Ratgeber <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" /></a>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  </div>
);
