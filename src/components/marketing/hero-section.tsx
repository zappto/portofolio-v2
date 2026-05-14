import { Container } from "@/components/shared/container";

type HeroSectionProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
};

export function HeroSection({ eyebrow, title, description, actions }: HeroSectionProps) {
  return (
    <section className="section-y border-border/70 border-b">
      <Container className="flex flex-col gap-8">
        {eyebrow ? (
          <span className="text-ui-label text-muted-foreground">{eyebrow}</span>
        ) : null}
        <div className="flex max-w-3xl flex-col gap-5">
          <div className="space-y-3">
            <h1>{title}</h1>
            {description ? (
              <p className="text-lg text-muted-foreground md:text-xl">{description}</p>
            ) : null}
          </div>
          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </Container>
    </section>
  );
}
