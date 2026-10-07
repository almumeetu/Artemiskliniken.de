import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle, Eye, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AmslerGridModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookAppointment: () => void;
}

export const AmslerGridModal: React.FC<AmslerGridModalProps> = ({
  isOpen,
  onClose,
  onBookAppointment,
}) => {
  const { t } = useLanguage();
  const [selectedEye, setSelectedEye] = useState<'left' | 'right'>('right');
  const [hasDistortions, setHasDistortions] = useState<boolean | null>(null);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="amsler-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-sky-400" />
            <h2 id="amsler-title" className="text-base sm:text-lg font-bold">
              {t('Digitales Amsler-Gitter: Makula-Selbsttest', 'Digital Amsler Grid: Macula Self-Test')}
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
              'Das Amsler-Gitter dient der Früherkennung von Erkrankungen der Makula (z.B. altersbedingte Makuladegeneration). Tragen Sie ggf. Ihre gewohnte Lesebrille und halten Sie ca. 30–40 cm Abstand zum Bildschirm.',
              'The Amsler grid helps screen for macular conditions (such as age-related macular degeneration). Wear your reading glasses if needed and keep a viewing distance of roughly 30–40 cm.'
            )}
          </p>

          {/* Eye selector */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <button
              onClick={() => { setSelectedEye('right'); setHasDistortions(null); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                selectedEye === 'right'
                  ? 'bg-sky-800 text-white border-sky-800'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {t('1. Rechtes Auge testen (linkes Auge abdecken)', '1. Test Right Eye (cover left)')}
            </button>
            <button
              onClick={() => { setSelectedEye('left'); setHasDistortions(null); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                selectedEye === 'left'
                  ? 'bg-sky-800 text-white border-sky-800'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {t('2. Linkes Auge testen (rechtes Auge abdecken)', '2. Test Left Eye (cover right)')}
            </button>
          </div>

          {/* The Amsler Grid Canvas */}
          <div className="relative mx-auto w-64 h-64 bg-black p-2 rounded-lg shadow-inner flex items-center justify-center border-2 border-slate-800">
            {/* SVG Grid */}
            <svg
              className="w-full h-full"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Amsler Gitter Gitterlinien"
            >
              <defs>
                <pattern id="amsler-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="200" height="200" fill="url(#amsler-pattern)" />
              {/* Central fixation point */}
              <circle cx="100" cy="100" r="3.5" fill="white" />
            </svg>
          </div>

          <div className="text-center mt-3 mb-5">
            <span className="text-xs font-medium text-slate-700">
              {t(
                'Fixieren Sie den weißen Punkt in der Mitte: Sehen Sie alle Linien gerade und quadratisch?',
                'Fixate on the white central dot: Are all grid lines straight and squares uniform?'
              )}
            </span>
          </div>

          {/* User question buttons */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={() => setHasDistortions(false)}
              className={`p-3 rounded-xl border text-center transition-all ${
                hasDistortions === false
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="text-xs font-semibold">{t('Ja, alle Linien sind gerade', 'Yes, all lines are straight')}</div>
              <div className="text-[10px] text-slate-500">{t('Keine Verzerrungen sichtbar', 'No distortion perceived')}</div>
            </button>

            <button
              onClick={() => setHasDistortions(true)}
              className={`p-3 rounded-xl border text-center transition-all ${
                hasDistortions === true
                  ? 'border-red-600 bg-red-50 text-red-950 font-bold'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="text-xs font-semibold">{t('Nein, Linien wirken wellig / fehlen', 'No, lines look wavy / missing')}</div>
              <div className="text-[10px] text-slate-500">{t('Verzerrungen oder dunkler Fleck', 'Distortion or blind spot')}</div>
            </button>
          </div>

          {/* Feedback states */}
          {hasDistortions === false && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-xs text-emerald-900 mb-4">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-0.5">
                  {t('Unauffälliger Befund für dieses Auge', 'Normal test result for this eye')}
                </p>
                <p>
                  {t(
                    'Aktuell keine Anzeichen von Metamorphopsien. Wiederholen Sie den Test regelmäßig (z.B. monatlich) und testen Sie nun das Partnerauge.',
                    'Currently no signs of metamorphopsia. Repeat regularly and proceed to test the contralateral eye.'
                  )}
                </p>
              </div>
            </div>
          )}

          {hasDistortions === true && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl space-y-2 text-xs text-red-900 mb-4">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-red-950">
                    {t('Achtung: Dringender Abklärungsbedarf!', 'Warning: Urgent examination needed!')}
                  </p>
                  <p>
                    {t(
                      'Welliges Sehen oder blinde Flecken sind Leitsymptome für eine aktive Flüssigkeitsansammlung der Makula (z.B. feuchte AMD). Vereinbaren Sie zeitnah einen Termin zur Spectral-Domain OCT Untersuchung!',
                      'Wavy lines or blind spots are primary clinical signs of active macular fluid (e.g. wet AMD). Please schedule a prompt Spectral-Domain OCT check!'
                    )}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                <a
                  href="tel:021444488"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white font-semibold rounded text-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{t('Akut-Hotline anrufen (0214 44488)', 'Call Emergency Hotline (0214 44488)')}</span>
                </a>
                <button
                  onClick={() => { onClose(); onBookAppointment(); }}
                  className="px-3 py-1.5 bg-white border border-red-300 text-red-800 font-semibold rounded text-xs hover:bg-red-50"
                >
                  {t('Makula-Sprechstunde anfragen', 'Request Macula Consultation')}
                </button>
              </div>
            </div>
          )}

          <div className="pt-2 text-center">
            <span className="text-[11px] text-slate-500">
              {t(
                'Hinweis: Dieser digitale Selbsttest dient der Orientierung und ersetzt keinesfalls die ärztliche Diagnostik im Augenzentrum.',
                'Notice: This digital self-test is an orientation tool and does not replace professional diagnostic imaging.'
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
