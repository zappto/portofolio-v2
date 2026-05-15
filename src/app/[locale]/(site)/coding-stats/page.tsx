import { BookOpenText, BriefcaseBusiness, FlaskConical, Layers3, Wrench } from "lucide-react";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { getStatsSummary, normalizeLocale } from "@/lib/portfolio/content";

export default async function CodingStatsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = normalizeLocale(localeParam);
  const stats = await getStatsSummary();
  const copy = {
    id: {
      title: "Coding stats",
      description:
        "Statistik curated untuk memberi konteks kredibilitas tanpa bergantung pada live GitHub stats.",
      projects: "Projects shipped",
      articles: "Articles written",
      experiments: "UI experiments",
      tech: "Technologies used",
      cases: "Case studies",
    },
    en: {
      title: "Coding stats",
      description:
        "Curated stats that add credibility without depending on live GitHub statistics.",
      projects: "Projects shipped",
      articles: "Articles written",
      experiments: "UI experiments",
      tech: "Technologies used",
      cases: "Case studies",
    },
  }[locale];
  const items = [
    { label: copy.projects, value: stats.projectsShipped, icon: BriefcaseBusiness },
    { label: copy.articles, value: stats.articlesWritten, icon: BookOpenText },
    { label: copy.experiments, value: stats.uiExperiments, icon: FlaskConical },
    { label: copy.tech, value: stats.technologiesUsed, icon: Wrench },
    { label: copy.cases, value: stats.caseStudies, icon: Layers3 },
  ];

  return (
    <>
      <PageHeader title={copy.title} description={copy.description} />
      <Container className="section-y">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map(({ label, value, icon: Icon }) => (
            <article key={label} className="portfolio-card p-6">
              <Icon className="size-5 text-muted-foreground" aria-hidden="true" />
              <p className="mt-8 font-mono text-5xl font-semibold">{value}</p>
              <h2 className="mt-3 text-lg">{label}</h2>
            </article>
          ))}
          <article className="portfolio-card p-6 md:col-span-2 xl:col-span-1">
            <p className="text-ui-label text-muted-foreground">Performance</p>
            <h2 className="mt-6 text-3xl">{stats.performanceHighlights}</h2>
          </article>
        </div>
      </Container>
    </>
  );
}
