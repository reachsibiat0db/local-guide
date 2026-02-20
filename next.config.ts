import type { NextConfig } from "next";
import withPWA from "next-pwa";

const isDev = process.env.NODE_ENV === "development";


const nextConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: isDev,
});

export default nextConfig;
