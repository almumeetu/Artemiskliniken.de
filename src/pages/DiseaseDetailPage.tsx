import React from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Phone, ShieldAlert } from 'lucide-react';
import { EYE_DISEASES } from '../data/diseases';

interface DiseaseDetailPageProps {
  slug: string;
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: (locId?: string, srvId?: string) => void;
}

export const DiseaseDetailPage: React.FC<DiseaseDetailPageProps> = ({ slug, onNavigate, onOpenBooking }) => {
  const disease = EYE_DISEASES.find((item) => item.slug === slug);
  if (!disease) {
    return <section className="mx-auto max-w-3xl px-4 py-16"><h1 className="text-3xl font-semibold text-[#15344a]">Augenkrankheit nicht gefunden</h1><button className="mt-5 text-[#176b68] underline" onClick={() => onNavigate('augenkrankheiten')}>Zurück zur Übersicht</button></section>;
  }

  const isUrgent = disease.urgencyLevel === 'urgent';

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <button className="inline-flex items-center gap-2 text-sm font-medium text-[#176b68] hover:underline" onClick={() => onNavigate('augenkrankheiten')}><ArrowLeft aria-hidden="true" className="h-4 w-4" />Alle Augenkrankheiten</button>
      <header className="mt-7 rounded-3xl bg-[#15344a] p-6 text-white sm:p-10">
        <p className="text-sm font-medium text-[#a8e0d8]">{disease.medicalTerm}</p>
        <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">{disease.name}</h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/85">{disease.shortSummary}</p>
        {isUrgent ? (
          <button className="button-light mt-6" onClick={() => onNavigate('notfall-akutfall')}><ShieldAlert aria-hidden="true" className="h-4 w-4" />Hinweise bei akuten Beschwerden</button>
        ) : (
          <button className="button-light mt-6" onClick={() => onOpenBooking()}><Phone aria-hidden="true" className="h-4 w-4" />Standort kontaktieren</button>
        )}
      </header>

      {isUrgent && (
        <aside className="mt-6 rounded-2xl border border-[#e3c8bd] bg-[#fff9f5] p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-[#803b2d]">Bitte nicht abwarten</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#594e49]">Eine mögliche Netzhautablösung braucht umgehende augenärztliche Abklärung. Wenn Sie die Praxis nicht erreichen oder sie geschlossen ist, rufen Sie 116 117 an. Bei Lebensgefahr wählen Sie 112.</p>
          <div className="mt-4 flex flex-wrap gap-3"><a className="button-primary button-primary-small" href="tel:116117"><Phone aria-hidden="true" className="h-4 w-4" />116 117</a><a className="button-secondary button-secondary-small" href="tel:112">112</a></div>
        </aside>
      )}

      <section className="mt-7 grid gap-6 md:grid-cols-2">
        <article className="clinic-card p-6 sm:p-7">
          <p className="clinic-eyebrow">Orientierung</p>
          <h2 className="mt-2 text-xl font-semibold text-[#15344a]">Was Sie wissen sollten</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#526873]">Ähnliche Beschwerden können unterschiedliche Ursachen haben. Eine augenärztliche Untersuchung ist erforderlich, um die Ursache festzustellen und die passende Behandlung zu besprechen. Diese Kurzinfo stellt keine Diagnose.</p>
        </article>
        <article className="clinic-card p-6 sm:p-7">
          <p className="clinic-eyebrow">Weiterführende Information</p>
          <h2 className="mt-2 text-xl font-semibold text-[#15344a]">Ratgeber von ARTEMIS</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#526873]">Die ausführliche Patienteninformation, einschließlich Ursachen und möglicher Untersuchungen, finden Sie im ARTEMIS-Ratgeber.</p>
          <a className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#176b68] hover:underline" href={disease.sourceUrl} target="_blank" rel="noopener noreferrer">Ratgeber öffnen <ExternalLink aria-hidden="true" className="h-4 w-4" /></a>
        </article>
      </section>
      {!isUrgent && <p className="mt-7 rounded-xl bg-[#f2f6f5] p-4 text-sm leading-relaxed text-[#526873]">Bitte wenden Sie sich bei Beschwerden an eine augenärztliche Praxis. Wenn Sie bei der Auswahl des Standorts unsicher sind, rufen Sie das Praxisteam an.</p>}
    </div>
  );
};
