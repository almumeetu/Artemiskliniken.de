import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import { CLINIC_LOCATIONS, ARTEMIS_NETWORK_STATS } from '../data/clinics';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: () => void;
  onOpenCookieSettings: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenCookieSettings,
}) => {
  const { t } = useLanguage();
  const leverkusen = CLINIC_LOCATIONS.find((c) => c.id === 'leverkusen')!;
  const opladen = CLINIC_LOCATIONS.find((c) => c.id === 'opladen')!;

  return (
    <footer className="bg-[#12304a] text-slate-300 pt-16 pb-12 border-t border-[#1e536d] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid: Locations & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Augenzentrum Leverkusen */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
              <h3 className="font-semibold text-white text-base">
                {leverkusen.name}
              </h3>
            </div>
            <p className="text-xs text-slate-400 mb-3">{leverkusen.subTitle}</p>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>
                  {leverkusen.street}
                  <br />
                  {leverkusen.postalCode} {leverkusen.city} (Wiesdorf)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <a
                  href={`tel:${leverkusen.phone.replace(/\s+/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  Tel: {leverkusen.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Mo–Do 08:00–17:00 | Fr 08:00–12:00</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('standorte', 'leverkusen')}
              className="mt-4 text-xs font-semibold text-sky-400 hover:text-sky-300 underline"
            >
              {t('Standortdetails & OP-Zentrum →', 'Branch details & OP Center →')}
            </button>
          </div>

          {/* Col 2: Praxis Opladen */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <h3 className="font-semibold text-white text-base">
                {opladen.name}
              </h3>
            </div>
            <p className="text-xs text-slate-400 mb-3">{opladen.subTitle}</p>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {opladen.street}
                  <br />
                  {opladen.postalCode} {opladen.city} (Opladen)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`tel:${opladen.phone.replace(/\s+/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  Tel: {opladen.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mo, Di, Do: 8–12:30 & 14–17 | Mi, Fr: 8–12:30</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('standorte', 'opladen')}
              className="mt-4 text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline"
            >
              {t('Praxisdetails & Sehschule →', 'Practice details & Orthoptics →')}
            </button>
          </div>

          {/* Col 3: Schwerpunkte & Behandlungen */}
          <div>
            <h3 className="font-semibold text-white text-base mb-3">
              {t('Klinische Schwerpunkte', 'Clinical Specialties')}
            </h3>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('behandlungen', 'katarakt-grauer-star')}
                  className="hover:text-white text-left transition-colors"
                >
                  {t('Katarakt-Chirurgie & Premium-Linsen', 'Cataract Surgery & Premium Lenses')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('behandlungen', 'glaukom-gruener-star')}
                  className="hover:text-white text-left transition-colors"
                >
                  {t('Glaukom-Behandlung & SLT-Laser', 'Glaucoma Therapy & SLT Laser')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('behandlungen', 'makuladegeneration-amd-ivom')}
                  className="hover:text-white text-left transition-colors"
                >
                  {t('Makulatherapie (AMD & IVOM)', 'Macular Therapy (AMD & IVOM)')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('behandlungen', 'refraktive-chirurgie-augenlasern')}
                  className="hover:text-white text-left transition-colors"
                >
                  {t('Augenlasern & EVO Visian ICL', 'Laser Eye Surgery & EVO Visian ICL')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('behandlungen', 'lidchirurgie')}
                  className="hover:text-white text-left transition-colors"
                >
                  {t('Lidchirurgie (Blepharoplastik)', 'Eyelid Surgery (Blepharoplasty)')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('behandlungen', 'sehschule-orthoptik')}
                  className="hover:text-white text-left transition-colors"
                >
                  {t('Kinder-Sehschule & Schielen', 'Pediatric Orthoptics & Strabismus')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('diagnostik', 'oct')}
                  className="hover:text-white text-left transition-colors"
                >
                  {t('Spectral-Domain OCT Diagnostik', 'Spectral-Domain OCT Diagnostics')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Qualität & Netzwerk */}
          <div>
            <h3 className="font-semibold text-white text-base mb-3">
              {t('Qualität & Netzwerk', 'Quality & Network')}
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              {t(
                'Teil des bundesweiten ARTEMIS Klinik- und Praxisverbunds mit über 25 Jahren ophthalmologischer Exzellenz.',
                'Part of the nationwide ARTEMIS clinic network with over 25 years of ophthalmic surgical leadership.'
              )}
            </p>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>{ARTEMIS_NETWORK_STATS.annualSurgeries} OP-Eingriffe / Jahr</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>{ARTEMIS_NETWORK_STATS.totalDoctors} Fachärzte & Spezialisten</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>DIN EN ISO 9001 & BDOC / DOG / BVA</span>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="mt-4 w-full py-2 px-3 bg-sky-700 hover:bg-sky-600 text-white font-semibold rounded text-xs transition-colors"
            >
              {t('Termin anfragen', 'Request Appointment')}
            </button>
          </div>
        </div>

        {/* Certifications bar */}
        <div className="pt-6 pb-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-medium text-slate-300">
              {t('Akkreditierungen & Qualitätsstandards:', 'Accreditations & Standards:')}
            </span>
            <span className="bg-slate-800 px-2.5 py-1 rounded border border-slate-700 text-slate-300">
              BDOC Qualitätssiegel
            </span>
            <span className="bg-slate-800 px-2.5 py-1 rounded border border-slate-700 text-slate-300">
              BVA zertifiziert
            </span>
            <span className="bg-slate-800 px-2.5 py-1 rounded border border-slate-700 text-slate-300">
              DOG Mitglied
            </span>
            <span className="bg-slate-800 px-2.5 py-1 rounded border border-slate-700 text-slate-300">
              ISO 9001 TÜV
            </span>
            <span className="bg-slate-800 px-2.5 py-1 rounded border border-slate-700 text-slate-300">
              RKI-Hygienestandard
            </span>
          </div>

          <div className="text-right">
            <span className="text-slate-400">Notruf bei akuter Lebensgefahr: </span>
            <strong className="text-white font-mono">112</strong>
            <span className="mx-2">|</span>
            <span className="text-slate-400">Ärztlicher Bereitschaftsdienst: </span>
            <strong className="text-white font-mono">116 117</strong>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p>
              © {new Date().getFullYear()} ARTEMIS Augenzentrum Leverkusen & Praxis Opladen. {t('Alle Rechte vorbehalten.', 'All rights reserved.')}
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              {t(
                'Medizinischer Hinweis: Diese Website dient ausschließlich der neutralen Patienteninformation und ersetzt keine individuelle ärztliche Untersuchung. Keine Heilversprechen im Sinne des Heilmittelwerbegesetzes (HWG).',
                'Medical Notice: This website provides patient health education and does not replace personalized medical examination. Compliant with HWG.'
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <button
              onClick={() => onNavigate('impressum')}
              className="hover:text-white transition-colors"
            >
              {t('Impressum', 'Legal Notice')}
            </button>
            <button
              onClick={() => onNavigate('datenschutz')}
              className="hover:text-white transition-colors"
            >
              {t('Datenschutzerklärung', 'Privacy Policy')}
            </button>
            <button
              onClick={onOpenCookieSettings}
              className="hover:text-white transition-colors"
            >
              {t('Cookie-Einstellungen', 'Cookie Settings')}
            </button>
            <button
              onClick={() => onNavigate('migration-matrix')}
              className="hover:text-sky-400 transition-colors font-medium text-slate-400"
              title="Content Parity & 301 Migration Matrix"
            >
              {t('URL-Migrationsmatrix (301)', 'URL Migration Matrix')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
