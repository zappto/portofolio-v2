import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PortfolioNavVariant } from "@/components/marketing/types";
import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: React.ReactNode;
  hint?: string;
  variant?: PortfolioNavVariant;
};

export function StatCard({ label, value, hint, variant = "professional" }: StatCardProps) {
  return (
    <Card
      portfolioVariant={variant === "playful" ? "playful" : "professional"}
      className={cn(
        "gap-2",
        variant === "playful" && "border-2 border-border-strong bg-secondary/10",
      )}
    >
      <CardHeader className="gap-1">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <CardTitle className="text-4xl font-semibold tracking-tight">{value}</CardTitle>
      </CardHeader>
      {hint ? <CardContent className="text-xs text-muted-foreground">{hint}</CardContent> : null}
    </Card>
  );
}
