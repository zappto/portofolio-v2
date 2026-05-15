import type { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AdminSummaryCardProps = {
  label: string;
  value: number | string;
  hint: string;
  icon: LucideIcon;
};

export function AdminSummaryCard({
  label,
  value,
  hint,
  icon: Icon,
}: AdminSummaryCardProps) {
  return (
    <Card portfolioVariant="professional">
      <CardHeader className="gap-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-sm text-muted-foreground">{label}</CardTitle>
          <Icon aria-hidden="true" />
        </div>
        <p className="font-mono text-3xl font-semibold tabular-nums">{value}</p>
      </CardHeader>
      <CardContent className="text-xs text-muted-foreground">{hint}</CardContent>
    </Card>
  );
}
