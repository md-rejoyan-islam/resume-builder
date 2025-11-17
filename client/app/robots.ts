import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      //   disallow: '/private/',
    },
    sitemap: BASE_URL + "/sitemap.xml",
  };
}
