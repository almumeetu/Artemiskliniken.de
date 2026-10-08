import React, { useEffect, useState } from 'react';
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight, MapPin, Pause, Phone, Play, ShieldCheck } from 'lucide-react';
import { CLINIC_LOCATIONS } from '../data/clinics';
import { TREATMENTS } from '../data/treatments';
import { ARTEMIS_IMAGES, getDiagnosticImage, getTreatmentImage } from '../data/imageAssets';

interface HomePageProps {
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: (locId?: string) => void;
}

const featuredTreatmentIds = [
  'katarakt-grauer-star',
  'refraktive-chirurgie-augenlasern',
  'makuladegeneration-amd-ivom',
];

const qualityMarks = [
  { src: ARTEMIS_IMAGES.bdoc, label: 'Mitglied im B-DOC' },
  { src: ARTEMIS_IMAGES.qualityCertificate, label: 'IAS Qualitätssiegel' },
  { src: '/images/brand/brand-3.png', label: 'DGN.NET' },
  { src: '/images/brand/brand-4.png', label: 'DOCNET' },
  { src: ARTEMIS_IMAGES.doctorsAward, label: 'FOCUS Gesundheit – Top Mediziner' },
  { src: ARTEMIS_IMAGES.serviceAward, label: 'Deutschlands Service-Champions 2026' },
  { src: ARTEMIS_IMAGES.reliableAward, label: 'Höchste Zuverlässigkeit 2026' },
];

const diagnosticImage = getDiagnosticImage('oct');

const homeHeroSlides = [
  {
    image: ARTEMIS_IMAGES.hero,
    imageAlt: 'Ein Kind sitzt auf den Schultern eines älteren Mannes am Wasser',
    eyebrow: 'ARTEMIS Augenheilkunde in Leverkusen',
    title: 'Gut sehen heißt, aktiv zu sein.',
    description: 'Augenärztliche Versorgung und Diagnostik an unseren ARTEMIS-Standorten in Leverkusen und Opladen.',
    primaryLabel: 'Termin anfragen',
    primaryAction: 'booking' as const,
    secondaryLabel: 'Standorte ansehen',
    secondaryAction: 'standorte',
    badge: '#sehenbewegt',
    caption: 'Für die Momente, die zählen.',
  },
  {
    image: diagnosticImage.src,
    imageAlt: diagnosticImage.alt,
    eyebrow: 'Sorgfältig untersucht',
    title: 'Klarheit beginnt mit guter Diagnostik.',
    description: 'Von der Vorsorge bis zur Spezialdiagnostik: Entdecken Sie die augenärztlichen Untersuchungen bei ARTEMIS.',
    primaryLabel: 'Diagnostik entdecken',
    primaryAction: 'diagnostik',
    secondaryLabel: 'Ärztliches Team',
    secondaryAction: 'aerzte',
    badge: 'Augenmedizin',
    caption: 'Augenärztliche Diagnostik bei ARTEMIS',
  },
  {
    image: ARTEMIS_IMAGES.clinic,
    imageAlt: 'Augenärztliches Team bei einer Behandlung im OP-Zentrum',
    eyebrow: 'Augenheilkunde vor Ort',
    title: 'Augenmedizin ganz in Ihrer Nähe.',
    description: 'Finden Sie Kontakt, Sprechzeiten und Anfahrt für das Augenzentrum Leverkusen und die Praxis Opladen.',
    primaryLabel: 'Standort wählen',
    primaryAction: 'standorte',
    secondaryLabel: 'Behandlungen ansehen',
    secondaryAction: 'behandlungen',
    badge: 'ARTEMIS vor Ort',
    caption: 'ARTEMIS Augenzentrum Leverkusen',
  },
] as const;

const useAutoplayCarousel = (slideCount: number, intervalMs: number) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pausedByUser, setPausedByUser] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true,
  );
  const [documentVisible, setDocumentVisible] = useState(() =>
    typeof document === 'undefined' || !document.hidden,
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    setReducedMotion(preference.matches);
    preference.addEventListener('change', updatePreference);
    return () => preference.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const updateVisibility = () => setDocumentVisible(!document.hidden);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    if (slideCount < 2 || pausedByUser || isHovered || hasFocus || reducedMotion || !documentVisible) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slideCount);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [documentVisible, hasFocus, intervalMs, isHovered, pausedByUser, reducedMotion, slideCount]);

  const showSlide = (index: number) => {
    setActiveIndex(((index % slideCount) + slideCount) % slideCount);
  };

  return {
    activeIndex,
    showSlide,
    pausedByUser,
    reducedMotion,
    setIsHovered,
    setHasFocus,
    togglePaused: () => setPausedByUser((paused) => !paused),
  };
};

const CarouselPauseButton: React.FC<{
  pausedByUser: boolean;
  reducedMotion: boolean;
  onToggle: () => void;
}> = ({ pausedByUser, reducedMotion, onToggle }) => (
  <button
    className="carousel-play-toggle"
    type="button"
    onClick={onToggle}
    aria-label={reducedMotion ? 'Automatische Wiedergabe durch die Bewegungseinstellung deaktiviert' : pausedByUser ? 'Automatische Wiedergabe starten' : 'Automatische Wiedergabe pausieren'}
    aria-pressed={pausedByUser}
    disabled={reducedMotion}
    title={reducedMotion ? 'Reduzierte Bewegung ist aktiviert' : undefined}
  >
    {pausedByUser || reducedMotion ? <Play aria-hidden="true" className="h-4 w-4" /> : <Pause aria-hidden="true" className="h-4 w-4" />}
  </button>
);

const QualityMarksCarousel: React.FC = () => {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className={`quality-carousel${paused ? ' is-paused' : ''}`}
      role="region"
      aria-label="Auszeichnungen und Qualitätszeichen von ARTEMIS"
    >
      <div className="quality-carousel__heading">
        <div>
          <p>Vertrauen und Qualität</p>
          <h3>Qualitätszeichen von ARTEMIS</h3>
          <span>Drei Mitgliedschaften und Auszeichnungen im kontinuierlichen Wechsel</span>
        </div>
        <span className="quality-carousel__badge">3 auf einen Blick</span>
      </div>

      <div className="quality-carousel__viewport" aria-live="off">
        <div className="quality-carousel__track">
          {[0, 1].map((copy) => (
            <div className="quality-carousel__group" key={copy} aria-hidden={copy === 1}>
              {qualityMarks.map((mark) => (
                <figure className="quality-carousel__mark" key={`${copy}-${mark.src}`}>
                  <div className="quality-carousel__logo">
                    <img src={mark.src} alt={mark.label} loading="lazy" decoding="async" />
                  </div>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="quality-carousel__controls">
        <p>Mitgliedschaften, Prüfungen und Auszeichnungen</p>
        <button className="quality-carousel__toggle" type="button" onClick={() => setPaused((value) => !value)} aria-pressed={paused}>
          {paused ? <Play aria-hidden="true" className="h-4 w-4" /> : <Pause aria-hidden="true" className="h-4 w-4" />}
          <span>{paused ? 'Bewegung starten' : 'Bewegung pausieren'}</span>
        </button>
      </div>
    </div>
  );
};

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenBooking }) => {
  const heroCarousel = useAutoplayCarousel(homeHeroSlides.length, 6000);
  const featuredTreatments = featuredTreatmentIds
    .map((id) => TREATMENTS.find((treatment) => treatment.id === id))
    .filter((treatment): treatment is (typeof TREATMENTS)[number] => Boolean(treatment));
  const handleHeroBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) heroCarousel.setHasFocus(false);
  };

  return (
    <div className="pb-16">
      <section className="home-hero">
        <div
          className="home-hero-carousel"
          role="region"
          aria-label="ARTEMIS: Augenheilkunde in Leverkusen und Opladen"
          aria-roledescription="Karussell"
          onPointerEnter={() => heroCarousel.setIsHovered(true)}
          onPointerLeave={() => heroCarousel.setIsHovered(false)}
          onFocusCapture={() => heroCarousel.setHasFocus(true)}
          onBlurCapture={handleHeroBlur}
        >
          <div className="home-hero-carousel__slides" aria-live="off">
            {homeHeroSlides.map((slide, index) => (
              <article
                className={`home-hero-slide${heroCarousel.activeIndex === index ? ' is-active' : ''}`}
                key={slide.title}
                role="group"
                aria-roledescription="Folie"
                aria-label={`${index + 1} von ${homeHeroSlides.length}: ${slide.title}`}
                aria-hidden={heroCarousel.activeIndex !== index}
              >
                <div className="mx-auto grid max-w-7xl items-center gap-7 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-16">
                  <figure className="home-hero-image lg:col-span-7">
                    <img
                      src={slide.image}
                      alt={slide.imageAlt}
                      width={960}
                      height={640}
                      loading="eager"
                      fetchPriority={index === 0 ? 'high' : 'low'}
                      decoding="async"
                    />
                    <figcaption><span>{slide.badge}</span>{slide.caption}</figcaption>
                  </figure>
                  <div className="home-hero-copy lg:col-span-5">
                    <p className="clinic-eyebrow">{slide.eyebrow}</p>
                    <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-[#173c78] sm:text-5xl">{slide.title}</h1>
                    <p className="mt-5 text-lg leading-relaxed text-[#425864]">{slide.description}</p>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <button
                        className="button-primary"
                        onClick={() => slide.primaryAction === 'booking' ? onOpenBooking() : onNavigate(slide.primaryAction)}
                      >
                        {slide.primaryAction === 'booking' && <CalendarDays aria-hidden="true" className="h-5 w-5" />}
                        {slide.primaryLabel}
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </button>
                      <button className="button-secondary" onClick={() => onNavigate(slide.secondaryAction)}>
                        {slide.secondaryLabel} <ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="home-hero-locations" aria-label="ARTEMIS-Standorte">
                      {CLINIC_LOCATIONS.map((location) => (
                        <button
                          key={location.id}
                          onClick={() => onNavigate('standorte', location.slug)}
                        >
                          <MapPin aria-hidden="true" className="h-4 w-4" />
                          {location.id === 'leverkusen' ? 'Augenzentrum Leverkusen' : 'Praxis Opladen'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="home-hero-carousel__controls mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" role="group" aria-label="Startseiten-Slider steuern">
            <button className="carousel-arrow" type="button" onClick={() => heroCarousel.showSlide(heroCarousel.activeIndex - 1)} aria-label="Vorheriges Startseitenmotiv">
              <ChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            <div className="carousel-pagination" role="group" aria-label="Startseitenmotive auswählen">
              {homeHeroSlides.map((slide, index) => (
                <button
                  className={`carousel-dot${heroCarousel.activeIndex === index ? ' is-active' : ''}`}
                  key={slide.title}
                  type="button"
                  aria-label={`${slide.title} anzeigen`}
                  aria-pressed={heroCarousel.activeIndex === index}
                  onClick={() => heroCarousel.showSlide(index)}
                />
              ))}
            </div>
            <span className="carousel-count">{String(heroCarousel.activeIndex + 1).padStart(2, '0')} / {String(homeHeroSlides.length).padStart(2, '0')}</span>
            <CarouselPauseButton pausedByUser={heroCarousel.pausedByUser} reducedMotion={heroCarousel.reducedMotion} onToggle={heroCarousel.togglePaused} />
            <button className="carousel-arrow" type="button" onClick={() => heroCarousel.showSlide(heroCarousel.activeIndex + 1)} aria-label="Nächstes Startseitenmotiv">
              <ChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="clinic-eyebrow">Augenheilkunde bei ARTEMIS</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#173c78] sm:text-4xl">Leistungsportfolio</h2>
            <p className="mt-3 text-base leading-relaxed text-[#526873]">
              Informieren Sie sich über häufige Behandlungen am Augenzentrum Leverkusen. Welche Leistung für Sie passt, klärt das ärztliche Team persönlich.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 self-start text-sm font-semibold text-[#087bb2] hover:underline sm:self-auto" onClick={() => onNavigate('behandlungen')}>
            Alle Leistungen <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {featuredTreatments.map((treatment) => {
            const image = getTreatmentImage(treatment.slug);
            return (
              <article className="editorial-card" key={treatment.id}>
                <img src={image.src} alt={image.alt} width={480} height={320} loading="lazy" decoding="async" />
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="clinic-eyebrow">Augenmedizin</p>
                  <h3 className="mt-2 text-lg font-semibold text-[#173c78]">{treatment.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#526873]">{treatment.shortSummary}</p>
                  <button className="mt-5 inline-flex items-center gap-2 self-start text-sm font-semibold text-[#087bb2] hover:underline" onClick={() => onNavigate('behandlungen', treatment.slug)}>
                    Mehr erfahren <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-[#f3f5f7]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="max-w-2xl">
            <p className="clinic-eyebrow">ARTEMIS vor Ort</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#173c78] sm:text-4xl">Augenheilkunde nah bei Ihnen</h2>
            <p className="mt-3 text-base leading-relaxed text-[#526873]">Lernen Sie unsere Augenarztpraxis und das Augenzentrum kennen. Leistungen und Terminwege unterscheiden sich je nach Standort.</p>
          </div>

          <div className="mt-7 grid gap-6 lg:grid-cols-2">
            {CLINIC_LOCATIONS.map((location) => {
              const isLeverkusen = location.id === 'leverkusen';
              return (
                <article className="editorial-card location-feature" key={location.id}>
                  <img
                    src={isLeverkusen ? ARTEMIS_IMAGES.clinic : ARTEMIS_IMAGES.practice}
                    alt={isLeverkusen ? 'Augenärztliches Team bei einer Behandlung im OP-Zentrum' : 'Empfangsbereich einer modernen Augenarztpraxis'}
                    width={480}
                    height={320}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="flex flex-1 flex-col p-5 sm:p-7">
                    <p className="clinic-eyebrow">{isLeverkusen ? 'Praxis und ambulantes OP-Zentrum' : 'Augenärztliche Praxis'}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-[#173c78]">{isLeverkusen ? 'Augenzentrum Leverkusen' : 'Augenarzt-Praxis Opladen'}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#526873]">{location.street}, {location.postalCode} {location.city}</p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[#425864]">{isLeverkusen
                      ? 'Mit augenärztlicher Diagnostik und ambulantem OP-Zentrum für ausgewählte Eingriffe.'
                      : 'Augenärztliche Diagnostik, Vorsorge und Nachsorge mitten in Opladen.'}</p>
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                      <button className="button-primary button-primary-small" onClick={() => onNavigate('standorte', location.slug)}>
                        Standort ansehen <ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </button>
                      <a className="button-secondary button-secondary-small" href={'tel:' + location.phone}>
                        <Phone aria-hidden="true" className="h-4 w-4" /> {location.phoneDisplay}
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="location-cta">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/75">ARTEMIS ist auch in Ihrer Nähe</p>
          <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">Finden Sie Ihren Standort in Leverkusen</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-white/80">Kontaktieren Sie unser Team und erfahren Sie mehr über Sprechzeiten, Anfahrt und Terminvereinbarung.</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            {CLINIC_LOCATIONS.map((location) => (
              <button className="button-light" key={location.id} onClick={() => onNavigate('standorte', location.slug)}>
                <MapPin aria-hidden="true" className="h-4 w-4" />
                {location.id === 'leverkusen' ? 'Augenzentrum Leverkusen' : 'Praxis Opladen'}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="trust-section" aria-labelledby="trust-section-title">
        <div className="trust-section__inner mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="trust-section__story">
            <p className="clinic-eyebrow">Vertrauen und Qualität</p>
            <h2 id="trust-section-title" className="mt-2 text-3xl font-semibold tracking-tight text-[#173c78] sm:text-4xl">Ihre Augen in guten Händen</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#526873]">
              Wir erklären Untersuchungen und Behandlungsschritte in verständlicher Sprache. Welche Behandlung infrage kommt, besprechen Sie nach einer Untersuchung mit dem ärztlichen Team.
            </p>
            <div className="trust-section__locations" aria-label="ARTEMIS-Standorte">
              <span>Augenzentrum Leverkusen</span>
              <span>Augenarzt-Praxis Opladen</span>
            </div>
            <button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#087bb2] hover:underline" onClick={() => onNavigate('aerzte')}>
              Ärztliches Team kennenlernen <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
          <QualityMarksCarousel />
        </div>
      </section>

      <section className="bg-[#f3f5f7]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
          <div>
            <p className="clinic-eyebrow">Gut vorbereitet</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#173c78]">Fragen zum Besuch oder zu einer Untersuchung?</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#526873]">
              Bringen Sie Ihre Versichertenkarte, eine aktuelle Medikamentenliste und vorhandene Vorbefunde mit. Fragen zu Untersuchungen oder möglichen Kosten beantwortet Ihnen die Praxis vorab.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <button className="button-primary" onClick={() => onNavigate('patienten-info')}>
              <ShieldCheck aria-hidden="true" className="h-4 w-4" /> Patienteninformationen <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
            <button className="button-secondary" onClick={() => onNavigate('notfall-akutfall')}>
              Akute Beschwerden <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
