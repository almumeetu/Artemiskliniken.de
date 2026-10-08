import React from 'react';
import { ClinicLocationPage } from './ClinicLocationPage';

interface LeverkusenPageProps {
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: (locId?: string, srvId?: string) => void;
}

export const LeverkusenPage: React.FC<LeverkusenPageProps> = (props) => (
  <ClinicLocationPage locationId="leverkusen" {...props} />
);
