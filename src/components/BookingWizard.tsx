import React, { useRef } from 'react';
import { ArrowUpRight, CalendarDays, MapPin, Phone, X } from 'lucide-react';
import { CLINIC_LOCATIONS } from '../data/clinics';
import { useLanguage } from '../context/LanguageContext';
import { useDialogFocus } from '../hooks/useDialogFocus';

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedLocation?: string;
  preselectedService?: string;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  isOpen,
  onClose,
  preselectedLocation,
}) => {
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLElement | null>(null);
  useDialogFocus(isOpen, dialogRef, onClose);

  if (!isOpen) return null;

  const locations = [...CLINIC_LOCATIONS].sort((a, b) => {
    if (a.id === preselectedLocation) return -1;
    if (b.id === preselectedLocation) return 1;
    return 0;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#102b3b]/55 p-0 backdrop-blur-sm sm:items-center sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        aria-labelledby="booking-dialog-title"
        aria-describedby="booking-dialog-description"
        aria-modal="true"
        tabIndex={-1}
        ref={dialogRef}
        className="max-h-[100dvh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-[#d6e1e1] bg-white shadow-2xl sm:max-h-[calc(100dvh-2.5rem)] sm:rounded-3xl"
        role="dialog"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#e0e8e7] px-5 py-5 sm:px-7">
          <div>
            <p className="clinic-eyebrow">{t('Terminvereinbarung', 'Appointments')}</p>
            <h2 id="booking-dialog-title" className="mt-1 text-xl font-semibold text-[#173c78] sm:text-2xl">
              {t('Wählen Sie Ihren Standort', 'Choose a location')}
            </h2>
            <p id="booking-dialog-description" className="mt-2 max-w-xl text-sm leading-relaxed text-[#526873]">
              {t('Sie werden zur Online-Terminbuchung von ARTEMIS weitergeleitet oder können die Praxis direkt anrufen. Über dieses Fenster werden keine Gesundheits- oder Kontaktdaten übermittelt.', 'Continue to ARTEMIS online booking or call the practice. No health or contact information is sent through this window.')}
            </p>
          </div>
          <button className="icon-button" onClick={onClose} aria-label={t('Dialog schließen', 'Close dialog')}>
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-7">
          {locations.map((location) => (
            <article key={location.id} className="rounded-2xl border border-[#dce6e5] bg-[#f8faf9] p-5">
              <div className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#1c68a6]" />
                <div>
                  <h3 className="font-semibold text-[#173c78]">{location.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#526873]">{location.street}<br />{location.postalCode} {location.city}</p>
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-2">
                {location.bookingUrl ? (
                  <a
                    className="button-primary button-primary-small w-full"
                    href={location.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CalendarDays aria-hidden="true" className="h-4 w-4" />
                    {t('Online-Termin buchen', 'Book online')}
                    <ArrowUpRight aria-hidden="true" className="ml-auto h-4 w-4" />
                  </a>
                ) : (
                  <a className="button-primary button-primary-small w-full flex-wrap" href={'tel:' + location.phone}>
                    <Phone aria-hidden="true" className="h-4 w-4" />
                    {t('Praxis anrufen', 'Call the practice')}
                    <span className="w-full text-center text-xs sm:ml-auto sm:w-auto">{location.phoneDisplay}</span>
                  </a>
                )}
                <a className="button-secondary button-secondary-small w-full" href={'tel:' + location.phone}>
                  <Phone aria-hidden="true" className="h-4 w-4" />
                  {location.phoneDisplay}
                </a>
              </div>
              {location.id === 'leverkusen' && location.phoneHours && (
                <p className="mt-3 text-xs leading-relaxed text-[#647781]">Telefonisch erreichbar: {location.phoneHours}</p>
              )}
            </article>
          ))}
        </div>

        <div className="border-t border-[#e0e8e7] bg-[#f8faf9] px-5 py-4 text-sm leading-relaxed text-[#526873] sm:px-7">
          {t('Bei akuten Beschwerden nutzen Sie bitte die Hinweise unter „Akute Beschwerden“ statt dieses Buchungsangebots.', 'For urgent symptoms, use the information under “Urgent eye symptoms” instead of this booking option.')}
        </div>
      </section>
    </div>
  );
};
