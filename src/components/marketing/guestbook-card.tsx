import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "@/components/shared/external-link";

type GuestbookCardProps = {
  name: string;
  message: string;
  websiteUrl?: string | null;
  postedAtLabel?: string;
};

export function GuestbookCard({ name, message, websiteUrl, postedAtLabel }: GuestbookCardProps) {
  return (
    <Card className="gap-3">
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle className="text-lg">{name}</CardTitle>
          {postedAtLabel ? (
            <p className="text-xs text-muted-foreground">{postedAtLabel}</p>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <p>{message}</p>
        {websiteUrl ? (
          <ExternalLink
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-primary"
          >
            Website
          </ExternalLink>
        ) : null}
      </CardContent>
    </Card>
  );
}
