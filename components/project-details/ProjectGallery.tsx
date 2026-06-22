"use client";

import styles from "@/app/page.module.css";

const galleryItems = [
  {
    label: "Main Exterior View",
    gradient:
      "linear-gradient(135deg,#1A2F45,#0D4A3A)",
    main: true,
  },
  {
    label: "Living Room",
    gradient:
      "linear-gradient(135deg,#2A1845,#0D1B2A)",
  },
  {
    label: "Master Bedroom",
    gradient:
      "linear-gradient(135deg,#3A2000,#1A1000)",
  },
  {
    label: "Kitchen",
    gradient:
      "linear-gradient(135deg,#003A2A,#001A10)",
  },
  {
    label: "Amenities",
    gradient:
      "linear-gradient(135deg,#2A0020,#1A0810)",
  },
];

export default function ProjectGallery() {
  return (
    <div className={styles.gallery}>
      {galleryItems.map(
        (item, index) => (
          <div
            key={index}
            className={styles.galleryItem}
          >
            <div
              className={styles.galleryBg}
              style={{
                background:
                  item.gradient,
              }}
            >
              <span
                className={
                  styles.galleryLabel
                }
              >
                {item.label}
              </span>
            </div>

            <div
              className={
                styles.galleryOverlay
              }
            >
              View
            </div>

            {item.main && (
              <div
                className={
                  styles.galleryCount
                }
              >
                32 Photos
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}