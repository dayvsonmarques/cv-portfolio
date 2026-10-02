import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { ExperienceType } from "@/types/experience";
import type { Prisma } from "@prisma/client";

type SkillCategory = { title: string; skills: { name: string }[] };

type HeroData = {
  name?: string;
  greeting?: string;
};

type AboutData = {
  headline?: string;
  imageSrc?: string;
  imageAlt?: string;
};

type SkillsData = {
  categories?: SkillCategory[];
};

type ExperienceData = {
  items?: ExperienceType[];
};

function isJsonObject(value: Prisma.JsonValue | null | undefined): value is Prisma.JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getOptionalString(record: Prisma.JsonObject, key: string): string | undefined {
  const value = record[key];
  return typeof value === "string" ? value : undefined;
}

function parseHeroData(data: Prisma.JsonValue | null | undefined): HeroData | undefined {
  if (!isJsonObject(data)) return undefined;
  return {
    name: getOptionalString(data, "name"),
    greeting: getOptionalString(data, "greeting"),
  };
}

function parseAboutData(data: Prisma.JsonValue | null | undefined): AboutData | undefined {
  if (!isJsonObject(data)) return undefined;
  return {
    headline: getOptionalString(data, "headline"),
    imageSrc: getOptionalString(data, "imageSrc"),
    imageAlt: getOptionalString(data, "imageAlt"),
  };
}

function parseSkillsData(data: Prisma.JsonValue | null | undefined): SkillsData | undefined {
  if (!isJsonObject(data)) return undefined;

  const categoriesValue = data["categories"];
  if (!Array.isArray(categoriesValue)) return undefined;

  const categories: SkillCategory[] = categoriesValue
    .filter(isJsonObject)
    .map((cat) => {
      const title = getOptionalString(cat, "title") ?? "";
      const skillsValue = cat["skills"];
      const skills = Array.isArray(skillsValue)
        ? skillsValue
            .filter(isJsonObject)
            .map((s) => ({ name: getOptionalString(s, "name") ?? "" }))
            .filter((s) => s.name.length > 0)
        : [];

      return { title, skills };
    })
    .filter((c) => c.title.length > 0 && c.skills.length > 0);

  return categories.length > 0 ? { categories } : undefined;
}

function parseExperienceData(data: Prisma.JsonValue | null | undefined): ExperienceData | undefined {
  if (!isJsonObject(data)) return undefined;
  const itemsValue = data["items"];
  if (!Array.isArray(itemsValue)) return undefined;
  return { items: itemsValue as unknown as ExperienceType[] };
}

export type HomeContent = {
  hero?: {
    name?: string;
    greeting?: string;
    description?: string;
  };
  about?: {
    sectionTitle?: string;
    headline?: string;
    subtitle?: string;
    description?: string;
    imageSrc?: string;
    imageAlt?: string;
  };
  skills?: {
    title?: string;
    categories?: SkillCategory[];
  };
  experience?: {
    title?: string;
    items?: ExperienceType[];
  };
  blogSection?: {
    title?: string;
    viewAll?: string;
  };
};

const HOME_SECTIONS = ["hero", "about", "skills", "experience", "blogSection"] as const;

type ContentRow = { section: string; title: string | null; subtitle: string | null; description: string | null; data: Prisma.JsonValue | null };

export const HOME_CONTENT_CACHE_TAG = "home-content";

// Cached at the Next.js Data Cache layer (persists across serverless invocations on Vercel).
// Revalidation is stale-while-revalidate: if the DB is unreachable (e.g. Supabase project
// paused on the free tier), the last successfully fetched rows keep being served instead
// of failing the request. The cache is also invalidated on-demand from the admin API.
const getCachedHomeContentRows = unstable_cache(
  async (language: string): Promise<ContentRow[]> =>
    prisma.content.findMany({
      where: {
        language,
        section: { in: [...HOME_SECTIONS] },
      },
      select: {
        section: true,
        title: true,
        subtitle: true,
        description: true,
        data: true,
      },
    }),
  ["home-content"],
  { revalidate: 3600, tags: [HOME_CONTENT_CACHE_TAG] }
);

export async function getHomeContent(language: string): Promise<HomeContent> {
  let rows: ContentRow[] = [];

  try {
    rows = await getCachedHomeContentRows(language);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[getHomeContent] Prisma unavailable and no cached data yet; falling back to translations.", error);
    }

    return {};
  }

  const bySection = new Map(rows.map((row) => [row.section, row]));

  const hero = bySection.get("hero");
  const about = bySection.get("about");
  const skills = bySection.get("skills");
  const experience = bySection.get("experience");
  const blogSection = bySection.get("blogSection");

  const heroData = parseHeroData(hero?.data ?? null);
  const aboutData = parseAboutData(about?.data ?? null);
  const skillsData = parseSkillsData(skills?.data ?? null);
  const experienceData = parseExperienceData(experience?.data ?? null);

  return {
    hero: hero
      ? {
          name: heroData?.name ?? hero.title ?? undefined,
          greeting: heroData?.greeting ?? hero.subtitle ?? undefined,
          description: hero.description ?? undefined,
        }
      : undefined,
    about: about
      ? {
          sectionTitle: about.title ?? undefined,
          headline: aboutData?.headline ?? undefined,
          subtitle: about.subtitle ?? undefined,
          description: about.description ?? undefined,
          imageSrc: aboutData?.imageSrc ?? undefined,
          imageAlt: aboutData?.imageAlt ?? undefined,
        }
      : undefined,
    skills: skills
      ? {
          title: skills.title ?? undefined,
          categories: skillsData?.categories,
        }
      : undefined,
    experience: experience
      ? {
          title: experience.title ?? undefined,
          items: experienceData?.items,
        }
      : undefined,
    blogSection: blogSection
      ? {
          title: blogSection.title ?? undefined,
          viewAll: blogSection.subtitle ?? undefined,
        }
      : undefined,
  };
}
