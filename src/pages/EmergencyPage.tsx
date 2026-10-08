import React from 'react';
import { ArrowUpRight, Clock3, Phone, ShieldAlert } from 'lucide-react';
import { CLINIC_LOCATIONS } from '../data/clinics';
import { useLanguage } from '../context/LanguageContext';

export const EmergencyPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="max-w-3xl">
        <p className="clinic-eyebrow">Hilfe bei akuten Beschwerden</p>
        <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-[#173c78] sm:text-5xl">Sie brauchen heute augenärztliche Hilfe?</h1>
        <p className="mt-4 text-base leading-relaxed text-[#526873]">
          Bei plötzlichen oder starken Augenbeschwerden wenden Sie sich zeitnah an eine medizinische Fachstelle. Diese Website kann keine Diagnose stellen und keine individuelle Dringlichkeit einschätzen.
        </p>
      </header>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl border border-[#e3c8bd] bg-[#fff9f5] p-6 sm:p-7">
          <div className="flex items-center gap-3 text-[#8b3d2d]"><Clock3 aria-hidden="true" className="h-5 w-5" /><h2 className="text-lg font-semibold">Außerhalb der Sprechzeiten</h2></div>
          <p className="mt-3 text-sm leading-relaxed text-[#594e49]">Wenn Sie dringend ärztliche Hilfe benötigen und die Praxen geschlossen sind, wählen Sie 116 117. Dort erfahren Sie, welche Bereitschaftspraxis für Sie zuständig ist.</p>
          <a className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#8b3d2d] px-5 py-3 text-sm font-semibold text-white hover:bg-[#713023]" href="tel:116117"><Phone aria-hidden="true" className="h-4 w-4" />116 117 anrufen</a>
        </article>
        <article className="rounded-2xl border border-[#e2d0d0] bg-[#fbf6f6] p-6 sm:p-7">
          <div className="flex items-center gap-3 text-[#873b42]"><ShieldAlert aria-hidden="true" className="h-5 w-5" /><h2 className="text-lg font-semibold">Lebensbedrohlicher Notfall</h2></div>
          <p className="mt-3 text-sm leading-relaxed text-[#594e49]">Bei Lebensgefahr oder einem schweren Unfall rufen Sie den Rettungsdienst unter 112.</p>
          <a className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#873b42] px-5 py-3 text-sm font-semibold text-white hover:bg-[#702e35]" href="tel:112"><Phone aria-hidden="true" className="h-4 w-4" />112 anrufen</a>
        </article>
      </section>

      <section className="mt-10">
        <p className="clinic-eyebrow">ARTEMIS Leverkusen</p>
        <h2 className="mt-2 text-2xl font-semibold text-[#173c78]">Während der Öffnungszeiten</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#526873]">Rufen Sie den Standort an und schildern Sie Ihr Anliegen. Das Praxisteam kann Ihnen mitteilen, ob eine Untersuchung vor Ort möglich ist. Bitte nutzen Sie die Praxisnummern nicht als Notruf.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {CLINIC_LOCATIONS.map((location) => (
            <article className="clinic-card flex items-center justify-between gap-4 p-5" key={location.id}>
              <div>
                <h3 className="font-semibold text-[#173c78]">{location.name}</h3>
                <p className="mt-1 text-sm text-[#526873]">{location.phoneDisplay}</p>
              </div>
              <a className="button-secondary button-secondary-small shrink-0" href={'tel:' + location.phone}><Phone aria-hidden="true" className="h-4 w-4" />Anrufen</a>
            </article>
          ))}
        </div>
      </section>

      <p className="mt-8 rounded-xl bg-[#f2f6f5] p-4 text-sm leading-relaxed text-[#526873]">
        {t('Weitere Informationen zum ärztlichen Bereitschaftsdienst und zur Abgrenzung zwischen 116 117 und 112 finden Sie beim Patientenservice.', 'For more information about Germany’s medical on-call service and when to call 116 117 or 112, visit the national patient service.')}{' '}
        <a className="inline-flex items-center gap-1 font-semibold text-[#087bb2] hover:underline" href="https://www.116117.de/de/aerztlicher-bereitschaftsdienst.php" target="_blank" rel="noopener noreferrer">116117.de <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a>
      </p>
    </div>
  );
};
