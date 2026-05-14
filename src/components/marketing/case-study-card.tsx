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

type CaseStudyCardProps = {
  title: string;
  excerpt?: string;
  status?: string;
  href: string;
  variant?: PortfolioNavVariant;
};

export function CaseStudyCard({
  title,
  excerpt,
  status,
  href,
  variant = "professional",
}: CaseStudyCardProps) {
  return (
    <Link href={href} className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <Card
        portfolioVariant={variant === "playful" ? "playful" : "professional"}
        className="h-full hover:bg-muted/20"
      >
        <CardHeader>
          {status ? <Badge variant="outline">{status}</Badge> : null}
          <CardTitle className="text-xl">{title}</CardTitle>
          {excerpt ? <CardDescription>{excerpt}</CardDescription> : null}
        </CardHeader>
        <CardFooter className="text-sm font-semibold text-primary">
          Read case study
        </CardFooter>
      </Card>
    </Link>
  );
}
