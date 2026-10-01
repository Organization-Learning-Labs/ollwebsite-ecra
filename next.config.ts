import type { NextConfig } from "next";

const PRODUCTION_HOST = "theorganizationlearninglabs.com";
const hostPattern = PRODUCTION_HOST.replace(/\./g, "\\.");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about/ecra", destination: "/ecra", permanent: true },
      {
        source: "/:path*",
        has: [{ type: "host", value: `www\\.${hostPattern}` }],
        destination: `https://${PRODUCTION_HOST}/:path*`,
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        missing: [{ type: "host", value: hostPattern }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/dap-report",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
      {
        source: "/cluster-explorer",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
