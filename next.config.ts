import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows the Storyblok Visual Editor iframe to embed the site
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://app.storyblok.com",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
