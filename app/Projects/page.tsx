"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { SearchBar } from "@/components/search-bar";
import ProjectCard from "@/components/ProjectCard";
import { useProjects } from "@/hooks/useApi";
import { useSavedProjectIds } from "@/hooks/useSavedProjectIds";
import ProjectCardSkeleton from "@/components/ProjectCardSkeleton";

function ProjectsFallback() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-28">
        <SearchBar />
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-10 space-y-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

function AllProjectsContent() {
  const searchParams = useSearchParams();

  const location = searchParams.get("location") ?? "";
  const type = searchParams.get("propertyType") ?? "";
  const price = searchParams.get("price") ?? "";
  const beds = searchParams.get("bhk") ?? "";

  const params: Record<string, any> = {};

  if (location) params.city = location.toLowerCase();
  if (type) params.propertyType = type;
  if (beds) params.bhk = beds;

  switch (price) {
    case "Under ₹50L":
      params.maxPrice = 5000000;
      break;
    case "₹50L - ₹1Cr":
      params.minPrice = 5000000;
      params.maxPrice = 10000000;
      break;
    case "₹1Cr - ₹2Cr":
      params.minPrice = 10000000;
      params.maxPrice = 20000000;
      break;
    case "₹2Cr+":
      params.minPrice = 20000000;
      break;
  }

  const { data, isLoading: projectsLoading } = useProjects(params);
  const { savedIds, isLoading: savedLoading } = useSavedProjectIds();

  const projects = data?.projects ?? [];
  const isLoading = projectsLoading || savedLoading;

  if (isLoading) {
    return <ProjectsFallback />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-28">
        <SearchBar
          initialLocation={location}
          initialType={type}
          initialMinPrice={price}
          initialBedroom={beds}
        />
      </div>

      {(location || type || price || beds) && (
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {location && (
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                📍 {location}
              </span>
            )}
            {type && (
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                🏢 {type}
              </span>
            )}
            {beds && (
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                🛏️ {beds} BHK
              </span>
            )}
            {price && (
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                💰 {price}
              </span>
            )}
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 pb-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold">Properties ({projects.length})</h1>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏠</div>
            <h2 className="text-2xl font-semibold mb-2">No Properties Found</h2>
            <p className="text-muted-foreground">Try changing your search filters.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                initialSaved={savedIds.has(project.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default function AllProjectsPage() {
  return (
    <Suspense fallback={<ProjectsFallback />}>
      <AllProjectsContent />
    </Suspense>
  );
}
