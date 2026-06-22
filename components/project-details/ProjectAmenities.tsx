"use client";

import styles from "@/app/page.module.css";
import { AMENITIES } from "@/data/projectData";

export default function ProjectAmenities() {
  return (
    <section
      className={styles.card}
      id="amenities"
    >
      <div className={styles.cardHead}>
        Amenities & Features
      </div>

      <div
        className={styles.amenityGrid}
      >
        {AMENITIES.map((amenity) => (
          <div
            key={amenity.name}
            className={
              styles.amenity
            }
          >
            <div
              className={
                styles.amenityIcon
              }
            >
              {amenity.icon}
            </div>

            <div>
              {amenity.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}