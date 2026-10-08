import React from 'react';
import { ArrowRight, Clock3, ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { CLINIC_LOCATIONS } from '../data/clinics';
import { ARTEMIS_IMAGES } from '../data/imageAssets';

interface FooterProps {
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <footer className="site-footer">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="site-footer__brand">
          <div className="site-footer__identity">
            <img className="site-footer__logo" src={ARTEMIS_IMAGES.logo} alt="ARTEMIS Augenheilkunde" />
            <p>Augenmedizin in Leverkusen und Opladen</p>
          </div>
          <button className="site-footer__cta" type="button" onClick={onOpenBooking}>
            Termin anfragen <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        <div className="site-footer__columns grid gap-5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_0.8fr]">
          {CLINIC_LOCATIONS.map((location) => (
            <section className="site-footer__location" key={location.id}>
              <p className="site-footer__eyebrow">ARTEMIS Standort</p>
              <h2 className="text-base font-semibold text-white">{location.name}</h2>
              <address className="mt-3 not-italic text-sm leading-relaxed text-white/70">
                {location.street}<br />{location.postalCode} {location.city}
              </address>
              <div className="mt-4 space-y-2 text-sm">
                <a className="footer-link flex items-center gap-2" href={'tel:' + location.phone}><Phone aria-hidden="true" className="h-4 w-4" />{location.phoneDisplay}</a>
                <a className="footer-link flex items-center gap-2 break-all" href={'mailto:' + location.email}><Mail aria-hidden="true" className="h-4 w-4 shrink-0" />{location.email}</a>
                <button className="footer-link inline-flex items-center gap-2" onClick={() => onNavigate('standorte', location.slug)}><Clock3 aria-hidden="true" className="h-4 w-4" />Öffnungszeiten und Anfahrt</button>
              </div>
            </section>
          ))}

          <section className="site-footer__direct-links">
            <p className="site-footer__eyebrow">Orientierung</p>
            <h2 className="text-base font-semibold text-white">Direkt zu</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li><button className="footer-link" onClick={() => onNavigate('behandlungen')}>Behandlungen</button></li>
              <li><button className="footer-link" onClick={() => onNavigate('augenkrankheiten')}>Augenkrankheiten</button></li>
              <li><button className="footer-link" onClick={() => onNavigate('diagnostik')}>Diagnostik</button></li>
              <li><button className="footer-link" onClick={() => onNavigate('aerzte')}>Ärztliches Team</button></li>
              <li><button className="footer-link" onClick={() => onNavigate('patienten-info')}>Patienteninformationen</button></li>
              <li><button className="footer-link inline-flex items-center gap-1" onClick={onOpenBooking}>Terminvereinbarung <ArrowRight aria-hidden="true" className="h-4 w-4" /></button></li>
            </ul>
          </section>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-white/15 pt-6 text-sm text-white/65 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl leading-relaxed">
            Medizinische Informationen auf dieser Website ersetzen keine persönliche Untersuchung oder Beratung durch eine Ärztin oder einen Arzt.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a className="footer-link inline-flex items-center gap-1" href="https://www.artemiskliniken.de/impressum/">Impressum <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" /></a>
            <a className="footer-link inline-flex items-center gap-1" href="https://www.artemiskliniken.de/datenschutz/">Datenschutz <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" /></a>
            <button className="footer-link inline-flex items-center gap-1" onClick={() => onNavigate('notfall-akutfall')}><MapPin aria-hidden="true" className="h-3.5 w-3.5" />Notfallhinweise</button>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/55">
          <span>© {new Date().getFullYear()} ARTEMIS</span>
          <span>Ärztlicher Bereitschaftsdienst: <a className="footer-link font-semibold" href="tel:116117">116 117</a></span>
          <span>Rettungsdienst bei lebensbedrohlichem Notfall: <a className="footer-link font-semibold" href="tel:112">112</a></span>
        </div>
      </div>
    </footer>
  );
};
