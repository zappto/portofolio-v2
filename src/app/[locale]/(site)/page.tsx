import {
  ArrowRight,
  BookOpenText,
  BriefcaseBusiness,
  Code2,
  Download,
  Gauge,
  Layers3,
  Mail,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { Link } from "@/i18n/navigation";
import {
  getExperiencePreview,
  getFeaturedProjects,
  getFeaturedSkills,
  getLatestPosts,
  getProfile,
  getStatsSummary,
  normalizeLocale,
} from "@/lib/portfolio/content";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = normalizeLocale(localeParam);
  const [profile, projects, skills, posts, experiences, stats] =
    await Promise.all([
      getProfile(locale),
      getFeaturedProjects(locale),
      getFeaturedSkills(),
      getLatestPosts(locale),
      getExperiencePreview(locale),
      getStatsSummary(),
    ]);

  const copy = {
    id: {
      primaryCta: "Lihat project",
      secondaryCta: "Hubungi saya",
      resume: "Download resume",
      aboutTitle: "Frontend yang terasa seperti produk.",
      aboutDescription:
        "Fokus saya bukan hanya membuat layar terlihat rapi, tetapi membuat struktur UI mudah dipahami, cepat dirender, dan siap berkembang.",
      projectsTitle: "Project unggulan",
      projectsDescription:
        "Contoh pekerjaan yang menunjukkan arsitektur, sistem konten, dan kualitas interface.",
      skillsTitle: "Skills snapshot",
      skillsDescription:
        "Stack utama untuk membangun public website, CMS, dan UI system yang konsisten.",
      experienceTitle: "Experience preview",
      statsTitle: "Coding stats",
      blogTitle: "Tulisan terbaru",
      contactTitle: "Butuh frontend yang rapi dan cepat?",
      contactDescription:
        "Saya terbuka untuk role Frontend Engineer, kolaborasi produk, dan proyek UI engineering yang jelas scope-nya.",
      viewAll: "Lihat semua",
      read: "Baca catatan",
    },
    en: {
      primaryCta: "View projects",
      secondaryCta: "Contact me",
      resume: "Download resume",
      aboutTitle: "Frontend that feels like a product.",
      aboutDescription:
        "My focus is not only making screens look clean, but making UI structure understandable, fast to render, and ready to evolve.",
      projectsTitle: "Featured projects",
      projectsDescription:
        "Selected work showing architecture, content systems, and interface quality.",
      skillsTitle: "Skills snapshot",
      skillsDescription:
        "Core stack for building public websites, CMS flows, and consistent UI systems.",
      experienceTitle: "Experience preview",
      statsTitle: "Coding stats",
      blogTitle: "Latest writing",
      contactTitle: "Need a clean and fast frontend?",
      contactDescription:
        "I am open to Frontend Engineer roles, product collaboration, and clearly scoped UI engineering work.",
      viewAll: "View all",
      read: "Read note",
    },
  }[locale];

  return (
    <>
      <section className="border-b border-border/70">
        <Container
          wide
          className="grid min-h-[calc(100dvh-8rem)] content-center gap-12 py-16 lg:grid-cols-[1.12fr_0.88fr]"
        >
          <div className="max-w-4xl">
            <p className="text-ui-label mb-5 text-muted-foreground">
              {profile.eyebrow}
            </p>
            <h1 className="max-w-4xl text-balance">{profile.role}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              {profile.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/projects">
                  {copy.primaryCta}
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">
                  {copy.secondaryCta}
                  <Mail aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/resume">
                  {copy.resume}
                  <Download aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>

          <aside className="grid gap-3 self-center">
            <div className="portfolio-card p-6">
              <div className="mb-6 flex size-11 items-center justify-center rounded-xl bg-muted">
                <Layers3 className="size-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl">{copy.aboutTitle}</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                {copy.aboutDescription}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <Metric label="Projects" value={stats.projectsShipped} />
              <Metric label="Articles" value={stats.articlesWritten} />
              <Metric label="Tech" value={stats.technologiesUsed} />
            </div>
          </aside>
        </Container>
      </section>

      <section className="section-y">
        <Container>
          <SectionHeader
            eyebrow="01"
            title={copy.projectsTitle}
            description={copy.projectsDescription}
            aside={
              <Button asChild variant="outline">
                <Link href="/projects">{copy.viewAll}</Link>
              </Button>
            }
          />
          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            {projects.map((project, index) => (
              <Link
                key={project.title}
                href="/projects"
                className="portfolio-card group block p-5 transition-[border-color,box-shadow,transform] duration-[var(--duration-base)] hover:-translate-y-0.5 hover:border-border-strong motion-reduce:transform-none"
              >
                <div className="mb-8 flex items-center justify-between gap-4">
                  <Badge variant="outline">{project.type}</Badge>
                  <span className="font-mono text-xs text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-2xl">{project.title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">
                  {project.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-y border-y border-border/70 bg-muted/35">
        <Container>
          <SectionHeader
            eyebrow="02"
            title={copy.skillsTitle}
            description={copy.skillsDescription}
            aside={
              <Button asChild variant="outline">
                <Link href="/skills">{copy.viewAll}</Link>
              </Button>
            }
          />
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {skills.map((skill) => (
              <div key={skill.name} className="portfolio-card p-5">
                <Code2 className="mb-5 size-5" aria-hidden="true" />
                <h3 className="text-lg">{skill.name}</h3>
                <p className="mt-1 text-xs font-medium text-muted-foreground">
                  {skill.category}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-y">
        <Container className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionHeader
              eyebrow="03"
              title={copy.experienceTitle}
              description={profile.availability}
              aside={
                <Button asChild variant="outline">
                  <Link href="/experience">{copy.viewAll}</Link>
                </Button>
              }
            />
            <div className="space-y-4">
              {experiences.map((item) => (
                <div key={`${item.role}-${item.range}`} className="border-l border-border pl-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl">{item.role}</h3>
                    <Badge variant="secondary">{item.type}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.company} / {item.range}
                  </p>
                  <p className="mt-3 leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader
              eyebrow="04"
              title={copy.statsTitle}
              description={stats.performanceHighlights}
              aside={
                <Button asChild variant="outline">
                  <Link href="/coding-stats">{copy.viewAll}</Link>
                </Button>
              }
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <Stat icon={<BriefcaseBusiness />} label="Projects shipped" value={stats.projectsShipped} />
              <Stat icon={<BookOpenText />} label="Articles written" value={stats.articlesWritten} />
              <Stat icon={<Gauge />} label="UI experiments" value={stats.uiExperiments} />
              <Stat icon={<Layers3 />} label="Case studies" value={stats.caseStudies} />
            </div>
          </div>
        </Container>
      </section>

      <section className="section-y border-t border-border/70">
        <Container>
          <SectionHeader
            eyebrow="05"
            title={copy.blogTitle}
            description={locale === "id" ? "Catatan singkat seputar frontend, UI engineering, dan keputusan teknis." : "Short notes on frontend, UI engineering, and technical decisions."}
            aside={
              <Button asChild variant="outline">
                <Link href="/blog">{copy.viewAll}</Link>
              </Button>
            }
          />
          <div className="grid gap-5 md:grid-cols-2">
            {posts.map((post) => (
              <Link key={post.title} href="/blog" className="portfolio-card block p-5">
                <Badge variant="outline">{post.category}</Badge>
                <h3 className="mt-5 text-2xl">{post.title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{post.excerpt}</p>
                <p className="mt-6 text-sm font-medium">
                  {copy.read} / {post.readTime}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-y">
        <Container>
          <div className="portfolio-card grid gap-8 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div>
              <p className="text-ui-label text-muted-foreground">Contact CTA</p>
              <h2 className="mt-3 text-3xl">{copy.contactTitle}</h2>
              <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
                {copy.contactDescription}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/contact">{copy.secondaryCta}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/resume">{copy.resume}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="portfolio-card p-4">
      <p className="font-mono text-3xl font-semibold">{value}</p>
      <p className="mt-2 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactElement<{ className?: string; "aria-hidden"?: string }>;
  label: string;
  value: number;
}) {
  return (
    <div className="portfolio-card p-5">
      <div className="mb-5 flex size-10 items-center justify-center rounded-lg bg-muted">
        {icon}
      </div>
      <p className="font-mono text-3xl font-semibold">{value}</p>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
