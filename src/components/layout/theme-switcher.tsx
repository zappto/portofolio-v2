"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const themeOptions = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export function ThemeSwitcher() {
  const { setTheme } = useTheme();

  return (
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
  );
}
