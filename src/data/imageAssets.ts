const optimized = (filename: string) => '/images/optimized/' + filename.replace(/\.(?:jpe?g|png)$/i, '.webp');

export const ARTEMIS_IMAGES = {
  logo: '/images/logo/logo.svg',
  hero: optimized('csm_artemis-philosophie-tb-01_3344416179.jpg'),
  clinic: optimized('csm_artemis_standort_klinik_zentrum_8a7f2ebc88.png'),
  practice: optimized('csm_artemis_standort_praxis_83625c5dc4.png'),
  reliableAward: '/images/brand/brand-1.png',
  qualityCertificate: '/images/brand/brand-2.png',
  bdoc: '/images/brand/brand.png',
  doctorsAward: '/images/brand/brand-5.png',
  serviceAward: '/images/brand/brand-6.jpg',
};

type EditorialImage = { src: string; alt: string };

const treatmentImages: Record<string, EditorialImage> = {
  'katarakt-grauer-star': {
    src: optimized('csm_augen-op-kataraktchirurgie-tb-01_b08cda2e12.jpg'),
    alt: 'Augenärztliche Behandlung des Grauen Stars',
  },
  'glaukom-gruener-star': {
    src: optimized('csm_augenuntersuchungen-glaukom-vorsorge-tb-01_ad97b1b5c2.jpg'),
    alt: 'Spezielle Untersuchung zur Glaukomvorsorge',
  },
  'makuladegeneration-amd-ivom': {
    src: optimized('csm_augen-op-netzhautchirurgie-ivom-tb-01_f9d416c174.jpg'),
    alt: 'Augenärztliche Behandlung der Netzhaut',
  },
  'refraktive-chirurgie-augenlasern': {
    src: optimized('csm_augen-op-sehen-ohne-brille-femto-lasik-tb-01_70c5216963.jpg'),
    alt: 'Augenlaserbehandlung zur Korrektur einer Fehlsichtigkeit',
  },
  lidchirurgie: {
    src: optimized('csm_augen-op-lidchirurgie-tb-01_189e8e8854.jpg'),
    alt: 'Augenärztlicher Eingriff an den Augenlidern',
  },
  'sehschule-orthoptik': {
    src: optimized('csm_augenuntersuchungen-sehschule-tb-01_e7b8dcf762.jpg'),
    alt: 'Untersuchung im Rahmen der Sehschule',
  },
};

const diseaseImages: Record<string, EditorialImage> = {
  katarakt: {
    src: optimized('csm_augenkrankheiten-grauer-star-katarakt-tb-01_37599aac1b.jpg'),
    alt: 'Informationen zum Grauen Star',
  },
  glaukom: {
    src: optimized('csm_augenkrankheiten-gruener-star-glaukom-tb-01_3eaefd05b3.jpg'),
    alt: 'Informationen zum Grünen Star',
  },
  'makuladegeneration-amd': {
    src: optimized('csm_augenuntersuchungen-makuladegeneration-vorsorge-tb-01_9a0bb188d1.jpg'),
    alt: 'Untersuchung der Makula',
  },
  'diabetische-retinopathie': {
    src: optimized('csm_augenkrankheiten-netzhauterkrankungen-tb-01_bf36b15276.jpg'),
    alt: 'Informationen zu Erkrankungen der Netzhaut',
  },
  netzhautabloesung: {
    src: optimized('csm_augen-op-netzhautchirurgie-tb-01_4544ef7ef5.jpg'),
    alt: 'Augenärztliche Behandlung der Netzhaut',
  },
  fehlsichtigkeiten: {
    src: optimized('csm_augenkrankheiten-sehfehler-fehlsichtigkeit-tb-01_5752e80eb8.jpg'),
    alt: 'Informationen zu Fehlsichtigkeiten',
  },
  keratokonus: {
    src: optimized('csm_augen-op-hornhautchirurgie-hornhaut-vernetzung-tb-01_ab641776a0.jpg'),
    alt: 'Augenärztliche Behandlung der Hornhaut',
  },
  'strabismus-schielen': {
    src: optimized('csm_augenuntersuchungen-sehschule-tb-01_e7b8dcf762.jpg'),
    alt: 'Untersuchung in der Sehschule',
  },
  'trockenes-auge-sicca': {
    src: optimized('csm_augenkrankheiten-trockenes-auge-tb-01_deaaa9014f.jpg'),
    alt: 'Informationen zum Trockenen Auge',
  },
};

const diagnosticImages: Record<string, EditorialImage> = {
  basisdiagnostik: {
    src: optimized('csm_augenuntersuchungen-basisdiagnostik-tb-01_29d2fe4ad7.jpg'),
    alt: 'Augenärztliche Basisuntersuchung',
  },
  oct: {
    src: optimized('csm_augenuntersuchungen-spezialdiagnostik-tb-01_49264d1f3b.jpg'),
    alt: 'Bildgebende augenärztliche Spezialdiagnostik',
  },
  'iol-master': {
    src: optimized('csm_augenuntersuchungen-grauer-star-vorsorge-tb-01_557503b3d3.jpg'),
    alt: 'Untersuchung vor einer Kataraktbehandlung',
  },
};

const fallbackImage: EditorialImage = {
  src: optimized('csm_augenuntersuchung-tb-01_57b161bc10.jpg'),
  alt: 'Augenärztliche Untersuchung',
};

export const getTreatmentImage = (slug: string) => treatmentImages[slug] ?? fallbackImage;
export const getDiseaseImage = (slug: string) => diseaseImages[slug] ?? fallbackImage;
export const getDiagnosticImage = (slug: string) => diagnosticImages[slug] ?? fallbackImage;
