import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { SectionHeader } from "@/components/shared/section-header";
import { Link } from "@/i18n/navigation";
import {
  getLearningSkills,
  getSkills,
  normalizeLocale,
  uniqueValues,
} from "@/lib/portfolio/content";

export default async function SkillsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; category?: string; level?: string }>;
}) {
  const [{ locale: localeParam }, query] = await Promise.all([params, searchParams]);
  const locale = normalizeLocale(localeParam);
  const [skills, learningSkills] = await Promise.all([
    getSkills(),
    getLearningSkills(),
  ]);
  const categories = uniqueValues(skills.map((skill) => skill.category));
  const levels = uniqueValues(skills.map((skill) => skill.level));
  const coreStrengths = skills.filter((skill) => skill.priority === "primary");
  const q = query.q?.trim().toLowerCase() ?? "";
  const category = query.category ?? "All";
  const level = query.level ?? "All";
  const filtered = skills.filter((skill) => {
    const matchesQuery =
      !q ||
      skill.name.toLowerCase().includes(q) ||
      skill.description.toLowerCase().includes(q) ||
      skill.related.some((item) => item.toLowerCase().includes(q)) ||
      skill.projects.some((item) => item.toLowerCase().includes(q));
    const matchesCategory = category === "All" || skill.category === category;
    const matchesLevel = level === "All" || skill.level === level;
    return matchesQuery && matchesCategory && matchesLevel;
  });
  const copy = {
    id: {
      title: "Skills",
      description:
        "Skill matrix berbasis evidence: core frontend, UI engineering, design system, performance, dan supporting backend integration.",
      coreTitle: "Core strengths",
      coreDescription:
        "Skill utama yang paling relevan untuk positioning Frontend Engineer.",
      allTitle: "All skills",
      allDescription:
        "Filter berdasarkan kategori atau cari skill, tool, dan project pembukti.",
      learningTitle: "Currently improving",
      learningDescription:
        "Area yang sedang dikembangkan, ditampilkan sebagai learning agar tidak terlihat seperti klaim berlebihan.",
      search: "Cari skill",
      all: "Semua",
      allLevels: "Semua level",
      years: "tahun",
      usedIn: "Used in",
      empty: "Tidak ada skill yang cocok dengan filter ini.",
    },
    en: {
      title: "Skills",
      description:
        "An evidence-based skill matrix across frontend core, UI engineering, design systems, performance, and supporting backend integration.",
      coreTitle: "Core strengths",
      coreDescription:
        "The primary skills most relevant to the Frontend Engineer positioning.",
      allTitle: "All skills",
      allDescription:
        "Filter by category or search for skills, tools, and proof projects.",
      learningTitle: "Currently improving",
      learningDescription:
        "Areas under active improvement, shown as learning instead of inflated claims.",
      search: "Search skill",
      all: "All",
      allLevels: "All levels",
      years: "years",
      usedIn: "Used in",
      empty: "No skills match this filter.",
    },
  }[locale];

  return (
    <>
      <PageHeader title={copy.title} description={copy.description} />
      <Container className="section-y space-y-8">
        <section>
          <SectionHeader
            title={copy.coreTitle}
            description={copy.coreDescription}
            className="pb-6"
          />
          <div className="grid gap-4 md:grid-cols-2">
            {coreStrengths.map((skill) => (
              <SkillArticle key={skill.name} skill={skill} copy={copy} prominent />
            ))}
          </div>
        </section>

        <SectionHeader
          title={copy.allTitle}
          description={copy.allDescription}
          className="pb-0 pt-8"
        />

        <form className="portfolio-card grid gap-4 p-4 md:grid-cols-[1fr_auto]">
          <label className="relative block">
            <span className="sr-only">{copy.search}</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              defaultValue={query.q}
              placeholder={`${copy.search}…`}
              className="h-10 pl-9"
            />
          </label>
          <input type="hidden" name="category" value={category === "All" ? "" : category} />
          <input type="hidden" name="level" value={level === "All" ? "" : level} />
          <Button type="submit" variant="outline">Filter</Button>
        </form>

        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm" variant={category === "All" ? "default" : "outline"}>
            <Link href="/skills">{copy.all}</Link>
          </Button>
          {categories.map((item) => (
            <Button
              key={item}
              asChild
              size="sm"
              variant={category === item ? "default" : "outline"}
            >
              <Link
                href={{
                  pathname: "/skills",
                  query: {
                    category: item,
                    ...(query.q ? { q: query.q } : {}),
                    ...(level !== "All" ? { level } : {}),
                  },
                }}
              >
                {item}
              </Link>
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm" variant={level === "All" ? "default" : "outline"}>
            <Link
              href={{
                pathname: "/skills",
                query: {
                  ...(query.q ? { q: query.q } : {}),
                  ...(category !== "All" ? { category } : {}),
                },
              }}
            >
              {copy.allLevels}
            </Link>
          </Button>
          {levels.map((item) => (
            <Button
              key={item}
              asChild
              size="sm"
              variant={level === item ? "default" : "outline"}
            >
              <Link
                href={{
                  pathname: "/skills",
                  query: {
                    level: item,
                    ...(query.q ? { q: query.q } : {}),
                    ...(category !== "All" ? { category } : {}),
                  },
                }}
              >
                {item}
              </Link>
            </Button>
          ))}
        </div>

        {filtered.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((skill) => (
              <SkillArticle key={skill.name} skill={skill} copy={copy} />
            ))}
          </div>
        ) : (
          <div className="portfolio-card p-8 text-center text-muted-foreground">{copy.empty}</div>
        )}

        <section>
          <SectionHeader
            title={copy.learningTitle}
            description={copy.learningDescription}
            className="pb-6 pt-8"
          />
          <div className="grid gap-4 md:grid-cols-2">
            {learningSkills.map((skill) => (
              <SkillArticle key={skill.name} skill={skill} copy={copy} />
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}

type Skill = Awaited<ReturnType<typeof getSkills>>[number];

type SkillArticleProps = {
  skill: Skill;
  copy: {
    years: string;
    usedIn: string;
  };
  prominent?: boolean;
};

function SkillArticle({ skill, copy, prominent = false }: SkillArticleProps) {
  return (
    <article className="portfolio-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-4 grid size-11 place-items-center rounded-lg border border-border bg-muted font-mono text-sm font-semibold">
            {getSkillInitials(skill.name)}
          </div>
          <h2 className={prominent ? "text-3xl" : "text-2xl"}>{skill.name}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{skill.category}</p>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <Badge variant="secondary">{skill.level}</Badge>
          <Badge variant="outline">{skill.priority}</Badge>
        </div>
      </div>
      <p className="mt-4 leading-7 text-muted-foreground">{skill.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <Badge variant="outline">
          {skill.years} {copy.years}
        </Badge>
        {skill.related.map((item) => (
          <Badge key={item} variant="outline">
            {item}
          </Badge>
        ))}
      </div>
      <div className="mt-5 border-t border-border pt-4">
        <p className="text-ui-label text-muted-foreground">{copy.usedIn}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {skill.projects.map((project) => (
            <Badge key={project} variant="secondary">
              {project}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
}

function getSkillInitials(name: string) {
  if (name === "Next.js") {
    return "NX";
  }

  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
