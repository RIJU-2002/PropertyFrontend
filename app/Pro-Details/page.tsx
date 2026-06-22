"use client";

import { useState } from "react";

import ProjectHero from "@/components/project-details/ProjectHero";
import ProjectProgress from "@/components/project-details/ProjectProgress";
import ProjectGallery from "@/components/project-details/ProjectGallery";
import ProjectTabs from "@/components/project-details/ProjectTabs";

import ProjectOverview from "@/components/project-details/ProjectOverview";
import ProjectConfigurations from "@/components/project-details/ProjectConfigurations";
import ProjectAmenities from "@/components/project-details/ProjectAmenities";
import ProjectFloorPlan from "@/components/project-details/ProjectFloorPlan";
import ProjectLocation from "@/components/project-details/ProjectLocation";
import ProjectEMICalculator from "@/components/project-details/ProjectEMICalculator";
import ProjectConstructionUpdates from "@/components/project-details/ProjectConstructionUpdates";

import ProjectSidebar from "@/components/project-details/ProjectSidebar";
import SimilarProjects from "@/components/project-details/SimilarProjects";

import Toast from "@/components/project-details/Toast";
import EnquiryModal from "@/components/project-details/EnquiryModal";
import styles from "../page.module.css";
import { Header } from "@/components/header";

import { PROGRESS_STEPS } from "@/data/projectData";
import { Footer } from "@/components/footer";
import { FeaturedProperties } from "@/components/featured-properties";

export default function ProjectPage() {
  const [toast, setToast] =
    useState<string | null>(null);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [modalTitle, setModalTitle] =
    useState("");

  const [activeTab, setActiveTab] =
    useState("overview");

  const showToast = (
    message: string
  ) => {
    setToast(message);
  };

  const openModal = (
    title: string
  ) => {
    setModalTitle(title);
    setModalOpen(true);
  };

  const scrollTo = (
    section: any
  ) => {
    setActiveTab(section);

    document
      .getElementById(section)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <>
      <Header />
      <div className={styles.pageWrapper}>
      <div className={styles.pageContainer}>
      <ProjectHero
        openModal={openModal}
        showToast={showToast}
      />
      <ProjectProgress
        steps={PROGRESS_STEPS}
      />

      <ProjectGallery />

      <ProjectTabs
        activeTab={activeTab as any}
        scrollTo={scrollTo}
      />
      </div>
      <div className={styles.projBody}>
        <main className={styles.projMain}>
          <ProjectOverview />

          <ProjectConfigurations />

          <ProjectAmenities />

          <ProjectFloorPlan
            showToast={showToast}
          />

          <ProjectLocation />

          <ProjectEMICalculator
            openModal={openModal}
          />

          <ProjectConstructionUpdates />
        </main>

        <ProjectSidebar
          showToast={showToast}
        />
      </div>

      {/* <SimilarProjects
        openModal={openModal}
      /> */}
      <FeaturedProperties/>

      {modalOpen && (
        <EnquiryModal
          propName={modalTitle}
          onClose={() =>
            setModalOpen(false)
          }
        />
      )}

      {toast && (
        <Toast
          message={toast}
          onDone={() =>
            setToast(null)
          }
        />
      )}
      </div>
      <Footer/>
    </>
  );
}