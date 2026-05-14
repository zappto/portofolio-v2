"use client";

import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { VisualModeToggle } from "@/components/layout/visual-mode-toggle";

export function ThemeControls() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <ThemeSwitcher />
      <VisualModeToggle />
      <LocaleSwitcher />
    </div>
  );
}
