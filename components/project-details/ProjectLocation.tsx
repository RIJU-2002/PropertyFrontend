"use client";

import dynamic from "next/dynamic";
import styles from "./ProjectLocation.module.css";

const PropertyMap = dynamic(
  () => import("@/components/project-details/PropertyMap"),
  { ssr: false, loading: () => <div className={styles.mapSkeleton} /> }
);

interface Props {
  project: {
    name: string;
    latitude?: number | null;
    longitude?: number | null;
    address?: string | null;
    locality?: { name: string };
    city?: { name: string };
  };
}

export default function ProjectLocation({ project }: Props) {
  const hasCoords =
    project.latitude != null &&
    project.longitude != null &&
    !Number.isNaN(project.latitude);

  return (
    <section className={styles.section} id="location">
      <h2 className={styles.heading}>Location</h2>

      {hasCoords ? (
        <PropertyMap
          propertyName={project.name}
          center={{
            lat: project.latitude!,
            lng: project.longitude!,
          }}
        />
      ) : (
        <div className={styles.fallback}>
          <p>📍 Map coming soon for this location.</p>
          <span>
            {project.address ||
              `${project.locality?.name || ""}, ${project.city?.name || ""}`}
          </span>
        </div>
      )}
    </section>
  );
}
