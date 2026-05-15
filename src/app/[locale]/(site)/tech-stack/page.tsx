import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { Link } from "@/i18n/navigation";
import { getTechStack, normalizeLocale, uniqueValues } from "@/lib/portfolio/content";

export default async function TechStackPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const [{ locale: localeParam }, query] = await Promise.all([params, searchParams]);
  const locale = normalizeLocale(localeParam);
  const stack = await getTechStack(locale);
  const categories = uniqueValues(stack.map((item) => item.category));
  const category = query.category ?? "All";
  const filtered =
    category === "All" ? stack : stack.filter((item) => item.category === category);
  const copy = {
    id: {
      title: "Tech stack",
      description:
        "Tools yang dipakai, alasan pemilihan, dan hubungannya dengan project portfolio.",
      all: "Semua",
      reason: "Kenapa dipakai",
      related: "Related project",
    },
    en: {
      title: "Tech stack",
      description:
        "Tools in use, why they were selected, and how they relate to portfolio projects.",
      all: "All",
      reason: "Why I use it",
      related: "Related project",
    },
  }[locale];

  return (
    <>
      <PageHeader title={copy.title} description={copy.description} />
      <Container className="section-y space-y-8">
        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm" variant={category === "All" ? "default" : "outline"}>
            <Link href="/tech-stack">{copy.all}</Link>
          </Button>
          {categories.map((item) => (
            <Button key={item} asChild size="sm" variant={category === item ? "default" : "outline"}>
              <Link href={{ pathname: "/tech-stack", query: { category: item } }}>{item}</Link>
            </Button>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((item) => (
            <article key={item.name} className="portfolio-card p-5">
              <Badge variant="secondary">{item.category}</Badge>
              <h2 className="mt-5 text-2xl">{item.name}</h2>
              <p className="mt-3 leading-7 text-muted-foreground">{item.description}</p>
              <div className="mt-6 grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
                <div>
                  <p className="text-ui-label text-muted-foreground">{copy.reason}</p>
                  <p className="mt-2 text-sm leading-6">{item.reason}</p>
                </div>
                <div>
                  <p className="text-ui-label text-muted-foreground">{copy.related}</p>
                  <p className="mt-2 text-sm leading-6">{item.relatedProject}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}
