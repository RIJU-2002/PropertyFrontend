import { useState, useCallback } from 'react';
import { API_BASE } from '@/lib/apiUrl';

export function useSavedProject(
  projectId: string | number,
  initialSaved: boolean = false
) {
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSave = useCallback(
    async (e?: React.MouseEvent) => {
      e?.preventDefault();
      e?.stopPropagation();
      if (isLoading || !projectId) return;

      const wasSaved = isSaved;

      // Optimistic update
      setIsSaved(!wasSaved);
      setIsLoading(true);

      try {
        const token = localStorage.getItem('token');
        const res = await fetch(
          `${API_BASE}users/me/saved/projects/${String(projectId)}`,
          {
            method: 'POST', // ← ALWAYS POST, backend handles toggle
            headers: {
              'Content-Type': 'application/json',
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.message || `HTTP ${res.status}`);
        }

        const data = await res.json(); // { saved: true } or { saved: false }
        console.log("API_BASE:", API_BASE);
        console.log("TOKEN:", token);
        console.log(
          "URL:",
          `${API_BASE}users/me/saved/projects`
        );
        // Sync with actual backend response
        setIsSaved(data.saved);
      } catch (err) {
        // Revert on error
        setIsSaved(wasSaved);
        console.error('[toggleSave] Failed:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [projectId, isSaved, isLoading]
  );

  return { isSaved, isLoading, toggleSave };
}