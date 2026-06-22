"use client";

import styles from "@/app/page.module.css";
import { TIMELINE } from "@/data/projectData";

export default function ProjectConstructionUpdates() {
  const getDotClass = (
    status: string
  ) => {
    if (status === "done")
      return styles.dotDone;

    if (status === "active")
      return styles.dotActive;

    return styles.dotPending;
  };

  return (
    <section
      className={styles.card}
      id="updates"
    >
      <div className={styles.cardHead}>
        Construction Updates
      </div>

      <div className={styles.timeline}>
        {TIMELINE.map(
          (item, index) => (
            <div
              key={index}
              className={
                styles.timelineItem
              }
            >
              <div
                className={`${styles.timelineDot} ${getDotClass(
                  item.status
                )}`}
              />

              <div
                className={
                  styles.timelineContent
                }
              >
                <div
                  className={
                    styles.timelineDate
                  }
                >
                  {item.date}
                </div>

                <div
                  className={
                    styles.timelineTitle
                  }
                >
                  {item.title}
                </div>

                <div
                  className={
                    styles.timelineSub
                  }
                >
                  {item.sub}
                </div>

                {item.pct && (
                  <span
                    className={
                      styles.timelinePct
                    }
                  >
                    {item.pct}
                  </span>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}