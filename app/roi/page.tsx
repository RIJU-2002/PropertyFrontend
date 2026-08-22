"use client";

import { Header } from "@/components/header";
import ROIProjectCard from "@/components/ROIProjectCard";
import ProjectCardSkeleton from "@/components/ProjectCardSkeleton";
import { useSavedProjectIds } from "@/hooks/useSavedProjectIds";
import { useTopInvestmentProjects } from "@/hooks/roi";

export default function ROIPage() {
  const {
    data: projects = [],
    isLoading: projectsLoading,
    error,
  } = useTopInvestmentProjects();

  const {
    savedIds,
    isLoading: savedLoading,
  } = useSavedProjectIds();

  const isLoading = projectsLoading || savedLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <main className="max-w-7xl mx-auto px-4 pt-[104px] md:pt-[136px] pb-10">
          <div className="mb-8">
            <div className="h-9 w-72 bg-muted animate-pulse rounded-md" />
            <div className="h-5 w-96 bg-muted animate-pulse rounded-md mt-3" />
          </div>

          <div className="flex flex-col gap-5">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <main className="max-w-7xl mx-auto px-4 pt-[104px] md:pt-[136px] pb-10">
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⚠️</div>

            <h2 className="text-2xl font-semibold mb-2">
              Unable to Load Investment Projects
            </h2>

            <p className="text-muted-foreground">
              Something went wrong while loading the projects.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 pt-[104px] md:pt-[136px] pb-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">
            Top Investment Projects
          </h1>

          <p className="text-muted-foreground mt-2">
            Discover properties with strong rental yields,
            appreciation potential and investment scores.
          </p>
        </div>

        {/* Projects */}
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏠</div>

            <h2 className="text-2xl font-semibold mb-2">
              No Investment Projects Found
            </h2>

            <p className="text-muted-foreground">
              There are currently no projects available.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-6">
              {projects.length} Investment{" "}
              {projects.length === 1 ? "Project" : "Projects"}
            </h2>

            <div className="flex flex-col gap-5">
              {projects.map((project) => (
                <ROIProjectCard
                  key={project.id}
                  project={project}
                  initialSaved={savedIds.has(project.id)}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}