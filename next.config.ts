import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/work/nvidia-argonaut",
        destination: "/work/nvidia-augonnet",
        permanent: true,
      },
      {
        source: "/notes",
        destination: "/blog/notes",
        permanent: false,
      },
      {
        source: "/notes/:slug",
        destination: "/blog/notes/:slug",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
