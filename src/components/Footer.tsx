import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Clock3, ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { CLINIC_LOCATIONS } from '../data/clinics';
import { ARTEMIS_IMAGES } from '../data/imageAssets';

interface FooterProps {
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: () => void;
}

const SOCIAL_LINKS = [
  { name: 'LinkedIn', network: 'linkedin', href: 'https://www.linkedin.com/company/artemis-augenkliniken/' },
  { name: 'Xing', network: 'xing', href: 'https://www.xing.com/pages/artemisaugenklinikenund-med-versorgungszentren' },
  { name: 'Facebook', network: 'facebook', href: 'https://www.facebook.com/artemiskliniken/' },
  { name: 'YouTube', network: 'youtube', href: 'https://www.youtube.com/channel/UCqichzb6eFzc3WtaW-N0mAw' },
] as const;

const SocialIcon: React.FC<{ network: (typeof SOCIAL_LINKS)[number]['network'] }> = ({ network }) => {
  if (network === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="#0A66C2">
        <circle cx="4.5" cy="4.5" r="2" />
        <path d="M2.75 8h3.5v13h-3.5V8Zm6.5 0h3.35v1.8c.62-1.12 1.87-2.1 3.93-2.1 3.55 0 4.72 2.15 4.72 5.48V21h-3.5v-7.05c0-1.7-.32-3.02-2.19-3.02-1.9 0-2.81 1.4-2.81 3.22V21h-3.5V8Z" />
      </svg>
    );
  }
  if (network === 'xing') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="#B0D400">
        <path d="M3.4 5.1h4.1l2.7 4.5-4.3 7.6H1.8l4.3-7.6-2.7-4.5ZM17.1 1h4.2l-8 14.1 5.1 7.9h-4.2l-5.1-7.9L17.1 1Z" />
      </svg>
    );
  }
  if (network === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="#1877F2">
        <path d="M13.5 22v-9h3l.45-3.5H13.5V7.25c0-1 .28-1.7 1.76-1.7h1.86V2.42c-.33-.05-1.46-.14-2.75-.14-2.72 0-4.57 1.67-4.57 4.72v2.5H6.75V13H9.8v9h3.7Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.5 6.3a3 3 0 0 0-2.1-2.1C19.55 3.7 12 3.7 12 3.7s-7.55 0-9.4.5A3 3 0 0 0 .5 6.3 32 32 0 0 0 0 12a32 32 0 0 0 .5 5.7 3 3 0 0 0 2.1 2.1c1.85.5 9.4.5 9.4.5s7.55 0 9.4-.5a3 3 0 0 0 2.1-2.1A32 32 0 0 0 24 12a32 32 0 0 0-.5-5.7Z" fill="#FF0033" />
      <path d="m9.6 15.6 6.3-3.6-6.3-3.6v7.2Z" fill="#fff" />
    </svg>
  );
};

const FooterMap: React.FC = () => {
  const [selectedId, setSelectedId] = useState(CLINIC_LOCATIONS[0].id);
  const [mapLoaded, setMapLoaded] = useState(false);
  const location = CLINIC_LOCATIONS.find((item) => item.id === selectedId)!;
  const address = location.street + ', ' + location.postalCode + ' ' + location.city;

  return (
    <section className="site-footer__maps" aria-labelledby="footer-map-heading">
      <h2 id="footer-map-heading" className="site-footer__heading">Ihr Weg zu uns</h2>
      <div className="site-footer__map-switcher" role="group" aria-label="Standort auf der Karte auswählen">
        {CLINIC_LOCATIONS.map((item) => (
          <button
            type="button"
            key={item.id}
            aria-pressed={selectedId === item.id}
            aria-controls="footer-location-map"
            onClick={() => setSelectedId(item.id)}
          >
            {item.id === 'opladen' ? 'Opladen' : 'Leverkusen'}
          </button>
        ))}
      </div>
      {mapLoaded ? (
        <iframe
          className="site-footer__map-frame"
          id="footer-location-map"
          key={location.id}
          title={'Google Maps: ' + location.name + ', ' + address}
          src={'https://www.google.com/maps?q=' + encodeURIComponent(address) + '&hl=de&z=15&output=embed'}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <div className="site-footer__map-consent" id="footer-location-map">
          <MapPin aria-hidden="true" />
          <div>
            <strong>Karte für {location.id === 'opladen' ? 'Opladen' : 'Leverkusen'}</strong>
            <span>Google Maps wird erst nach Ihrer Auswahl geladen.</span>
          </div>
          <button type="button" onClick={() => setMapLoaded(true)}>Karte laden</button>
        </div>
      )}
      <div className="site-footer__map-bottom">
        <p>{location.street}<br />{location.postalCode} {location.city}</p>
        <a
          className="site-footer__route"
          href={'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(address)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={'Route zu ' + location.name + ' planen'}
        >
          Route planen <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
};

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => (
  <footer className="site-footer">
    <div className="site-footer__inner">
      <div className="site-footer__brand">
        <div className="site-footer__identity">
          <img className="site-footer__logo" src={ARTEMIS_IMAGES.logo} alt="ARTEMIS Augenheilkunde" />
          <p>Augenmedizin in Leverkusen und Opladen</p>
        </div>
        <button className="site-footer__cta" type="button" onClick={onOpenBooking}>
          Termin anfragen <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>

      <div className="site-footer__columns">
        <div className="site-footer__contacts">
          {CLINIC_LOCATIONS.map((location) => (
            <section className="site-footer__location" key={location.id} aria-label={location.name}>
              <h2 className="site-footer__heading">{location.id === 'opladen' ? 'Opladen' : 'Leverkusen'}</h2>
              <p className="site-footer__location-type">{location.isOpZentrum ? 'Augenzentrum & OP-Zentrum' : 'Augenarzt-Praxis'}</p>
              <address>{location.street}<br />{location.postalCode} {location.city}</address>
              <div className="site-footer__contact-links">
                <a className="footer-link" href={'tel:' + location.phone}><Phone aria-hidden="true" />{location.phoneDisplay}</a>
                <a className="footer-link" href={'mailto:' + location.email}><Mail aria-hidden="true" /><span>{location.email}</span></a>
                <button className="footer-link" type="button" onClick={() => onNavigate('standorte', location.slug)}><Clock3 aria-hidden="true" /><span>Öffnungszeiten & Kontakt</span></button>
              </div>
            </section>
          ))}
        </div>

        <nav className="site-footer__direct-links" aria-label="Footer-Navigation">
          <h2 className="site-footer__heading">Orientierung</h2>
          <ul>
            <li><button className="footer-link" type="button" onClick={() => onNavigate('behandlungen')}>Behandlungen</button></li>
            <li><button className="footer-link" type="button" onClick={() => onNavigate('augenkrankheiten')}>Augenkrankheiten</button></li>
            <li><button className="footer-link" type="button" onClick={() => onNavigate('diagnostik')}>Diagnostik</button></li>
            <li><button className="footer-link" type="button" onClick={() => onNavigate('aerzte')}>Ärztliches Team</button></li>
            <li><button className="footer-link" type="button" onClick={() => onNavigate('patienten-info')}>Patienteninformationen</button></li>
            <li><button className="footer-link" type="button" onClick={onOpenBooking}>Terminvereinbarung</button></li>
          </ul>
        </nav>

        <FooterMap />
      </div>

      <div className="site-footer__bottom">
        <p className="site-footer__notice">Medizinische Informationen auf dieser Website ersetzen keine persönliche Untersuchung oder ärztliche Beratung.</p>
        <nav className="site-footer__legal" aria-label="Rechtliche Informationen">
          <a className="footer-link" href="https://www.artemiskliniken.de/impressum/">Impressum <ExternalLink aria-hidden="true" /></a>
          <a className="footer-link" href="https://www.artemiskliniken.de/datenschutz/">Datenschutz <ExternalLink aria-hidden="true" /></a>
          <button className="footer-link" type="button" onClick={() => onNavigate('notfall-akutfall')}>Notfallhinweise</button>
        </nav>
      </div>
      <div className="site-footer__meta">
        <span>© {new Date().getFullYear()} ARTEMIS</span>
        <span>Ärztlicher Bereitschaftsdienst: <a className="footer-link" href="tel:116117">116 117</a></span>
        <span>Bei lebensbedrohlichem Notfall: <a className="footer-link" href="tel:112">112</a></span>
        <nav className="site-footer__social" aria-label="ARTEMIS in sozialen Medien">
          <div className="site-footer__social-links">
            {SOCIAL_LINKS.map((social) => (
              <a className="site-footer__social-link" href={social.href} key={social.network} target="_blank" rel="noopener noreferrer" aria-label={'ARTEMIS auf ' + social.name} title={social.name}>
                <SocialIcon network={social.network} />
              </a>
            ))}
          </div>
        </nav>
      </div>
    </div>
  </footer>
);
