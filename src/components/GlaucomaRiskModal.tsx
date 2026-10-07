import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface GlaucomaRiskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookAppointment: () => void;
}

export const GlaucomaRiskModal: React.FC<GlaucomaRiskModalProps> = ({
  isOpen,
  onClose,
  onBookAppointment,
}) => {
  const { t } = useLanguage();
  const [ageOver40, setAgeOver40] = useState<boolean>(false);
  const [familyHistory, setFamilyHistory] = useState<boolean>(false);
  const [highMyopia, setHighMyopia] = useState<boolean>(false);
  const [cardioIssues, setCardioIssues] = useState<boolean>(false);
  const [calculated, setCalculated] = useState<boolean>(false);

  if (!isOpen) return null;

  const riskScore = (ageOver40 ? 1 : 0) + (familyHistory ? 2 : 0) + (highMyopia ? 1 : 0) + (cardioIssues ? 1 : 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="glaucoma-risk-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-sky-400" />
            <h2 id="glaucoma-risk-title" className="text-base sm:text-lg font-bold">
              {t('Glaukom-Risikocheck (Grüner Star)', 'Glaucoma Risk Self-Check')}
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
              'Der Grüne Star schädigt den Sehnerv schleichend und schmerzfrei. Beantworten Sie folgende 4 Fragen, um Ihr individuelles Vorsorge-Intervall einzuschätzen.',
              'Glaucoma harms optic nerve fibers silently without pain. Answer these 4 questions to evaluate your screening recommendation.'
            )}
          </p>

          <div className="space-y-3 mb-6">
            <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={ageOver40}
                onChange={(e) => { setAgeOver40(e.target.checked); setCalculated(true); }}
                className="mt-0.5 rounded text-sky-700 focus:ring-sky-600"
              />
              <span className="text-xs text-slate-800">
                <strong>{t('Alter ab 40 Jahren:', 'Age 40 or older:')}</strong> {t('Ab dem 40. Lebensjahr steigt das Risiko für Augeninnendrucksteigerungen statistisch an.', 'The prevalence of intraocular hypertension increases after age 40.')}
              </span>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={familyHistory}
                onChange={(e) => { setFamilyHistory(e.target.checked); setCalculated(true); }}
                className="mt-0.5 rounded text-sky-700 focus:ring-sky-600"
              />
              <span className="text-xs text-slate-800">
                <strong>{t('Familiäre Häufung:', 'Family history:')}</strong> {t('Haben Eltern oder Geschwister bereits ein Glaukom oder Sehverlust erlitten?', 'Do immediate relatives (parents, siblings) have confirmed glaucoma?')}
              </span>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={highMyopia}
                onChange={(e) => { setHighMyopia(e.target.checked); setCalculated(true); }}
                className="mt-0.5 rounded text-sky-700 focus:ring-sky-600"
              />
              <span className="text-xs text-slate-800">
                <strong>{t('Starke Fehlsichtigkeit:', 'High refractive error:')}</strong> {t('Kurzsichtigkeit über -4 dpt oder ausgeprägte Weitsichtigkeit.', 'Nearsightedness beyond -4 diopters or high farsightedness.')}
              </span>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={cardioIssues}
                onChange={(e) => { setCardioIssues(e.target.checked); setCalculated(true); }}
                className="mt-0.5 rounded text-sky-700 focus:ring-sky-600"
              />
              <span className="text-xs text-slate-800">
                <strong>{t('Gefäßfaktoren / Diabetes:', 'Vascular factors / Diabetes:')}</strong> {t('Bekannter Diabetes mellitus, nächtlicher niedriger Blutdruck oder Neigung zu kalten Händen/Füßen (Vasospasmus).', 'Diabetes mellitus, nocturnal hypotension, or vasospasms.')}
              </span>
            </label>
          </div>

          {/* Assessment Output */}
          <div className="p-4 rounded-xl border mb-6 bg-slate-50 border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              {riskScore >= 2 ? (
                <ShieldAlert className="w-5 h-5 text-amber-600" />
              ) : (
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              )}
              <h4 className="font-bold text-slate-900 text-sm">
                {riskScore >= 2
                  ? t('Erhöhtes Risikoprofil: Jährliche Vorsorge empfohlen', 'Elevated Risk Profile: Annual screening recommended')
                  : t('Basis-Risikoprofil: Routine-Check alle 2 Jahre', 'Standard Profile: Routine check every 2 years')}
              </h4>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              {riskScore >= 2
                ? t(
                    'Aufgrund Ihrer Risikofaktoren empfehlen wir eine jährliche augenärztliche Druckmessung kombiniert mit einer hochauflösenden RNFL-Nervenfaserschichtanalyse (OCT) in unserer Praxis Opladen oder im Augenzentrum Leverkusen.',
                    'Based on your indicators, an annual intraocular pressure measurement combined with RNFL nerve fiber layer OCT scanning is strongly advised.'
                  )
                : t(
                    'Auch bei normalem Risikoprofil ist ab 40 Jahren ein regelmäßiger Glaukom-Check sinnvoll, da die Erkrankung symptomlos verläuft.',
                    'Even with a standard risk baseline, regular checkups from age 40 are essential to preserve eyesight.'
                  )}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => { onClose(); onBookAppointment(); }}
              className="flex-1 py-2.5 px-4 bg-sky-800 hover:bg-sky-900 text-white font-semibold rounded-lg text-xs md:text-sm text-center shadow-sm"
            >
              {t('Glaukom-Vorsorge vereinbaren', 'Book Glaucoma Checkup')}
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
