import type { MetadataRoute } from "next";
import metaData from "@/data/meta.json";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${metaData.site.url}/sitemap.xml`,
    host: metaData.site.url,
  };
}
