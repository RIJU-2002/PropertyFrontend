"use client";

import styles from "@/app/page.module.css";

export type SectionId =
  | "overview"
  | "configs"
  | "amenities"
  | "floorplan"
  | "location"
  | "emi"
  | "updates";

interface Props {
  activeTab: SectionId;

  scrollTo: (
    section: SectionId
  ) => void;
}

const tabs: {
  id: SectionId;
  label: string;
}[] = [
  {
    id: "overview",
    label: "Overview",
  },
  {
    id: "configs",
    label: "Configurations",
  },
  {
    id: "amenities",
    label: "Amenities",
  },
  {
    id: "floorplan",
    label: "Floor Plan",
  },
  {
    id: "location",
    label: "Location",
  },
  {
    id: "emi",
    label: "EMI Calculator",
  },
  {
    id: "updates",
    label: "Construction Updates",
  },
];

export default function ProjectTabs({
  activeTab,
  scrollTo,
}: Props) {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() =>
            scrollTo(tab.id)
          }
          className={`${styles.tab}
            ${
              activeTab === tab.id
                ? styles.tabActive
                : ""
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
