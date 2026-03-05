import type { NextConfig } from "next";

const parseHostname = (value?: string) => {
  if (!value) return null;
  try {
    return new URL(value).hostname;
  } catch {
    return null;
  }
};

const imageHostnames = Array.from(
  new Set(
    [
      process.env.WC_BASE_URL,
      process.env.WP_URL,
      process.env.NEXT_PUBLIC_WP_URL,
    ]
      .map((value) => parseHostname(value))
      .filter((value): value is string => Boolean(value)),
  ),
);

const nextConfig: NextConfig = {
  images: {
    unoptimized: imageHostnames.length === 0,
    remotePatterns: imageHostnames.flatMap((hostname) => [
      { protocol: "https", hostname, pathname: "/**" },
      { protocol: "http", hostname, pathname: "/**" },
    ]),
  },
};

export default nextConfig;
