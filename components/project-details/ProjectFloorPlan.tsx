"use client";

import { useState } from "react";

import styles from "@/app/page.module.css";

import FloorPlanSvg from "./FloorPlanSvg";

import { FLOOR_PLANS } from "@/data/projectData";

interface Props {
  showToast: (
    message: string
  ) => void;
}

export default function ProjectFloorPlan({
  showToast,
}: Props) {
  const [activeFloor, setActiveFloor] =
    useState(0);

  const floor =
    FLOOR_PLANS[activeFloor];

  const carpet = Math.round(
    floor.sqft * 0.67
  );

  return (
    <section
      className={styles.card}
      id="floorplan"
    >
      <div className={styles.cardHead}>
        Floor Plan
      </div>

      <div className={styles.floorTabs}>
        {FLOOR_PLANS.map(
          (item, index) => (
            <button
              key={item.label}
              onClick={() =>
                setActiveFloor(index)
              }
              className={`${styles.floorTab}
              ${
                activeFloor === index
                  ? styles.floorTabActive
                  : ""
              }`}
            >
              {item.label}
            </button>
          )
        )}
      </div>

      <div
        className={
          styles.floorPlanViewer
        }
      >
        <FloorPlanSvg />

        <div
          className={
            styles.floorPlanLabel
          }
        >
          {floor.label}
        </div>

        <div
          className={
            styles.floorPlanSize
          }
        >
          Super Built-up:
          {floor.sqft} sq.ft
          <br />
          Carpet:
          {carpet} sq.ft
        </div>
      </div>

      <div
        className={
          styles.floorPlanActions
        }
      >
        <button
          className={`${styles.btn} ${styles.btnNavy}`}
          onClick={() =>
            showToast(
              "🏠 Site visit scheduled!"
            )
          }
        >
          Book Site Visit
        </button>

        <button
          className={`${styles.btn} ${styles.btnOutline}`}
          onClick={() =>
            showToast(
              "📤 Floor plan shared!"
            )
          }
        >
          Share
        </button>
      </div>
    </section>
  );
}