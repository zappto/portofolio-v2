export const siteConfig = {
  name: "Frontend Engineer Portfolio",
  description:
    "Dynamic portfolio for a frontend engineer with professional and playful visual modes.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  author: "Frontend Engineer",
  defaultLocale: "id" as const,
  locales: ["id", "en"] as const,
  visualModes: ["professional", "playful"] as const,
  colorSchemes: ["light", "dark", "system"] as const,
};

export type Locale = (typeof siteConfig.locales)[number];
export type VisualMode = (typeof siteConfig.visualModes)[number];
export type ColorScheme = (typeof siteConfig.colorSchemes)[number];

export function isLocale(value: string): value is Locale {
  return siteConfig.locales.includes(value as Locale);
}

export function isVisualMode(value: string | undefined): value is VisualMode {
  return siteConfig.visualModes.includes(value as VisualMode);
}

export function isColorScheme(value: string | undefined): value is ColorScheme {
  return siteConfig.colorSchemes.includes(value as ColorScheme);
}
