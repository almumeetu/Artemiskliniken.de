import React, { useState } from 'react';
import { X, CheckCircle, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LaserQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookAppointment: () => void;
}

export const LaserQuizModal: React.FC<LaserQuizModalProps> = ({
  isOpen,
  onClose,
  onBookAppointment,
}) => {
  const { t } = useLanguage();
  const [step, setStep] = useState<number>(1);
  const [ageGroup, setAgeGroup] = useState<string>('');
  const [visionIssue, setVisionIssue] = useState<string>('');
  const [isStable, setIsStable] = useState<string>('');

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
    setAgeGroup('');
    setVisionIssue('');
    setIsStable('');
  };

  const getRecommendation = () => {
    if (ageGroup === 'under18') {
      return {
        title: t('Noch kein Eingriff empfohlen', 'Surgery Not Yet Advised'),
        text: t(
          'Da das Augenwachstum meist erst mit ca. 18 bis 20 Jahren abgeschlossen ist, empfehlen wir abzuwarten, bis Ihre Brillenwerte dauerhaft stabil sind.',
          'Eye growth stabilizes around age 18 to 20. We recommend waiting until refraction stays stable.'
        ),
        type: 'wait',
      };
    }
    if (ageGroup === 'over45') {
      return {
        title: t('Hervorragend geeignet für Linsenaustausch (RLE / EDOF)', 'Ideal for Refractive Lens Exchange (RLE / EDOF)'),
        text: t(
          'Ab 45 Jahren setzt die Alterssichtigkeit (Presbyopie) ein. Mit einem refraktiven Linsenaustausch oder Premium-Multifokallinsen können Sie sowohl die Fern- als auch die Lesebrille dauerhaft ablegen.',
          'Around age 45, natural presbyopia develops. A refractive lens exchange or premium multifocal lens provides freedom from both distance and reading spectacles.'
        ),
        type: 'lens',
      };
    }
    return {
      title: t('Top-Kandidat für Femto-LASIK oder EVO Visian ICL', 'Prime Candidate for Femto-LASIK or EVO Visian ICL'),
      text: t(
        'Ihre Altersgruppe (18–45 Jahre) eignet sich ideal für schonendes Augenlasern (Femto-LASIK) oder die reversible EVO Visian ICL Kunstlinse. Vereinbaren Sie eine unverbindliche Voruntersuchung im OP-Zentrum Leverkusen.',
        'Your profile is ideal for Femto-LASIK or the reversible EVO Visian ICL implantable lens. Schedule an introductory assessment at our Leverkusen surgery center.'
      ),
      type: 'laser',
    };
  };

  const rec = getRecommendation();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="laser-quiz-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-sky-950 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 id="laser-quiz-title" className="text-base sm:text-lg font-bold">
              {t('Online-Eignungscheck: Leben ohne Brille', 'Online Suitability Quiz: Life Without Glasses')}
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

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {step === 1 && (
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                {t('Frage 1 von 3', 'Question 1 of 3')}
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1 mb-4">
                {t('Wie alt sind Sie?', 'How old are you?')}
              </h3>

              <div className="space-y-2.5">
                {[
                  { id: 'under18', label: t('Unter 18 Jahre', 'Under 18 years') },
                  { id: '18to45', label: t('18 bis 45 Jahre (Berufs- & Aktivitätsalter)', '18 to 45 years (Active adult)') },
                  { id: 'over45', label: t('Über 45 Jahre (Beginnende Alterssichtigkeit)', 'Over 45 years (Beginning presbyopia)') },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setAgeGroup(item.id); setStep(2); }}
                    className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-sky-600 hover:bg-sky-50 text-left font-medium text-sm text-slate-800 transition-all flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                {t('Frage 2 von 3', 'Question 2 of 3')}
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1 mb-4">
                {t('Welche Fehlsichtigkeit möchten Sie korrigieren lassen?', 'Which visual condition would you like to correct?')}
              </h3>

              <div className="space-y-2.5">
                {[
                  { id: 'myopia', label: t('Kurzsichtigkeit (Minusdioptrien, unscharf in der Ferne)', 'Nearsightedness (Myopia)') },
                  { id: 'hyperopia', label: t('Weitsichtigkeit (Plusdioptrien, unscharf in der Nähe)', 'Farsightedness (Hyperopia)') },
                  { id: 'astigmatism', label: t('Hornhautverkrümmung (Astigmatismus)', 'Astigmatism (Cylinder)') },
                  { id: 'presbyopia', label: t('Lesebrille / Alterssichtigkeit', 'Reading glasses / Presbyopia') },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setVisionIssue(item.id); setStep(3); }}
                    className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-sky-600 hover:bg-sky-50 text-left font-medium text-sm text-slate-800 transition-all flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                {t('Frage 3 von 3', 'Question 3 of 3')}
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1 mb-4">
                {t('Sind Ihre Brillen- oder Kontaktlinsenwerte seit mindestens einem Jahr stabil?', 'Have your prescription values been stable for at least 12 months?')}
              </h3>

              <div className="space-y-2.5">
                {[
                  { id: 'yes', label: t('Ja, meine Sehstärke hat sich kaum verändert', 'Yes, vision has remained steady') },
                  { id: 'no', label: t('Nein, ich brauchte kürzlich neue Gläser', 'No, prescription shifted recently') },
                  { id: 'unsure', label: t('Ich bin mir nicht sicher', 'I am not sure') },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setIsStable(item.id); setStep(4); }}
                    className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-sky-600 hover:bg-sky-50 text-left font-medium text-sm text-slate-800 transition-all flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-sky-700" />
                  <h4 className="font-bold text-slate-900 text-sm">
                    {rec.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {rec.text}
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg text-[11px] text-slate-600 mb-6">
                <strong>{t('Unser OP-Zentrum in Leverkusen bietet:', 'Our Leverkusen Surgery Center features:')}</strong>
                <ul className="list-disc pl-4 mt-1 space-y-0.5">
                  <li>{t('Modernste Femtosekundenlaser-Technologie', 'State-of-the-art femtosecond laser precision')}</li>
                  <li>{t('EVO Visian ICL phake Linsen (zertifiziert)', 'EVO Visian ICL phakic contact lenses')}</li>
                  <li>{t('Umfassende Pentacam-Hornhautdiagnostik', 'High-precision Pentacam corneal tomography')}</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => { onClose(); onBookAppointment(); }}
                  className="flex-1 py-3 px-4 bg-sky-800 hover:bg-sky-900 text-white font-semibold rounded-lg text-xs md:text-sm text-center shadow-sm"
                >
                  {t('Beratungstermin in Leverkusen buchen', 'Book Consultation in Leverkusen')}
                </button>
                <button
                  onClick={handleReset}
                  className="py-3 px-4 border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium rounded-lg text-xs"
                >
                  {t('Neu starten', 'Restart')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
