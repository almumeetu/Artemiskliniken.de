import React from 'react';
import { DOCTORS } from '../data/doctors';
import { useLanguage } from '../context/LanguageContext';
import { Award, ShieldCheck, ChevronRight, MapPin, Calendar } from 'lucide-react';

interface DoctorsPageProps {
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: (locId?: string, srvId?: string) => void;
}

export const DoctorsPage: React.FC<DoctorsPageProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-20">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-sky-800">
          {t('Fachärztliche Expertise', 'Medical Expertise & Surgeons')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('Unsere Fachärzte & Operateure', 'Our Physicians & Eye Surgeons')}
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          {t(
            'Lernen Sie unser hochqualifiziertes Ärzteteam in Leverkusen und Opladen kennen. Jahrzehntelange operative Erfahrung, internationale Fachqualifikationen (FEBO) und persönliche Zuwendung.',
            'Meet our board-certified ophthalmic surgeons and physicians in Leverkusen and Opladen. Decades of surgical distinction, European Board certification (FEBO), and compassionate patient care.'
          )}
        </p>
      </div>

      {/* Grid of Doctor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DOCTORS.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                  {doc.experienceYears}+ {t('Jahre Erfahrung', 'Years Experience')}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {doc.locations.includes('opladen') && doc.locations.includes('leverkusen')
                    ? 'Leverkusen & Opladen'
                    : doc.locations.includes('leverkusen')
                    ? 'Augenzentrum Leverkusen'
                    : 'Praxis Opladen'}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 mt-1 mb-1">
                {doc.name}
              </h2>
              
              <p className="text-xs text-sky-800 font-semibold mb-3">
                {language === 'de' ? doc.role : doc.roleEn}
              </p>

              {doc.surgeriesCount && (
                <div className="mb-3 px-3 py-1.5 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 text-xs font-semibold">
                  {doc.surgeriesCount}
                </div>
              )}

              <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                {language === 'de' ? doc.bio : doc.bioEn}
              </p>

              {/* Specialties badges */}
              <div className="space-y-1 mb-5">
                <span className="text-[11px] font-bold text-slate-500 uppercase block">
                  {t('Schwerpunkte:', 'Specialties:')}
                </span>
                <div className="flex flex-wrap gap-1 text-[11px] text-slate-700">
                  {(language === 'de' ? doc.specialties : doc.specialtiesEn).slice(0, 3).map((spec, i) => (
                    <span key={i} className="bg-slate-100 px-2 py-0.5 rounded">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => onNavigate('aerzte', doc.slug)}
                className="text-xs font-semibold text-sky-800 hover:underline flex items-center gap-1"
              >
                <span>{t('Profil & Vita', 'Profile & CV')}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onOpenBooking(doc.locations[0])}
                className="px-3 py-1.5 bg-slate-100 hover:bg-sky-50 text-slate-800 hover:text-sky-900 font-semibold rounded-lg text-xs transition-colors"
              >
                {t('Termin anfragen', 'Book')}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
