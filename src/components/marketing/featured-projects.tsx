import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";

type FeaturedProjectsProps = {
  sectionTitle: string;
  sectionDescription?: React.ReactNode;
  eyebrow?: string;
  children: React.ReactNode;
};

export function FeaturedProjects({
  sectionTitle,
  sectionDescription,
  eyebrow,
  children,
}: FeaturedProjectsProps) {
  return (
    <section className="section-y">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={sectionTitle} description={sectionDescription} />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{children}</div>
      </Container>
    </section>
  );
}
