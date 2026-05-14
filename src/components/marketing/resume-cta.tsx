import { Container } from "@/components/shared/container";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ResumeCTAProps = {
  title: string;
  description?: React.ReactNode;
  updatedLabel?: string;
  actions?: React.ReactNode;
};

export function ResumeCTA({ title, description, updatedLabel, actions }: ResumeCTAProps) {
  return (
    <section className="section-y">
      <Container>
        <Card className="gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 flex-col gap-2">
            <CardHeader className="p-0">
              <CardTitle className="text-2xl">{title}</CardTitle>
              {description ? (
                <p className="text-sm text-muted-foreground">{description}</p>
              ) : null}
            </CardHeader>
            {updatedLabel ? (
              <CardContent className="text-ui-label p-0 text-muted-foreground">
                {updatedLabel}
              </CardContent>
            ) : null}
          </div>
          <CardFooter className="p-0 md:justify-end">{actions}</CardFooter>
        </Card>
      </Container>
    </section>
  );
}
