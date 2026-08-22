"use client";
import styles from "./ProjectHero.module.css";

export default function ProjectHeroSkeleton() {
  return (
    <section className={styles.hero}>
      <div className={styles.header}>
        <div>
          <div className={`${styles.skeleton}`} style={{ width: 120, height: 24, marginBottom: 16 }} />
          <div className={`${styles.skeleton}`} style={{ width: "70%", height: 40, marginBottom: 16 }} />
          <div className={`${styles.skeleton}`} style={{ width: "90%", height: 20 }} />
        </div>
        <div className={styles.priceCard}>
          <div className={`${styles.skeleton}`} style={{ width: 100, height: 16, marginBottom: 8 }} />
          <div className={`${styles.skeleton}`} style={{ width: 160, height: 36, marginBottom: 8 }} />
          <div className={`${styles.skeleton}`} style={{ width: 140, height: 16, marginBottom: 24 }} />
          <div className={`${styles.skeleton}`} style={{ width: "100%", height: 44, marginBottom: 12 }} />
          <div style={{ display: "flex", gap: 12 }}>
            <div className={`${styles.skeleton}`} style={{ flex: 1, height: 40 }} />
            <div className={`${styles.skeleton}`} style={{ flex: 1, height: 40 }} />
          </div>
        </div>
      </div>
    </section>
  );
}
