import { API_BASE } from "@/lib/apiUrl";

async function fetchCount(params: Record<string, string>): Promise<number> {
  const searchParams = new URLSearchParams({ ...params, limit: "1", page: "1" });

  const res = await fetch(`${API_BASE}projects?${searchParams.toString()}`);

  if (!res.ok) {
    console.error("Count fetch failed", res.status, await res.text());
    return 0;
  }

  const json = await res.json();
  return json.pagination?.total ?? 0;
}

/* ── Status tab ─────────────────────────────────────────── */
export async function getStatusCounts(): Promise<Record<string, number>> {
  // ✅ Explicit type annotation fixes the TS error
  const items: { key: string; params: Record<string, string> }[] = [
    { key: "NEW_LAUNCH", params: { isNewLaunch: "true" } },
    { key: "UNDER_CONSTRUCTION", params: { possessionStatus: "UNDER_CONSTRUCTION" } },
    { key: "READY_TO_MOVE", params: { possessionStatus: "READY_TO_MOVE" } },
  ];

  const entries = await Promise.all(
    items.map(async ({ key, params }) => {
      const count = await fetchCount(params);
      return [key, count] as const;
    })
  );

  return Object.fromEntries(entries);
}

/* ── Type tab ───────────────────────────────────────────── */
export async function getTypeCounts(): Promise<Record<string, number>> {
  const types = ["APARTMENT", "VILLA", "PLOT", "BUILDER_FLOOR"];

  const entries = await Promise.all(
    types.map(async (type) => {
      const count = await fetchCount({ propertyType: type });
      return [type, count] as const;
    })
  );

  return Object.fromEntries(entries);
}

/* ── BHK tab ────────────────────────────────────────────── */
export async function getBhkCounts(): Promise<Record<string, number>> {
  const bhks: [string, string][] = [
    ["1", "1"],
    ["2", "2"],
    ["3", "3"],
    ["4", "4"],
    ["5+", "5"],
  ];

  const entries = await Promise.all(
    bhks.map(async ([key, apiValue]) => {
      const count = await fetchCount({ bhk: apiValue });
      return [key, count] as const;
    })
  );

  return Object.fromEntries(entries);
}

/* ── Possession tab ─────────────────────────────────────── */
export async function getPossessionCounts(): Promise<Record<string, number>> {
  return {
    IMMEDIATE: 0,
    WITHIN_6M: 0,
    WITHIN_1Y: 0,
    BEYOND_1Y: 0,
  };
}