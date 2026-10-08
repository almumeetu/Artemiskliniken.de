import { DiagnosticService } from '../types';

/** Diagnostic services explicitly listed on the official ARTEMIS location pages. */
export const DIAGNOSTICS: DiagnosticService[] = [
  {
    id: 'basisdiagnostik',
    slug: 'basisdiagnostik',
    name: 'Basisdiagnostik',
    nameEn: 'Basic eye examinations',
    shortSummary: 'Basisdiagnostik gehört zum Leistungsangebot der ARTEMIS-Praxen in Leverkusen und Opladen. Welche Untersuchungen erforderlich sind, entscheidet das ärztliche Team nach Ihrem Anliegen.',
    shortSummaryEn: 'Basic diagnostics are listed at the ARTEMIS practices in Leverkusen and Opladen. The care team will determine which examinations are appropriate for your needs.',
    locations: ['leverkusen', 'opladen'],
  },
  {
    id: 'oct',
    slug: 'oct',
    name: 'Spezialdiagnostik mit OCT',
    nameEn: 'Specialist diagnostics with OCT',
    shortSummary: 'Die ARTEMIS-Standortseiten nennen das OCT als bildgebendes Verfahren der Spezialdiagnostik in Leverkusen und Opladen.',
    shortSummaryEn: 'The ARTEMIS location pages list OCT imaging as part of specialist diagnostics in Leverkusen and Opladen.',
    locations: ['leverkusen', 'opladen'],
  },
  {
    id: 'iol-master',
    slug: 'iol-master',
    name: 'Spezialdiagnostik mit IOL-Master',
    nameEn: 'Specialist diagnostics with IOL Master',
    shortSummary: 'Der IOL-Master wird auf der ARTEMIS-Standortseite Leverkusen als Teil der Spezialdiagnostik aufgeführt.',
    shortSummaryEn: 'The IOL Master is listed as part of specialist diagnostics on the ARTEMIS Leverkusen location page.',
    locations: ['leverkusen'],
  },
];
