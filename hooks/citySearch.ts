import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/apiUrl";

export interface CitySuggestion {
  id?: string | number;
  name: string;
  state?: string;
}

// Normalizes whatever shape the API returns into CitySuggestion[].
// Adjust the field names here (not everywhere else) if your API's
// response shape differs from the assumption below.
function normalizeCities(raw: unknown): CitySuggestion[] {
  const list: any[] = Array.isArray(raw)
    ? raw
    : (raw as any)?.cities ?? (raw as any)?.data ?? [];

  return list
    .map((c) =>
      typeof c === "string"
        ? { name: c }
        : { id: c.id ?? c._id, name: c.name ?? c.city ?? "", state: c.state }
    )
    .filter((c) => c.name);
}

const MIN_CHARS = 2;
const DEBOUNCE_MS = 300;

export function useCitySearch(query: string) {
  const [results, setResults] = useState<CitySuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const trimmed = query.trim();

    if (trimmed.length < MIN_CHARS) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `${API_BASE}cities/search?q=${encodeURIComponent(trimmed)}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = await res.json();
        setResults(normalizeCities(data));
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError("Couldn't load suggestions");
          setResults([]);
        }
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  return { results, loading, error };
}