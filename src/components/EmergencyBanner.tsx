import React from 'react';
import { Phone, AlertCircle, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface EmergencyBannerProps {
  onOpenEmergencyGuide: () => void;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ onOpenEmergencyGuide }) => {
  const { t } = useLanguage();

  return (
    <div
      role="region"
      aria-label={t('Akutversorgung Augennotfälle', 'Urgent Eye Care Notice')}
      className="bg-[#9f2f35] text-white text-[11px] sm:text-xs md:text-sm px-3 sm:px-4 py-2 border-b border-[#7f252b]"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 text-center sm:text-left">
          <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-red-200" aria-hidden="true" />
          <span>
            <strong className="font-semibold">
              {t('Akute Augenbeschwerden?', 'Acute Eye Emergency?')}
            </strong>{' '}
            <span className="hidden sm:inline">
              {t(
                'Plötzlicher Sehverlust, Lichtblitze, Rußregen oder Schmerzen erfordern schnelle Hilfe.',
                'Sudden loss of vision, flashing lights, soot spots or acute eye pain require immediate medical attention.'
              )}
            </span>
            <span className="sm:hidden">
              {t('Sofortige Hilfe bei Sehabfall & Schmerzen.', 'Immediate help for vision drop & pain.')}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="tel:021444488"
            className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-0.5 sm:py-1 bg-white text-red-700 hover:bg-red-50 font-bold rounded text-[11px] sm:text-xs transition-colors shadow-xs"
            aria-label={t('Akut-Hotline Leverkusen anrufen: 0214 44488', 'Call acute hotline Leverkusen: 0214 44488')}
          >
            <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" aria-hidden="true" />
            <span>0214 44488</span>
          </a>

          <button
            onClick={onOpenEmergencyGuide}
            className="underline hover:text-red-100 text-[11px] sm:text-xs font-medium focus:outline-none focus:ring-1 focus:ring-white rounded px-1"
          >
            {t('Notfall-Leitfaden →', 'Triage Guide →')}
          </button>
        </div>
      </div>
    </div>
  );
};
