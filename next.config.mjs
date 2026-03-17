import nextPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {};

const withPWA = nextPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  cacheStartUrl: true,
  dynamicStartUrl: false,
  fallbacks: {
    document: "/~offline",
  },
});

export default withPWA(nextConfig);
