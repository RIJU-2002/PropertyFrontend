"use client";

import { useState } from "react";
import styles from "@/app/page.module.css";
import {
  CONFIGS,
  SPECS,
} from "@/data/projectData";

export default function ProjectConfigurations() {
  const [activeConfig, setActiveConfig] =
    useState(0);

  const selected =
    CONFIGS[activeConfig];

  return (
    <section
      className={styles.card}
      id="configs"
    >
      <div className={styles.cardHead}>
        Available Configurations
      </div>

      <div className={styles.configGrid}>
        {CONFIGS.map((config, index) => (
          <div
            key={config.type}
            onClick={() =>
              setActiveConfig(index)
            }
            className={`${styles.configItem}
            ${
              activeConfig === index
                ? styles.configItemActive
                : ""
            }`}
          >
            <div
              className={styles.configType}
            >
              {config.type}
            </div>

            <div
              className={styles.configArea}
            >
              {config.area}
            </div>

            <div
              className={styles.configPrice}
            >
              {config.price}
            </div>

            <div>
              {config.avail}
            </div>
          </div>
        ))}
      </div>

      <table
        className={styles.specTable}
      >
        <tbody>
          {SPECS.map((spec) => (
            <tr key={spec.label}>
              <td>{spec.label}</td>

              <td>
                {spec.label ===
                "Unit Type"
                  ? selected.type
                  : spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}