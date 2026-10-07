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
  experienceYears: number;
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
  emergencyPhone: string;
  openingHours: {
    days: string;
    daysEn: string;
    hours: string;
  }[];
  isOpZentrum: boolean;
  publicTransport: {
    train?: string;
    bus?: string;
    parking?: string;
  };
  features: string[];
  featuresEn: string[];
  geo: {
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
  symptoms: string[];
  symptomsEn: string[];
  suitableFor: string[];
  suitableForEn: string[];
  procedure: {
    duration: string;
    anesthesia: string;
    inpatientOrOutpatient: string;
    recoveryTime: string;
  };
  steps: {
    title: string;
    titleEn: string;
    description: string;
    descriptionEn: string;
  }[];
  aftercare: string[];
  aftercareEn: string[];
  costInfo: {
    coveredByKasse: boolean;
    privateKasse: boolean;
    details: string;
    detailsEn: string;
  };
  relatedDoctors: string[];
  locations: string[];
  relatedDiagnostics: string[];
  relatedDiseases: string[];
  faqs: {
    q: string;
    qEn: string;
    a: string;
    aEn: string;
  }[];
}

export interface EyeDisease {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  medicalTerm: string;
  shortSummary: string;
  shortSummaryEn: string;
  symptoms: string[];
  symptomsEn: string[];
  riskFactors: string[];
  riskFactorsEn: string[];
  diagnosticsUsed: string[];
  treatmentsUsed: string[];
  urgencyLevel: 'routine' | 'soon' | 'urgent';
  preventionTips: string[];
  preventionTipsEn: string[];
  faqs: {
    q: string;
    qEn: string;
    a: string;
    aEn: string;
  }[];
}

export interface DiagnosticService {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  equipment: string;
  shortSummary: string;
  shortSummaryEn: string;
  whatItDoes: string;
  whatItDoesEn: string;
  whyNeeded: string;
  whyNeededEn: string;
  duration: string;
  preparationRequired: string;
  preparationRequiredEn: string;
  pupilDilationRequired: boolean;
  drivingWarning: boolean;
  insuranceNote: string;
  insuranceNoteEn: string;
  locations: string[];
}

export interface PatientFAQ {
  id: string;
  category: string;
  categoryEn: string;
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  source: 'Google' | 'Jameda' | 'Verifizierter Patient';
  location: string;
  comment: string;
  treatmentName: string;
}

export interface UrlRedirectMapItem {
  oldUrl: string;
  newUrl: string;
  statusCode: number;
  pageType: string;
  contentPreserved: string;
  improvementsMade: string;
  seoKeyword: string;
  ctaTarget: string;
  parityStatus: 'Preserved & Enhanced' | 'Consolidated & Upgraded' | 'Archived & Redirected';
}

export interface BookingFormData {
  locationId: string;
  serviceCategory: string;
  doctorPreference?: string;
  insuranceType: 'gesetzlich' | 'privat' | 'selbstzahler';
  preferredTime: 'morgens' | 'nachmittags' | 'beliebig';
  preferredDate?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthYear?: string;
  notes?: string;
  isAcuteComplaint: boolean;
  privacyAccepted: boolean;
}
