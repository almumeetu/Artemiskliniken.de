import React from 'react';
import { Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface EmergencyBannerProps {
  onOpenEmergencyGuide: () => void;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ onOpenEmergencyGuide }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-[#15344a] px-4 py-2 text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs sm:text-sm">
        <p className="leading-relaxed text-white/85">
          <strong className="font-semibold text-white">{t('Akute Augenbeschwerden?', 'Urgent eye symptoms?')}</strong>{' '}
          {t('Außerhalb der Sprechzeiten: 116 117 · Bei Lebensgefahr: 112', 'Outside clinic hours: 116 117 · Life-threatening emergency: 112')}
        </p>
        <div className="flex items-center gap-3">
          <a className="inline-flex items-center gap-1.5 font-semibold text-[#a8e0d8] hover:text-white" href="tel:116117"><Phone aria-hidden="true" className="h-3.5 w-3.5" />116 117</a>
          <button className="font-semibold text-white underline decoration-white/50 underline-offset-2 hover:decoration-white" onClick={onOpenEmergencyGuide}>{t('Hinweise ansehen', 'Read guidance')}</button>
        </div>
      </div>
    </div>
  );
};
