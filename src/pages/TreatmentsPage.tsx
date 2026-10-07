import React, { useState } from 'react';
import { TREATMENTS } from '../data/treatments';
import { useLanguage } from '../context/LanguageContext';
import { ChevronRight, Clock, CheckCircle2, Shield } from 'lucide-react';

interface TreatmentsPageProps {
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: (locId?: string, srvId?: string) => void;
}

export const TreatmentsPage: React.FC<TreatmentsPageProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: t('Alle Behandlungen', 'All Treatments') },
    { id: 'cataract', label: t('Katarakt (Grauer Star)', 'Cataract') },
    { id: 'glaucoma', label: t('Glaukom (Grüner Star)', 'Glaucoma') },
    { id: 'retina', label: t('Makula & Netzhaut (IVOM)', 'Retina & IVOM') },
    { id: 'refractive', label: t('Augenlasern & Linsen', 'Laser Vision Correction') },
    { id: 'eyelid', label: t('Lidchirurgie', 'Eyelid Surgery') },
    { id: 'pediatric', label: t('Kinder-Sehschule', 'Pediatric Orthoptics') },
    { id: 'general', label: t('Trockenes Auge', 'Dry Eye') },
  ];

  const filtered = activeCategory === 'all'
    ? TREATMENTS
    : TREATMENTS.filter((item) => item.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-20">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-sky-800">
          {t('Ophthalmochirurgie & Spezialsprechstunden', 'Ophthalmic Surgery & Specialized Care')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('Behandlungen & operative Eingriffe', 'Treatments & Surgical Procedures')}
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          {t(
            'Unser OP-Zentrum Leverkusen und die Praxis Opladen bieten Ihnen das gesamte Spektrum modernster Augenheilkunde – von schmerzfreien ambulanten Operationen bis zur konservativen Therapie.',
            'Our Leverkusen surgical center and Opladen practice deliver the full spectrum of modern ophthalmology, from micro-incisional outpatient surgery to conservative medical therapy.'
          )}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-2 rounded-lg text-xs md:text-sm font-semibold transition-colors ${
              activeCategory === cat.id
                ? 'bg-sky-800 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Treatment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700">
                {item.category.toUpperCase()}
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-1 mb-2">
                {language === 'de' ? item.name : item.nameEn}
              </h2>
              <p className="text-xs text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                {language === 'de' ? item.shortSummary : item.shortSummaryEn}
              </p>

              {/* Key metadata */}
              <div className="space-y-1.5 text-xs text-slate-500 mb-5">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Dauer: {item.procedure.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{item.procedure.inpatientOrOutpatient}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => onNavigate('behandlungen', item.slug)}
                className="text-xs font-semibold text-sky-800 hover:underline flex items-center gap-1"
              >
                <span>{t('Vollständiger Leitfaden', 'Complete Guide')}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onOpenBooking('leverkusen', item.id)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-sky-50 text-slate-800 hover:text-sky-900 font-semibold rounded-lg text-xs transition-colors"
              >
                {t('Termin buchen', 'Book')}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
