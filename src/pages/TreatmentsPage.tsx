import React, { useState } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { TREATMENTS } from '../data/treatments';
import { CLINIC_LOCATIONS } from '../data/clinics';
import { getTreatmentImage } from '../data/imageAssets';

interface TreatmentsPageProps {
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: (locId?: string, srvId?: string) => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  cataract: 'Grauer Star',
  glaucoma: 'Grüner Star',
  retina: 'Netzhaut und Makula',
  refractive: 'Augenlasern',
  eyelid: 'Lidchirurgie',
  pediatric: 'Vorsorge bei Kindern',
};

export const TreatmentsPage: React.FC<TreatmentsPageProps> = ({ onNavigate, onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const categories = [{ id: 'all', label: 'Alle Leistungen' }, ...Object.entries(CATEGORY_LABELS).map(([id, label]) => ({ id, label }))];
  const visibleTreatments = activeCategory === 'all' ? TREATMENTS : TREATMENTS.filter((item) => item.category === activeCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="max-w-3xl">
        <p className="clinic-eyebrow">Leistungen an den ARTEMIS-Standorten</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#173c78] sm:text-5xl">Behandlungen und Schwerpunkte</h1>
        <p className="mt-4 text-base leading-relaxed text-[#526873]">
          Dieser Überblick orientiert sich an den öffentlich aufgeführten Leistungen in Leverkusen und Opladen. Das Angebot unterscheidet sich je nach Standort. Ob eine Untersuchung oder Behandlung für Sie infrage kommt, klären Sie bitte mit dem ärztlichen Team.
        </p>
      </header>

      <nav className="mt-6 flex flex-wrap gap-3" aria-label="Weitere Patienteninformationen">
        <button className="button-secondary button-secondary-small" onClick={() => onNavigate('diagnostik')}>Untersuchungen und Diagnostik <ArrowRight aria-hidden="true" className="h-4 w-4" /></button>
        <button className="button-secondary button-secondary-small" onClick={() => onNavigate('augenkrankheiten')}>Augenkrankheiten verstehen <ArrowRight aria-hidden="true" className="h-4 w-4" /></button>
      </nav>

      <div className="mt-8 flex flex-wrap gap-2" aria-label="Leistungen filtern">
        {categories.map((category) => (
          <button key={category.id} aria-pressed={activeCategory === category.id} onClick={() => setActiveCategory(category.id)} className={activeCategory === category.id ? 'button-primary button-primary-small' : 'button-secondary button-secondary-small'}>
            {category.label}
          </button>
        ))}
      </div>

      <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visibleTreatments.map((item) => {
          const locations = CLINIC_LOCATIONS.filter((location) => item.locations.includes(location.id));
          const image = getTreatmentImage(item.slug);
          return (
            <article className="clinic-card flex flex-col overflow-hidden" key={item.id}>
              <img className="clinic-card-image" src={image.src} alt={image.alt} loading="lazy" />
              <div className="flex flex-1 flex-col p-6">
                <p className="clinic-eyebrow">{CATEGORY_LABELS[item.category] ?? 'Augenheilkunde'}</p>
                <h2 className="mt-2 text-xl font-semibold text-[#173c78]">{item.name}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#526873]">{item.shortSummary}</p>
                <div className="mt-5 space-y-2 border-t border-[#e8eeed] pt-4 text-xs text-[#526873]">
                  {locations.map((location) => <p className="flex items-center gap-2" key={location.id}><MapPin aria-hidden="true" className="h-3.5 w-3.5 text-[#087bb2]" />{location.name}</p>)}
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button className="text-sm font-semibold text-[#087bb2] hover:underline" onClick={() => onNavigate('behandlungen', item.slug)}>Informationen <ArrowRight aria-hidden="true" className="ml-1 inline h-4 w-4" /></button>
                  <button className="text-sm font-medium text-[#526873] hover:text-[#173c78]" onClick={() => onOpenBooking(item.locations[0])}>Standort kontaktieren</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
