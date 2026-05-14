import { siteConfig } from "@/config/site";

export const designSystemConfig = {
  defaultVisualMode: "professional",
  defaultColorScheme: "light",
  visualModes: {
    professional: {
      label: "Professional",
      description: "Minimal, premium, editorial, and recruiter-friendly.",
    },
    playful: {
      label: "Playful",
      description: "Creative, expressive, and interaction-forward.",
    },
  },
  colorSchemes: {
    light: "Light",
    dark: "Dark",
    system: "System",
  },
  tokenFiles: [
    "src/styles/tokens.css",
    "src/styles/themes.css",
    "src/styles/typography.css",
    "src/styles/components.css",
  ],
} as const satisfies {
  defaultVisualMode: (typeof siteConfig.visualModes)[number];
  defaultColorScheme: (typeof siteConfig.colorSchemes)[number];
  visualModes: Record<
    (typeof siteConfig.visualModes)[number],
    { label: string; description: string }
  >;
  colorSchemes: Record<(typeof siteConfig.colorSchemes)[number], string>;
  tokenFiles: readonly string[];
};
