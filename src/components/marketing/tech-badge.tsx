import { Badge } from "@/components/ui/badge";
import type { PortfolioNavVariant } from "@/components/marketing/types";
import { cn } from "@/lib/utils";

type TechBadgeProps = {
  label: string;
  variant?: PortfolioNavVariant;
  className?: string;
};

export function TechBadge({ label, variant = "professional", className }: TechBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium",
        variant === "playful" && "border-2 border-border-strong font-semibold shadow-sm",
        className,
      )}
    >
      {label}
    </Badge>
  );
}
