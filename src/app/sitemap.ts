import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [""] as const;
  const lastModified = new Date();

  return routes.flatMap((route) =>
    siteConfig.locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${route}`,
      lastModified,
      alternates: {
        languages: Object.fromEntries(
          siteConfig.locales.map((alternateLocale) => [
            alternateLocale,
            `${siteConfig.url}/${alternateLocale}${route}`,
          ]),
        ),
      },
    })),
  );
}
