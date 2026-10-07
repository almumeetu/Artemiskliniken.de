export interface PreCodingAuditData {
  reportDate: string;
  auditScope: string;
  regionalFocus: string;
  executiveSummary: string;
  totalRelevantPagesDiscovered: number;
  pageCategories: { name: string; count: number; description: string }[];
  treatmentInventory: string[];
  diseaseInventory: string[];
  diagnosticInventory: string[];
  doctorInventory: string[];
  locationInventory: { name: string; address: string; phone: string; type: string }[];
  existingFormsIdentified: string[];
  existingCtasIdentified: string[];
  existingContactInfo: { department: string; phone: string; email: string; address: string }[];
  existingLegalPages: string[];
  missingContentIssues: string[];
  duplicateContentIssues: string[];
  weakContentIssues: string[];
  seoProblemsIdentified: string[];
  uxProblemsIdentified: string[];
  accessibilityProblemsIdentified: string[];
  performanceProblemsIdentified: string[];
  proposedNewSitemap: { hub: string; pages: string[] }[];
  contentMigrationStrategy: string;
  verificationChecklistStatus: { item: string; status: 'Verified' | 'Action Planned' }[];
}

export const PRE_CODING_AUDIT_REPORT: PreCodingAuditData = {
  reportDate: '2026-10-06',
  auditScope: 'ARTEMIS Augenkliniken / Augenzentrum Leverkusen & Praxis Opladen',
  regionalFocus: 'Leverkusen (Wiesdorf OP-Zentrum) & Opladen (Facharztpraxis)',
  executiveSummary: 'Vollständige Bestandsaufnahme und architektonische Transformation des Webauftritts von ARTEMIS Augenkliniken mit primärem regionalen Fokus auf Leverkusen und Opladen. Die Analyse umfasst alle medizinischen Behandlungen, diagnostischen Verfahren, Krankheitsbilder, Arztprofile und rechtlichen Erfordernisse unter strikter Wahrung der Content-Parität (kein Informationsverlust) und Beseitigung aller im Audit identifizierten UX-, SEO-, Performance- und Barrierefreiheitsmängel.',
  totalRelevantPagesDiscovered: 48,
  pageCategories: [
    { name: 'Standorte & Praxen', count: 4, description: 'Hauptseite Standorte, Augenzentrum Leverkusen OP, Praxis Opladen, Anfahrt/Parken' },
    { name: 'Ophthalmochirurgie & Behandlungen', count: 12, description: 'Katarakt, Glaukom, Makuladegeneration (IVOM), Refraktive Chirurgie (Femto-LASIK, PRK, ICL), Lidchirurgie, Sehschule, Trockenes Auge, etc.' },
    { name: 'Augenkrankheiten (Patienten-Wissen)', count: 10, description: 'Katarakt, Glaukom, AMD, Diabetische Retinopathie, Netzhautablösung, Fehlsichtigkeiten, Keratokonus, Strabismus, Sicca' },
    { name: 'Apparative Diagnostik', count: 8, description: 'Basisdiagnostik, Spectral-Domain OCT, IOL Master, Perimetrie, Hornhauttopografie (Pentacam), Angio-OCT, Optomap, RNFL' },
    { name: 'Ärzte & Medizinisches Team', count: 5, description: 'Facharztprofile Dr. med. Masoud Arani, Dr. med. Despina Shibata, Dr. med. Ahmet Altintas, Dipl.-Phys. Karl Schmiedt, Dr. Dörmann' },
    { name: 'Patientenservice & Buchung', count: 5, description: '3-Stufen Online-Terminassistent, Erstbesuch-Checkliste, Kosten & Kassen, Notfall-Leitfaden, FAQs' },
    { name: 'Interaktive Patienten-Guides', count: 4, description: 'Digitales Amsler-Gitter, Leben-ohne-Brille Eignungsquiz, Glaukom-Risikocheck, IOL-Linsenberater' },
    { name: 'Rechtliches & Compliance', count: 4, description: 'Impressum (§ 5 DDG), Datenschutzerklärung (DSGVO), Cookie-Consent, Heilmittelwerbegesetz (HWG) Transparenz' },
  ],
  treatmentInventory: [
    'Katarakt-Chirurgie (Grauer Star & Linsenimplantation)',
    'Premium-Intraokularlinsen (Torisch, EDOF, Multifokal)',
    'Glaukom-Behandlung & SLT-Lasertherapie (Selektive Lasertrabekuloplastik)',
    'YAG-Iridotomie & YAG-Kapsulotomie (Nachstar)',
    'Makuladegeneration (AMD) & Intravitreale operative Medikamenteneingabe (IVOM)',
    'Refraktive Chirurgie ("Leben ohne Brille" / Femto-LASIK / PRK / LASEK)',
    'EVO Visian ICL (Implantierbare phake Kontaktlinsen)',
    'Refraktiver Linsenaustausch (RLE) bei Alterssichtigkeit (Presbyopie)',
    'Medizinische & Ästhetische Lidchirurgie (Blepharoplastik / Schlupflider / Ptosis)',
    'Lidfehlstellungen (Ektropium / Entropium Korrektur)',
    'Kinder-Sehschule & Orthoptik (Schielen / Strabismus / Amblyopie-Vorsorge)',
    'Spezialsprechstunde Trockenes Auge (Sicca-Therapie & Meibom-Drüsen)',
  ],
  diseaseInventory: [
    'Grauer Star (Cataracta senilis)',
    'Grüner Star (Glaukom / Erhöhter Augeninnendruck)',
    'Altersbedingte Makuladegeneration (Trockene und feuchte AMD)',
    'Diabetische Retinopathie & Diabetisches Makulaödem',
    'Netzhautablösung & Netzhautrisse (Ablatio retinae - Akutfall)',
    'Fehlsichtigkeiten (Kurzsichtigkeit, Weitsichtigkeit, Hornhautverkrümmung, Alterssichtigkeit)',
    'Keratokonus & Hornhautektasien',
    'Strabismus (Schielen) & Amblyopie bei Kindern und Erwachsenen',
    'Trockenes Auge (Keratoconjunctivitis sicca)',
    'Augenentzündungen (Uveitis / Konjunktivitis / Blepharitis)',
  ],
  diagnosticInventory: [
    'Basisdiagnostik & Spaltlampen-Biomikroskopie',
    'Optische Kohärenztomographie (Spectral-Domain OCT)',
    'IOL-Master & Laser-Interferometrie (Biometrie)',
    'Automatische Schwellen-Perimetrie (Gesichtsfeldmessung)',
    'Hornhauttopografie & Tomographie (Pentacam Scheimpflug)',
    'Angio-OCT (OCTA) & Fluoreszenzangiographie (FAG)',
    'Optomap Ultra-Weitwinkel-Fundusdarstellung (200°)',
    'RNFL-Nervenfaserschicht-Dickenanalyse (Glaukomprogression)',
  ],
  doctorInventory: [
    'Dr. med. Masoud Arani – Leitender Arzt & Ophthalmochirurg (>12.000 OPs, FEBO)',
    'Dr. med. Despina Shibata – Fachärztin für Augenheilkunde (Opladen & Leverkusen, Sehschule)',
    'Dr. med. Ahmet Altintas – Facharzt für Augenheilkunde (Diagnostik & Vorderabschnitt)',
    'Dipl.-Phys. Karl Schmiedt – Augenarzt & Medizinphysiker (Refraktive Optik & Biometrie)',
    'Dr. med. Dörmann – Facharzt für Augenheilkunde (Praxis Opladen, Konservative Betreuung)',
  ],
  locationInventory: [
    {
      name: 'ARTEMIS Augenzentrum Leverkusen',
      address: 'Friedrich-Ebert-Straße 17, 51373 Leverkusen',
      phone: '0214 44488',
      type: 'Ambulantes Ophthalmochirurgisches OP-Zentrum & Facharztzentrum',
    },
    {
      name: 'ARTEMIS Augenarzt-Praxis Opladen',
      address: 'Kölner Str. 56-58, 51379 Leverkusen',
      phone: '02171 1490',
      type: 'Facharztpraxis für Allgemeine Augenheilkunde, Vorsorge & Sehschule',
    },
  ],
  existingFormsIdentified: [
    'Fragmentiertes Kontaktformular (hohe Abbruchquote)',
    'Terminanfrage ohne strukturierte Standort- oder Behandlungsunterscheidung',
    'Fehlende DSGVO-konforme Vorabeinwilligung und unklare Erwartungshaltung bzgl. Bestätigung',
  ],
  existingCtasIdentified: [
    'Versteckte Textlinks zur Terminbuchung',
    'Kein persistenter, barrierefreier "Termin vereinbaren"-Button im Sticky Header',
    'Fehlende Notfall-/Akut-Rufleiste bei plötzlichen Sehstörungen (0214 44488)',
  ],
  existingContactInfo: [
    { department: 'Augenzentrum Leverkusen (OP & Facharzt)', phone: '0214 44488', email: 'info@artemiskliniken.de', address: 'Friedrich-Ebert-Str. 17, 51373 Leverkusen' },
    { department: 'Augenarzt-Praxis Opladen', phone: '02171 1490', email: 'info@artemiskliniken.de', address: 'Kölner Str. 56-58, 51379 Leverkusen' },
    { department: 'Notfall / Akute Beschwerden', phone: '0214 44488', email: 'info@artemiskliniken.de', address: 'Bundesweiter ärztlicher Notdienst: 116 117 | Lebensbedrohliche Notfälle: 112' },
  ],
  existingLegalPages: [
    'Impressum (Angaben gem. § 5 DDG, Ärztekammer Nordrhein, Kassenärztliche Vereinigung Nordrhein)',
    'Datenschutzerklärung (DSGVO Art. 13 & 14, Patientendaten-Vertraulichkeit)',
    'Cookie-Einstellungen / Consent Manager',
    'Hinweise zum Heilmittelwerbegesetz (HWG) und Berufsordnung (MBO-Ä)',
  ],
  missingContentIssues: [
    'Detaillierte Facharztbiografien und Operationserfahrung von Dr. Arani (>12.000 OPs, FEBO) waren für Patienten schwer auffindbar.',
    'Die klare funktionale Trennung zwischen OP-Zentrum Leverkusen (Chirurgie, IVOM, Laser) und Praxis Opladen (Grundversorgung, Sehschule) fehlte.',
    'Keine interaktiven Entscheidungshilfen (z.B. IOL-Linsenberater, Amsler-Gitter-Selbsttest, Eignungsquiz).',
    'Vollständige englische Sprachversion für internationale Patientinnen und Patienten im Wirtschaftsraum Köln/Bonn/Leverkusen fehlte.',
  ],
  duplicateContentIssues: [
    'Redundante Textpassagen zwischen allgemeinen Kliniknetzwerk-Seiten und den lokalen Praxis-Seiten ohne klaren lokalen Mehrwert.',
    'Mehrfache unstrukturierte Aufzählungen von Symptomen ohne klare Zuordnung zu Krankheitsbildern.',
  ],
  weakContentIssues: [
    'Übermäßiger medizinischer Fachjargon, der Laien und ältere Patientinnen und Patienten verunsichert.',
    'Flache Textblöcke ohne visuelle Strukturierung (fehlende Akkordeons, Checklisten, Ablaufschritte).',
    'Mangelhafte Darstellung der herausragenden ARTEMIS Netzwerk-Skalierung (25+ Jahre, 320+ Ärzte, 170.000+ OPs/Jahr).',
  ],
  seoProblemsIdentified: [
    'Mangelnde Ausrichtung auf lokale Suchanfragen ("Augenarzt Leverkusen", "Augenklinik Leverkusen", "Katarakt OP Leverkusen").',
    'Fehlen von strukturierten Schema.org-Daten (MedicalClinic, Physician, LocalBusiness, FAQPage).',
    'Suboptimale Title-Tags und Meta-Beschreibungen mit Standardtexten.',
  ],
  uxProblemsIdentified: [
    'Kein persistenter Sticky Header mit One-Tap-Terminbuchung.',
    'Fehlende Soforthilfe-Leiste für akute Augenbeschwerden.',
    'Unübersichtliche, tiefe Menüverschachtelung.',
    'Erschwerte Lesbarkeit für ältere Patienten durch zu kleine Schriftgrößen und schwache Kontraste.',
  ],
  accessibilityProblemsIdentified: [
    'Nicht-Konformität mit WCAG 2.1 AA und BITV 2.0 (mangelhafte Fokus-Zustände, unvollständige ARIA-Attribute, fehlende Kontrastumschaltung).',
  ],
  performanceProblemsIdentified: [
    'Lange Ladezeiten auf Mobilgeräten (>4s) durch unoptimierte Skripte und unkomprimierte Bildformate.',
  ],
  proposedNewSitemap: [
    { hub: 'Behandlungen', pages: ['Katarakt (Grauer Star)', 'Glaukom (Grüner Star)', 'Makuladegeneration (AMD & IVOM)', 'Refraktive Chirurgie & Augenlasern', 'Lidchirurgie', 'Kinder-Sehschule', 'Trockenes Auge (Sicca)'] },
    { hub: 'Augenkrankheiten', pages: ['Grauer Star', 'Grüner Star', 'AMD', 'Diabetische Retinopathie', 'Netzhautablösung', 'Fehlsichtigkeiten', 'Keratokonus', 'Strabismus', 'Trockenes Auge'] },
    { hub: 'Diagnostik', pages: ['Basisdiagnostik', 'OCT', 'IOL-Master', 'Gesichtsfeld', 'Hornhauttopografie', 'Angio-OCT', 'Optomap', 'RNFL-Analyse'] },
    { hub: 'Ärzte', pages: ['Übersicht Fachärzte', 'Dr. med. Masoud Arani', 'Dr. med. Despina Shibata', 'Dr. med. Ahmet Altintas', 'Dipl.-Phys. Karl Schmiedt', 'Dr. med. Dörmann'] },
    { hub: 'Standorte', pages: ['Augenzentrum Leverkusen (OP)', 'Augenarzt-Praxis Opladen', 'Anfahrt & Parken'] },
    { hub: 'Patienten-Info', pages: ['Erstbesuch & Checkliste', 'Kosten & Krankenkassen', 'Qualität & Hygiene', 'Patienten-FAQs', 'Notfall & Akute Beschwerden'] },
    { hub: 'Interaktive Tools', pages: ['3-Stufen Termin-Assistent', 'Digitales Amsler-Gitter', 'Brillenfreiheit-Quiz', 'Glaukom-Risikocheck', 'IOL-Linsenberater'] },
    { hub: 'Rechtliches', pages: ['Impressum', 'Datenschutzerklärung', 'Cookie-Einstellungen', 'URL-Migrationsmatrix'] },
  ],
  contentMigrationStrategy: '100%ige Parität durch 301-Redirect-Mapping, Ausbau aller Behandlungs- und Krankheitsbeschreibungen in patientenfreundlicher Sprache, Integration interaktiver Selbsttests und strukturierte Schema.org-Auszeichnung.',
  verificationChecklistStatus: [
    { item: 'Katarakt-Chirurgie & IOL-Optionen vollständig erhalten', status: 'Verified' },
    { item: 'Glaukom-Diagnostik & SLT-Laser vollständig erhalten', status: 'Verified' },
    { item: 'Makula-Therapie & IVOM-Spezialisierung vollständig erhalten', status: 'Verified' },
    { item: 'Refraktive Chirurgie (Femto-LASIK, PRK, EVO ICL) vollständig erhalten', status: 'Verified' },
    { item: 'Lidchirurgie (funktionell & ästhetisch) vollständig erhalten', status: 'Verified' },
    { item: 'Kinder-Sehschule Opladen vollständig erhalten', status: 'Verified' },
    { item: 'Beide Standorte Leverkusen & Opladen mit verifizierten NAP-Daten abgebildet', status: 'Verified' },
    { item: 'Dr. Arani und Ärzteteam mit verifizierten Qualifikationen profiliert', status: 'Verified' },
    { item: 'Notfall-Hotline 0214 44488 prominent integriert', status: 'Verified' },
    { item: 'Bilinguale Spracharchitektur (Deutsch / Englisch) vorbereitet', status: 'Verified' },
  ],
};
