import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { SchemaMarkup } from './components/SchemaMarkup';
import { EmergencyBanner } from './components/EmergencyBanner';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Modals
import { BookingWizard } from './components/BookingWizard';
import { AmslerGridModal } from './components/AmslerGridModal';
import { LaserQuizModal } from './components/LaserQuizModal';
import { GlaucomaRiskModal } from './components/GlaucomaRiskModal';
import { IOLGuideModal } from './components/IOLGuideModal';
import { SearchModal } from './components/SearchModal';
import { CookieBanner } from './components/CookieBanner';

// Pages
import { HomePage } from './pages/HomePage';
import { LeverkusenPage } from './pages/LeverkusenPage';
import { OpladenPage } from './pages/OpladenPage';
import { StandortePage } from './pages/StandortePage';
import { TreatmentsPage } from './pages/TreatmentsPage';
import { TreatmentDetailPage } from './pages/TreatmentDetailPage';
import { DiseasesPage } from './pages/DiseasesPage';
import { DiseaseDetailPage } from './pages/DiseaseDetailPage';
import { DiagnosticsPage } from './pages/DiagnosticsPage';
import { DiagnosticDetailPage } from './pages/DiagnosticDetailPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { DoctorDetailPage } from './pages/DoctorDetailPage';
import { PatientInfoPage } from './pages/PatientInfoPage';
import { EmergencyPage } from './pages/EmergencyPage';
import { MigrationMatrixPage } from './pages/MigrationMatrixPage';
import { LegalPage } from './pages/LegalPage';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [currentSlug, setCurrentSlug] = useState<string | undefined>(undefined);

  // Modal states
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingLocation, setBookingLocation] = useState<string | undefined>('leverkusen');
  const [bookingService, setBookingService] = useState<string | undefined>(undefined);

  const [amslerOpen, setAmslerOpen] = useState(false);
  const [laserQuizOpen, setLaserQuizOpen] = useState(false);
  const [glaucomaCheckOpen, setGlaucomaCheckOpen] = useState(false);
  const [iolGuideOpen, setIolGuideOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);

  // Scroll to top on navigation
  const handleNavigate = (tab: string, slug?: string) => {
    setCurrentTab(tab);
    setCurrentSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (locId?: string, srvId?: string) => {
    if (locId) setBookingLocation(locId);
    if (srvId) setBookingService(srvId);
    setBookingOpen(true);
  };

  // Synchronize browser history / URL hash if desired
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const parts = hash.split('/');
        setCurrentTab(parts[0]);
        if (parts[1]) setCurrentSlug(parts[1]);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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
            {/* Home */}
            {currentTab === 'home' && (
              <HomePage
                onNavigate={handleNavigate}
                onOpenBooking={handleOpenBooking}
                onOpenAmsler={() => setAmslerOpen(true)}
                onOpenLaserQuiz={() => setLaserQuizOpen(true)}
                onOpenGlaucomaCheck={() => setGlaucomaCheckOpen(true)}
                onOpenIOLGuide={() => setIolGuideOpen(true)}
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
                onOpenIOLGuide={() => setIolGuideOpen(true)}
                onOpenLaserQuiz={() => setLaserQuizOpen(true)}
                onOpenAmsler={() => setAmslerOpen(true)}
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
                onOpenAmsler={() => setAmslerOpen(true)}
                onOpenGlaucomaCheck={() => setGlaucomaCheckOpen(true)}
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

            {/* URL Migration & Parity Matrix */}
            {currentTab === 'migration-matrix' && (
              <MigrationMatrixPage onNavigate={handleNavigate} />
            )}

            {/* Legal Pages */}
            {currentTab === 'impressum' && <LegalPage initialTab="impressum" />}
            {currentTab === 'datenschutz' && <LegalPage initialTab="datenschutz" />}
          </main>

          {/* 4. Complete Verified Footer */}
          <Footer
            onNavigate={handleNavigate}
            onOpenBooking={() => handleOpenBooking()}
            onOpenCookieSettings={() => setCookieSettingsOpen(true)}
          />

          {/* 5. Modals & Interactive Decision Aides */}
          <BookingWizard
            isOpen={bookingOpen}
            onClose={() => setBookingOpen(false)}
            preselectedLocation={bookingLocation}
            preselectedService={bookingService}
          />

          <AmslerGridModal
            isOpen={amslerOpen}
            onClose={() => setAmslerOpen(false)}
            onBookAppointment={() => handleOpenBooking('leverkusen', 'makula')}
          />

          <LaserQuizModal
            isOpen={laserQuizOpen}
            onClose={() => setLaserQuizOpen(false)}
            onBookAppointment={() => handleOpenBooking('leverkusen', 'laser')}
          />

          <GlaucomaRiskModal
            isOpen={glaucomaCheckOpen}
            onClose={() => setGlaucomaCheckOpen(false)}
            onBookAppointment={() => handleOpenBooking('leverkusen', 'glaukom')}
          />

          <IOLGuideModal
            isOpen={iolGuideOpen}
            onClose={() => setIolGuideOpen(false)}
            onBookAppointment={() => handleOpenBooking('leverkusen', 'katarakt')}
          />

          <SearchModal
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
            onSelectResult={handleNavigate}
          />

          <CookieBanner
            forceOpenModal={cookieSettingsOpen}
            onCloseModal={() => setCookieSettingsOpen(false)}
            onNavigatePrivacy={() => handleNavigate('datenschutz')}
          />

        </div>
      </AccessibilityProvider>
    </LanguageProvider>
  );
}
