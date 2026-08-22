"use client";

import { useState } from "react";
import styles from "@/app/page.module.css";
import { Project } from "@/lib/api/types";
// import {
//   CONFIGS,
//   SPECS,
// } from "@/data/projectData";

interface Props {
  project: Project;
}

export default function ProjectConfigurations({
  project,
}: Props) {
  const [activeConfig, setActiveConfig] = useState(0);

const configs = project.configs ?? [];

const selected = configs[activeConfig];

  return (
    <section
      className={styles.card}
      id="configs"
    >
      <div className={styles.cardHead}>
        Available Configurations
      </div>

      <div className={styles.configGrid}>
        {configs.map((config, index) => (
                <div
                  key={index}
                  onClick={() => setActiveConfig(index)}
                  className={`${styles.configItem}
                    ${
                      activeConfig === index
                        ? styles.configItemActive
                        : ""
                    }`}
                >
                  <div className={styles.configType}>
                    {config.unitType}
                  </div>

                  <div className={styles.configArea}>
                    {config.buildAreaRange}
                  </div>

                  <div className={styles.configPrice}>
                    ₹
                    {Number(config.price).toLocaleString("en-IN")}
                  </div>

                  <div>
                    {config.units} Units
                  </div>
                </div>
              ))}
              </div>

              <table
                className={styles.specTable}
              >
                <tbody>
                  {selected && (
          <table className={styles.specTable}>
            <tbody>
              {/* <tr>
                <td>Unit Type</td>
                <td>{selected.unitType}</td>
              </tr> */}

              <tr>
                <td>Build Area</td>
                <td>{selected.buildAreaRange}</td>
              </tr>

              {/* <tr>
                <td>Carpet Area</td>
                <td>{selected.carpetArea}</td>
              </tr> */}
              <tr>
                <td>Bastu Info</td>
                <td>{selected.bastu_Info}</td>
              </tr>

              <tr>
                <td>Bedrooms</td>
                <td>{selected.bedRoom}</td>
              </tr>

              <tr>
                <td>Living Area</td>
                <td>{selected.livingArea}</td>
              </tr>

              <tr>
                <td>Kitchen</td>
                <td>{selected.kitchen}</td>
              </tr>

              <tr>
                <td>Balconies</td>
                <td>{selected.balconies}</td>
              </tr>

              {/* <tr>
                <td>Floor Height</td>
                <td>{selected.floorHeight}</td>
              </tr> */}

              <tr>
                <td>Flooring</td>
                <td>{selected.flooring}</td>
              </tr>

              <tr>
                <td>Facing</td>
                <td>{selected.facing}</td>
              </tr>

              <tr>
                <td>Price / Area</td>
                <td>{selected.pricePerArea}</td>
              </tr>
            </tbody>
          </table>
        )}
        </tbody>
      </table>
    </section>
  );
}
