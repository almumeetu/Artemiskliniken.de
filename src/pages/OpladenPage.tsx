import React from 'react';
import { ClinicLocationPage } from './ClinicLocationPage';

interface OpladenPageProps {
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: (locId?: string, srvId?: string) => void;
}

export const OpladenPage: React.FC<OpladenPageProps> = (props) => (
  <ClinicLocationPage locationId="opladen" {...props} />
);
