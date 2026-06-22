"use client";

import styles from "@/app/page.module.css";
import { SIMILAR } from "@/data/projectData";

interface Props {
  openModal: (name: string) => void;
}

export default function SimilarProjects({
  openModal,
}: Props) {
  return (
    <section
      className={
        styles.similarSection
      }
    >
      <div
        className={styles.similarHead}
      >
        <h2>Similar Projects</h2>
      </div>

      <div
        className={styles.similarGrid}
      >
        {SIMILAR.map((project) => (
          <div
            key={project.name}
            className={styles.propCard}
          >
            <div
              className={styles.propImg}
            >
              <div
                className={
                  styles.propImgBg
                }
                style={{
                  background:
                    project.gradient,
                }}
              />

              <span
                className={
                  styles.propBadge
                }
                style={{
                  background:
                    project.badgeColor,
                }}
              >
                {project.badge}
              </span>
            </div>

            <div
              className={styles.propBody}
            >
              <div
                className={
                  styles.propName
                }
              >
                {project.name}
              </div>

              <div
                className={
                  styles.propLoc
                }
              >
                {project.location}
              </div>

              <div
                className={
                  styles.propPrice
                }
              >
                {project.price}
              </div>

              <button
                className={`${styles.btn} ${styles.btnOutline}`}
                onClick={() =>
                  openModal(
                    project.name
                  )
                }
              >
                Enquire
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}