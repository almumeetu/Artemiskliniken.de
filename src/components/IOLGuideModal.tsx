import React, { useState } from 'react';
import { X, Check, CheckCircle2, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface IOLGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookAppointment: () => void;
}

export const IOLGuideModal: React.FC<IOLGuideModalProps> = ({
  isOpen,
  onClose,
  onBookAppointment,
}) => {
  const { t } = useLanguage();
  const [selectedLens, setSelectedLens] = useState<'monofocal' | 'toric' | 'edof' | 'multifocal'>('edof');

  if (!isOpen) return null;

  const lenses = [
    {
      id: 'monofocal',
      name: t('Standard-Monofokallinse', 'Standard Monofocal IOL'),
      badge: t('Kassenleistung (100% GKV)', 'Fully Covered (GKV)'),
      summary: t('Scharfes Sehen in einem festgelegten Brennpunkt (meist in der Ferne).', 'Sharp vision at one fixed focal distance (usually far distance).'),
      features: [
        { label: t('Ferne (Autofahren, TV)', 'Distance (Driving, TV)'), val: 'Sehr gut' },
        { label: t('Zwischendistanz (PC, Armaturen)', 'Intermediate (PC, Dashboard)'), val: 'Lesebrille nötig' },
        { label: t('Nahbereich (Smartphone, Buch)', 'Near (Smartphone, Book)'), val: 'Lesebrille nötig' },
        { label: t('Korrektur Hornhautverkrümmung', 'Astigmatism Correction'), val: 'Nein (Brille)' },
        { label: t('Kosten & Krankenkasse', 'Insurance Coverage'), val: '100% Kassenleistung' },
      ],
    },
    {
      id: 'toric',
      name: t('Torische Linse', 'Toric Intraocular Lens'),
      badge: t('Premium: Astigmatismus-Korrektur', 'Premium: Astigmatism Correction'),
      summary: t('Gleicht zusätzlich zur Trübung Ihre Hornhautverkrümmung dauerhaft im Auge aus.', 'Simultaneously corrects cataracts and corneal astigmatism permanently.'),
      features: [
        { label: t('Ferne (Autofahren, TV)', 'Distance (Driving, TV)'), val: 'Exzellent' },
        { label: t('Zwischendistanz (PC, Armaturen)', 'Intermediate (PC, Dashboard)'), val: 'Lesebrille nötig' },
        { label: t('Nahbereich (Smartphone, Buch)', 'Near (Smartphone, Book)'), val: 'Lesebrille nötig' },
        { label: t('Korrektur Hornhautverkrümmung', 'Astigmatism Correction'), val: 'Ja (Integrierter Zylinder)' },
        { label: t('Kosten & Krankenkasse', 'Insurance Coverage'), val: 'GKV Basis + Zuzahlung' },
      ],
    },
    {
      id: 'edof',
      name: t('EDOF-Linse (Erweiterte Tiefenschärfe)', 'EDOF Lens (Extended Depth of Focus)'),
      badge: t('Premium: Hoher Sehkomfort', 'Premium: High Visual Comfort'),
      summary: t('Nahtloses Sehen von der Ferne bis zum Armaturenbereich und Laptop – mit minimaler Blendung.', 'Continuous vision from distance to laptop range with minimal night halos.'),
      features: [
        { label: t('Ferne (Autofahren, TV)', 'Distance (Driving, TV)'), val: 'Exzellent' },
        { label: t('Zwischendistanz (PC, Armaturen)', 'Intermediate (PC, Dashboard)'), val: 'Brillenfrei' },
        { label: t('Nahbereich (Smartphone, Buch)', 'Near (Smartphone, Book)'), val: 'Leichte Lesebrille bei Kleingedrucktem' },
        { label: t('Nachtblendung / Halos', 'Night Glare / Halos'), val: 'Praktisch wie Natur' },
        { label: t('Kosten & Krankenkasse', 'Insurance Coverage'), val: 'GKV Basis + Zuzahlung' },
      ],
    },
    {
      id: 'multifocal',
      name: t('Trifokal- / Multifokallinse', 'Trifocal / Multifocal IOL'),
      badge: t('Premium: Maximale Brillenfreiheit', 'Premium: Maximum Spectacle Freedom'),
      summary: t('Drei Brennpunkte für größtmögliche Unabhängigkeit von Fern- und Lesebrille im Alltag.', 'Three discrete focal points providing independence from glasses in all daily tasks.'),
      features: [
        { label: t('Ferne (Autofahren, TV)', 'Distance (Driving, TV)'), val: 'Exzellent' },
        { label: t('Zwischendistanz (PC, Armaturen)', 'Intermediate (PC, Dashboard)'), val: 'Brillenfrei' },
        { label: t('Nahbereich (Smartphone, Buch)', 'Near (Smartphone, Book)'), val: 'Brillenfrei' },
        { label: t('Nachtblendung / Halos', 'Night Glare / Halos'), val: 'Leichte Lichthöfe möglich' },
        { label: t('Kosten & Krankenkasse', 'Insurance Coverage'), val: 'GKV Basis + Zuzahlung' },
      ],
    },
  ];

  const current = lenses.find((l) => l.id === selectedLens)!;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="iol-guide-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-sky-950 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 id="iol-guide-title" className="text-base sm:text-lg font-bold">
              {t('Interaktiver IOL-Linsenberater (Grauer Star)', 'Interactive IOL Lens Decision Guide (Cataract)')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            aria-label={t('Schließen', 'Close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            {t(
              'Bei der Katarakt-Operation (Grauer Star) wird die getrübte Linse durch eine künstliche Linse ersetzt. Welche Kunstlinse am besten zu Ihren Lebensgewohnheiten und Wünschen passt, zeigt Ihnen dieser Überblick.',
              'During cataract surgery, the cloudy natural lens is replaced with an intraocular lens (IOL). Explore which lens best matches your lifestyle priorities.'
            )}
          </p>

          {/* Lens Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            {lenses.map((lens) => (
              <button
                key={lens.id}
                onClick={() => setSelectedLens(lens.id as any)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  selectedLens === lens.id
                    ? 'border-sky-600 bg-sky-50 text-sky-900 ring-2 ring-sky-600/20'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="font-bold text-xs truncate">{lens.name}</div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">{lens.badge}</div>
              </button>
            ))}
          </div>

          {/* Active Lens Details Card */}
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-200">
              <div>
                <h3 className="font-bold text-base text-slate-900">{current.name}</h3>
                <span className="text-xs font-medium text-sky-800">{current.badge}</span>
              </div>
              <span className="text-xs px-2.5 py-1 bg-white border border-slate-200 rounded-full text-slate-700 font-medium">
                {selectedLens === 'monofocal' ? t('Basisversorgung', 'Basic Care') : t('Premium-Versorgung', 'Premium Upgrade')}
              </span>
            </div>

            <p className="text-xs text-slate-700 mb-4">{current.summary}</p>

            {/* Feature comparison table */}
            <div className="space-y-2 text-xs">
              {current.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded bg-white border border-slate-100"
                >
                  <span className="text-slate-600">{feat.label}:</span>
                  <span className="font-semibold text-slate-900">{feat.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Doctor Quote */}
          <div className="bg-sky-50 border border-sky-100 p-3.5 rounded-xl text-xs text-sky-900 mb-6 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-0.5">
                {t('Ärztliche Empfehlung von Dr. med. Masoud Arani:', 'Surgical insight from Dr. Masoud Arani:')}
              </p>
              <p className="text-slate-700 leading-relaxed">
                {t(
                  '„Die Wahl der passenden Kunstlinse treffen wir gemeinsam nach präziser IOL-Master-Biometrie und ausführlicher Besprechung Ihrer Sehanforderungen – ob Vielfahrer, Bildschirmarbeiter oder Buchliebhaber.“',
                  '"We determine the ideal lens together following optical biometry and detailed discussion of your daily visual demands — whether night-driving, computer work, or avid reading."'
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => { onClose(); onBookAppointment(); }}
              className="flex-1 py-2.5 px-4 bg-sky-800 hover:bg-sky-900 text-white font-semibold rounded-lg text-xs md:text-sm text-center shadow-sm"
            >
              {t('Katarakt-Beratung im OP-Zentrum buchen', 'Book Cataract Consultation')}
            </button>
            <button
              onClick={onClose}
              className="py-2.5 px-4 border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium rounded-lg text-xs"
            >
              {t('Schließen', 'Close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
