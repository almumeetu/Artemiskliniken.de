import React, { useState } from 'react';
import { X, CheckCircle, Calendar, MapPin, User, Shield, AlertTriangle, Phone } from 'lucide-react';
import { CLINIC_LOCATIONS } from '../data/clinics';
import { BookingFormData } from '../types';
import { useLanguage } from '../context/LanguageContext';

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
  preselectedService,
}) => {
  const { t } = useLanguage();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [formData, setFormData] = useState<BookingFormData>({
    locationId: preselectedLocation || 'leverkusen',
    serviceCategory: preselectedService || 'katarakt',
    insuranceType: 'gesetzlich',
    preferredTime: 'beliebig',
    preferredDate: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
    isAcuteComplaint: false,
    privacyAccepted: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const services = [
    { id: 'katarakt', title: 'Grauer Star / Katarakt-Sprechstunde', desc: 'Linsentrübung, Kunstlinsen-Beratung' },
    { id: 'glaukom', title: 'Grüner Star / Glaukomvorsorge', desc: 'Augendruck, SLT-Laser, Sehnervencheck' },
    { id: 'makula', title: 'Makuladegeneration (AMD) & IVOM', desc: 'Verzerrtes Sehen, Netzhaut-Injektionen' },
    { id: 'laser', title: 'Augenlasern & Leben ohne Brille', desc: 'Femto-LASIK, PRK, EVO Visian ICL' },
    { id: 'sehschule', title: 'Kinder-Sehschule & Orthoptik', desc: 'Schielen, Amblyopie-Vorsorge für Kinder' },
    { id: 'trocken', title: 'Trockenes Auge / Sicca-Sprechstunde', desc: 'Brennen, Tränen, Lidrandbehandlung' },
    { id: 'routine', title: 'Allgemeine Vorsorge & Brillenbestimmung', desc: 'Regelmäßiger Sehtest, Routine-Checkup' },
    { id: 'akut', title: 'Akute Augenbeschwerden (Notfall)', desc: 'Plötzlicher Sehabfall, Schmerzen, Blitze' },
  ];

  const validateStep3 = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.firstName.trim()) errs.firstName = t('Bitte Vornamen angeben', 'Please enter first name');
    if (!formData.lastName.trim()) errs.lastName = t('Bitte Nachnamen angeben', 'Please enter last name');
    if (!formData.phone.trim()) errs.phone = t('Bitte Telefonnummer angeben', 'Please enter phone number');
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = t('Bitte gültige E-Mail-Adresse angeben', 'Please enter valid email');
    }
    if (!formData.privacyAccepted) {
      errs.privacy = t('Bitte stimmen Sie der Datenschutzerklärung zu', 'Please accept privacy terms');
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep3()) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-wizard-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-sky-900 text-white p-4 sm:p-6 flex items-center justify-between shrink-0">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-200">
              {t('Termin-Assistent', 'Appointment Wizard')}
            </span>
            <h2 id="booking-wizard-title" className="text-lg sm:text-xl font-bold">
              {t('Termin online anfragen', 'Request Appointment Online')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-sky-200 hover:text-white hover:bg-sky-800 transition-colors focus:ring-2 focus:ring-white"
            aria-label={t('Dialog schließen', 'Close dialog')}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Wizard progress tracker */}
        {!submitted && (
          <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between text-xs font-medium text-slate-500 shrink-0">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-sky-800 font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 1 ? 'bg-sky-800 text-white' : 'bg-slate-200'}`}>1</span>
              <span>{t('Standort', 'Location')}</span>
            </div>
            <span className="text-slate-300">→</span>
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-sky-800 font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 2 ? 'bg-sky-800 text-white' : 'bg-slate-200'}`}>2</span>
              <span>{t('Behandlungsgrund', 'Reason')}</span>
            </div>
            <span className="text-slate-300">→</span>
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-sky-800 font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 3 ? 'bg-sky-800 text-white' : 'bg-slate-200'}`}>3</span>
              <span>{t('Patientendaten', 'Details')}</span>
            </div>
          </div>
        )}

        {/* Content body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {t('Vielen Dank für Ihre Terminanfrage!', 'Thank you for your appointment request!')}
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                {t(
                  'Wir haben Ihre Angaben erhalten. Unser Praxisteam prüft Ihren Wunschtermin und meldet sich innerhalb von 1 Werktag telefonisch oder per E-Mail zur finalen Bestätigung.',
                  'We have received your request. Our clinic team will verify the schedule and contact you within 1 business day via phone or email for final confirmation.'
                )}
              </p>
              
              <div className="p-4 bg-sky-50 rounded-xl text-left text-xs text-sky-900 max-w-md mx-auto mb-6 space-y-1 border border-sky-100">
                <p><strong>{t('Gewählter Standort:', 'Selected Branch:')}</strong> {CLINIC_LOCATIONS.find(c => c.id === formData.locationId)?.name}</p>
                <p><strong>{t('Patient:', 'Patient:')}</strong> {formData.firstName} {formData.lastName}</p>
                <p><strong>{t('Versicherung:', 'Insurance:')}</strong> {formData.insuranceType.toUpperCase()}</p>
                <p><strong>{t('Rückruf unter:', 'Callback phone:')}</strong> {formData.phone}</p>
              </div>

              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-sky-800 hover:bg-sky-900 text-white font-semibold rounded-lg text-sm transition-colors"
              >
                {t('Fertig & Schließen', 'Done & Close')}
              </button>
            </div>
          ) : (
            <>
              {/* STEP 1: Standort wählen */}
              {step === 1 && (
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-4">
                    {t('Schritt 1: Wählen Sie Ihren Wunsch-Standort', 'Step 1: Choose your preferred clinic location')}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {CLINIC_LOCATIONS.map((loc) => {
                      const isSelected = formData.locationId === loc.id;
                      return (
                        <button
                          key={loc.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, locationId: loc.id })}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'border-sky-600 bg-sky-50/70 ring-2 ring-sky-600/20'
                              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <span className="font-semibold text-slate-900 text-sm">{loc.name}</span>
                            <MapPin className={`w-4 h-4 shrink-0 ${isSelected ? 'text-sky-600' : 'text-slate-400'}`} />
                          </div>
                          <p className="text-xs text-slate-500 mb-2">{loc.street}, {loc.postalCode} {loc.city}</p>
                          <p className="text-xs text-slate-600 line-clamp-2">{loc.subTitle}</p>
                          <div className="mt-3 pt-2 border-t border-slate-200/60 text-[11px] text-sky-700 font-medium">
                            {loc.isOpZentrum ? t('Spezialisiert auf Augen-OPs & Laser', 'Surgical & Laser Center') : t('Schwerpunkt Sehschule & Vorsorge', 'Preventive care & Orthoptics')}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-2.5 bg-sky-800 hover:bg-sky-900 text-white font-semibold rounded-lg text-sm transition-colors"
                    >
                      {t('Weiter zu Schritt 2 →', 'Continue to Step 2 →')}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Behandlungsgrund */}
              {step === 2 && (
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2">
                    {t('Schritt 2: Welches Anliegen führt Sie zu uns?', 'Step 2: What is the reason for your visit?')}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    {t('Wählen Sie den zutreffenden Bereich für eine optimale Terminzuordnung.', 'Select your topic for optimal appointment scheduling.')}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-80 overflow-y-auto pr-1">
                    {services.map((srv) => {
                      const isSelected = formData.serviceCategory === srv.id;
                      const isAkut = srv.id === 'akut';
                      return (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              serviceCategory: srv.id,
                              isAcuteComplaint: isAkut,
                            });
                          }}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            isAkut
                              ? isSelected
                                ? 'border-red-600 bg-red-50 text-red-950 ring-2 ring-red-500/20'
                                : 'border-red-200 hover:bg-red-50/50 text-slate-800'
                              : isSelected
                              ? 'border-sky-600 bg-sky-50 text-sky-950 ring-2 ring-sky-600/20'
                              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className="font-semibold text-xs mb-0.5">{srv.title}</div>
                          <div className="text-[11px] text-slate-500">{srv.desc}</div>
                        </button>
                      );
                    })}
                  </div>

                  {formData.serviceCategory === 'akut' && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-xs text-red-900">
                      <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>{t('Dringender Hinweis:', 'Urgent Warning:')}</strong>{' '}
                        {t(
                          'Bei akuten Schmerzen oder plötzlichem Sehverlust empfehlen wir den direkten telefonischen Notruf unter 0214 44488 statt eines Online-Formulars.',
                          'For sudden severe vision loss or acute pain, please call our emergency desk directly (0214 44488) instead of waiting for online processing.'
                        )}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium rounded-lg text-sm"
                    >
                      {t('← Zurück', '← Back')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-2.5 bg-sky-800 hover:bg-sky-900 text-white font-semibold rounded-lg text-sm transition-colors"
                    >
                      {t('Weiter zu Schritt 3 →', 'Continue to Step 3 →')}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Kontaktdaten & Bestätigung */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-base font-semibold text-slate-900">
                    {t('Schritt 3: Ihre Angaben & Terminpuffer', 'Step 3: Your Contact Details & Scheduling')}
                  </h3>

                  {/* Versicherungsstatus */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      {t('Versicherungsstatus *', 'Health Insurance Status *')}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'gesetzlich', label: t('Gesetzlich (GKV)', 'Public (GKV)') },
                        { id: 'privat', label: t('Privat (PKV)', 'Private (PKV)') },
                        { id: 'selbstzahler', label: t('Selbstzahler', 'Self-Pay') },
                      ].map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, insuranceType: type.id as any })}
                          className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-colors ${
                            formData.insuranceType === type.id
                              ? 'border-sky-600 bg-sky-50 text-sky-900 ring-1 ring-sky-600'
                              : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        {t('Vorname *', 'First Name *')}
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-600 focus:outline-none"
                        placeholder="z.B. Maria"
                      />
                      {errors.firstName && <p className="text-red-600 text-xs mt-0.5">{errors.firstName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        {t('Nachname *', 'Last Name *')}
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-600 focus:outline-none"
                        placeholder="z.B. Mustermann"
                      />
                      {errors.lastName && <p className="text-red-600 text-xs mt-0.5">{errors.lastName}</p>}
                    </div>
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        {t('Telefonnummer (für Rückruf) *', 'Phone (for callback) *')}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-600 focus:outline-none"
                        placeholder="z.B. 0171 1234567"
                      />
                      {errors.phone && <p className="text-red-600 text-xs mt-0.5">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        {t('E-Mail-Adresse *', 'Email Address *')}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-600 focus:outline-none"
                        placeholder="z.B. m.mustermann@web.de"
                      />
                      {errors.email && <p className="text-red-600 text-xs mt-0.5">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Time preference */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      {t('Bevorzugte Tageszeit', 'Preferred Time of Day')}
                    </label>
                    <div className="flex gap-4 text-xs text-slate-700">
                      {[
                        { id: 'beliebig', label: t('Gleichgültig / Beliebig', 'Any time') },
                        { id: 'morgens', label: t('Vormittags (08:00 - 12:00)', 'Mornings') },
                        { id: 'nachmittags', label: t('Nachmittags (14:00 - 17:00)', 'Afternoons') },
                      ].map((item) => (
                        <label key={item.id} className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="timePref"
                            checked={formData.preferredTime === item.id}
                            onChange={() => setFormData({ ...formData, preferredTime: item.id as any })}
                            className="text-sky-700 focus:ring-sky-600"
                          />
                          <span>{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Optional notes */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      {t('Bemerkung oder Symptombeschreibung (optional)', 'Additional notes or symptoms (optional)')}
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-sky-600 focus:outline-none"
                      placeholder={t('z.B. Seit 2 Wochen Sehminderung rechts, bitte um Termin bei Dr. Arani', 'e.g. Blurred vision in right eye for 2 weeks')}
                    />
                  </div>

                  {/* DSGVO consent */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.privacyAccepted}
                        onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                        className="mt-0.5 rounded text-sky-700 focus:ring-sky-600"
                      />
                      <span className="text-[11px] text-slate-600 leading-tight">
                        {t(
                          'Ich stimme der Verarbeitung meiner angegebenen Kontaktdaten zur Terminvereinbarung gemäß der Datenschutzerklärung zu. Hinweis: Es handelt sich um eine Terminanfrage; die verbindliche Bestätigung erfolgt durch das Praxisteam.',
                          'I agree to the processing of my contact information for appointment scheduling in accordance with the Privacy Policy. Note: This is an appointment request; final booking is confirmed by our medical team.'
                        )}
                      </span>
                    </label>
                    {errors.privacy && <p className="text-red-600 text-xs mt-1">{errors.privacy}</p>}
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium rounded-lg text-sm"
                    >
                      {t('← Zurück', '← Back')}
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-sky-800 hover:bg-sky-900 text-white font-semibold rounded-lg text-sm shadow-sm transition-colors"
                    >
                      {t('Terminanfrage verbindlich absenden', 'Submit Appointment Request')}
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
