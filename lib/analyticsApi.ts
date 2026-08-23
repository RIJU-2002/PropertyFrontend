import type { DashboardAnalytics } from "@/types/analytics";
import { API_ORIGIN } from "@/lib/apiUrl";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_ORIGIN}/${path.replace(/^\//, "")}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`API ${path} -> ${res.status}`);
  }

  const json = await res.json();

  return json.data as T;
}

export const fetchDashboardAnalytics = () =>
  get<DashboardAnalytics>("analytics/dashboard");