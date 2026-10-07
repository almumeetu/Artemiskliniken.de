import React from 'react';
import { CLINIC_LOCATIONS } from '../data/clinics';
import { DOCTORS } from '../data/doctors';

export const SchemaMarkup: React.FC = () => {
  const leverkusen = CLINIC_LOCATIONS.find((c) => c.id === 'leverkusen')!;
  const opladen = CLINIC_LOCATIONS.find((c) => c.id === 'opladen')!;
  const drArani = DOCTORS.find((d) => d.id === 'dr-masoud-arani')!;

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalClinic',
        '@id': 'https://www.artemiskliniken.de/standorte/leverkusen/#clinic',
        name: 'ARTEMIS Augenzentrum Leverkusen',
        alternateName: 'ARTEMIS Augenklinik & OP-Zentrum Leverkusen',
        medicalSpecialty: 'Ophthalmology',
        description: 'Ambulantes ophthalmochirurgisches OP-Zentrum und Facharztzentrum für Katarakt-Chirurgie, Glaukom, Makuladegeneration (IVOM) und refraktive Chirurgie.',
        telephone: '+49-214-44488',
        email: 'info@artemiskliniken.de',
        address: {
          '@type': 'PostalAddress',
          streetAddress: leverkusen.street,
          addressLocality: leverkusen.city,
          postalCode: leverkusen.postalCode,
          addressCountry: 'DE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: leverkusen.geo.lat,
          longitude: leverkusen.geo.lng,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
            opens: '08:00',
            closes: '17:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Friday'],
            opens: '08:00',
            closes: '12:00',
          },
        ],
        availableService: [
          { '@type': 'MedicalProcedure', name: 'Katarakt-Chirurgie (Grauer Star)' },
          { '@type': 'MedicalProcedure', name: 'Intravitreale operative Medikamenteneingabe (IVOM)' },
          { '@type': 'MedicalProcedure', name: 'Selektive Lasertrabekuloplastik (SLT)' },
          { '@type': 'MedicalProcedure', name: 'Refraktive Chirurgie & Femto-LASIK' },
          { '@type': 'MedicalProcedure', name: 'Lidchirurgie & Blepharoplastik' },
        ],
      },
      {
        '@type': 'MedicalClinic',
        '@id': 'https://www.artemiskliniken.de/standorte/leverkusen-opladen/#clinic',
        name: 'ARTEMIS Augenarzt-Praxis Opladen',
        medicalSpecialty: 'Ophthalmology',
        description: 'Facharztpraxis für allgemeine Augenheilkunde, Vorsorgeuntersuchungen, Tränenfilmdiagnostik und Kinder-Sehschule (Orthoptik).',
        telephone: '+49-2171-1490',
        email: 'info@artemiskliniken.de',
        address: {
          '@type': 'PostalAddress',
          streetAddress: opladen.street,
          addressLocality: opladen.city,
          postalCode: opladen.postalCode,
          addressCountry: 'DE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: opladen.geo.lat,
          longitude: opladen.geo.lng,
        },
      },
      {
        '@type': 'Physician',
        '@id': 'https://www.artemiskliniken.de/aerzte/dr-masoud-arani/#physician',
        name: drArani.name,
        medicalSpecialty: 'Ophthalmology',
        jobTitle: drArani.role,
        worksFor: {
          '@type': 'MedicalClinic',
          name: 'ARTEMIS Augenzentrum Leverkusen',
        },
        knowsAbout: [
          'Kataraktchirurgie',
          'Intraokularlinsen',
          'Glaukomchirurgie',
          'Makulatherapie',
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};
