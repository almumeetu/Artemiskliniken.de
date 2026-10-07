import React, { useState } from 'react';
import { EYE_DISEASES } from '../data/diseases';
import { useLanguage } from '../context/LanguageContext';
import { AlertTriangle, ChevronRight, Eye, ShieldCheck, ArrowRight } from 'lucide-react';

interface DiseasesPageProps {
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: (locId?: string, srvId?: string) => void;
}

export const DiseasesPage: React.FC<DiseasesPageProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-20">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-sky-800">
          {t('Patienten-Wissen & Aufklärung', 'Patient Health Education')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('Häufige Augenerkrankungen im Überblick', 'Common Eye Conditions & Diseases')}
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          {t(
            'Verständliche Informationen zu Symptomen, Ursachen, Früherkennung und modernen Therapiemöglichkeiten. Frühzeitiges Erkennen schützt vor irreversiblem Sehverlust.',
            'Clear, patient-friendly information on symptoms, causes, early diagnosis, and modern treatment options. Early detection prevents permanent sight loss.'
          )}
        </p>
      </div>

      {/* Grid of Disease Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EYE_DISEASES.map((dis) => {
          const isUrgent = dis.urgencyLevel === 'urgent';
          return (
            <div
              key={dis.id}
              className={`bg-white rounded-2xl border p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
                isUrgent ? 'border-red-200 hover:border-red-400' : 'border-slate-200 hover:border-sky-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono text-slate-500 italic">
                    {dis.medicalTerm}
                  </span>
                  {isUrgent && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 uppercase tracking-wide">
                      {t('Akutfall', 'Urgent')}
                    </span>
                  )}
                </div>

                <h2 className="text-lg font-bold text-slate-900 mb-2">
                  {language === 'de' ? dis.name : dis.nameEn}
                </h2>
                
                <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                  {language === 'de' ? dis.shortSummary : dis.shortSummaryEn}
                </p>

                {/* Top symptom bullet */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700 mb-4">
                  <span className="font-semibold block text-[11px] text-slate-500 uppercase mb-1">
                    {t('Leitsymptome:', 'Primary Symptoms:')}
                  </span>
                  <span className="line-clamp-2">
                    {language === 'de' ? dis.symptoms[0] : dis.symptomsEn[0]}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onNavigate('augenkrankheiten', dis.slug)}
                  className="text-xs font-semibold text-sky-800 hover:underline flex items-center gap-1"
                >
                  <span>{t('Ratgeber lesen', 'Read Guide')}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenBooking('leverkusen', dis.id)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-sky-50 text-slate-800 hover:text-sky-900 font-semibold rounded-lg text-xs transition-colors"
                >
                  {t('Vorsorge buchen', 'Book Screening')}
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
