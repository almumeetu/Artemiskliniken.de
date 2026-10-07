import React from 'react';
import { DOCTORS } from '../data/doctors';
import { CLINIC_LOCATIONS } from '../data/clinics';
import { useLanguage } from '../context/LanguageContext';
import {
  ArrowLeft,
  Award,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  Briefcase,
  ChevronRight,
} from 'lucide-react';

interface DoctorDetailPageProps {
  slug: string;
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: (locId?: string, srvId?: string) => void;
}

export const DoctorDetailPage: React.FC<DoctorDetailPageProps> = ({
  slug,
  onNavigate,
  onOpenBooking,
}) => {
  const { t, language } = useLanguage();
  const doctor = DOCTORS.find((d) => d.slug === slug) || DOCTORS[0];

  const locations = CLINIC_LOCATIONS.filter((l) => doctor.locations.includes(l.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-20">
      
      {/* Back button & Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <button
          onClick={() => onNavigate('aerzte')}
          className="hover:text-sky-800 flex items-center gap-1 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('Alle Fachärzte', 'All Doctors')}</span>
        </button>
        <span>/</span>
        <span className="text-slate-800 font-semibold truncate">
          {doctor.name}
        </span>
      </div>

      {/* Hero Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
              {doctor.title} · {doctor.experienceYears}+ {t('Jahre Berufserfahrung', 'Years Experience')}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {doctor.name}
          </h1>

          <p className="text-base text-sky-200 font-medium">
            {language === 'de' ? doctor.role : doctor.roleEn}
          </p>

          {doctor.surgeriesCount && (
            <div className="p-3 bg-sky-950/80 border border-sky-800 rounded-xl max-w-md text-xs font-semibold text-sky-300">
              {doctor.surgeriesCount}
            </div>
          )}

          <p className="text-sm text-slate-300 leading-relaxed pt-2">
            {language === 'de' ? doctor.bio : doctor.bioEn}
          </p>

          <div className="pt-4 flex flex-wrap gap-3">
            <button
              onClick={() => onOpenBooking(doctor.locations[0])}
              className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs md:text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t('Termin bei Dr. ' + doctor.name.split(' ').pop() + ' buchen', 'Book with Doctor')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Specialties */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {t('Klinische & operative Schwerpunkte', 'Clinical & Surgical Specialties')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(language === 'de' ? doctor.specialties : doctor.specialtiesEn).map((spec, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                  <span className="font-medium">{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Qualifications & Degrees */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {t('Qualifikationen & Zertifizierungen', 'Qualifications & Certifications')}
            </h2>
            <div className="space-y-2.5">
              {(language === 'de' ? doctor.qualifications : doctor.qualificationsEn).map((qual, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700">
                  <Award className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{qual}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Memberships */}
          {doctor.memberships.length > 0 && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-sky-700" />
                <span>{t('Wissenschaftliche Fachgesellschaften & Mitgliedschaften', 'Professional Associations')}</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                {doctor.memberships.map((mem, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-700"></span>
                    <span>{mem}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Right Column: Location & Booking */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Active Branches */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-700" />
              <span>{t('Standorte des Facharztes', 'Doctor Locations')}</span>
            </h3>
            <div className="space-y-2.5 text-xs">
              {locations.map((loc) => (
                <div key={loc.id} className="p-3 bg-slate-50 rounded-xl">
                  <div className="font-semibold text-slate-900">{loc.name}</div>
                  <div className="text-[11px] text-slate-500 mb-1">{loc.street}, {loc.city}</div>
                  <a href={`tel:${loc.phone.replace(/\s+/g, '')}`} className="font-bold text-sky-800 hover:underline">
                    {loc.phoneDisplay}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Direct CTA */}
          <div className="p-5 rounded-2xl bg-sky-900 text-white space-y-3 text-xs">
            <h3 className="font-bold text-sm">
              {t('Persönliche Sprechstunde vereinbaren', 'Book Specialist Consultation')}
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {t(
                'Wählen Sie Ihren Wunschstandort und senden Sie Ihre Terminanfrage direkt an unser Team.',
                'Select your branch and submit your appointment request directly to our reception.'
              )}
            </p>
            <button
              onClick={() => onOpenBooking(doctor.locations[0])}
              className="w-full py-2.5 px-4 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg text-xs transition-colors shadow-sm"
            >
              {t('Termin anfragen', 'Request Appointment')}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
