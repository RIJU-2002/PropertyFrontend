"use client";

import styles from "@/app/page.module.css";
import { Project } from "@/lib/api/types";


// const galleryItems = [
//   {
//     label: "Main Exterior View",
//     gradient:
//       "linear-gradient(135deg,#1A2F45,#0D4A3A)",
//     main: true,
//   },
//   {
//     label: "Living Room",
//     gradient:
//       "linear-gradient(135deg,#2A1845,#0D1B2A)",
//   },
//   {
//     label: "Master Bedroom",
//     gradient:
//       "linear-gradient(135deg,#3A2000,#1A1000)",
//   },
//   {
//     label: "Kitchen",
//     gradient:
//       "linear-gradient(135deg,#003A2A,#001A10)",
//   },
//   {
//     label: "Amenities",
//     gradient:
//       "linear-gradient(135deg,#2A0020,#1A0810)",
//   },
// ];

interface ProjectGalleryProps {
  project: Project;
}

export default function ProjectGallery({
  project,
}: ProjectGalleryProps) {

  const images = project.images ?? [];

  if (images.length === 0) {
    return (
      <div className={styles.gallery}>
        <div className={styles.galleryItem}>
          <img
            src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg"
            alt={project.name}
            className={styles.galleryBg}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.gallery}>
      {images.map((image, index) => (
        <div
          key={image.id}
          className={styles.galleryItem}
        >
          <img
            src={image.url}
            alt={`${project.name} ${index + 1}`}
            className={styles.galleryBg}
          />

          <div className={styles.galleryOverlay}>
            View
          </div>

          {index === 0 && (
            <div className={styles.galleryCount}>
              {images.length} Photos
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
