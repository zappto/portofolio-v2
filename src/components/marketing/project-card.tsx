import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PortfolioNavVariant } from "@/components/marketing/types";
import { Link } from "@/i18n/navigation";

type ProjectCardProps = {
  variant?: PortfolioNavVariant;
  title: string;
  description?: string;
  href: string;
  tags?: readonly string[];
  featured?: boolean;
  media?: React.ReactNode;
  linkLabel?: string;
};

export function ProjectCard({
  variant = "professional",
  title,
  description,
  href,
  tags,
  featured,
  media,
  linkLabel = "View project",
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        variant === "playful" &&
          "transition-transform hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none",
      )}
    >
      <Card
        portfolioVariant={variant === "playful" ? "playful" : "professional"}
        className="h-full pt-0 hover:border-border motion-reduce:transition-none transition-colors"
      >
        {media ? (
          <div className="aspect-video w-full overflow-hidden rounded-none border-b border-border/60">
            {media}
          </div>
        ) : null}
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle className="text-lg">{title}</CardTitle>
            {featured ? <Badge variant="secondary">Featured</Badge> : null}
          </div>
          {description ? <CardDescription>{description}</CardDescription> : null}
        </CardHeader>
        {tags?.length ? (
          <CardContent className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </CardContent>
        ) : null}
        <CardFooter className="text-sm font-semibold text-primary">{linkLabel}</CardFooter>
      </Card>
    </Link>
  );
}
