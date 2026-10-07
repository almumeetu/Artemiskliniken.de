import React from 'react';
import {
  Calendar,
  Phone,
  ShieldCheck,
  Award,
  ChevronRight,
  ArrowRight,
  MapPin,
  Clock,
  Sparkles,
  Eye,
  CheckCircle2,
  Stethoscope,
  Activity,
  Layers,
  HeartPulse,
} from 'lucide-react';
import { CLINIC_LOCATIONS, ARTEMIS_NETWORK_STATS } from '../data/clinics';
import { TREATMENTS } from '../data/treatments';
import { EYE_DISEASES } from '../data/diseases';
import { DIAGNOSTICS } from '../data/diagnostics';
import { DOCTORS } from '../data/doctors';
import { PATIENT_REVIEWS, REVIEW_METRICS } from '../data/reviews';
import { PATIENT_FAQS } from '../data/faqs';
import { useLanguage } from '../context/LanguageContext';

interface HomePageProps {
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: (locId?: string, srvId?: string) => void;
  onOpenAmsler: () => void;
  onOpenLaserQuiz: () => void;
  onOpenGlaucomaCheck: () => void;
  onOpenIOLGuide: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenAmsler,
  onOpenLaserQuiz,
  onOpenGlaucomaCheck,
  onOpenIOLGuide,
}) => {
  const { t, language } = useLanguage();
  const drArani = DOCTORS.find((d) => d.id === 'dr-masoud-arani')!;

  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative soft-grid bg-gradient-to-br from-[#e8f4f3] via-[#fbfaf7] to-white pt-10 pb-16 md:py-20 border-b border-[#d8e5e7] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Clinical Proposition & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Regional Authority Kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#176b87] uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#1689a5] animate-pulse"></span>
                <span>{t('Augenzentrum Leverkusen & Praxis Opladen', 'Eye Center Leverkusen & Opladen Practice')}</span>
                <span className="text-slate-300">|</span>
                <span>{t('Ambulante Augenchirurgie & Vorsorge', 'Outpatient Eye Surgery & Prevention')}</span>
              </div>

              {/* Dominant Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#12304a] tracking-tight leading-[1.12] text-balance">
                {t(
                  'Spitzenmedizin für Ihre Augen im Rheinland.',
                  'World-Class Ophthalmic Care for Your Vision.'
                )}
              </h1>

              {/* Patient-Centric Subtitle */}
              <p className="text-base sm:text-lg text-[#526873] leading-relaxed max-w-2xl">
                {t(
                  'Spezialisiert auf modernste Katarakt-Chirurgie (Grauer Star), schonende Glaukom-Lasertherapie, IVOM bei Makuladegeneration (AMD) sowie sanftes Augenlasern. Persönlich, hochpräzise und ambulant.',
                  'Specialized in state-of-the-art cataract surgery, gentle glaucoma laser care, IVOM macular therapies, and refractive laser vision correction. Personal, precise, and outpatient.'
                )}
              </p>

              {/* Primary Dual Action Group */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  onClick={() => onOpenBooking()}
                  className="px-6 py-3.5 bg-[#176b87] hover:bg-[#12304a] text-white font-semibold text-sm md:text-base rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 focus:ring-2 focus:ring-[#1689a5]"
                >
                  <Calendar className="w-5 h-5" aria-hidden="true" />
                  <span>{t('Termin online vereinbaren', 'Book Appointment Online')}</span>
                </button>

                <a
                  href="tel:021444488"
                  className="px-5 py-3.5 bg-white border border-[#c9dadd] hover:border-[#1689a5] text-[#18303b] font-semibold text-sm md:text-base rounded-xl transition-all flex items-center justify-center gap-2.5 shadow-sm hover:bg-[#f0f8f7]"
                  aria-label={t('Telefonische Sprechstunde Leverkusen anrufen: 0214 44488', 'Call clinic Leverkusen: 0214 44488')}
                >
                  <Phone className="w-4 h-4 text-sky-700" aria-hidden="true" />
                  <span>0214 44488</span>
                </a>
              </div>

              {/* Trust markers */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#526873] border-t border-[#d8e5e7]">
                <div className="flex items-center gap-1.5 font-medium text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-sky-700" />
                  <span>{t('Über 12.000 OPs Dr. Arani (FEBO)', '>12,000 Surgeries by Dr. Arani (FEBO)')}</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-slate-700">
                  <Award className="w-4 h-4 text-sky-700" />
                  <span>{t('BDOC & ISO 9001 zertifiziert', 'BDOC & ISO 9001 Certified')}</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{t('4.8 ★ Google Patientenzufriedenheit', '4.8 ★ Google Patient Rating')}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Focal Carrier & Regional Hub Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 sm:p-7 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-sky-100 rounded-full blur-3xl -z-0 opacity-70"></div>
                
                {/* Branch selection header */}
                <div className="relative z-10 mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800">
                    {t('Regionales Augenzentrum', 'Regional Care Hub')}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-1">
                    {t('Zwei Standorte für Ihre Sehkraft', 'Two Locations for Your Eyesight')}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {t(
                      'Ambulantes OP-Zentrum in Leverkusen-Wiesdorf & Facharztpraxis mit Sehschule in Opladen.',
                      'Surgery Center in Leverkusen-Wiesdorf & Outpatient Clinic with Orthoptics in Opladen.'
                    )}
                  </p>
                </div>

                {/* Location Quick Cards */}
                <div className="relative z-10 space-y-3.5">
                  {CLINIC_LOCATIONS.map((loc) => {
                    const isLeverkusen = loc.id === 'leverkusen';
                    return (
                      <div
                        key={loc.id}
                        className={`p-4 rounded-xl border transition-all ${
                          isLeverkusen
                            ? 'bg-sky-50/50 border-sky-200/80 hover:border-sky-300'
                            : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-1.5">
                          <h3 className="font-bold text-sm text-slate-900">
                            {loc.name}
                          </h3>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              isLeverkusen
                                ? 'bg-sky-700 text-white'
                                : 'bg-emerald-700 text-white'
                            }`}
                          >
                            {isLeverkusen ? 'OP-Zentrum' : 'Praxis & Sehschule'}
                          </span>
                        </div>
                        
                        <p className="text-xs text-slate-600 mb-2">
                          {loc.street}, {loc.postalCode} {loc.city}
                        </p>

                        <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
                          <a
                            href={`tel:${loc.phone.replace(/\s+/g, '')}`}
                            className="font-semibold text-sky-800 hover:underline flex items-center gap-1"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>{loc.phoneDisplay}</span>
                          </a>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onNavigate('standorte', loc.slug)}
                              className="text-slate-600 hover:text-slate-900 text-xs underline"
                            >
                              {t('Details', 'Details')}
                            </button>
                            <button
                              onClick={() => onOpenBooking(loc.id)}
                              className="px-2.5 py-1 bg-sky-800 hover:bg-sky-900 text-white rounded font-medium text-xs shadow-xs"
                            >
                              {t('Termin', 'Book')}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Emergency direct link banner */}
                <div className="relative z-10 mt-5 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-medium text-slate-700">
                    {t('Plötzlicher Sehverlust?', 'Sudden Vision Loss?')}
                  </span>
                  <button
                    onClick={() => onNavigate('notfall-akutfall')}
                    className="text-red-700 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>{t('Akutfall-Leitfaden →', 'Emergency Guide →')}</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE PATIENT SELF-ASSESSMENT & DECISION TOOLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-800">
            {t('Digitale Entscheidungshilfen', 'Digital Patient Guides')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            {t('Klarheit für Ihre Augen in wenigen Minuten', 'Quick Insights for Your Eye Health')}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            {t(
              'Nutzen Sie unsere interaktiven klinischen Selbsttests zur Orientierung vor Ihrem Praxistermin.',
              'Use our interactive clinical self-tests to guide your consultation preparation.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Tool 1: Digitales Amsler Gitter */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center mb-3">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">
                {t('Digitales Amsler-Gitter', 'Digital Amsler Grid')}
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                {t(
                  'Schnelltest zur Früherkennung von Netzhaut- und Makuladeformationen (feuchte AMD).',
                  'Rapid check for macular distortion and early warning signs of wet AMD.'
                )}
              </p>
            </div>
            <button
              onClick={onOpenAmsler}
              className="w-full py-2 px-3 bg-sky-50 hover:bg-sky-100 text-sky-900 font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>{t('Selbsttest starten', 'Start Self-Test')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Tool 2: IOL Linsenberater */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">
                {t('IOL-Linsenberater (Grauer Star)', 'IOL Lens Decision Guide')}
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                {t(
                  'Vergleichen Sie Monofokal-, Torisch-, EDOF- und Multifokallinsen für Ihre OP.',
                  'Compare monofocal, toric, EDOF, and multifocal lenses for cataract surgery.'
                )}
              </p>
            </div>
            <button
              onClick={onOpenIOLGuide}
              className="w-full py-2 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>{t('Linsen vergleichen', 'Compare Lenses')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Tool 3: Brillenfreiheit-Quiz */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">
                {t('Leben ohne Brille Eignungs-Check', 'Glasses Freedom Quiz')}
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                {t(
                  'Eignen sich Ihre Augen für Femto-LASIK, PRK oder die EVO Visian ICL Linse?',
                  'Find out if you are suitable for Femto-LASIK, PRK, or EVO Visian ICL.'
                )}
              </p>
            </div>
            <button
              onClick={onOpenLaserQuiz}
              className="w-full py-2 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>{t('Eignung prüfen', 'Check Suitability')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Tool 4: Glaukom Risiko Check */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mb-3">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">
                {t('Glaukom-Risikocheck', 'Glaucoma Risk Check')}
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                {t(
                  'Prüfen Sie Alter, Familiengeschichte und Augendruck-Risikofaktoren.',
                  'Evaluate your age, genetics, and intraocular hypertension factors.'
                )}
              </p>
            </div>
            <button
              onClick={onOpenGlaucomaCheck}
              className="w-full py-2 px-3 bg-teal-50 hover:bg-teal-100 text-teal-900 font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>{t('Risiko einschätzen', 'Assess Risk')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* 3. CORE SPECIALTIES & TREATMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-800">
              {t('Chirurgie & Therapie', 'Surgery & Therapy')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              {t('Unsere Behandlungsschwerpunkte', 'Our Clinical Specialties')}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              {t(
                'Alle Eingriffe erfolgen nach höchsten deutschen Hygiene- und Technologiestandards im zertifizierten Reinraum-OP in Leverkusen.',
                'All surgical procedures are conducted under strict German quality protocols in Leverkusen.'
              )}
            </p>
          </div>

          <button
            onClick={() => onNavigate('behandlungen')}
            className="text-xs sm:text-sm font-semibold text-sky-800 hover:text-sky-900 flex items-center gap-1 hover:underline shrink-0"
          >
            <span>{t('Alle Behandlungen anzeigen', 'View all treatments')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TREATMENTS.slice(0, 6).map((treatment) => (
            <div
              key={treatment.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700">
                  {treatment.category.toUpperCase()}
                </span>
                <h3 className="font-bold text-lg text-slate-900 mt-1 mb-2">
                  {language === 'de' ? treatment.name : treatment.nameEn}
                </h3>
                <p className="text-xs text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                  {language === 'de' ? treatment.shortSummary : treatment.shortSummaryEn}
                </p>

                {/* Key indicators list */}
                <div className="space-y-1.5 mb-5 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Dauer: {treatment.procedure.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{treatment.procedure.inpatientOrOutpatient}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onNavigate('behandlungen', treatment.slug)}
                  className="text-xs font-semibold text-sky-800 hover:underline flex items-center gap-1"
                >
                  <span>{t('Mehr erfahren', 'Learn more')}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenBooking('leverkusen', treatment.id)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-sky-50 text-slate-800 hover:text-sky-900 font-semibold rounded-lg text-xs transition-colors"
                >
                  {t('Sprechstunde buchen', 'Book Consultation')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CHIEF SURGEON & MEDICAL AUTHORITY */}
      <section className="bg-slate-900 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Col: Surgeon credentials & bio */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
                <Award className="w-4 h-4" />
                <span>{t('Ophthalmochirurgische Spitzenkompetenz', 'Surgical Leadership')}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Dr. med. Masoud Arani
              </h2>
              <p className="text-sm font-semibold text-slate-300">
                {drArani.role} · Fellow of the European Board of Ophthalmology (FEBO)
              </p>

              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                {language === 'de' ? drArani.bio : drArani.bioEn}
              </p>

              {/* Quantified surgeon metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
                  <div className="text-xl sm:text-2xl font-bold text-sky-400 font-mono">
                    {drArani.surgeriesCount?.split(' ')[1] || '>12.000'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {t('Selbstständige Augenoperationen', 'Completed Eye Surgeries')}
                  </div>
                </div>

                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
                  <div className="text-xl sm:text-2xl font-bold text-sky-400 font-mono">
                    20+ Jahre
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {t('Klinische & operative Erfahrung', 'Clinical Surgical Record')}
                  </div>
                </div>

                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 col-span-2 sm:col-span-1">
                  <div className="text-xl sm:text-2xl font-bold text-sky-400">
                    FEBO
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {t('Europäisches Facharztexamen', 'European Board of Ophthalmology')}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('aerzte', drArani.slug)}
                  className="px-5 py-2.5 bg-sky-700 hover:bg-sky-600 text-white font-semibold text-xs md:text-sm rounded-lg transition-colors"
                >
                  {t('Vollständiges Arztprofil ansehen', 'View Doctor Profile')}
                </button>
                <button
                  onClick={() => onOpenBooking('leverkusen', 'katarakt')}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs md:text-sm rounded-lg transition-colors border border-slate-700"
                >
                  {t('Termin bei Dr. Arani anfragen', 'Book with Dr. Arani')}
                </button>
              </div>
            </div>

            {/* Right Col: Team Overview & Network Power */}
            <div className="lg:col-span-5 bg-slate-800/90 rounded-2xl p-6 sm:p-7 border border-slate-700 space-y-5">
              <h3 className="font-bold text-lg text-white">
                {t('Fachärztliche Versorgung im Team', 'Multi-Specialist Medical Team')}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t(
                  'Zusammen mit Dr. med. Despina Shibata, Dr. med. Ahmet Altintas, Dipl.-Phys. Karl Schmiedt und Dr. Dörmann decken wir das gesamte Spektrum konservativer und operativer Augenheilkunde ab.',
                  'Together with our specialized ophthalmic team, we cover the full scope of conservative eye care, orthoptics, and advanced surgical interventions.'
                )}
              </p>

              <div className="space-y-3">
                {DOCTORS.slice(1, 4).map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => onNavigate('aerzte', doc.slug)}
                    className="w-full p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 hover:border-slate-500 text-left transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-sm text-white">{doc.name}</div>
                      <div className="text-[11px] text-slate-400">{language === 'de' ? doc.role : doc.roleEn}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                ))}
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={() => onNavigate('aerzte')}
                  className="text-xs font-semibold text-sky-400 hover:underline"
                >
                  {t('Alle Fachärzte in Leverkusen & Opladen anzeigen →', 'View all specialists in Leverkusen & Opladen →')}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. DIAGNOSTICS & MEDICAL TECHNOLOGY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-800">
              {t('Präzision & Sicherheit', 'Precision & Safety')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              {t('Moderne apparative Diagnostik', 'High-End Diagnostic Suite')}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              {t(
                'Frühzeitige Erkennung von Netzhauterkrankungen und Sehnervenschäden mittels berührungsloser Laser- und Lichtscans.',
                'Early detection of retinal disease and optic neuropathy via non-contact laser diagnostic imaging.'
              )}
            </p>
          </div>

          <button
            onClick={() => onNavigate('diagnostik')}
            className="text-xs sm:text-sm font-semibold text-sky-800 hover:text-sky-900 flex items-center gap-1 hover:underline shrink-0"
          >
            <span>{t('Alle Diagnoseverfahren anzeigen', 'View all diagnostics')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {DIAGNOSTICS.slice(0, 4).map((diag) => (
            <div
              key={diag.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-sky-300 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {diag.equipment.split(' ')[0]}
                </span>
                <h3 className="font-bold text-sm text-slate-900 mt-1 mb-2">
                  {language === 'de' ? diag.name : diag.nameEn}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                  {language === 'de' ? diag.shortSummary : diag.shortSummaryEn}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Dauer: {diag.duration}</span>
                <button
                  onClick={() => onNavigate('diagnostik', diag.slug)}
                  className="font-semibold text-sky-800 hover:underline"
                >
                  {t('Details →', 'Details →')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. PATIENT REVIEWS & TRUST VERIFICATION */}
      <section className="bg-slate-50 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-800">
                {t('Erfahrungsberichte', 'Patient Experiences')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                {t('Was unsere Patientinnen & Patienten sagen', 'What Our Patients Say')}
              </h2>
            </div>

            {/* Score box */}
            <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-2xl font-black text-sky-900 font-mono">
                {REVIEW_METRICS.averageRating}
              </div>
              <div className="text-xs">
                <div className="text-amber-500 font-bold">★★★★★</div>
                <div className="text-slate-500">
                  {REVIEW_METRICS.totalReviewsAnalyzed} {t('geprüfte Bewertungen', 'verified reviews')}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PATIENT_REVIEWS.slice(0, 3).map((review) => (
              <div
                key={review.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-sky-800">{review.source}</span>
                    <span>{review.date}</span>
                  </div>
                  <div className="text-amber-500 text-xs mb-2">★★★★★</div>
                  <p className="text-xs text-slate-700 italic leading-relaxed mb-4">
                    „{review.comment}“
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-xs">
                  <div className="font-bold text-slate-900">{review.author}</div>
                  <div className="text-[11px] text-slate-500">{review.treatmentName}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center text-[11px] text-slate-500 max-w-xl mx-auto">
            {REVIEW_METRICS.sourceNotice}
          </div>
        </div>
      </section>

      {/* 7. PATIENT FAQS ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-800">
            {t('Häufige Fragen', 'Frequently Asked Questions')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            {t('Wissenswertes für Ihren Termin', 'Essential Patient Information')}
          </h2>
        </div>

        <div className="space-y-3">
          {PATIENT_FAQS.slice(0, 5).map((faq) => (
            <details
              key={faq.id}
              className="group bg-white rounded-xl border border-slate-200 p-4 transition-colors open:border-sky-300"
            >
              <summary className="font-semibold text-sm text-slate-900 cursor-pointer list-none flex items-center justify-between gap-4">
                <span>{language === 'de' ? faq.question : faq.questionEn}</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform shrink-0">
                  ▼
                </span>
              </summary>
              <p className="mt-3 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {language === 'de' ? faq.answer : faq.answerEn}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => onNavigate('patienten-info')}
            className="text-xs font-semibold text-sky-800 hover:underline"
          >
            {t('Alle Fragen zu Kosten, Vorbereitung & Anfahrt ansehen →', 'View all FAQs regarding costs, preparation & directions →')}
          </button>
        </div>
      </section>

      {/* 8. FINAL APPOINTMENT ACTION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-sky-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-300">
              {t('Persönliche Beratung & Diagnostik', 'Individual Consultation & Diagnostics')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold">
              {t(
                'Vereinbaren Sie Ihren Termin in Leverkusen oder Opladen.',
                'Book your appointment in Leverkusen or Opladen.'
              )}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t(
                'Ob Grauer-Star-Beratung, Netzhaut-Check, Vorsorge oder Kinder-Sehschule: Unser Team nimmt sich Zeit für Ihre Augen.',
                'Whether cataract consultation, retina check, routine screening or pediatric orthoptics: our team is here for you.'
              )}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => onOpenBooking()}
              className="px-6 py-3.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md text-center"
            >
              {t('Termin jetzt anfragen', 'Request Appointment Now')}
            </button>
            <a
              href="tel:021444488"
              className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl transition-all border border-slate-700 text-center"
            >
              0214 44488
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
