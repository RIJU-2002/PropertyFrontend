"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/lib/apiUrl";

export function useSavedProject(
  projectId: string | number,
  initialSaved: boolean = false
) {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSave = useCallback(
    async (e?: React.MouseEvent) => {
      e?.preventDefault();
      e?.stopPropagation();
      if (isLoading || !projectId) return;

      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/auth");
        return;
      }

      const wasSaved = isSaved;

      setIsSaved(!wasSaved);
      setIsLoading(true);

      try {
        const res = await fetch(
          `${API_BASE}users/me/saved/projects/${String(projectId)}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.message || `HTTP ${res.status}`);
        }

        const data = await res.json();
        setIsSaved(data.saved);
      } catch (err) {
        setIsSaved(wasSaved);
        console.error("[toggleSave] Failed:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [projectId, isSaved, isLoading, router]
  );

  return { isSaved, isLoading, toggleSave };
}
