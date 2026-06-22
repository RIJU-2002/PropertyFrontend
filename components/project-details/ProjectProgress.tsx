"use client";

import styles from "@/app/page.module.css";
import { ProgressStep } from "@/types/project";

interface Props {
  steps: ProgressStep[];
}

export default function ProjectProgress({
  steps,
}: Props) {
  const getDotClass = (
    status: ProgressStep["status"]
  ) => {
    return `${styles.stepDot}
      ${
        status === "done"
          ? styles.stepDotDone
          : status === "active"
          ? styles.stepDotActive
          : styles.stepDotPending
      }`;
  };

  return (
    <div className={styles.progressWrap}>
      {steps.map((step, index) => (
        <div
          key={index}
          className={styles.progressStep}
        >
          <div
            className={getDotClass(
              step.status
            )}
          >
            {step.status === "done"
              ? "✓"
              : step.status === "active"
              ? "≈"
              : "○"}
          </div>

          <div>
            <div className={styles.stepLabel}>
              {step.label}
            </div>

            <div className={styles.stepVal}>
              {step.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}