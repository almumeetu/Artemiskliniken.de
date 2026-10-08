import React, { lazy, Suspense, useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { SchemaMarkup } from './components/SchemaMarkup';
import { EmergencyBanner } from './components/EmergencyBanner';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PageSkeleton } from './components/PageSkeleton';

// Modals
import { BookingWizard } from './components/BookingWizard';
import { SearchModal } from './components/SearchModal';

import { TREATMENTS } from './data/treatments';
import { EYE_DISEASES } from './data/diseases';
import { DIAGNOSTICS } from './data/diagnostics';
import { DOCTORS } from './data/doctors';
import { CLINIC_LOCATIONS } from './data/clinics';

const HomePage = lazy(() => import('./pages/HomePage').then((module) => ({ default: module.HomePage })));
const LeverkusenPage = lazy(() => import('./pages/LeverkusenPage').then((module) => ({ default: module.LeverkusenPage })));
const OpladenPage = lazy(() => import('./pages/OpladenPage').then((module) => ({ default: module.OpladenPage })));
const StandortePage = lazy(() => import('./pages/StandortePage').then((module) => ({ default: module.StandortePage })));
const TreatmentsPage = lazy(() => import('./pages/TreatmentsPage').then((module) => ({ default: module.TreatmentsPage })));
const TreatmentDetailPage = lazy(() => import('./pages/TreatmentDetailPage').then((module) => ({ default: module.TreatmentDetailPage })));
const DiseasesPage = lazy(() => import('./pages/DiseasesPage').then((module) => ({ default: module.DiseasesPage })));
const DiseaseDetailPage = lazy(() => import('./pages/DiseaseDetailPage').then((module) => ({ default: module.DiseaseDetailPage })));
const DiagnosticsPage = lazy(() => import('./pages/DiagnosticsPage').then((module) => ({ default: module.DiagnosticsPage })));
const DiagnosticDetailPage = lazy(() => import('./pages/DiagnosticDetailPage').then((module) => ({ default: module.DiagnosticDetailPage })));
const DoctorsPage = lazy(() => import('./pages/DoctorsPage').then((module) => ({ default: module.DoctorsPage })));
const DoctorDetailPage = lazy(() => import('./pages/DoctorDetailPage').then((module) => ({ default: module.DoctorDetailPage })));
const PatientInfoPage = lazy(() => import('./pages/PatientInfoPage').then((module) => ({ default: module.PatientInfoPage })));
const EmergencyPage = lazy(() => import('./pages/EmergencyPage').then((module) => ({ default: module.EmergencyPage })));
const LegalPage = lazy(() => import('./pages/LegalPage').then((module) => ({ default: module.LegalPage })));

const ROUTABLE_TABS = new Set([
  'home', 'standorte', 'behandlungen', 'augenkrankheiten', 'diagnostik', 'aerzte',
  'patienten-info', 'notfall-akutfall', 'impressum', 'datenschutz',
]);

function normalizeRoute(tab: string, slug?: string) {
  if (!ROUTABLE_TABS.has(tab)) return { tab: 'home', slug: undefined };
  if (!slug) return { tab, slug: undefined };

  const validSlug = tab === 'standorte'
    ? ['leverkusen', 'opladen'].includes(slug)
    : tab === 'behandlungen'
      ? TREATMENTS.some((item) => item.slug === slug)
      : tab === 'augenkrankheiten'
        ? EYE_DISEASES.some((item) => item.slug === slug)
        : tab === 'diagnostik'
          ? DIAGNOSTICS.some((item) => item.slug === slug)
          : tab === 'aerzte'
            ? DOCTORS.some((item) => item.slug === slug)
            : false;

  return validSlug ? { tab, slug } : { tab, slug: undefined };
}

type AppRoute = { tab: string; slug?: string };

function routePath(tab: string, slug?: string) {
  if (tab === 'home') return '/';
  return `/${tab}${slug ? `/${encodeURIComponent(slug)}` : ''}/`;
}

function routeFromPathname(pathname: string): AppRoute {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return { tab: 'home', slug: undefined };

  let slug: string | undefined;
  try {
    slug = parts[1] ? decodeURIComponent(parts[1]) : undefined;
  } catch {
    slug = undefined;
  }
  return normalizeRoute(parts[0], slug);
}

function legacyRouteFromHash(hash: string): AppRoute | null {
  const [rawTab, rawSlug] = hash.replace(/^#/, '').split('/');
  if (!ROUTABLE_TABS.has(rawTab)) return null;
  let slug: string | undefined;
  try {
    slug = rawSlug ? decodeURIComponent(rawSlug) : undefined;
  } catch {
    slug = undefined;
  }
  return normalizeRoute(rawTab, slug);
}

function currentBrowserRoute(): AppRoute {
  return legacyRouteFromHash(window.location.hash) ?? routeFromPathname(window.location.pathname);
}

function pageMetadata(tab: string, slug?: string) {
  if (tab === 'standorte' && slug) {
    const location = CLINIC_LOCATIONS.find((item) => item.slug === slug);
    if (location) return {
      title: `${location.name} | ARTEMIS`,
      description: `${location.name}: Adresse, Öffnungszeiten, Kontakt und Leistungen am Standort ${location.city}.`,
    };
  }
  if (tab === 'behandlungen' && slug) {
    const treatment = TREATMENTS.find((item) => item.slug === slug);
    if (treatment) return { title: `${treatment.name} | ARTEMIS`, description: treatment.shortSummary };
  }
  if (tab === 'augenkrankheiten' && slug) {
    const disease = EYE_DISEASES.find((item) => item.slug === slug);
    if (disease) return { title: `${disease.name} | ARTEMIS`, description: disease.shortSummary };
  }
  if (tab === 'diagnostik' && slug) {
    const diagnostic = DIAGNOSTICS.find((item) => item.slug === slug);
    if (diagnostic) return { title: `${diagnostic.name} | ARTEMIS`, description: diagnostic.shortSummary };
  }
  if (tab === 'aerzte' && slug) {
    const doctor = DOCTORS.find((item) => item.slug === slug);
    if (doctor) return { title: `${doctor.name} | ARTEMIS`, description: doctor.bio };
  }

  const pages: Record<string, { title: string; description: string }> = {
    home: { title: 'Augenarzt in Leverkusen & Opladen | ARTEMIS', description: 'ARTEMIS Augenzentrum Leverkusen und Augenarzt-Praxis Opladen: Leistungen, Öffnungszeiten, Kontakt und Informationen zur Terminvereinbarung.' },
    standorte: { title: 'Standorte in Leverkusen | ARTEMIS', description: 'Adresse, Öffnungszeiten und Kontakt zum ARTEMIS Augenzentrum Leverkusen und zur Augenarzt-Praxis Opladen.' },
    behandlungen: { title: 'Augenärztliche Behandlungen | ARTEMIS', description: 'Informationen zu Behandlungen und operativen Schwerpunkten am ARTEMIS-Standort Leverkusen.' },
    augenkrankheiten: { title: 'Augenkrankheiten im Überblick | ARTEMIS', description: 'Verlässliche Orientierung zu häufigen Augenerkrankungen und weiterführenden Informationen von ARTEMIS.' },
    diagnostik: { title: 'Augenärztliche Diagnostik | ARTEMIS', description: 'Informationen zur augenärztlichen Basis- und Spezialdiagnostik an den ARTEMIS-Standorten in Leverkusen.' },
    aerzte: { title: 'Ärztliches Team in Leverkusen und Opladen | ARTEMIS', description: 'Das ärztliche Team an den ARTEMIS-Standorten Leverkusen und Opladen.' },
    'patienten-info': { title: 'Informationen für Ihren Besuch | ARTEMIS', description: 'Hinweise zur Terminvereinbarung, Vorbereitung auf Ihren Besuch und Fragen zu Kosten und Versicherung.' },
    'notfall-akutfall': { title: 'Akute Augenbeschwerden | ARTEMIS', description: 'Orientierung bei akuten Augenbeschwerden: ärztlicher Bereitschaftsdienst 116 117, Rettungsdienst 112.' },
    impressum: { title: 'Impressum | ARTEMIS', description: 'Impressum und rechtliche Angaben der ARTEMIS Augenkliniken GmbH.' },
    datenschutz: { title: 'Datenschutz | ARTEMIS', description: 'Datenschutzhinweise der ARTEMIS Augenkliniken GmbH.' },
  };
  return pages[tab] || pages.home;
}

export default function App() {
  const [initialRoute] = useState(currentBrowserRoute);
  const [currentTab, setCurrentTab] = useState<string>(initialRoute.tab);
  const [currentSlug, setCurrentSlug] = useState<string | undefined>(initialRoute.slug);

  // Modal states
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingLocation, setBookingLocation] = useState<string | undefined>();
  const [searchOpen, setSearchOpen] = useState(false);
  // Keep clean, readable paths in the URL so pages can be refreshed, shared and indexed.
  const handleNavigate = (tab: string, slug?: string) => {
    const nextRoute = normalizeRoute(tab, slug);
    const nextPath = routePath(nextRoute.tab, nextRoute.slug);
    if (window.location.pathname !== nextPath || window.location.hash) window.history.pushState(null, '', nextPath);
    setCurrentTab(nextRoute.tab);
    setCurrentSlug(nextRoute.slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (locId?: string, _serviceId?: string) => {
    setBookingLocation(locId);
    setBookingOpen(true);
  };

  useEffect(() => {
    const syncRoute = () => {
      const route = currentBrowserRoute();
      setCurrentTab(route.tab);
      setCurrentSlug(route.slug);
    };

    const legacyRoute = legacyRouteFromHash(window.location.hash);
    const normalizedRoute = legacyRoute ?? routeFromPathname(window.location.pathname);
    const normalizedPath = routePath(normalizedRoute.tab, normalizedRoute.slug);
    if (legacyRoute || window.location.pathname !== normalizedPath) {
      window.history.replaceState(null, '', normalizedPath);
    }

    window.addEventListener('popstate', syncRoute);
    return () => {
      window.removeEventListener('popstate', syncRoute);
    };
  }, []);

  useEffect(() => {
    const metadata = pageMetadata(currentTab, currentSlug);
    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', metadata.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', metadata.description);
    const canonicalUrl = `${window.location.origin}${routePath(currentTab, currentSlug)}`;
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);
  }, [currentTab, currentSlug]);

  return (
    <LanguageProvider>
      <AccessibilityProvider>
        {/* Real Schema.org Structured Data */}
        <SchemaMarkup />

        <div className="clinic-shell min-h-screen flex flex-col text-slate-900">
          
          {/* Skip link for keyboard accessibility (BITV / WCAG) */}
          <a href="#main-content" className="skip-to-content-link">
            Direkt zum Hauptinhalt springen
          </a>

          {/* 1. Emergency Acute Warning Bar */}
          <EmergencyBanner onOpenEmergencyGuide={() => handleNavigate('notfall-akutfall')} />

          {/* 2. Top Bar Contract Header */}
          <Header
            currentTab={currentTab}
            onNavigate={handleNavigate}
            onOpenBooking={() => handleOpenBooking()}
            onOpenSearch={() => setSearchOpen(true)}
            onOpenEmergency={() => handleNavigate('notfall-akutfall')}
          />

          {/* 3. Main View Router */}
          <main id="main-content" className="flex-1" tabIndex={-1}>
            <Suspense fallback={<PageSkeleton />}>
            {/* Home */}
            {currentTab === 'home' && (
              <HomePage
                onNavigate={handleNavigate}
                onOpenBooking={handleOpenBooking}
              />
            )}

            {/* Standorte */}
            {currentTab === 'standorte' && !currentSlug && (
              <StandortePage onNavigate={handleNavigate} onOpenBooking={handleOpenBooking} />
            )}
            {currentTab === 'standorte' && currentSlug === 'leverkusen' && (
              <LeverkusenPage onNavigate={handleNavigate} onOpenBooking={handleOpenBooking} />
            )}
            {currentTab === 'standorte' && currentSlug === 'opladen' && (
              <OpladenPage onNavigate={handleNavigate} onOpenBooking={handleOpenBooking} />
            )}

            {/* Behandlungen */}
            {currentTab === 'behandlungen' && !currentSlug && (
              <TreatmentsPage onNavigate={handleNavigate} onOpenBooking={handleOpenBooking} />
            )}
            {currentTab === 'behandlungen' && currentSlug && (
              <TreatmentDetailPage
                slug={currentSlug}
                onNavigate={handleNavigate}
                onOpenBooking={handleOpenBooking}
              />
            )}

            {/* Augenkrankheiten */}
            {currentTab === 'augenkrankheiten' && !currentSlug && (
              <DiseasesPage onNavigate={handleNavigate} onOpenBooking={handleOpenBooking} />
            )}
            {currentTab === 'augenkrankheiten' && currentSlug && (
              <DiseaseDetailPage
                slug={currentSlug}
                onNavigate={handleNavigate}
                onOpenBooking={handleOpenBooking}
              />
            )}

            {/* Diagnostik */}
            {currentTab === 'diagnostik' && !currentSlug && (
              <DiagnosticsPage onNavigate={handleNavigate} onOpenBooking={handleOpenBooking} />
            )}
            {currentTab === 'diagnostik' && currentSlug && (
              <DiagnosticDetailPage
                slug={currentSlug}
                onNavigate={handleNavigate}
                onOpenBooking={handleOpenBooking}
              />
            )}

            {/* Ärzte */}
            {currentTab === 'aerzte' && !currentSlug && (
              <DoctorsPage onNavigate={handleNavigate} onOpenBooking={handleOpenBooking} />
            )}
            {currentTab === 'aerzte' && currentSlug && (
              <DoctorDetailPage
                slug={currentSlug}
                onNavigate={handleNavigate}
                onOpenBooking={handleOpenBooking}
              />
            )}

            {/* Patienten-Info */}
            {currentTab === 'patienten-info' && (
              <PatientInfoPage
                onOpenBooking={() => handleOpenBooking()}
                onOpenEmergency={() => handleNavigate('notfall-akutfall')}
              />
            )}

            {/* Notfall & Akutfall */}
            {currentTab === 'notfall-akutfall' && <EmergencyPage />}

            {/* Legal Pages */}
            {currentTab === 'impressum' && <LegalPage initialTab="impressum" />}
            {currentTab === 'datenschutz' && <LegalPage initialTab="datenschutz" />}
            </Suspense>
          </main>

          {/* 4. Complete Verified Footer */}
          <Footer
            onNavigate={handleNavigate}
            onOpenBooking={() => handleOpenBooking()}
          />

          {/* 5. Modals & Interactive Decision Aides */}
          <BookingWizard
            isOpen={bookingOpen}
            onClose={() => setBookingOpen(false)}
            preselectedLocation={bookingLocation}
          />

          <SearchModal
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
            onSelectResult={handleNavigate}
          />

        </div>
      </AccessibilityProvider>
    </LanguageProvider>
  );
}
