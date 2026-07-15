import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://deepsprings.businesswebexpress.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/sales", "/reviews"];
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));
}
