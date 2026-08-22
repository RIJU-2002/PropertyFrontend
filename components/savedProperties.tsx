"use client";

import { Header } from "@/components/header";
import ProjectCard from "@/components/ProjectCard";
import {PropertyCard} from "@/components/property-card";
import ProjectCardSkeleton from "@/components/ProjectCardSkeleton";
import { PropertyCardSkeleton } from "@/components/project-details/property-card-skeleton";
import { useSavedProjects } from "@/hooks/saveProjects";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function SavedProjectsPage() {
  const { projects, isLoading, error } = useSavedProjects();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 pt-24 pb-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold flex items-center gap-3">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            Saved Projects
          </h1>
          {!isLoading && !error && (
            <p className="text-muted-foreground mt-1">
              {projects.length} {projects.length === 1 ? "project" : "projects"} saved
            </p>
          )}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="space-y-6">
            <div className="hidden md:block space-y-5">
              {Array.from({ length: 3 }).map((_, i) => (
                <ProjectCardSkeleton key={i} />
              ))}
            </div>
            <div className="md:hidden grid grid-cols-1 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <PropertyCardSkeleton key={i} />
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
            <Link
              href="/Projects"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#1a2340] text-white font-semibold text-sm hover:bg-[#0f1726] transition-colors"
            >
              Browse Projects
            </Link>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && projects.length === 0 && (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No Saved Projects</h2>
            <p className="text-muted-foreground mb-6">
              You haven't saved any projects yet.
            </p>
            <Link
              href="/Projects"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#1a2340] text-white font-semibold text-sm hover:bg-[#0f1726] transition-colors"
            >
              Browse Projects
            </Link>
          </div>
        )}

        {/* Projects List */}
        {!isLoading && !error && projects.length > 0 && (
          <div className="space-y-6">
            {/* Desktop: horizontal cards */}
            <div className="hidden md:flex flex-col gap-5">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  initialSaved={true}
                />
              ))}
            </div>

            {/* Mobile: grid cards */}
            <div className="md:hidden grid grid-cols-1 gap-6">
              {projects.map((project) => (
                <PropertyCard
                  key={project.id}
                  projectId={project.id}
                  image={project.images?.[0]?.url ?? "/placeholder.jpg"}
                  title={project.name}
                  location={`${project.locality?.name}, ${project.city?.name}`}
                  type="Apartment"
                  featured={project.isFeatured}
                  configs={project.configs}
                  slug={project.slug}
                  initialSaved={true}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
