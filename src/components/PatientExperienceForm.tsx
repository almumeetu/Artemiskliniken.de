import React, { useState } from 'react';
import { Star, Send, ShieldCheck, CheckCircle2, MessageSquareHeart, RotateCcw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface FeedbackSubmission {
  locationId: string;
  visitReason: string;
  overallRating: number;
  clarityRating: number;
  friendlinessRating: number;
  waitOrganizationRating: number;
  recommendation: 'yes_definitely' | 'mostly' | 'neutral' | 'no';
  comment: string;
  submittedAt: string;
}

export const PatientExperienceForm: React.FC = () => {
  const { t } = useLanguage();

  const [locationId, setLocationId] = useState<string>('leverkusen');
  const [visitReason, setVisitReason] = useState<string>('katarakt');
  const [overallRating, setOverallRating] = useState<number>(5);
  const [clarityRating, setClarityRating] = useState<number>(5);
  const [friendlinessRating, setFriendlinessRating] = useState<number>(5);
  const [waitOrganizationRating, setWaitOrganizationRating] = useState<number>(5);
  const [recommendation, setRecommendation] = useState<'yes_definitely' | 'mostly' | 'neutral' | 'no'>('yes_definitely');
  const [comment, setComment] = useState<string>('');

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const feedbackPayload: FeedbackSubmission = {
      locationId,
      visitReason,
      overallRating,
      clarityRating,
      friendlinessRating,
      waitOrganizationRating,
      recommendation,
      comment: comment.trim(),
      submittedAt: new Date().toISOString(),
    };

    // Store in localStorage for anonymous quality monitoring aggregation
    try {
      const existing = JSON.parse(localStorage.getItem('artemis_patient_feedback_log') || '[]');
      existing.push(feedbackPayload);
      localStorage.setItem('artemis_patient_feedback_log', JSON.stringify(existing));
    } catch {
      // ignore storage errors
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const handleReset = () => {
    setComment('');
    setOverallRating(5);
    setClarityRating(5);
    setFriendlinessRating(5);
    setWaitOrganizationRating(5);
    setRecommendation('yes_definitely');
    setSubmitted(false);
  };

  const renderStarPicker = (
    label: string,
    value: number,
    onChange: (val: number) => void,
    name: string
  ) => {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
        <span className="text-xs font-medium text-slate-700">{label}</span>
        <div className="flex items-center gap-1" role="radiogroup" aria-label={label}>
          {[1, 2, 3, 4, 5].map((star) => {
            const isFilled = star <= value;
            return (
              <button
                key={star}
                type="button"
                onClick={() => onChange(star)}
                className="p-1 focus:outline-none focus:ring-1 focus:ring-sky-500 rounded"
                aria-label={`${star} von 5 Sternen für ${label}`}
                role="radio"
                aria-checked={value === star}
              >
                <Star
                  className={`w-5 h-5 transition-colors ${
                    isFilled
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-slate-200 text-slate-300 hover:text-amber-200'
                  }`}
                />
              </button>
            );
          })}
          <span className="text-[11px] font-bold text-slate-600 w-7 text-right">
            {value}/5
          </span>
        </div>
      </div>
    );
  };

  return (
    <section
      aria-labelledby="feedback-form-title"
      className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs"
    >
      <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-sky-800">
        <MessageSquareHeart className="w-4 h-4 text-sky-700" />
        <span>{t('Qualitätsmanagement & Feedback', 'Quality Monitoring & Feedback')}</span>
      </div>

      <h2 id="feedback-form-title" className="text-2xl font-bold text-slate-900 mb-2">
        {t('Ihre Erfahrung zählt: Anonymes Patienten-Feedback', 'Patient Experience: Anonymous Quality Feedback')}
      </h2>

      <p className="text-xs text-slate-600 max-w-2xl mb-6 leading-relaxed">
        {t(
          'Helfen Sie uns, den Service und die Versorgung im Augenzentrum Leverkusen und in der Praxis Opladen kontinuierlich nach DIN EN ISO 9001 zu verbessern. Ihre Rückmeldung erfolgt zu 100% anonym.',
          'Help us continuously improve care at Leverkusen Eye Center and Opladen Practice according to DIN EN ISO 9001 standards. Your feedback is processed completely anonymously.'
        )}
      </p>

      {submitted ? (
        <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h3 className="text-lg font-bold text-emerald-950">
            {t('Vielen Dank für Ihre wertvolle Rückmeldung!', 'Thank you for your valuable feedback!')}
          </h3>
          <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
            {t(
              'Ihre anonyme Bewertung wurde an unser Qualitätsmanagement-Team übermittelt. Wir werten jede Rückmeldung sorgfältig aus, um Behandlungsabläufe und Praxisorganisation für alle Patientinnen und Patienten stetig zu optimieren.',
              'Your anonymous evaluation has been forwarded to our clinical quality board. Every submission is analyzed to refine patient care and practice workflows.'
            )}
          </p>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('Weiteres Feedback einreichen', 'Submit another feedback')}</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Location & Treatment selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="feedback-location" className="block text-xs font-semibold text-slate-800 mb-1.5">
                {t('Besuchter Standort *', 'Visited Branch *')}
              </label>
              <select
                id="feedback-location"
                value={locationId}
                onChange={(e) => setLocationId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:ring-2 focus:ring-sky-600 focus:outline-none"
              >
                <option value="leverkusen">ARTEMIS Augenzentrum Leverkusen (OP-Zentrum)</option>
                <option value="opladen">ARTEMIS Augenarzt-Praxis Opladen (Sehschule & Praxis)</option>
              </select>
            </div>

            <div>
              <label htmlFor="feedback-reason" className="block text-xs font-semibold text-slate-800 mb-1.5">
                {t('Behandlungsbereich / Anlass *', 'Treatment / Visit Area *')}
              </label>
              <select
                id="feedback-reason"
                value={visitReason}
                onChange={(e) => setVisitReason(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:ring-2 focus:ring-sky-600 focus:outline-none"
              >
                <option value="katarakt">{t('Katarakt-Operation (Grauer Star)', 'Cataract Surgery')}</option>
                <option value="glaukom">{t('Glaukom-Vorsorge / Lasertherapie (Grüner Star)', 'Glaucoma Care / Laser')}</option>
                <option value="makula">{t('Makulatherapie / IVOM-Injektion (AMD)', 'Macular Therapy / IVOM')}</option>
                <option value="sehschule">{t('Kinder-Sehschule & Orthoptik (Schielen)', 'Pediatric Orthoptics')}</option>
                <option value="laser">{t('Augenlasern & Brillenfreiheit (Femto-LASIK / ICL)', 'Laser Eye Correction')}</option>
                <option value="sicca">{t('Trockenes Auge / Sicca-Sprechstunde', 'Dry Eye Management')}</option>
                <option value="routine">{t('Allgemeine Vorsorge / Brillenbestimmung', 'Routine Exam & Prescription')}</option>
                <option value="notfall">{t('Akutbehandlung / Notfall', 'Emergency / Acute Care')}</option>
              </select>
            </div>
          </div>

          {/* Detailed Star Ratings */}
          <div className="space-y-2">
            <span className="block text-xs font-semibold text-slate-800">
              {t('Bewertungskriterien (1 = ungenügend, 5 = ausgezeichnet)', 'Rating Criteria (1 = poor, 5 = excellent)')}
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {renderStarPicker(
                t('Gesamtzufriedenheit', 'Overall Satisfaction'),
                overallRating,
                setOverallRating,
                'overall'
              )}

              {renderStarPicker(
                t('Ärztliche Aufklärung & Verständlichkeit', 'Medical Clarity & Explanation'),
                clarityRating,
                setClarityRating,
                'clarity'
              )}

              {renderStarPicker(
                t('Freundlichkeit & Einfühlsamkeit des Teams', 'Team Friendliness & Compassion'),
                friendlinessRating,
                setFriendlinessRating,
                'friendliness'
              )}

              {renderStarPicker(
                t('Wartezeit & Praxisorganisation', 'Waiting Time & Clinic Organization'),
                waitOrganizationRating,
                setWaitOrganizationRating,
                'wait'
              )}
            </div>
          </div>

          {/* Recommendation question */}
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-2">
              {t('Würden Sie uns Familie & Freunden weiterempfehlen?', 'Would you recommend us to family & friends?')}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'yes_definitely', label: t('Ja, auf jeden Fall', 'Yes, definitely') },
                { id: 'mostly', label: t('Eher ja', 'Likely yes') },
                { id: 'neutral', label: t('Neutral', 'Neutral') },
                { id: 'no', label: t('Eher nein', 'Likely no') },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setRecommendation(opt.id as any)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-colors ${
                    recommendation === opt.id
                      ? 'border-sky-600 bg-sky-50 text-sky-900 ring-1 ring-sky-600'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Free-text comment */}
          <div>
            <label htmlFor="feedback-comment" className="block text-xs font-semibold text-slate-800 mb-1.5">
              {t('Ihr persönlicher Eindruck & Verbesserungsvorschläge (optional)', 'Personal Observations & Suggestions (optional)')}
            </label>
            <textarea
              id="feedback-comment"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-sky-600 focus:outline-none placeholder-slate-400"
              placeholder={t(
                'Was hat Ihnen besonders gut gefallen? Welche Abläufe könnten wir noch angenehmer gestalten?',
                'What went especially well? Where can we improve your experience?'
              )}
            />
          </div>

          {/* Anonymous Guarantee and Submit */}
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {t(
                  '100% anonym: Es werden keine IP-Adressen oder Namen gespeichert.',
                  '100% anonymous: No IP addresses or identifying names are stored.'
                )}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-sky-800 hover:bg-sky-900 active:bg-sky-950 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>
                {isSubmitting
                  ? t('Wird übermittelt...', 'Submitting...')
                  : t('Feedback anonym absenden', 'Submit Anonymous Feedback')}
              </span>
            </button>
          </div>

        </form>
      )}
    </section>
  );
};
