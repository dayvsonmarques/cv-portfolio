import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { POSTS_CACHE_TAG } from "@/lib/posts";
import { slugify } from "@/lib/slugify";
import { sanitizeContent } from "@/lib/sanitizeContent";

function toStringSafe(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((v) => toStringSafe(v)).filter(Boolean);
}

export async function GET() {
  const posts = await prisma.post.findMany({ orderBy: { date: "desc" } });
  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  const body = await request.json();

  const title = toStringSafe(body?.title);
  const excerpt = toStringSafe(body?.excerpt);
  const content = sanitizeContent(toStringSafe(body?.content));
  const image = toStringSafe(body?.image);
  const date = toStringSafe(body?.date);
  const author = toStringSafe(body?.author);
  const tags = toStringArray(body?.tags);
  const categories = toStringArray(body?.categories);
  const slug = toStringSafe(body?.slug) || slugify(title);

  if (!title || !excerpt || !content || !image || !date || !slug) {
    return NextResponse.json(
      { error: "Preencha título, slug, imagem, data, resumo e conteúdo." },
      { status: 400 }
    );
  }

  const existing = await prisma.post.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json({ error: "Já existe um post com esse slug." }, { status: 409 });
  }

  const post = await prisma.post.create({
    data: { title, slug, excerpt, content, image, date, author: author || null, tags, categories },
  });

  revalidateTag(POSTS_CACHE_TAG, 'max');
  return NextResponse.json({ post }, { status: 201 });
}
