/** Canonical public site origin (no trailing slash). Used by sitemap, robots, and metadata. */
export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
  const isLocalhost = (value: string) =>
    /localhost|127\.0\.0\.1/i.test(value);

  if (explicit && !isLocalhost(explicit)) {
    return explicit.replace(/^http:\/\//i, "https://");
  }

  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProd) {
    return `https://${vercelProd.replace(/^https?:\/\//, "")}`;
  }

  if (explicit) return explicit;

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "")}`;

  return "http://localhost:3000";
}
