"use client";

import styles from "@/app/page.module.css";

interface ProjectHeroProps {
  openModal: (name: string) => void;
  showToast: (message: string) => void;
}

export default function ProjectHero({
  openModal,
  showToast,
}: ProjectHeroProps) {
  return (
    <div className={styles.projHero}>
      <div className={styles.projHeader}>
        <div>
          <div className={styles.projBadges}>
            <span
              className={`${styles.projBadge} ${styles.pbNew}`}
            >
              🔥 New Launch
            </span>

            <span
              className={`${styles.projBadge} ${styles.pbRera}`}
            >
              ✓ RERA: WBRERA/P/KOL/2024/001
            </span>
          </div>

          <h1 className={styles.projTitle}>
            Samriddh Heights
          </h1>

          <div className={styles.projMeta}>
            <span className={styles.projMetaItem}>
              📍 New Town, Kolkata
            </span>

            <span className={styles.projMetaItem}>
              🏗️ Samriddh Developers
            </span>

            <span className={styles.projMetaItem}>
              📅 Dec 2026 Possession
            </span>

            <span className={styles.projMetaItem}>
              ⭐ 4.8 / 5
            </span>
          </div>
        </div>

        <div className={styles.projPriceBlock}>
          <div className={styles.priceLabel}>
            Starting From
          </div>

          <div className={styles.price}>
            ₹68 Lakh
          </div>

          <div className={styles.priceConfig}>
            2 BHK · 875 sq.ft
          </div>

          <button
            className={`${styles.btn} ${styles.btnGold} ${styles.btnFull}`}
            onClick={() =>
              openModal("Samriddh Heights")
            }
          >
            Get Best Price
          </button>

          <div className={styles.ctaRow}>
            <button
              className={`${styles.btn} ${styles.btnOutline}`}
              onClick={() =>
                showToast(
                  "📅 Site visit request sent!"
                )
              }
            >
              Schedule Visit
            </button>

            <button
              className={`${styles.btn} ${styles.btnOutline}`}
              onClick={() =>
                showToast(
                  "📄 Brochure sent!"
                )
              }
            >
              Brochure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}