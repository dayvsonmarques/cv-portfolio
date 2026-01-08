import { prisma } from "@/lib/prisma";
import type { ExperienceType } from "@/types/experience";

type SkillCategory = { title: string; skills: { name: string }[] };

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

export async function getHomeContent(language: string): Promise<HomeContent> {
  const rows = await prisma.content.findMany({
    where: {
      language,
      section: { in: [...HOME_SECTIONS] },
    },
  });

  const bySection = new Map(rows.map((row) => [row.section, row]));

  const hero = bySection.get("hero");
  const about = bySection.get("about");
  const skills = bySection.get("skills");
  const experience = bySection.get("experience");
  const blogSection = bySection.get("blogSection");

  const skillsData = skills?.data as unknown as { categories?: SkillCategory[] } | null;
  const experienceData = experience?.data as unknown as { items?: ExperienceType[] } | null;
  const aboutData = about?.data as unknown as { headline?: string; imageSrc?: string; imageAlt?: string } | null;

  return {
    hero: hero
      ? {
          name: (hero.data as any)?.name ?? hero.title ?? undefined,
          greeting: (hero.data as any)?.greeting ?? hero.subtitle ?? undefined,
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
          categories: skillsData?.categories ?? undefined,
        }
      : undefined,
    experience: experience
      ? {
          title: experience.title ?? undefined,
          items: experienceData?.items ?? undefined,
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
