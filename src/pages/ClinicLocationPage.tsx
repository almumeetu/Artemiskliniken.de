import React from 'react';
import { ArrowRight, Clock3, ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { CLINIC_LOCATIONS } from '../data/clinics';
import { DOCTORS } from '../data/doctors';
import { ARTEMIS_IMAGES } from '../data/imageAssets';
import { useLanguage } from '../context/LanguageContext';

interface ClinicLocationPageProps {
  locationId: 'leverkusen' | 'opladen';
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: (locId?: string) => void;
}

export const ClinicLocationPage: React.FC<ClinicLocationPageProps> = ({
  locationId,
  onNavigate,
  onOpenBooking,
}) => {
  const { language } = useLanguage();
  const location = CLINIC_LOCATIONS.find((item) => item.id === locationId)!;
  const team = DOCTORS.filter((doctor) => doctor.locations.includes(locationId));
  const mapQuery = encodeURIComponent(location.street + ', ' + location.postalCode + ' ' + location.city);

  return (
    <div className="pb-16">
      <section className="location-hero">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <div className="lg:col-span-7">
            <button className="mb-6 text-sm font-medium text-white/75 hover:text-white" onClick={() => onNavigate('standorte')}>
              ← Alle Standorte
            </button>
            <p className="clinic-eyebrow text-white/70">ARTEMIS vor Ort in Leverkusen</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">{location.name}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">{language === 'de' ? location.subTitle : location.subTitleEn}</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/80">
              <span className="inline-flex items-start gap-2"><MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-[#8fd2ca]" />{location.street}, {location.postalCode} {location.city}</span>
              <a className="inline-flex items-center gap-2 hover:text-white" href={'tel:' + location.phone}><Phone aria-hidden="true" className="h-4 w-4 text-[#8fd2ca]" />{location.phoneDisplay}</a>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button className="button-light" onClick={() => onOpenBooking(locationId)}>
                {location.bookingUrl ? 'Online-Termin vereinbaren' : 'Termin telefonisch vereinbaren'}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </button>
              <a className="button-ghost-light" href={'https://www.google.com/maps/search/?api=1&query=' + mapQuery} target="_blank" rel="noopener noreferrer">
                Route planen <ExternalLink aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </div>
          <figure className="location-hero-image lg:col-span-5">
            <img
              src={locationId === 'leverkusen' ? ARTEMIS_IMAGES.clinic : ARTEMIS_IMAGES.practice}
              alt={locationId === 'leverkusen' ? 'Augenärztliches Team im OP-Zentrum' : 'Empfangsbereich der Augenarztpraxis'}
              loading="eager"
            />
          </figure>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-8 lg:py-14">
        <main className="space-y-10">
          <section>
            <p className="clinic-eyebrow">Leistungen am Standort</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#173c78] sm:text-3xl">Das Angebot in {locationId === 'leverkusen' ? 'Leverkusen' : 'Opladen'}</h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#526873]">
              {locationId === 'leverkusen'
                ? 'Das Augenzentrum Leverkusen vereint eine Augenarztpraxis und ein ambulantes OP-Zentrum. Die angebotenen Untersuchungen und Eingriffe richten sich nach Ihrem Befund und der ärztlichen Einschätzung.'
                : 'Die Augenarzt-Praxis Opladen bietet Diagnostik, Vorsorge und Nachsorge. Welche Untersuchung für Sie infrage kommt, besprechen Sie mit dem Praxisteam.'}
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {location.features.map((feature) => (
                <li className="service-list-item" key={feature}><span aria-hidden="true" className="service-list-dot" /><span>{feature}</span></li>
              ))}
            </ul>
          </section>

          <section className="border-t border-[#e0e8e7] pt-8">
            <p className="clinic-eyebrow">Ärztliches Team</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#173c78]">Ihre Ansprechpersonen am Standort</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {team.map((doctor) => (
                <article className="clinic-card p-5" key={doctor.id}>
                  <h3 className="text-lg font-semibold text-[#173c78]">{doctor.name}</h3>
                  <p className="mt-1 text-sm text-[#526873]">{language === 'de' ? doctor.role : doctor.roleEn}</p>
                  <button className="mt-4 text-sm font-semibold text-[#087bb2] hover:underline" onClick={() => onNavigate('aerzte', doctor.slug)}>
                    Profil ansehen <ArrowRight aria-hidden="true" className="ml-1 inline h-4 w-4" />
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-[#f2f6f5] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-[#173c78]">Vor Ihrem Besuch</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#526873]">
              Bitte bringen Sie Ihre Versichertenkarte, vorhandene Vorbefunde und eine aktuelle Medikamentenliste mit. Fragen zu Kosten, Überweisungen oder einer Untersuchung beantwortet Ihnen das Praxisteam vor Ihrem Termin.
            </p>
            <button className="mt-5 text-sm font-semibold text-[#087bb2] hover:underline" onClick={() => onNavigate('patienten-info')}>
              Patienteninformationen lesen <ArrowRight aria-hidden="true" className="ml-1 inline h-4 w-4" />
            </button>
          </section>
        </main>

        <aside className="space-y-5">
          <section className="clinic-card p-5 sm:p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-[#173c78]"><Clock3 aria-hidden="true" className="h-5 w-5 text-[#087bb2]" />Öffnungszeiten</h2>
            <dl className="mt-4 space-y-2 text-sm">
              {location.openingHours.map((hours) => (
                <div className="flex justify-between gap-4 border-b border-[#edf1f0] pb-2 last:border-0" key={hours.days}>
                  <dt className="text-[#526873]">{language === 'de' ? hours.days : hours.daysEn}</dt>
                  <dd className="text-right font-medium text-[#173c78]">{hours.hours}</dd>
                </div>
              ))}
            </dl>
            {location.phoneHours && <p className="mt-4 border-t border-[#e0e8e7] pt-4 text-xs leading-relaxed text-[#526873]">Telefonische Erreichbarkeit: {location.phoneHours}</p>}
          </section>

          <section className="clinic-card space-y-4 p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-[#173c78]">Kontakt</h2>
            <p className="text-sm leading-relaxed text-[#526873]">{location.street}<br />{location.postalCode} {location.city}</p>
            <a className="inline-flex items-center gap-2 text-sm font-semibold text-[#087bb2] hover:underline" href={'tel:' + location.phone}><Phone aria-hidden="true" className="h-4 w-4" />{location.phoneDisplay}</a>
            <a className="flex items-start gap-2 break-all text-sm text-[#087bb2] hover:underline" href={'mailto:' + location.email}><Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />{location.email}</a>
            <a className="button-secondary button-secondary-small w-full" href={'https://www.google.com/maps/search/?api=1&query=' + mapQuery} target="_blank" rel="noopener noreferrer">Route planen <ExternalLink aria-hidden="true" className="h-4 w-4" /></a>
          </section>
        </aside>
      </div>
    </div>
  );
};
