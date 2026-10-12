import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { BlogPost } from "@/types/blog";

export const POSTS_CACHE_TAG = "posts";

function toBlogPost(row: {
  id: number;
  slug: string;
  title: string;
  image: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  author: string | null;
  categories: string[];
}): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    image: row.image,
    date: row.date,
    excerpt: row.excerpt,
    content: row.content,
    tags: row.tags,
    author: row.author ?? undefined,
    categories: row.categories,
  };
}

export const getAllPosts = unstable_cache(
  async (): Promise<BlogPost[]> => {
    const rows = await prisma.post.findMany({ orderBy: { date: "desc" } });
    return rows.map(toBlogPost);
  },
  ["posts-all"],
  { revalidate: 3600, tags: [POSTS_CACHE_TAG] }
);

export const getPostBySlug = unstable_cache(
  async (slug: string): Promise<BlogPost | null> => {
    const row = await prisma.post.findUnique({ where: { slug } });
    return row ? toBlogPost(row) : null;
  },
  ["posts-by-slug"],
  { revalidate: 3600, tags: [POSTS_CACHE_TAG] }
);
