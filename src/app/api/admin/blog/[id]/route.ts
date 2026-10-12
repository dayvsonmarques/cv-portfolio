import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { POSTS_CACHE_TAG } from "@/lib/posts";
import { sanitizeContent } from "@/lib/sanitizeContent";

type RouteParams = { params: Promise<{ id: string }> };

function toStringSafe(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((v) => toStringSafe(v)).filter(Boolean);
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id: Number(id) } });
  if (!post) return NextResponse.json({ error: "Post não encontrado." }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const postId = Number(id);
  const body = await request.json();

  const title = toStringSafe(body?.title);
  const excerpt = toStringSafe(body?.excerpt);
  const content = sanitizeContent(toStringSafe(body?.content));
  const image = toStringSafe(body?.image);
  const date = toStringSafe(body?.date);
  const slug = toStringSafe(body?.slug);
  const author = toStringSafe(body?.author);
  const tags = toStringArray(body?.tags);
  const categories = toStringArray(body?.categories);

  if (!title || !excerpt || !content || !image || !date || !slug) {
    return NextResponse.json(
      { error: "Preencha título, slug, imagem, data, resumo e conteúdo." },
      { status: 400 }
    );
  }

  const slugOwner = await prisma.post.findUnique({ where: { slug } });
  if (slugOwner && slugOwner.id !== postId) {
    return NextResponse.json({ error: "Já existe outro post com esse slug." }, { status: 409 });
  }

  const post = await prisma.post.update({
    where: { id: postId },
    data: { title, slug, excerpt, content, image, date, author: author || null, tags, categories },
  });

  revalidateTag(POSTS_CACHE_TAG, 'max');
  return NextResponse.json({ post });
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  await prisma.post.delete({ where: { id: Number(id) } });
  revalidateTag(POSTS_CACHE_TAG, 'max');
  return NextResponse.json({ ok: true });
}
