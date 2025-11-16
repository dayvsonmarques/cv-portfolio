import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";

export default function robots(): MetadataRoute.Robots {
  const sitemapUrl = `${siteConfig.siteUrl}/sitemap.xml`;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/*"],
      },
    ],
    sitemap: [sitemapUrl],
  };
}
