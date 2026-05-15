import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { getExperiences, normalizeLocale } from "@/lib/portfolio/content";

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = normalizeLocale(localeParam);
  const experiences = await getExperiences(locale);
  const copy = {
    id: {
      title: "Experience",
      description:
        "Timeline pengalaman kerja, project-based work, dan latihan sistem frontend yang relevan.",
      empty: "Experience belum tersedia.",
      achievements: "Highlights",
    },
    en: {
      title: "Experience",
      description:
        "A timeline of work, project-based practice, and relevant frontend system experience.",
      empty: "No experience is available yet.",
      achievements: "Highlights",
    },
  }[locale];

  return (
    <>
      <PageHeader title={copy.title} description={copy.description} />
      <Container className="section-y">
        {experiences.length ? (
          <div className="space-y-5">
            {experiences.map((item) => (
              <article
                key={`${item.role}-${item.range}`}
                className="grid gap-5 border-l border-border py-2 pl-5 md:grid-cols-[0.72fr_1.28fr]"
              >
                <div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{item.type}</Badge>
                    <Badge variant="outline">{item.location}</Badge>
                  </div>
                  <h2 className="mt-4 text-2xl">{item.role}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.company} / {item.range}
                  </p>
                </div>
                <div className="portfolio-card p-5">
                  <p className="leading-7 text-muted-foreground">{item.description}</p>
                  <h3 className="mt-6 font-medium">{copy.achievements}</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                    {item.achievements.map((achievement) => (
                      <li key={achievement}>- {achievement}</li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tech.map((tech) => (
                      <Badge key={tech} variant="outline">{tech}</Badge>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="portfolio-card p-8 text-center text-muted-foreground">{copy.empty}</div>
        )}
      </Container>
    </>
  );
}
