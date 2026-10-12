import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { getAllPosts } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.siteUrl.replace(/\/$/, "");

  const staticRoutes = ["/", "/blog"];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const posts = await getAllPosts();
  const postEntries = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
  }));

  return [...staticEntries, ...postEntries];
}
