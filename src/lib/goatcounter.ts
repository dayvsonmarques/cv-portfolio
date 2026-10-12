import { unstable_cache } from "next/cache";

const GOATCOUNTER_SITE = process.env.GOATCOUNTER_SITE;
const GOATCOUNTER_API_TOKEN = process.env.GOATCOUNTER_API_TOKEN;

function baseUrl() {
  if (!GOATCOUNTER_SITE) throw new Error("GOATCOUNTER_SITE não configurado");
  return `https://${GOATCOUNTER_SITE}.goatcounter.com/api/v0`;
}

async function gcFetch<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  if (!GOATCOUNTER_API_TOKEN) throw new Error("GOATCOUNTER_API_TOKEN não configurado");

  const url = new URL(`${baseUrl()}${path}`);
  for (const [key, value] of Object.entries(params)) {
    if (value) url.searchParams.set(key, value);
  }

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${GOATCOUNTER_API_TOKEN}` },
  });

  if (!res.ok) {
    throw new Error(`GoatCounter API respondeu ${res.status} em ${path}`);
  }

  return res.json() as Promise<T>;
}

type DailyStat = { day: string; daily: number };
type TotalResponse = { total: number; total_events: number; stats: DailyStat[] };
type HitItem = { count: number; path: string; title: string };
type HitsResponse = { hits: HitItem[] };
type NamedStat = { id?: string; name: string; count: number };
type StatsResponse = { stats: NamedStat[]; more: boolean };

export type AnalyticsOverview = {
  totalPageviews: number;
  dailyPageviews: { day: string; count: number }[];
  topPages: { path: string; title: string; count: number }[];
  browsers: { name: string; count: number }[];
  systems: { name: string; count: number }[];
  sizes: { name: string; count: number }[];
  countries: { code: string; name: string; count: number }[];
  referrers: { name: string; count: number }[];
};

function startDateFor(days: number): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString().slice(0, 10);
}

const SIZE_LABELS: Record<string, string> = {
  phone: "Celular",
  tablet: "Tablet",
  desktop: "Desktop",
  desktophd: "Desktop HD",
  unknown: "Desconhecido",
};

const COUNTRY_LABELS: Record<string, string> = {
  BR: "Brasil",
  US: "Estados Unidos",
  DE: "Alemanha",
  SG: "Singapura",
  CA: "Canadá",
  ES: "Espanha",
  NL: "Holanda",
  PL: "Polônia",
  AO: "Angola",
  AT: "Áustria",
  FR: "França",
  PT: "Portugal",
  GB: "Reino Unido",
  IE: "Irlanda",
  IT: "Itália",
  MX: "México",
  AR: "Argentina",
  CL: "Chile",
  CO: "Colômbia",
  CN: "China",
  IN: "Índia",
  JP: "Japão",
  RU: "Rússia",
  AU: "Austrália",
  CH: "Suíça",
  SE: "Suécia",
  BE: "Bélgica",
  FI: "Finlândia",
  IL: "Israel",
  UA: "Ucrânia",
  TR: "Turquia",
  KR: "Coreia do Sul",
};

async function fetchOverview(days: number): Promise<AnalyticsOverview> {
  const start = startDateFor(days);

  // GoatCounter's stats API is rate-limited to 4 req/s — firing these in
  // parallel trips 429s, so they're sequenced with a small gap instead.
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  const total = await gcFetch<TotalResponse>("/stats/total", { start });
  await sleep(260);
  const hits = await gcFetch<HitsResponse>("/stats/hits", { start, limit: "10" });
  await sleep(260);
  const browsers = await gcFetch<StatsResponse>("/stats/browsers", { start });
  await sleep(260);
  const systems = await gcFetch<StatsResponse>("/stats/systems", { start });
  await sleep(260);
  const sizes = await gcFetch<StatsResponse>("/stats/sizes", { start });
  await sleep(260);
  const locations = await gcFetch<StatsResponse>("/stats/locations", { start });
  await sleep(260);
  const toprefs = await gcFetch<StatsResponse>("/stats/toprefs", { start });

  return {
    totalPageviews: total.total,
    dailyPageviews: total.stats.map((s) => ({ day: s.day, count: s.daily })),
    topPages: hits.hits.map((h) => ({ path: h.path, title: h.title, count: h.count })),
    browsers: browsers.stats.map((s) => ({ name: s.name, count: s.count })),
    systems: systems.stats.map((s) => ({ name: s.name, count: s.count })),
    sizes: sizes.stats.map((s) => ({
      name: SIZE_LABELS[s.id ?? ""] ?? (s.name || s.id || "Desconhecido"),
      count: s.count,
    })),
    countries: locations.stats.map((s) => ({
      code: s.id ?? "",
      name: COUNTRY_LABELS[s.id ?? ""] ?? s.name,
      count: s.count,
    })),
    referrers: toprefs.stats
      .filter((s) => s.name)
      .map((s) => ({ name: s.name, count: s.count })),
  };
}

export const getAnalyticsOverview = unstable_cache(
  fetchOverview,
  ["goatcounter-overview"],
  { revalidate: 300 }
);
