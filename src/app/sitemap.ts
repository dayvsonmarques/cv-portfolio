import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { blogPosts } from "@/components/BlogPosts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl.replace(/\/$/, "");

  const staticRoutes = ["/", "/blog"];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const postEntries = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
  }));

  return [...staticEntries, ...postEntries];
}
