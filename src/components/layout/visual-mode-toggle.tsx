"use client";

import { Sparkles } from "lucide-react";
import { useVisualMode } from "@/components/theme/visual-mode-provider";

export function VisualModeToggle() {
  const { visualMode, toggleVisualMode } = useVisualMode();

  return (
    <button
      type="button"
      onClick={toggleVisualMode}
      aria-label={`Switch visual mode (current: ${visualMode})`}
      className="inline-flex h-9 items-center gap-2 rounded-md border border-border/80 px-3 text-sm font-medium capitalize transition-colors hover:bg-muted"
    >
      <Sparkles className="size-4" aria-hidden="true" />
      {visualMode}
    </button>
  );
}
