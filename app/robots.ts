import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/siteUrl";

/**
 * Do not Disallow private pages here. If Google cannot crawl them, it cannot
 * see noindex tags and they stay "Indexed, though blocked by robots.txt".
 * Private routes are noindexed via metadata + X-Robots-Tag instead.
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl().replace(/\/+$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
