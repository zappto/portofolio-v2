import { Container } from "@/components/shared/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ContactCTAProps = {
  title: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
};

export function ContactCTA({ title, description, actions }: ContactCTAProps) {
  return (
    <section className="section-y">
      <Container>
        <Card className="gap-6 border-primary/40 bg-gradient-to-br from-background via-background to-muted/40 p-8">
          <CardHeader>
            <CardTitle className="text-3xl">{title}</CardTitle>
            {description ? (
              <p className="text-base text-muted-foreground">{description}</p>
            ) : null}
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">{actions}</CardContent>
        </Card>
      </Container>
    </section>
  );
}
