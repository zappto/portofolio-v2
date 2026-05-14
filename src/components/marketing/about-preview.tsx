import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";

type AboutPreviewProps = {
  title: string;
  description: React.ReactNode;
  cta?: React.ReactNode;
  media?: React.ReactNode;
};

export function AboutPreview({ title, description, cta, media }: AboutPreviewProps) {
  return (
    <section className="section-y">
      <Container className="flex flex-col gap-10 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-6">
          <SectionHeader title={title} description={description} />
          {cta ? <div className="flex flex-wrap gap-3">{cta}</div> : null}
        </div>
        {media ? (
          <div className="flex flex-1 justify-center lg:justify-end">{media}</div>
        ) : null}
      </Container>
    </section>
  );
}
