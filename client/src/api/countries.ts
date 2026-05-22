import type { Country, SearchRes } from "./types";

export async function fetchCountries(
  query: string,
  signal?: AbortSignal,
): Promise<Country[]> {
  const url = `/api/search?q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { signal });

  if (!res.ok) {
    throw new Error(`Search failed: ${res.status} ${res.statusText}`);
  }

  const data: SearchRes = await res.json();
  return data.results;
}
