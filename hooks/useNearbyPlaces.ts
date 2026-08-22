"use client";

import { useEffect, useRef, useState } from "react";

export interface NearbyPlace {
  id: string;
  name: string;
  lat: number;
  lng: number;
  category: string;
  color: string;
  rating?: number | null;  // ← fixed: allow null from API
  vicinity?: string | null;
}

export const PLACE_CATEGORIES = [
  { key: "school", label: "Schools", icon: "🎓", color: "#3b82f6" },
  { key: "hospital", label: "Hospitals", icon: "🏥", color: "#ef4444" },
  { key: "shopping_mall", label: "Malls", icon: "🛍️", color: "#a855f7" },
  { key: "restaurant", label: "Food", icon: "🍽️", color: "#f59e0b" },
  { key: "transit_station", label: "Transit", icon: "🚇", color: "#10b981" },
  { key: "bank", label: "Banks", icon: "🏦", color: "#6366f1" },
];

export function useNearbyPlaces(
  center: { lat: number; lng: number },
  map: google.maps.Map | null,
  radius = 2500
) {
  const [places, setPlaces] = useState<NearbyPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const fetched = useRef(false);

  useEffect(() => {
    if (!map || fetched.current) return;
    fetched.current = true;
    setLoading(true);

    const fetchAll = async () => {
      try {
        const all: NearbyPlace[] = [];

        for (const cat of PLACE_CATEGORIES) {
          const result = await (google.maps.places.Place as any).searchNearby({
            fields: [
              "id",
              "displayName",
              "location",
              "rating",
              "formattedAddress",
            ],
            locationRestriction: {
              center: new google.maps.LatLng(center.lat, center.lng),
              radius,
            },
            includedPrimaryTypes: [cat.key],
            maxResultCount: 5,
          });

          const results = result?.places as Array<{
            id: string;
            displayName?: { text?: string };
            location: { lat: () => number; lng: () => number };
            rating?: number | null;
            formattedAddress?: string | null;
          }> | undefined;

          if (results) {
            all.push(
              ...results.map((p) => ({
                id: p.id,
                name: p.displayName?.text ?? "Unknown",
                lat: p.location.lat(),
                lng: p.location.lng(),
                category: cat.label,
                color: cat.color,
                rating: p.rating ?? null,
                vicinity: p.formattedAddress ?? null,
              }))
            );
          }
        }

        setPlaces(all);
      } catch (e) {
        console.error("Places search failed:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [map, center.lat, center.lng, radius]);

  return { places, loading, categories: PLACE_CATEGORIES };
}