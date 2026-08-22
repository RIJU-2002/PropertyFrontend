"use client";

import { memo, useCallback } from "react";
import styles from "./ProjectHero.module.css";

/* ------------------------------------------------------------------ */
/* Types — mirrors your original interface exactly                    */
/* ------------------------------------------------------------------ */

interface ProjectHeroProps {
  project: {
    name: string;
    isNewLaunch?: boolean;
    reraNumber?: string | null;
    locality: { name: string };
    city: { name: string };
    builder: { name: string };
    possessionDate?: string | null;
    rating?: number | null;
    configs?: Array<{
      price?: number | null;
      unitType?: string | null;
      buildAreaRange?: string | null;
    }> | null;
  };
  openModal: (name: string) => void;
  showToast: (message: string) => void;
}

/* ------------------------------------------------------------------ */
/* Inline SVG icons (zero dependencies, crisp at any size)            */
/* ------------------------------------------------------------------ */

const IconMapPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

const IconBuilding = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
);

const IconCalendar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);

const IconStar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);

const IconFlame = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-2.072-2.143-3-4-.928 1.857-1.928 1.857-3 4-.5 1-1 1.62-1 3a2.5 2.5 0 0 0 4.5 1.5Z"/></svg>
);

const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
);

/* ------------------------------------------------------------------ */
/* Formatting helpers                                                 */
/* ------------------------------------------------------------------ */

const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function formatINR(n: number | undefined | null): string {
  if (n == null || Number.isNaN(n)) return "Price on Request";
  return INR.format(n);
}

function formatPossession(isoDate: string | undefined | null): string {
  if (!isoDate) return "TBA";
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return "TBA";
  return d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

function formatRating(rating: number | undefined | null): string {
  if (rating == null) return "";
  return `${rating.toFixed(1)} / 5`;
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

function ProjectHero({ project, openModal, showToast }: ProjectHeroProps) {
  const firstConfig = project.configs?.[0];

  const handlePriceClick = useCallback(() => {
    openModal(project.name);
  }, [openModal, project.name]);

  const handleSiteVisit = useCallback(() => {
    showToast("Site visit request sent!");
  }, [showToast]);

  const handleBrochure = useCallback(() => {
    showToast("Brochure sent!");
  }, [showToast]);

  const priceDisplay = formatINR(firstConfig?.price ?? null);
  const configDisplay = firstConfig
    ? `${firstConfig.unitType ?? ""} • ${firstConfig.buildAreaRange ?? ""} sq.ft`.replace(/^ • | • $/g, "")
    : "";

  return (
    <section className={styles.hero} aria-label={`${project.name} overview`}>
      <div className={styles.header}>
        {/* Left column */}
        <div>
          <div className={styles.badgeRow}>
            {project.isNewLaunch && (
              <span className={`${styles.badge} ${styles.badgeNew}`}>
                <IconFlame /> New Launch
              </span>
            )}
            {project.reraNumber && (
              <span className={`${styles.badge} ${styles.badgeRera}`}>
                <IconCheck /> RERA: {project.reraNumber}
              </span>
            )}
          </div>

          <h1 className={styles.title}>{project.name}</h1>

          <dl className={styles.meta}>
            <div className={styles.metaItem}>
              <dt className="sr-only">Location</dt>
              <dd><IconMapPin /> {project.locality.name}, {project.city.name}</dd>
            </div>

            <div className={styles.metaItem}>
              <dt className="sr-only">Builder</dt>
              <dd><IconBuilding /> {project.builder.name}</dd>
            </div>

            <div className={styles.metaItem}>
              <dt className="sr-only">Possession</dt>
              <dd><IconCalendar /> {formatPossession(project.possessionDate)} Possession</dd>
            </div>

            {project.rating != null && (
              <div className={styles.metaItem}>
                <dt className="sr-only">Rating</dt>
                <dd><IconStar /> {formatRating(project.rating)}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Right column — Price Card */}
        <aside className={styles.priceCard} aria-label="Pricing and actions">
          <div className={styles.priceLabel}>Starting From</div>
          <div className={styles.price} aria-live="polite">{priceDisplay}</div>
          {configDisplay && <div className={styles.priceConfig}>{configDisplay}</div>}

          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={handlePriceClick}
            aria-label={`Get best price for ${project.name}`}
          >
            Get Best Price
          </button>

          <div className={styles.ctaRow}>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnOutline}`}
              onClick={handleSiteVisit}
            >
              Schedule Visit
            </button>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnOutline}`}
              onClick={handleBrochure}
            >
              Brochure
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default memo(ProjectHero);
