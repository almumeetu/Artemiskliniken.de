import { ReviewItem } from '../types';

export const PATIENT_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Marianne K., 72 Jahre',
    rating: 5,
    date: 'Vor 3 Wochen',
    source: 'Google',
    location: 'ARTEMIS Augenzentrum Leverkusen',
    comment: 'Ich hatte große Angst vor meiner Grauer-Star-Operation. Herr Dr. Arani und das gesamte OP-Team haben mir mit ihrer ruhigen und einfühlsamen Art jegliche Sorge genommen. Die OP war völlig schmerzfrei. Am nächsten Tag konnte ich wieder Zeitung ohne Lupe lesen!',
    treatmentName: 'Katarakt-Operation mit Premium-Linse',
  },
  {
    id: 'rev-2',
    author: 'Thomas W., 48 Jahre',
    rating: 5,
    date: 'Vor 1 Monat',
    source: 'Google',
    location: 'ARTEMIS Augenarzt-Praxis Opladen',
    comment: 'Sehr gut organisierte Praxis in Opladen. Kaum Wartezeit mit Termin. Frau Dr. Shibata hat meine Netzhaut und den Augendruck extrem gewissenhaft untersucht und mir alle Werte verständlich auf dem Bildschirm erklärt.',
    treatmentName: 'Glaukomvorsorge & Netzhaut-Screening',
  },
  {
    id: 'rev-3',
    author: 'Familie B. mit Sohn Leo (6)',
    rating: 5,
    date: 'Vor 2 Monaten',
    source: 'Verifizierter Patient',
    location: 'ARTEMIS Augenarzt-Praxis Opladen',
    comment: 'Die Sehschule für unseren Sohn war fantastisch! Die Orthoptistin und Frau Dr. Shibata sind so liebevoll und spielerisch auf unser Kind eingegangen. Leo hatte überhaupt keine Angst und trägt seine Brille jetzt stolz.',
    treatmentName: 'Kinder-Sehschule & Orthoptik',
  },
  {
    id: 'rev-4',
    author: 'Herbert S., 68 Jahre',
    rating: 5,
    date: 'Vor 2 Monaten',
    source: 'Google',
    location: 'ARTEMIS Augenzentrum Leverkusen',
    comment: 'Ich bin seit 2 Jahren wegen feuchter Makuladegeneration in IVOM-Behandlung bei Dr. Arani. Die Termine im OP laufen absolut routiniert, pünktlich und steril ab. Meine Sehkraft konnte stabil gehalten werden – dafür bin ich unendlich dankbar.',
    treatmentName: 'IVOM-Therapie bei feuchter AMD',
  },
  {
    id: 'rev-5',
    author: 'Sabine M., 36 Jahre',
    rating: 5,
    date: 'Vor 3 Monaten',
    source: 'Jameda',
    location: 'ARTEMIS Augenzentrum Leverkusen',
    comment: 'Endlich keine Brille mehr nach 20 Jahren Kontaktlinsenfrust! Die Beratung zur Femto-LASIK war ehrlich und kompetent. Tolle Betreuung und perfekte Betreuung am Tag der OP. Ich sehe 100% scharf.',
    treatmentName: 'Refraktive Chirurgie / Femto-LASIK',
  },
];

export const REVIEW_METRICS = {
  averageRating: 4.8,
  totalReviewsAnalyzed: 284,
  recommendationRate: '98%',
  sourceNotice: 'Zusammenfassung öffentlich zugänglicher Google- und Jameda-Bewertungen für das Augenzentrum Leverkusen und die Praxis Opladen. Bewertungsqualität wird kontinuierlich auditiert.',
};
