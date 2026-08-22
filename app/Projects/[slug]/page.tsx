"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useProjectbySlug } from "@/hooks/useApi";
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
import ProjectDetailsSkeleton from "@/components/ProjectDetailsSkeleton";


import ProjectSidebar from "@/components/project-details/ProjectSidebar";
import SimilarProjects from "@/components/project-details/SimilarProjects";

import Toast from "@/components/project-details/Toast";
import EnquiryModal from "@/components/project-details/EnquiryModal";
import styles from "../../page.module.css";
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

  const { slug } = useParams();

  const {
    data,
    isLoading,
  } = useProjectbySlug(slug as string);

  const project = data?.project;

  if (isLoading) {
  return (
    <>
      <Header />
      <ProjectDetailsSkeleton />
      <Footer />
    </>
  );
}

  if (!project) {
    return <div>Project not found.</div>;
  }

  return (
    <>
      <Header />
      <div className={styles.pageWrapper}>
      <div className={styles.pageContainer}>
      <ProjectHero
        openModal={openModal}
        showToast={showToast}
        project={project}
      />
      <ProjectProgress
        steps={PROGRESS_STEPS}
      />

      <ProjectGallery project={project} />

      <ProjectTabs
        activeTab={activeTab as any}
        scrollTo={scrollTo}
      />
      </div>
      <div className={styles.projBody}>
        <main className={styles.projMain}>
          <ProjectOverview project={project} />

          <ProjectConfigurations project={project} />

          <ProjectAmenities project={project} />

          <ProjectFloorPlan
            project={project}
            showToast={showToast}
          />

          <ProjectLocation project={project}/>

          <ProjectEMICalculator
            openModal={openModal}
          />

          <ProjectConstructionUpdates />
        </main>

        <ProjectSidebar
          showToast={showToast}
          projectId={project.id}
          projectName={project.name}
        />
      </div>

      {/* <SimilarProjects
        openModal={openModal}
      /> */}
      <FeaturedProperties/>

      {modalOpen && (
        <EnquiryModal
          propName={modalTitle}
          projectId={project?.id}
          source="project_details"
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