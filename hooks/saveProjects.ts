import { useState, useEffect } from "react";
import { Project } from "@/lib/api/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/";

export function useSavedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoading(false);
      setError("Not authenticated");
      return;
    }

    fetch(`${API_BASE}users/me/saved/projects`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const items = data.projects || [];

        // Transform nested saved-project data into full Project objects
        const transformed: Project[] = items.map((item: any) => {
          const p = item.project || {};

          return {
            ...p,
            id: item.projectId ?? p.id,

            // Defaults for fields ProjectCard doesn't render but TypeScript requires
            address: p.address ?? "",
            description: p.description ?? "",
            projectType: p.projectType ?? "APARTMENT",
            launchDate: p.launchDate ?? null,
            builderId: p.builderId ?? 0,
            cityId: p.cityId ?? 0,
            localityId: p.localityId ?? 0,
            latitude: p.latitude ?? null,
            longitude: p.longitude ?? null,
            minPrice: p.minPrice ?? null,
            maxPrice: p.maxPrice ?? null,
            totalUnits: p.totalUnits ?? null,
            totalFloors: p.totalFloors ?? null,
            landArea: p.landArea ?? null,
            metaTitle: p.metaTitle ?? null,
            metaDescription: p.metaDescription ?? null,
            isVerified: p.isVerified ?? false,
            isFeatured: p.isFeatured ?? false,
            isTrending: p.isTrending ?? false,
            isNewLaunch: p.isNewLaunch ?? false,
            isActive: p.isActive ?? true,
            createdAt: p.createdAt ?? new Date().toISOString(),
            updatedAt: p.updatedAt ?? new Date().toISOString(),

            // Nested relations (ensure they exist)
            builder: p.builder ?? { name: "" },
            city: p.city ?? { name: "", slug: "" },
            locality: p.locality ?? { name: "" },
            images: p.images ?? [],
            configs: p.configs ?? [],
            amenities: p.amenities ?? [],
            floorPlans: p.floorPlans ?? [],
            leads: p.leads ?? [],
            nearbyPlaces: p.nearbyPlaces ?? [],
            reviews: p.reviews ?? [],
            properties: p.properties ?? [],
            savedBy: p.savedBy ?? [],
          } as Project;
        });

        setProjects(transformed);
      })
      .catch((err) => {
        setError(err.message);
        console.error("[useSavedProjects]", err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { projects, isLoading, error };
}