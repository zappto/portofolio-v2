import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { Link } from "@/i18n/navigation";
import { getFeaturedProjects, normalizeLocale } from "@/lib/portfolio/content";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = normalizeLocale(localeParam);
  const projects = await getFeaturedProjects(locale);
  const copy = {
    id: {
      title: "Projects",
      description:
        "Daftar awal project unggulan. Filter, sorting, dan detail lengkap masuk milestone Projects Module.",
      open: "Buka ringkasan",
    },
    en: {
      title: "Projects",
      description:
        "An initial list of featured projects. Filtering, sorting, and full details belong to the Projects Module milestone.",
      open: "Open summary",
    },
  }[locale];

  return (
    <>
      <PageHeader title={copy.title} description={copy.description} />
      <Container className="section-y">
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <Link key={project.title} href="/projects" className="portfolio-card block p-5">
              <Badge variant="secondary">{project.type}</Badge>
              <h2 className="mt-5 text-2xl">{project.title}</h2>
              <p className="mt-3 leading-7 text-muted-foreground">{project.excerpt}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <Badge key={tech} variant="outline">{tech}</Badge>
                ))}
              </div>
              <p className="mt-6 text-sm font-medium">{copy.open}</p>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
