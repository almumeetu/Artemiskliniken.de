import React from 'react';
import { ArrowRight, CalendarDays, Check, Clock3, ExternalLink, MapPin, Phone } from 'lucide-react';
import { CLINIC_LOCATIONS } from '../data/clinics';
import { ARTEMIS_IMAGES } from '../data/imageAssets';
import { useLanguage } from '../context/LanguageContext';

interface StandortePageProps {
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: (locId?: string, srvId?: string) => void;
}

export const StandortePage: React.FC<StandortePageProps> = ({ onNavigate, onOpenBooking }) => {
  const { language } = useLanguage();

  return (
    <main className="locations-page">
      <section className="locations-hero">
        <div className="mx-auto grid max-w-7xl items-center gap-9 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-8 lg:py-16">
          <div className="locations-hero__copy">
            <p className="clinic-eyebrow">ARTEMIS vor Ort · Leverkusen</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#173c78] sm:text-5xl lg:text-[3.4rem]">Augenheilkunde in Ihrer Nähe</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#526873] sm:text-lg">
              Zwei ARTEMIS-Standorte in Leverkusen: Wählen Sie das Augenzentrum mit ambulantem OP-Zentrum oder die Augenarzt-Praxis in Opladen.
            </p>
            <div className="locations-hero__facts" aria-label="ARTEMIS in Leverkusen">
              <span><MapPin aria-hidden="true" className="h-5 w-5" /><strong>2</strong> Standorte in Leverkusen</span>
              <span><Clock3 aria-hidden="true" className="h-5 w-5" />Kontakt und Sprechzeiten im Überblick</span>
            </div>
            <a className="button-primary mt-7 inline-flex" href="#standortauswahl">
              Standort auswählen <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>

          <figure className="locations-hero__visual">
            <img
              src={ARTEMIS_IMAGES.clinic}
              alt="Augenärztliches Team im ARTEMIS Augenzentrum"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <figcaption>
              <span className="locations-hero__pin"><MapPin aria-hidden="true" className="h-5 w-5" /></span>
              <span><small>ARTEMIS Augenheilkunde</small><strong>Leverkusen und Opladen</strong></span>
              <span className="locations-hero__count">02</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="standortauswahl" className="locations-directory mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <header className="locations-directory__heading">
          <div>
            <p className="clinic-eyebrow">Persönlich vor Ort</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#173c78] sm:text-4xl">Welcher Standort passt zu Ihnen?</h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-[#526873] sm:text-base">
            Vergleichen Sie die wichtigsten Angaben und öffnen Sie direkt die Informationen zu Anfahrt, Leistungen und Terminvereinbarung.
          </p>
        </header>

        <div className="locations-directory__grid">
          {CLINIC_LOCATIONS.map((location, index) => {
            const isLeverkusen = location.id === 'leverkusen';
            const address = `${location.street}, ${location.postalCode} ${location.city}`;
            const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

            return (
              <article className="location-card" key={location.id}>
                <div className="location-card__photo">
                  <img
                    src={isLeverkusen ? ARTEMIS_IMAGES.clinic : ARTEMIS_IMAGES.practice}
                    alt={isLeverkusen ? 'Augenärztliches Team im ARTEMIS Augenzentrum Leverkusen' : 'Empfang der ARTEMIS Augenarzt-Praxis Opladen'}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="location-card__index">0{index + 1}</span>
                  <span className="location-card__type">{location.isOpZentrum ? 'Mit ambulantem OP-Zentrum' : 'Augenärztliche Praxis'}</span>
                </div>

                <div className="location-card__body">
                  <div className="location-card__title">
                    <p className="clinic-eyebrow">{isLeverkusen ? 'Leverkusen Mitte' : 'Leverkusen-Opladen'}</p>
                    <h3>{location.name}</h3>
                    <p>{language === 'de' ? location.subTitle : location.subTitleEn}</p>
                  </div>

                  <div className="location-card__contact">
                    <address>
                      <MapPin aria-hidden="true" className="h-5 w-5" />
                      <span><small>Adresse</small><strong>{location.street}<br />{location.postalCode} {location.city}</strong></span>
                    </address>
                    <a href={`tel:${location.phone}`}>
                      <Phone aria-hidden="true" className="h-5 w-5" />
                      <span><small>Telefon</small><strong>{location.phoneDisplay}</strong></span>
                    </a>
                  </div>

                  <div className="location-card__details">
                    <section>
                      <h4><Check aria-hidden="true" className="h-4 w-4" />Leistungen</h4>
                      <ul className="location-card__services">
                        {location.features.slice(0, 4).map((feature) => <li key={feature}>{feature}</li>)}
                      </ul>
                    </section>
                    <section>
                      <h4><Clock3 aria-hidden="true" className="h-4 w-4" />Sprechzeiten</h4>
                      <ul className="location-card__hours">
                        {location.openingHours.slice(0, 5).map((item) => (
                          <li key={item.days}><span>{item.days}</span><strong>{item.hours}</strong></li>
                        ))}
                      </ul>
                    </section>
                  </div>

                  <div className="location-card__actions">
                    <button className="button-primary button-primary-small" type="button" onClick={() => onNavigate('standorte', location.slug)}>
                      Standort ansehen <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </button>
                    <button className="button-secondary button-secondary-small" type="button" onClick={() => onOpenBooking(location.id)}>
                      <CalendarDays aria-hidden="true" className="h-4 w-4" />Termin anfragen
                    </button>
                    <a className="location-card__route" href={mapUrl} target="_blank" rel="noreferrer">
                      Route planen <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <aside className="locations-note">
          <span className="locations-note__icon"><MapPin aria-hidden="true" className="h-5 w-5" /></span>
          <div>
            <h3>Sie sind unsicher, welcher Standort passt?</h3>
            <p>Rufen Sie uns an. Das Praxisteam hilft Ihnen bei Fragen zum richtigen Standort und zum nächsten Termin.</p>
          </div>
          <a href={`tel:${CLINIC_LOCATIONS[0].phone}`}>Leverkusen anrufen <ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
        </aside>
      </section>
    </main>
  );
};
