"use client";

import styles from "@/app/page.module.css";
import { NEARBY } from "@/data/projectData";

export default function ProjectLocation() {
  return (
    <section
      className={styles.card}
      id="location"
    >
      <div className={styles.cardHead}>
        Location &
        Connectivity
      </div>

      <div
        className={
          styles.locationMap
        }
      >
        <div className={styles.mapPin}>
          📍
        </div>

        <div className={styles.mapText}>
          New Town,
          Action Area II
          <br />
          Kolkata - 700156
        </div>
      </div>

      <div
        className={styles.nearbyGrid}
      >
        {NEARBY.map((item) => (
          <div
            key={item.name}
            className={
              styles.nearbyItem
            }
          >
            <span
              className={
                styles.nearbyIcon
              }
            >
              {item.icon}
            </span>

            <div>
              <div
                className={
                  styles.nearbyLabel
                }
              >
                {item.name}
              </div>

              <div
                className={
                  styles.nearbyDist
                }
              >
                {item.dist}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}