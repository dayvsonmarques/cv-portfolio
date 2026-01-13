import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type SkillItem = { id: string; name: string };
type SkillCategory = { id: string; title: string; skills: SkillItem[] };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function uuid() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function toStringSafe(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function normalizeSkillCategories(input: unknown): SkillCategory[] {
  if (!Array.isArray(input)) return [];

  const categories: SkillCategory[] = [];
  for (const rawCategory of input) {
    if (!isRecord(rawCategory)) continue;

    const title = toStringSafe(rawCategory.title).trim();
    const skillsRaw = rawCategory.skills;
    const skills: SkillItem[] = [];
    if (Array.isArray(skillsRaw)) {
      for (const rawSkill of skillsRaw) {
        if (!isRecord(rawSkill)) continue;
        const name = toStringSafe(rawSkill.name).trim();
        if (!name) continue;
        skills.push({ id: toStringSafe(rawSkill.id).trim() || uuid(), name });
      }
    }

    if (!title) continue;
    categories.push({ id: toStringSafe(rawCategory.id).trim() || uuid(), title, skills });
  }

  return categories;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const language = searchParams.get("language") || "pt";

  const content = await prisma.content.findFirst({
    where: { section: "skills", language },
    orderBy: { updatedAt: "desc" },
  });

  const data = content?.data;
  const categories = isRecord(data) ? normalizeSkillCategories((data as any).categories) : [];

  return NextResponse.json({
    id: content?.id ?? null,
    language,
    title: "",
    categories,
  });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const language = typeof body?.language === "string" && body.language.trim() ? body.language.trim() : "pt";
  const categories = normalizeSkillCategories(body?.categories);

  const existing = await prisma.content.findFirst({
    where: { section: "skills", language },
    orderBy: { updatedAt: "desc" },
  });

  const data = { categories };
  const title = "";

  const saved = existing
    ? await prisma.content.update({
        where: { id: existing.id },
        data: { title, data },
      })
    : await prisma.content.create({
        data: { section: "skills", language, title, data },
      });

  return NextResponse.json({
    id: saved.id,
    language,
    title: "",
    categories,
  });
}
