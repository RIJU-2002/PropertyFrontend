"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Header } from "@/components/header";
import { SearchBar } from "@/components/search-bar";
import ProjectCard from "@/components/ProjectCard";

import {
  mockProjects,
  Project,
} from "@/lib/mock-projects";

export default function AllProjectsPage() {
  const searchParams = useSearchParams();

  const [projects, setProjects] = useState<Project[]>([]);

  const location = searchParams.get("location") ?? "";
  const type = searchParams.get("type") ?? "";
  const price = searchParams.get("price") ?? "";
  const beds = searchParams.get("beds") ?? "";

  useEffect(() => {
    let filtered = [...mockProjects];

    // Location filter
    if (location) {
      const search = location.toLowerCase();

      filtered = filtered.filter(
        (project) =>
          project.city.toLowerCase().includes(search) ||
          project.location.toLowerCase().includes(search) ||
          project.name.toLowerCase().includes(search) ||
          project.builder.toLowerCase().includes(search)
      );
    }

    // Property Type filter
    if (type) {
      filtered = filtered.filter(
        (project) =>
          project.propertyType.toLowerCase() ===
          type.toLowerCase()
      );
    }

    // Bedrooms filter
    if (beds) {
      filtered = filtered.filter((project) => {
        if (beds === "5+") {
          return project.bedrooms >= 5;
        }

        return project.bedrooms.toString() === beds;
      });
    }

    // Price filter
    if (price) {
      switch (price) {
        case "Under ₹50L":
          filtered = filtered.filter(
            (project) => project.price_min < 5000000
          );
          break;

        case "₹50L - ₹1Cr":
          filtered = filtered.filter(
            (project) =>
              project.price_min >= 5000000 &&
              project.price_min <= 10000000
          );
          break;

        case "₹1Cr - ₹2Cr":
          filtered = filtered.filter(
            (project) =>
              project.price_min > 10000000 &&
              project.price_min <= 20000000
          );
          break;

        case "₹2Cr+":
          filtered = filtered.filter(
            (project) => project.price_min > 20000000
          );
          break;
      }
    }

    setProjects(filtered);
  }, [location, type, beds, price]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Search Bar */}
      <div className="pt-20">
        <SearchBar
          initialLocation={location}
          initialType={type}
          initialPrice={price}
          initialBedroom={beds}
        />
      </div>

      {/* Active Filters */}
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

      {/* Results Section */}
      <main className="max-w-7xl mx-auto px-4 pb-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            Properties ({projects.length})
          </h1>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏠</div>

            <h2 className="text-2xl font-semibold mb-2">
              No Properties Found
            </h2>

            <p className="text-muted-foreground">
              Try changing your search filters.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}