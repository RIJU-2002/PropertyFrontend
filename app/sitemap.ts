import type { MetadataRoute } from "next";
import { API_BASE } from "@/lib/apiUrl";
import { getSiteUrl } from "@/lib/siteUrl";

export const revalidate = 3600;

type SlugItem = { slug: string; lastModified?: Date };

async function fetchPagedSlugs(
  path: string,
  listKey: "projects" | "articles"
): Promise<SlugItem[]> {
  const items: SlugItem[] = [];
  const limit = 50;
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages && page <= 40) {
    try {
      const url = new URL(path, API_BASE);
      url.searchParams.set("page", String(page));
      url.searchParams.set("limit", String(limit));

      const res = await fetch(url.toString(), {
        next: { revalidate: 3600 },
      });

      if (!res.ok) break;

      const data = await res.json();
      const rows = (data[listKey] ?? []) as Array<{
        slug?: string;
        updatedAt?: string;
      }>;

      for (const row of rows) {
        if (row.slug) {
          items.push({
            slug: row.slug,
            lastModified: row.updatedAt ? new Date(row.updatedAt) : undefined,
          });
        }
      }

      totalPages = Number(data.pagination?.totalPages) || 1;
      page += 1;
    } catch {
      break;
    }
  }

  return items;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: "daily", priority: 1 },
    {
      url: `${siteUrl}/Projects`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/roi`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const [projects, articles] = await Promise.all([
    fetchPagedSlugs("projects", "projects"),
    fetchPagedSlugs("articles/public", "articles"),
  ]);

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${siteUrl}/Projects/${p.slug}`,
    lastModified: p.lastModified ?? now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${siteUrl}/blog/${a.slug}`,
    lastModified: a.lastModified ?? now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages, ...articlePages];
}
