import type { MetadataRoute } from "next";
import { articles } from "./content/articles";
import { modules } from "./content/modules";
import { siteUrl, toISODate } from "./content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/articles/`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/modules/`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...modules.map((item) => ({
      url: `${siteUrl}/modules/${item.key}/`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...articles.map((article) => ({
      url: `${siteUrl}/articles/${article.slug}/`,
      lastModified: toISODate(article.date) ?? now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
