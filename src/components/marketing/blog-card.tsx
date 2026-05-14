import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PortfolioNavVariant } from "@/components/marketing/types";
import { Link } from "@/i18n/navigation";

type BlogCardProps = {
  title: string;
  excerpt?: string;
  category?: string;
  href: string;
  readingMinutes?: number;
  variant?: PortfolioNavVariant;
};

export function BlogCard({
  title,
  excerpt,
  category,
  href,
  readingMinutes,
  variant = "professional",
}: BlogCardProps) {
  return (
    <Link href={href} className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <Card
        portfolioVariant={variant === "playful" ? "playful" : "professional"}
        className="h-full transition-colors hover:bg-muted/20"
      >
        <CardHeader>
          <div className="flex flex-wrap gap-2">
            {category ? <Badge variant="secondary">{category}</Badge> : null}
            {typeof readingMinutes === "number" ? (
              <span className="text-ui-label text-muted-foreground">
                {readingMinutes} min read
              </span>
            ) : null}
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          {excerpt ? <CardDescription>{excerpt}</CardDescription> : null}
        </CardHeader>
        <CardFooter className="text-sm font-semibold text-primary">
          Continue reading
        </CardFooter>
      </Card>
    </Link>
  );
}
