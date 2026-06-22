"use client";

import styles from "@/app/page.module.css";

const highlights = [
  {
    icon: "🌿",
    title: "Green Building Certified",
    sub: "IGBC pre-certified with 40% open landscape area",
  },
  {
    icon: "🔐",
    title: "Smart Security",
    sub: "Video door phone, CCTV & biometric access",
  },
  {
    icon: "⚡",
    title: "100% Power Backup",
    sub: "DG backup for all apartments",
  },
  {
    icon: "🚇",
    title: "Metro Connectivity",
    sub: "1.2 km from Metro Station",
  },
];

export default function ProjectOverview() {
  return (
    <section
      className={styles.card}
      id="overview"
    >
      <div className={styles.cardHead}>
        About the Project
      </div>

      <p className={styles.prose}>
        Samriddh Heights is a premium
        residential development located in
        New Town Action Area II.
      </p>

      <p
        className={styles.prose}
        style={{ marginBottom: 20 }}
      >
        Designed for modern families with
        premium amenities, superior
        connectivity and thoughtfully
        designed apartments.
      </p>

      <div
        className={styles.highlightsGrid}
      >
        {highlights.map((item) => (
          <div
            key={item.title}
            className={
              styles.highlightItem
            }
          >
            <div className={styles.hlIcon}>
              {item.icon}
            </div>

            <div>
              <div
                className={styles.hlTitle}
              >
                {item.title}
              </div>

              <div
                className={styles.hlSub}
              >
                {item.sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}