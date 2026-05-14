import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PortfolioNavVariant } from "@/components/marketing/types";

type SkillCardProps = {
  name: string;
  description?: string;
  footer?: React.ReactNode;
  featured?: boolean;
  variant?: PortfolioNavVariant;
};

export function SkillCard({
  name,
  description,
  footer,
  featured,
  variant = "professional",
}: SkillCardProps) {
  return (
    <Card
      portfolioVariant={variant === "playful" ? "playful" : "professional"}
      className={cn(featured && variant === "playful" ? "shadow-[var(--shadow-md)]" : null)}
    >
      <CardHeader>
        <p className="font-heading text-base font-semibold">{name}</p>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </CardHeader>
      {footer ? <CardContent>{footer}</CardContent> : null}
      {featured ? (
        <CardFooter className="text-xs font-semibold uppercase tracking-wide text-primary">
          Featured pick
        </CardFooter>
      ) : null}
    </Card>
  );
}
