import type { DashboardAnalytics } from "@/types/analytics";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:5000";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
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