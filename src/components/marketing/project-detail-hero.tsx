import { Container } from "@/components/shared/container";
import { Badge } from "@/components/ui/badge";

type ProjectDetailHeroProps = {
  title: string;
  excerpt?: string;
  coverSrc?: string | null;
  coverAlt?: string;
  meta?: React.ReactNode;
};

export function ProjectDetailHero({
  title,
  excerpt,
  coverSrc,
  coverAlt,
  meta,
}: ProjectDetailHeroProps) {
  return (
    <section className="border-b border-border/70 bg-muted/10">
      <Container className="flex flex-col gap-8 py-12">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">{meta}</div>
          <h1>{title}</h1>
          {excerpt ? (
            <p className="max-w-3xl text-lg text-muted-foreground">{excerpt}</p>
          ) : null}
        </div>
        {coverSrc ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-card">
            {/* eslint-disable-next-line @next/next/no-img-element -- CMS thumbnails may originate from arbitrary storage hosts */}
            <img
              src={coverSrc}
              alt={coverAlt ?? ""}
              loading="lazy"
              className="h-full w-full object-cover"
              decoding="async"
            />
          </div>
        ) : null}
      </Container>
    </section>
  );
}

export function ProjectHeroMeta({ badges }: { badges: string[] }) {
  return (
    <>
      {badges.map((badge) => (
        <Badge key={badge} variant="secondary">
          {badge}
        </Badge>
      ))}
    </>
  );
}
