import React from 'react';
import { ArrowRight, CalendarDays, Clock3, Eye, MapPin, Phone } from 'lucide-react';
import { CLINIC_LOCATIONS } from '../data/clinics';

interface HomePageProps {
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: (locId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenBooking }) => {
  const leverkusen = CLINIC_LOCATIONS[0];
  const opladen = CLINIC_LOCATIONS[1];

  return (
    <div className="pb-16">
      <section className="home-hero">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-12 lg:px-8 lg:py-20">
          <div className="lg:col-span-7">
            <p className="clinic-eyebrow mb-4">Augenheilkunde in Leverkusen</p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-[#15344a] sm:text-5xl lg:text-6xl">
              Gut sehen beginnt mit guter Orientierung.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#425864]">
              Finden Sie den passenden ARTEMIS-Standort, informieren Sie sich über das Angebot und wählen Sie den richtigen Weg zur Terminvereinbarung.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="button-primary" onClick={() => onOpenBooking('leverkusen')}>
                <CalendarDays aria-hidden="true" className="h-5 w-5" />
                Online-Termin oder Kontakt
              </button>
              <a className="button-secondary" href={'tel:' + leverkusen.phone}>
                <Phone aria-hidden="true" className="h-5 w-5" />
                {leverkusen.phoneDisplay}
              </a>
            </div>
            <p className="mt-4 text-sm text-[#526873]">
              Für Opladen erfolgt die Terminvereinbarung telefonisch.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="home-visual-card">
              <div aria-hidden="true" className="home-eye-mark"><Eye className="h-16 w-16" strokeWidth={1.3} /></div>
              <p className="clinic-eyebrow text-white/75">Zwei Standorte in Leverkusen</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Wohin möchten Sie?</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Die Angebote unterscheiden sich je nach Standort. Wählen Sie Praxis oder Augenzentrum, um Kontakt und Öffnungszeiten zu sehen.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {[leverkusen, opladen].map((location) => (
                  <button
                    key={location.id}
                    onClick={() => onNavigate('standorte', location.slug)}
                    className="location-choice"
                  >
                    <span className="flex items-start gap-3">
                      <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#77c2bd]" />
                      <span>
                        <span className="block font-semibold text-white">{location.id === 'leverkusen' ? 'Augenzentrum Leverkusen' : 'Augenarzt-Praxis Opladen'}</span>
                        <span className="mt-1 block text-xs text-white/70">{location.street}</span>
                      </span>
                    </span>
                    <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-white/70" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="section-heading">
          <p className="clinic-eyebrow">Leistungen vor Ort</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#15344a] sm:text-4xl">Augenheilkunde an zwei Standorten</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#526873]">
            Das ARTEMIS Augenzentrum Leverkusen ist Praxis und ambulantes OP-Zentrum. Die Praxis in Opladen bietet augenärztliche Diagnostik, Vorsorge und Nachsorge. Welche Leistung an welchem Standort möglich ist, erfahren Sie auf den jeweiligen Standortseiten.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {[leverkusen, opladen].map((location) => (
            <article key={location.id} className="clinic-card flex h-full flex-col p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="clinic-eyebrow">{location.id === 'leverkusen' ? 'Ambulantes OP-Zentrum' : 'Augenarzt-Praxis'}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-[#15344a]">{location.id === 'leverkusen' ? 'Leverkusen' : 'Opladen'}</h3>
                </div>
                <MapPin aria-hidden="true" className="h-6 w-6 shrink-0 text-[#16766f]" />
              </div>
              <p className="mt-4 text-sm text-[#526873]">{location.street}, {location.postalCode} {location.city}</p>
              <ul className="mt-5 space-y-2 text-sm leading-relaxed text-[#344b58]">
                {location.features.slice(0, 4).map((service) => <li className="flex gap-2" key={service}><span aria-hidden="true" className="text-[#16766f]">•</span><span>{service}</span></li>)}
              </ul>
              <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row">
                <button className="button-primary button-primary-small" onClick={() => onNavigate('standorte', location.slug)}>
                  Standort ansehen <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </button>
                <a className="button-secondary button-secondary-small" href={'tel:' + location.phone}>
                  <Phone aria-hidden="true" className="h-4 w-4" /> {location.phoneDisplay}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f2f6f5]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
          <div>
            <p className="clinic-eyebrow">Gut vorbereitet</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#15344a]">Fragen zum Besuch oder zu einer Untersuchung?</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#526873]">
              Bringen Sie Ihre Versichertenkarte, eine aktuelle Medikamentenliste und vorhandene Vorbefunde mit. Wenn Sie Fragen zu einer Untersuchung oder möglichen Kosten haben, klären Sie diese bitte vorab mit der Praxis.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <button className="button-primary" onClick={() => onNavigate('patienten-info')}>
              Patienteninformationen <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
            <button className="button-secondary" onClick={() => onNavigate('notfall-akutfall')}>
              <Clock3 aria-hidden="true" className="h-4 w-4" /> Akute Beschwerden
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
