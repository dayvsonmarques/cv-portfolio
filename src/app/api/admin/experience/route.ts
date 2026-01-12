import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import type { ExperienceType } from "@/types/experience";

const LANGS = ["pt", "en", "es"] as const;
type Lang = (typeof LANGS)[number];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toStringSafe(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function normalizeStringArray(input: unknown): string[] {
  if (!Array.isArray(input)) return [];
  return input
    .map((v) => (typeof v === "string" ? v.trim() : ""))
    .filter((v) => v.length > 0);
}

function normalizeI18nText(input: unknown): { pt: string; en: string; es: string } {
  const obj = isRecord(input) ? input : {};
  return {
    pt: toStringSafe(obj.pt).trim(),
    en: toStringSafe(obj.en).trim(),
    es: toStringSafe(obj.es).trim(),
  };
}

function normalizeExperiences(input: unknown): ExperienceType[] {
  const items = Array.isArray(input) ? input : [];
  const result: ExperienceType[] = [];

  for (const raw of items) {
    if (!isRecord(raw)) continue;
    const title = normalizeI18nText(raw.title);
    const company = normalizeI18nText(raw.company);
    const description = normalizeI18nText(raw.description);
    const startDate = toStringSafe(raw.startDate).trim();
    const endDateRaw = raw.endDate;
    const endDate = typeof endDateRaw === "string" ? endDateRaw.trim() : endDateRaw == null ? null : null;
    const isCurrent = Boolean(raw.isCurrent);
    const technologies = normalizeStringArray(raw.technologies);

    if (!startDate) continue;
    if (!title.pt && !title.en && !title.es) continue;
    if (!company.pt && !company.en && !company.es) continue;
    if (!description.pt && !description.en && !description.es) continue;

    result.push({
      title,
      company,
      startDate,
      endDate,
      isCurrent,
      description,
      technologies,
    });
  }

  return result;
}

function getItemsFromData(data: unknown): ExperienceType[] {
  // Accept: { items: [...] } or legacy: [ ... ]
  if (isRecord(data) && Array.isArray((data as any).items)) return normalizeExperiences((data as any).items);
  if (Array.isArray(data)) return normalizeExperiences(data);
  return [];
}

export async function GET() {
  const rows = await prisma.content.findMany({
    where: { section: "experience", language: { in: [...LANGS] } },
    orderBy: { updatedAt: "desc" },
  });

  const titlesByLang: Record<Lang, string> = {
    pt: "",
    en: "",
    es: "",
  };

  for (const lang of LANGS) {
    const row = rows.find((r) => r.language === lang);
    titlesByLang[lang] = row?.title ?? "";
  }

  const firstWithItems = rows.find((r) => getItemsFromData(r.data).length > 0);
  const items = firstWithItems ? getItemsFromData(firstWithItems.data) : [];

  return NextResponse.json({ titlesByLang, items });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const titlesByLangInput = isRecord(body?.titlesByLang) ? body.titlesByLang : {};

  const titlesByLang: Record<Lang, string> = {
    pt: toStringSafe((titlesByLangInput as any).pt).trim(),
    en: toStringSafe((titlesByLangInput as any).en).trim(),
    es: toStringSafe((titlesByLangInput as any).es).trim(),
  };

  const items = normalizeExperiences(body?.items);
  const data = ({ items } as unknown) as Prisma.InputJsonValue;

  for (const lang of LANGS) {
    const existing = await prisma.content.findFirst({
      where: { section: "experience", language: lang },
      orderBy: { updatedAt: "desc" },
    });

    if (existing) {
      await prisma.content.update({
        where: { id: existing.id },
        data: { title: titlesByLang[lang], data },
      });
    } else {
      await prisma.content.create({
        data: { section: "experience", language: lang, title: titlesByLang[lang], data },
      });
    }
  }

  return NextResponse.json({ titlesByLang, items });
}
