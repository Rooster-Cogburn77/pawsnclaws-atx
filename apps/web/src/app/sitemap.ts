import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pawsnclaws.org";

  // Static pages
  const staticPages = [
    "",
    "/about",
    "/resources",
    "/get-involved",
    "/donate",
    "/campaigns",
    "/impact",
    "/map",
    "/help",
    "/help/deposit-assistance",
    "/help/surrender-prevention",
    "/help/vet-fund",
    "/lost-found",
    "/lost-found/report",
    "/food-stations",
    "/volunteer",
    "/foster",
    "/foster-box",
    "/sponsor",
    "/give",
    "/partners/roundup",
    "/contact",
  ];

  const sitemap: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : path.startsWith("/help") ? 0.9 : 0.8,
  }));

  return sitemap;
}
