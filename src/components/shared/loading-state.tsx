import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

type LoadingStateProps = {
  label?: string;
  className?: string;
};

export function LoadingState({ label, className }: LoadingStateProps) {
  return (
    <output
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card px-8 py-12 text-muted-foreground",
        className,
      )}
    >
      <Loader2Icon
        aria-hidden="true"
        className="size-9 animate-spin text-foreground opacity-55"
      />
      {label ? <span className="text-sm font-medium">{label}</span> : null}
    </output>
  );
}
