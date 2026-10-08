import React from 'react';
import { ExternalLink, FileText, ShieldCheck } from 'lucide-react';

interface LegalPageProps {
  initialTab: 'impressum' | 'datenschutz';
}

export const LegalPage: React.FC<LegalPageProps> = ({ initialTab }) => {
  const isPrivacy = initialTab === 'datenschutz';

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <p className="clinic-eyebrow">Rechtliche Informationen</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#173c78] sm:text-5xl">{isPrivacy ? 'Datenschutz' : 'Impressum'}</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#526873]">
        Die rechtsverbindlichen Angaben des ARTEMIS-Anbieters und die aktuelle Datenschutzerklärung finden Sie auf der offiziellen ARTEMIS-Website.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <a className="clinic-card flex items-start gap-4 p-6 hover:border-[#9fc8c2]" href="https://www.artemiskliniken.de/impressum/">
          <FileText aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-[#087bb2]" />
          <span><span className="block font-semibold text-[#173c78]">Impressum öffnen</span><span className="mt-1 block text-sm text-[#526873]">Anbieter, Vertretungsberechtigte und rechtliche Angaben</span><ExternalLink aria-hidden="true" className="mt-3 h-4 w-4 text-[#087bb2]" /></span>
        </a>
        <a className="clinic-card flex items-start gap-4 p-6 hover:border-[#9fc8c2]" href="https://www.artemiskliniken.de/datenschutz/">
          <ShieldCheck aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-[#087bb2]" />
          <span><span className="block font-semibold text-[#173c78]">Datenschutzerklärung öffnen</span><span className="mt-1 block text-sm text-[#526873]">Informationen zur Datenverarbeitung auf der ARTEMIS-Website</span><ExternalLink aria-hidden="true" className="mt-3 h-4 w-4 text-[#087bb2]" /></span>
        </a>
      </div>
      <p className="mt-8 text-xs leading-relaxed text-[#687b84]">Online-Terminbuchungen werden über den verlinkten externen Dienst von samedi aufgerufen. Bitte beachten Sie dessen Hinweise zum Datenschutz.</p>
    </div>
  );
};
