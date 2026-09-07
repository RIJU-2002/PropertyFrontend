/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: "/projects",
        destination: "/Projects",
        permanent: true,
      },
      {
        source: "/projects/:path*",
        destination: "/Projects/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    const noIndex = [
      { key: "X-Robots-Tag", value: "noindex, nofollow" },
    ];

    return [
      { source: "/cms", headers: noIndex },
      { source: "/cms/:path*", headers: noIndex },
      { source: "/agent", headers: noIndex },
      { source: "/agent/:path*", headers: noIndex },
      { source: "/auth", headers: noIndex },
      { source: "/auth/:path*", headers: noIndex },
      { source: "/SavedProp", headers: noIndex },
      { source: "/SavedProp/:path*", headers: noIndex },
      { source: "/Details", headers: noIndex },
      { source: "/Details/:path*", headers: noIndex },
    ];
  },
};

export default nextConfig;
