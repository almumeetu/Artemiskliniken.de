import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Shield, FileText, Scale } from 'lucide-react';

interface LegalPageProps {
  initialTab?: 'impressum' | 'datenschutz';
}

export const LegalPage: React.FC<LegalPageProps> = ({ initialTab = 'impressum' }) => {
  const { t } = useLanguage();
  const [tab, setTab] = useState<'impressum' | 'datenschutz'>(initialTab);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-20">
      
      {/* Tab Switcher */}
      <div className="flex gap-3 border-b border-slate-200 pb-3">
        <button
          onClick={() => setTab('impressum')}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 ${
            tab === 'impressum' ? 'bg-sky-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>{t('Impressum (§ 5 DDG)', 'Legal Notice')}</span>
        </button>

        <button
          onClick={() => setTab('datenschutz')}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 ${
            tab === 'datenschutz' ? 'bg-sky-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>{t('Datenschutzerklärung (DSGVO)', 'Privacy Policy')}</span>
        </button>
      </div>

      {tab === 'impressum' ? (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6 text-xs text-slate-700 leading-relaxed">
          <h1 className="text-2xl font-bold text-slate-900">
            {t('Impressum', 'Legal Notice')}
          </h1>

          <div>
            <h2 className="font-bold text-sm text-slate-900 mb-1">Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)</h2>
            <p>
              <strong>ARTEMIS Augenzentrum Leverkusen</strong><br />
              (Ambulantes Ophthalmochirurgisches OP-Zentrum)<br />
              Friedrich-Ebert-Straße 17<br />
              51373 Leverkusen<br />
              Telefon: 0214 44488<br />
              E-Mail: info@artemiskliniken.de
            </p>
            <p className="mt-3">
              <strong>Zweigpraxis: ARTEMIS Augenarzt-Praxis Opladen</strong><br />
              Kölner Str. 56-58<br />
              51379 Leverkusen<br />
              Telefon: 02171 1490
            </p>
          </div>

          <div>
            <h2 className="font-bold text-sm text-slate-900 mb-1">Ärztliche Leitung & Verantwortlichkeit</h2>
            <p>
              Dr. med. Masoud Arani (Leitender Arzt & Ophthalmochirurg, FEBO)<br />
              Gesetzliche Berufsbezeichnung: Facharzt für Augenheilkunde (verliehen in der Bundesrepublik Deutschland)
            </p>
          </div>

          <div>
            <h2 className="font-bold text-sm text-slate-900 mb-1">Zuständige Aufsichtsbehörden & Kammern</h2>
            <p>
              <strong>Zuständige Ärztekammer:</strong><br />
              Ärztekammer Nordrhein (Köln/Düsseldorf)<br />
              Tersteegenstraße 9, 40474 Düsseldorf<br />
              Website: <a href="https://www.aekno.de" target="_blank" rel="noopener noreferrer" className="text-sky-700 underline">www.aekno.de</a>
            </p>
            <p className="mt-2">
              <strong>Zuständige Kassenärztliche Vereinigung:</strong><br />
              Kassenärztliche Vereinigung Nordrhein (KVNO)<br />
              Tersteegenstraße 9, 40474 Düsseldorf<br />
              Website: <a href="https://www.kvno.de" target="_blank" rel="noopener noreferrer" className="text-sky-700 underline">www.kvno.de</a>
            </p>
          </div>

          <div>
            <h2 className="font-bold text-sm text-slate-900 mb-1">Berufsrechtliche Regelungen</h2>
            <p>
              • Berufsordnung für die nordrheinischen Ärztinnen und Ärzte<br />
              • Heilberufsgesetz des Landes Nordrhein-Westfalen (HeilBerG NRW)<br />
              Die berufsrechtlichen Vorschriften sind einsehbar auf den Seiten der Ärztekammer Nordrhein.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-sm text-slate-900 mb-1">Hinweis zum Heilmittelwerbegesetz (HWG)</h2>
            <p>
              Aus rechtlichen Gründen weisen wir darauf hin, dass die auf dieser Website dargebotenen Informationen neutraler Patientenaufklärung dienen und keinesfalls als Heil- oder Erfolgsversprechen im Sinne des HWG oder der Berufsordnung (MBO-Ä) zu verstehen sind. Jede medizinische Behandlung bedarf der individuellen augenärztlichen Untersuchung und Risikoabwägung.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6 text-xs text-slate-700 leading-relaxed">
          <h1 className="text-2xl font-bold text-slate-900">
            {t('Datenschutzerklärung nach DSGVO', 'Privacy Policy')}
          </h1>

          <div>
            <h2 className="font-bold text-sm text-slate-900 mb-1">1. Verantwortliche Stelle</h2>
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:<br />
              ARTEMIS Augenzentrum Leverkusen, Friedrich-Ebert-Straße 17, 51373 Leverkusen<br />
              E-Mail: datenschutz@artemiskliniken.de
            </p>
          </div>

          <div>
            <h2 className="font-bold text-sm text-slate-900 mb-1">2. Erhebung von Gesundheits- & Kontaktdaten bei Terminanfragen</h2>
            <p>
              Wenn Sie über unseren Online-Terminassistenten eine Terminanfrage übermitteln, erheben wir Ihren Namen, Ihre E-Mail-Adresse, Ihre Telefonnummer, Ihren Versicherungsstatus sowie optional Angaben zu Ihrem Behandlungsgrund (z.B. Katarakt, Glaukom, Sehschule).
            </p>
            <p className="mt-2">
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Durchführung vorvertraglicher Maßnahmen zur Terminabstimmung) sowie Art. 9 Abs. 2 lit. h DSGVO (Zwecke der Gesundheitsvorsorge und ärztlichen Versorgung).
            </p>
            <p className="mt-2">
              Die Daten werden streng vertraulich im Rahmen der ärztlichen Schweigepflicht behandelt, über eine 256-Bit-SSL-Verschlüsselung übertragen und ausschließlich durch unser medizinisches Fachpersonal in Leverkusen bzw. Opladen zur Terminkoordination genutzt. Eine Weitergabe an unbefugte Dritte oder Werbenetzwerke ist ausgeschlossen.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-sm text-slate-900 mb-1">3. Server-Standort & Hosting</h2>
            <p>
              Das Hosting dieser Webpräsenz erfolgt auf ISO-27001-zertifizierter Server-Infrastruktur im Rechenzentrum Frankfurt am Main (Deutschland) unter strikter Einhaltung der Vorgaben des Bundesdatenschutzgesetzes (BDSG) und der DSGVO.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-sm text-slate-900 mb-1">4. Ihre Betroffenenrechte</h2>
            <p>
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten (Art. 15 DSGVO), deren Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO) sowie das Recht auf Datenübertragbarkeit (Art. 20 DSGVO). Wenden Sie sich hierzu bitte an datenschutz@artemiskliniken.de.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
