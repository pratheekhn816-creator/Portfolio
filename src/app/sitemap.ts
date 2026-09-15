import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://your-domain.example";
  return ["", "/about", "/work", "/contact"].map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date() }));
}
