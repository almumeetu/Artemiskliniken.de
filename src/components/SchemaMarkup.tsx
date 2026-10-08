import React from 'react';
import { CLINIC_LOCATIONS } from '../data/clinics';
import { DOCTORS } from '../data/doctors';

const dayOfWeek: Record<string, string> = {
  Montag: 'https://schema.org/Monday',
  Dienstag: 'https://schema.org/Tuesday',
  Mittwoch: 'https://schema.org/Wednesday',
  Donnerstag: 'https://schema.org/Thursday',
  Freitag: 'https://schema.org/Friday',
};

function timeRanges(value: string): { opens: string; closes: string }[] {
  const matches = [...value.matchAll(/(\d{2}):(\d{2})\s*[–-]\s*(\d{2}):(\d{2})/g)];
  return matches.map((match) => ({ opens: match[1] + ':' + match[2], closes: match[3] + ':' + match[4] }));
}

export const SchemaMarkup: React.FC = () => {
  const clinicIdFor = (locationId: string) => {
    const location = CLINIC_LOCATIONS.find((item) => item.id === locationId);
    if (!location) return undefined;
    const slug = location.id === 'leverkusen' ? 'artemis-augenzentrum-leverkusen' : 'artemis-augenarzt-praxis-opladen';
    return `https://www.artemiskliniken.de/standorte/${slug}/#clinic`;
  };

  const clinics = CLINIC_LOCATIONS.map((location) => ({
    '@type': 'MedicalClinic',
    '@id': 'https://www.artemiskliniken.de/standorte/' + (location.id === 'leverkusen' ? 'artemis-augenzentrum-leverkusen' : 'artemis-augenarzt-praxis-opladen') + '/#clinic',
    name: location.name,
    medicalSpecialty: 'Ophthalmology',
    telephone: location.phone,
    email: location.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.street,
      addressLocality: location.city,
      postalCode: location.postalCode,
      addressCountry: 'DE',
    },
    openingHoursSpecification: location.openingHours.flatMap((entry) => {
      const day = dayOfWeek[entry.days];
      const hours = timeRanges(entry.hours);
      if (!day || hours.length === 0) return [];
      return hours.map((range) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: day, ...range }));
    }),
  }));

  const physicians = DOCTORS.map((doctor) => ({
    '@type': 'Physician',
    '@id': `https://www.artemiskliniken.de/#aerzte/${doctor.slug}`,
    name: doctor.name,
    jobTitle: doctor.role,
    medicalSpecialty: doctor.specialties,
    knowsAbout: doctor.focalAreas,
    worksFor: doctor.locations.map((locationId) => ({ '@id': clinicIdFor(locationId) })),
    url: `https://www.artemiskliniken.de/#aerzte/${doctor.slug}`,
  }));

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': [...clinics, ...physicians] }) }} />;
};
