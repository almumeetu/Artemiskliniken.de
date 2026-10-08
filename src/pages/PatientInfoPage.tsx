import React from 'react';
import { ArrowRight, Check, CreditCard, FileText, Glasses, Phone } from 'lucide-react';

interface PatientInfoPageProps {
  onOpenBooking: () => void;
  onOpenEmergency: () => void;
}

export const PatientInfoPage: React.FC<PatientInfoPageProps> = ({ onOpenBooking, onOpenEmergency }) => {
  const checklist = [
    'Versichertenkarte und gegebenenfalls Überweisung',
    'Aktuelle Brille, Brillenpass oder Kontaktlinsenwerte',
    'Liste Ihrer Medikamente und Augentropfen',
    'Vorbefunde und Berichte zu früheren Augenuntersuchungen oder Operationen',
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="max-w-3xl">
        <p className="clinic-eyebrow">Service und Orientierung</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#173c78] sm:text-5xl">Informationen für Ihren Besuch</h1>
        <p className="mt-4 text-base leading-relaxed text-[#526873]">
          Die wichtigsten Hinweise zur Terminvereinbarung, zur Vorbereitung und zu Kostenfragen. Wenn Sie unsicher sind, welche Praxis für Ihr Anliegen zuständig ist, fragen Sie bitte telefonisch nach.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button className="button-primary" onClick={onOpenBooking}><Phone aria-hidden="true" className="h-4 w-4" />Kontakt und Terminvereinbarung</button>
          <button className="button-secondary" onClick={onOpenEmergency}>Akute Beschwerden <ArrowRight aria-hidden="true" className="h-4 w-4" /></button>
        </div>
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="clinic-card p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-[#e9f2f0] p-2.5 text-[#087bb2]"><FileText aria-hidden="true" className="h-5 w-5" /></span>
            <h2 className="text-xl font-semibold text-[#173c78]">Bitte mitbringen</h2>
          </div>
          <ul className="mt-6 space-y-3">
            {checklist.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-[#425864]"><Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#1c68a6]" /><span>{item}</span></li>)}
          </ul>
          <div className="mt-6 rounded-xl bg-[#f4f7f6] p-4 text-sm leading-relaxed text-[#526873]">
            Werden bei einer Untersuchung die Pupillen erweitert, kann das Sehen vorübergehend beeinträchtigt sein. Fragen Sie bei der Terminvereinbarung nach und planen Sie bei Bedarf eine Begleitung ein.
          </div>
        </section>

        <section className="clinic-card p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-[#e9f2f0] p-2.5 text-[#087bb2]"><CreditCard aria-hidden="true" className="h-5 w-5" /></span>
            <h2 className="text-xl font-semibold text-[#173c78]">Fragen zu Kosten und Versicherung</h2>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-[#526873]">
            Ob eine Untersuchung oder Behandlung von Ihrer Krankenkasse übernommen wird, hängt unter anderem vom Befund, der medizinischen Notwendigkeit und Ihrem Versicherungsvertrag ab. Eine pauschale Kostenzusage können wir online nicht machen.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#526873]">
            Fragen Sie die Praxis vor der Untersuchung, ob Kosten entstehen können. Bei zusätzlichen Selbstzahlerleistungen sollten Sie die Leistung und den voraussichtlichen Preis vorab erläutert bekommen.
          </p>
          <button className="mt-6 text-sm font-semibold text-[#087bb2] hover:underline" onClick={onOpenBooking}>
            Praxis kontaktieren <ArrowRight aria-hidden="true" className="ml-1 inline h-4 w-4" />
          </button>
        </section>
      </div>

      <section className="mt-10">
        <div className="max-w-2xl">
          <p className="clinic-eyebrow">Häufige Fragen</p>
          <h2 className="mt-2 text-2xl font-semibold text-[#173c78] sm:text-3xl">Vor dem Termin</h2>
        </div>
        <div className="mt-5 max-w-3xl divide-y divide-[#dce6e5] rounded-2xl border border-[#dce6e5] bg-white px-5 sm:px-7">
          <details className="faq-item" open>
            <summary>Wie vereinbare ich einen Termin?</summary>
            <p>Für das Augenzentrum Leverkusen können Sie die Online-Terminbuchung nutzen. Für die Praxis Opladen vereinbaren Sie Termine telefonisch unter 02171 1490.</p>
          </details>
          <details className="faq-item">
            <summary>Kann ich ohne Termin in die Praxis kommen?</summary>
            <p>Bitte rufen Sie vorab am gewünschten Standort an. Die Praxis kann Ihnen sagen, ob ein Termin erforderlich ist und wann Sie kommen können.</p>
          </details>
          <details className="faq-item">
            <summary>Welche Praxis ist für mein Anliegen zuständig?</summary>
            <p>Das Leistungsangebot unterscheidet sich je nach Standort. Wenden Sie sich an das Praxisteam, wenn Sie Hilfe bei der Zuordnung benötigen.</p>
          </details>
          <details className="faq-item">
            <summary>Wo finde ich Öffnungszeiten und Anfahrt?</summary>
            <p>Die jeweils aktuellen Angaben stehen auf den Standortseiten. Nutzen Sie die Standortübersicht, um die Praxis in Leverkusen oder Opladen auszuwählen.</p>
          </details>
        </div>
      </section>

      <section className="mt-10 rounded-2xl bg-[#173c78] p-6 text-white sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
        <div>
          <div className="flex items-center gap-3"><Glasses aria-hidden="true" className="h-6 w-6 text-[#8fd2ca]" /><h2 className="text-xl font-semibold">Akute Augenbeschwerden?</h2></div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75">Bei plötzlichen oder starken Beschwerden finden Sie wichtige Hinweise und Anlaufstellen auf unserer Notfallseite. Bei einem lebensbedrohlichen Notfall rufen Sie 112.</p>
        </div>
        <button className="button-light mt-5 shrink-0 sm:mt-0" onClick={onOpenEmergency}>Notfallinformationen <ArrowRight aria-hidden="true" className="h-4 w-4" /></button>
      </section>
    </div>
  );
};
