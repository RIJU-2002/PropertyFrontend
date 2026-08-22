"use client";

import styles from "@/app/page.module.css";
import { Project } from "@/lib/api/types";

interface Props {
  project: Project;
}

export default function ProjectAmenities({
  project,
}: Props) {
  return (
    <section
      className={styles.card}
      id="amenities"
    >
      <div className={styles.cardHead}>
        Amenities & Features
      </div>

      <div className={styles.amenityGrid}>
        {project.amenities.map((item) => (
          <div
            key={item.amenity.id}
            className={styles.amenity}
          >
            <div className={styles.amenityIcon}>
              {/* Replace this later with an icon component */}
              🏢
            </div>

            <div>{item.amenity.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
