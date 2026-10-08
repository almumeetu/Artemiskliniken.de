import React from 'react';

export const PageSkeleton: React.FC = () => (
  <section className="page-skeleton" role="status" aria-live="polite" aria-label="Seite wird geladen">
    <span className="sr-only">Seite wird geladen …</span>
    <div className="page-skeleton__hero">
      <div className="page-skeleton__hero-copy">
        <span className="page-skeleton__line page-skeleton__line--eyebrow" />
        <span className="page-skeleton__line page-skeleton__line--title" />
        <span className="page-skeleton__line page-skeleton__line--title-short" />
        <span className="page-skeleton__line page-skeleton__line--body" />
        <span className="page-skeleton__line page-skeleton__line--body-short" />
        <span className="page-skeleton__button" />
      </div>
      <span className="page-skeleton__visual" />
    </div>
    <div className="page-skeleton__content">
      <span className="page-skeleton__line page-skeleton__line--section-title" />
      <div className="page-skeleton__cards">
        {[0, 1, 2].map((item) => (
          <span className="page-skeleton__card" key={item}>
            <span className="page-skeleton__card-image" />
            <span className="page-skeleton__line page-skeleton__line--card-title" />
            <span className="page-skeleton__line page-skeleton__line--card-text" />
          </span>
        ))}
      </div>
    </div>
  </section>
);
