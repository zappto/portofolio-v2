import type { Metadata } from "next";
import { cookies } from "next/headers";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/space-grotesk";
import { AppProviders } from "@/components/theme/app-providers";
import { isColorScheme, isVisualMode } from "@/config/site";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Frontend Engineer Portfolio",
    template: "%s | Frontend Engineer Portfolio",
  },
  description:
    "A dynamic, multi-page portfolio for a frontend engineer focused on polished, performant, and accessible web interfaces.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const visualModeCookie = cookieStore.get("visual-mode")?.value;
  const colorSchemeCookie = cookieStore.get("theme")?.value;
  const visualMode = isVisualMode(visualModeCookie)
    ? visualModeCookie
    : "professional";
  const colorScheme = isColorScheme(colorSchemeCookie)
    ? colorSchemeCookie
    : "light";
  const initialThemeAttribute =
    colorScheme === "dark" || colorScheme === "light" ? colorScheme : "light";

  return (
    <html
      lang="id"
      className="h-full antialiased"
      data-theme={initialThemeAttribute}
      data-visual-mode={visualMode}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <AppProviders initialTheme={colorScheme} initialVisualMode={visualMode}>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
