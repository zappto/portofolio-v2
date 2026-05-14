import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PortfolioNavVariant } from "@/components/marketing/types";
import { Link } from "@/i18n/navigation";

type PlaygroundCardProps = {
  title: string;
  description?: string;
  href: string;
  complexity?: string;
  tags?: readonly string[];
  variant?: PortfolioNavVariant;
};

export function PlaygroundCard({
  title,
  description,
  href,
  complexity,
  tags,
  variant = "playful",
}: PlaygroundCardProps) {
  return (
    <Link href={href} className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <Card
        portfolioVariant={variant === "professional" ? "professional" : "playful"}
        className="h-full bg-gradient-to-br from-card to-secondary/10"
      >
        <CardHeader>
          <div className="flex flex-wrap gap-2">
            {complexity ? <Badge>{complexity}</Badge> : null}
            {tags?.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          {description ? <CardDescription>{description}</CardDescription> : null}
        </CardHeader>
        <CardFooter className="text-sm font-semibold text-primary">
          Launch experiment
        </CardFooter>
      </Card>
    </Link>
  );
}
