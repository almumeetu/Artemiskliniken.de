export type Language = 'de' | 'en';

export type TextSize = 'normal' | 'large' | 'xlarge';

export interface Doctor {
  id: string;
  slug: string;
  name: string;
  title: string;
  role: string;
  roleEn: string;
  locations: string[]; // ['leverkusen', 'opladen']
  specialties: string[];
  specialtiesEn: string[];
  qualifications: string[];
  qualificationsEn: string[];
  experienceYears?: number;
  surgeriesCount?: string; // e.g. ">12.000 Ophthalmochirurgische Eingriffe"
  memberships: string[];
  bio: string;
  bioEn: string;
  focalAreas: string[];
  focalAreasEn: string[];
  verified: boolean;
}

export interface ClinicLocation {
  id: string;
  slug: string;
  name: string;
  subTitle: string;
  subTitleEn: string;
  street: string;
  postalCode: string;
  city: string;
  phone: string;
  phoneDisplay: string;
  fax?: string;
  email: string;
  emergencyPhone?: string;
  openingHours: {
    days: string;
    daysEn: string;
    hours: string;
  }[];
  isOpZentrum: boolean;
  bookingUrl?: string;
  phoneHours?: string;
  publicTransport?: {
    train?: string;
    bus?: string;
    parking?: string;
  };
  features: string[];
  featuresEn: string[];
  geo?: {
    lat: number;
    lng: number;
  };
}

export interface Treatment {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  shortSummary: string;
  shortSummaryEn: string;
  category: 'cataract' | 'glaucoma' | 'retina' | 'refractive' | 'eyelid' | 'pediatric' | 'cornea' | 'general';
  locations: string[];
}

export interface EyeDisease {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  medicalTerm: string;
  shortSummary: string;
  shortSummaryEn: string;
  urgencyLevel: 'routine' | 'soon' | 'urgent';
  sourceUrl: string;
}

export interface DiagnosticService {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  shortSummary: string;
  shortSummaryEn: string;
  locations: string[];
}
