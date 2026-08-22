"use client";
import FloorPlanSvg from "./FloorPlanSvg";

import { useState } from "react";
import styles from "@/app/page.module.css";
import { Project } from "@/lib/api/types";

interface Props {
  project: Project;
  showToast: (message: string) => void;
}

export default function ProjectFloorPlan({
  project,
  showToast,
}: Props) {
  const [activeFloor, setActiveFloor] = useState(0);

  const floorPlans = project.floorPlans ?? [];
  const floor = floorPlans[activeFloor];

  return (
    <section
      className={styles.card}
      id="floorplan"
    >
      <div className={styles.cardHead}>
        Floor Plan
      </div>

      {/* Tabs */}
      <div className={styles.floorTabs}>
        {floorPlans.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setActiveFloor(index)}
            className={`${styles.floorTab}
              ${
                activeFloor === index
                  ? styles.floorTabActive
                  : ""
              }`}
          >
            {item.bhkType} BHK
          </button>
        ))}
      </div>

      {floor ? (
        <>
          <div className={styles.floorPlanViewer}>
            {floor.imageUrl ? (
              <img
                src={floor.imageUrl}
                alt={floor.name}
                className={styles.floorPlanImage}
              />
            ) : (
              <FloorPlanSvg />
            )}

            <div className={styles.floorPlanLabel}>
              {floor.name}
            </div>

            <div className={styles.floorPlanSize}>
              Carpet Area:
              {" "}
              {floor.carpetArea ?? "-"} sq.ft
              <br />

              Built-up Area:
              {" "}
              {floor.builtUpArea ?? "-"} sq.ft
              <br />

              Super Area:
              {" "}
              {floor.superArea ?? "-"} sq.ft
              <br />

              {floor.price && (
                <>
                  Price:
                  {" "}
                  ₹
                  {Number(floor.price).toLocaleString("en-IN")}
                </>
              )}
            </div>
          </div>

          <div className={styles.floorPlanActions}>
            <button
              className={`${styles.btn} ${styles.btnNavy}`}
              onClick={() =>
                showToast("🏠 Site visit scheduled!")
              }
            >
              Book Site Visit
            </button>

            <button
              className={`${styles.btn} ${styles.btnOutline}`}
              onClick={() =>
                showToast("📤 Floor plan shared!")
              }
            >
              Share
            </button>
          </div>
        </>
      ) : (
        <div className={styles.emptyState}>
          No floor plans available.
        </div>
      )}
    </section>
  );
}
