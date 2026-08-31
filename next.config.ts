import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/work/nvidia-argonaut",
        destination: "/work/nvidia-augonnet",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
