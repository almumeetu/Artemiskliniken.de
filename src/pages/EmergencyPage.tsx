import React from 'react';
import { Phone, AlertTriangle, ShieldAlert, HeartPulse, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const EmergencyPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-20">
      
      {/* Red Alert Banner */}
      <div className="bg-red-700 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-200">
          <AlertTriangle className="w-5 h-5 text-red-200" />
          <span>{t('Akutfall-Triage & Notfall-Leitfaden', 'Emergency Eye Care & Triage')}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          {t('Akute Augenbeschwerden & Notdienst', 'Acute Eye Emergencies & Urgent Care')}
        </h1>

        <p className="text-sm sm:text-base text-red-100 leading-relaxed max-w-2xl">
          {t(
            'Einige Augensymptome sind akute Notfälle, bei denen jede Stunde über den Erhalt des Sehvermögens entscheiden kann. Hier erfahren Sie, wann Sie sofort handeln müssen.',
            'Certain ocular symptoms represent immediate medical emergencies where prompt action determines visual survival. Here is how to act rapidly.'
          )}
        </p>

        {/* Quick Dial Buttons */}
        <div className="pt-4 flex flex-wrap gap-4">
          <a
            href="tel:021444488"
            className="px-6 py-3.5 bg-white text-red-700 hover:bg-red-50 font-bold text-sm rounded-xl shadow-md transition-colors flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>{t('Augenzentrum Leverkusen: 0214 44488', 'Leverkusen Clinic: 0214 44488')}</span>
          </a>

          <a
            href="tel:116117"
            className="px-5 py-3.5 bg-red-800 hover:bg-red-900 text-white font-semibold text-sm rounded-xl border border-red-600 flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>{t('Ärztlicher Notdienst: 116 117', 'Medical On-Call: 116 117')}</span>
          </a>

          <a
            href="tel:112"
            className="px-5 py-3.5 bg-slate-900 hover:bg-black text-white font-semibold text-sm rounded-xl flex items-center gap-2"
          >
            <span>{t('Notruf (Schwerer Unfall): 112', 'Emergency Call: 112')}</span>
          </a>
        </div>
      </div>

      {/* Red Flag Symptoms Grid */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">
          {t('Echte Notfallsymptome: Wann müssen Sie sofort zum Augenarzt?', 'Red-Flag Symptoms: When to Seek Immediate Care')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-red-50 border border-red-200 space-y-2">
            <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
              <span>{t('Plötzlicher Sehverlust oder Sehabfall', 'Sudden Vision Loss')}</span>
            </div>
            <p className="text-xs text-red-950 leading-relaxed">
              {t(
                'Innerhalb von Minuten oder Stunden wird das Sehen auf einem Auge dunkel, neblig oder setzt komplett aus. Ursache: Netzhautgefäßverschluss (Schlaganfall des Auges) oder akute Blutung. Sofortige Vorstellung erforderlich!',
                'Vision drops abruptly within minutes or hours. Suspected retinal artery or vein occlusion. Immediate care mandatory!'
              )}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-red-50 border border-red-200 space-y-2">
            <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
              <span>{t('Lichtblitze, dichter Rußregen oder Schatten', 'Flashes, Soot Showers, or Curtains')}</span>
            </div>
            <p className="text-xs text-red-950 leading-relaxed">
              {t(
                'Blitzartige Lichtzuckungen (besonders im Dunkeln), herabfallende schwarze Punkte („Rußregen“) oder ein dunkler Vorhang, der sich ins Gesichtsfeld schiebt. Verdacht auf Netzhautriss oder Netzhautablösung!',
                'Sudden light flashes, showers of floating dark debris, or a dark shadow creeping into the field of view. Suspected retinal detachment!'
              )}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-red-50 border border-red-200 space-y-2">
            <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
              <span>{t('Akuter Glaukomanfall (Massiver Augenschmerz)', 'Acute Glaucoma Crisis')}</span>
            </div>
            <p className="text-xs text-red-950 leading-relaxed">
              {t(
                'Steinhartes, hochrotes Auge, rasende Kopf- und Augenschmerzen, Regenbogenfarben um Lichtquellen, oft begleitet von Übelkeit und Erbrechen. Erfordert unverzügliche Drucksenkung!',
                'Stony hard red eye, agonizing pain radiating into forehead, rainbow halos, accompanied by nausea. Urgent pressure reduction needed!'
              )}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-red-50 border border-red-200 space-y-2">
            <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
              <span>{t('Verätzungen & mechanische Augenverletzungen', 'Chemical Burns & Eye Trauma')}</span>
            </div>
            <p className="text-xs text-red-950 leading-relaxed">
              {t(
                'Spritzer von Säuren, Laugen oder Reinigungsmitteln ins Auge. WICHTIG: Sofort das Auge mindestens 10–15 Minuten ununterbrochen mit Leitungswasser spülen, erst danach Notruf wählen!',
                'Splashes of chemicals, alkalis or solvents. CRITICAL: Immediately flush eye with running tap water for 10–15 continuous minutes before calling emergency transport!'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Immediate First Aid Rules */}
      <section className="bg-slate-50 rounded-3xl border border-slate-200 p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          {t('Erste Hilfe am Auge: Was Sie tun und lassen sollten', 'Eye First Aid Guidelines')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
          <div className="space-y-2.5">
            <strong className="text-emerald-800 text-sm block">
              {t('✓ Das sollten Sie tun:', '✓ Recommended Actions:')}
            </strong>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{t('Ruhe bewahren und das Auge schonen', 'Stay calm and keep the eye still')}</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{t('Bei Verätzung: Sofort ausgiebig mit klarem Wasser spülen', 'For chemical burns: Flush immediately with water for 15 minutes')}</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{t('Das Auge mit einem sterilen Verband oder Tuch locker abdecken', 'Cover eye loosely with a clean sterile cloth')}</span>
            </div>
          </div>

          <div className="space-y-2.5">
            <strong className="text-red-800 text-sm block">
              {t('✗ Das dürfen Sie NICHT tun:', '✗ Things to NEVER do:')}
            </strong>
            <div className="flex items-start gap-2">
              <span className="text-red-600 font-bold shrink-0">✕</span>
              <span>{t('Niemals am verletzten Auge reiben oder drücken', 'Never rub or press on an injured eyeball')}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-600 font-bold shrink-0">✕</span>
              <span>{t('Niemals eingedrungene Fremdkörper selbst mit Pinzette herausziehen', 'Never attempt to pull out penetrating objects yourself')}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-600 font-bold shrink-0">✕</span>
              <span>{t('Keine Medikamente oder Salben ohne ärztliche Anordnung ins verletzte Auge geben', 'Do not apply ointments without medical authorization')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contacts Overview */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          {t('Notdienst-Telefonnummern für Leverkusen & NRW', 'Emergency Numbers in Leverkusen')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-bold text-slate-900 text-sm mb-1">
              {t('Augenzentrum Leverkusen', 'Leverkusen Clinic')}
            </div>
            <div className="text-slate-500 mb-2">Mo–Do 8–17 Uhr | Fr 8–12 Uhr</div>
            <a href="tel:021444488" className="font-bold text-sky-800 text-base hover:underline block">
              0214 44488
            </a>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-bold text-slate-900 text-sm mb-1">
              {t('Bundesweiter Notdienst', 'On-Call Service')}
            </div>
            <div className="text-slate-500 mb-2">Außerhalb der Praxisöffnungszeiten</div>
            <a href="tel:116117" className="font-bold text-sky-800 text-base hover:underline block">
              116 117
            </a>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="font-bold text-slate-900 text-sm mb-1">
              {t('Notruf Rettungsdienst', 'Rescue Service')}
            </div>
            <div className="text-slate-500 mb-2">Lebensgefahr & schwere Unfälle</div>
            <a href="tel:112" className="font-bold text-red-700 text-base hover:underline block">
              112
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
