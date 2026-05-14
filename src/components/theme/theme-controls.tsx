"use client";

import { Monitor, Moon, Sparkles, Sun } from "lucide-react";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { useVisualMode } from "@/components/theme/visual-mode-provider";
import { Link, usePathname } from "@/i18n/navigation";

const themeOptions = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export function ThemeControls() {
  const locale = useLocale();
  const pathname = usePathname();
  const { setTheme } = useTheme();
  const { visualMode, toggleVisualMode } = useVisualMode();
  const alternateLocale = locale === "id" ? "en" : "id";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex h-9 items-center rounded-md border border-border/80 bg-background p-1">
        {themeOptions.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.value}
              type="button"
              aria-label={`Use ${option.label} color scheme`}
              title={option.label}
              onClick={() => setTheme(option.value)}
              className="inline-flex size-7 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Icon className="size-4" aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={toggleVisualMode}
        className="inline-flex h-9 items-center gap-2 rounded-md border border-border/80 px-3 text-sm font-medium transition-colors hover:bg-muted"
      >
        <Sparkles className="size-4" aria-hidden="true" />
        {visualMode}
      </button>

      <Link
        href={pathname}
        locale={alternateLocale}
        className="inline-flex h-9 items-center rounded-md border border-border/80 px-3 text-sm font-medium uppercase transition-colors hover:bg-muted"
      >
        {alternateLocale}
      </Link>
    </div>
  );
}
