import { useState, useEffect } from 'react';
import { API_BASE } from '@/lib/apiUrl';

export function useSavedProjectIds() {
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    fetch(`${API_BASE}users/me/saved/projects`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        // Your API returns: { success: true, projects: [{ projectId: 1, project: {...} }, ...] }
        const projects = data.projects || [];
        
        // Extract projectId from each saved record
        const ids = new Set<number>(
          projects.map((item: any) => item.projectId)
        );
        
        setSavedIds(ids);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  return { savedIds, isLoading };
}