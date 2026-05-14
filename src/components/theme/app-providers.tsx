"use client";

import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";
import { useEffect } from "react";
import { VisualModeProvider } from "@/components/theme/visual-mode-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  isColorScheme,
  isVisualMode,
  type ColorScheme,
  type VisualMode,
} from "@/config/site";

type AppProvidersProps = {
  children: React.ReactNode;
  initialTheme: string;
  initialVisualMode: string;
};

export function AppProviders({
  children,
  initialTheme,
  initialVisualMode,
}: AppProvidersProps) {
  const visualMode: VisualMode = isVisualMode(initialVisualMode)
    ? initialVisualMode
    : "professional";
  const theme: ColorScheme = isColorScheme(initialTheme)
    ? initialTheme
    : "light";

  return (
    <TooltipProvider delayDuration={150}>
      <NextThemeProvider
        attribute="data-theme"
        defaultTheme={theme}
        enableSystem
        enableColorScheme
        disableTransitionOnChange
      >
        <ThemePreferenceCookie />
        <VisualModeProvider initialMode={visualMode}>
          {children}
          <Toaster position="bottom-right" richColors closeButton />
        </VisualModeProvider>
      </NextThemeProvider>
    </TooltipProvider>
  );
}

function ThemePreferenceCookie() {
  const { theme } = useTheme();

  useEffect(() => {
    if (!theme) {
      return;
    }

    document.cookie = `theme=${theme}; path=/; max-age=31536000; samesite=lax`;
  }, [theme]);

  return null;
}
