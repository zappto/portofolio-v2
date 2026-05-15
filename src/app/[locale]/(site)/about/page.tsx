import { ArrowRight, Download, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { SectionHeader } from "@/components/shared/section-header";
import { Link } from "@/i18n/navigation";
import { getProfile, normalizeLocale } from "@/lib/portfolio/content";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = normalizeLocale(localeParam);
  const profile = await getProfile(locale);
  const copy = {
    id: {
      title: "Tentang saya",
      description:
        "Frontend engineer yang berpikir dalam sistem UI, performa, dan pengalaman membaca yang tenang.",
      identity: "Developer identity",
      principles: "Prinsip kerja",
      interests: "Interest teknis",
      contact: "Hubungi saya",
      resume: "Lihat resume",
    },
    en: {
      title: "About me",
      description:
        "A frontend engineer thinking in UI systems, performance, and calm reading experiences.",
      identity: "Developer identity",
      principles: "Work principles",
      interests: "Technical interests",
      contact: "Contact me",
      resume: "View resume",
    },
  }[locale];

  return (
    <>
      <PageHeader
        title={copy.title}
        description={copy.description}
        actions={
          <>
            <Button asChild>
              <Link href="/contact">
                {copy.contact}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/resume">
                {copy.resume}
                <Download aria-hidden="true" />
              </Link>
            </Button>
          </>
        }
      />

      <Container className="section-y grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <aside className="portfolio-card h-fit p-6">
          <div className="grid aspect-square place-items-center rounded-xl border border-border bg-muted">
            <span className="text-center font-heading text-5xl font-semibold">
              FE
            </span>
          </div>
          <h2 className="mt-6 text-2xl">{profile.name}</h2>
          <p className="mt-2 leading-7 text-muted-foreground">{profile.summary}</p>
          <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4" aria-hidden="true" />
            {profile.location}
          </p>
          <p className="mt-3 rounded-lg border border-border bg-muted/50 p-3 text-sm leading-6">
            {profile.availability}
          </p>
        </aside>

        <div className="space-y-12">
          <div className="portfolio-prose text-lg">
            {profile.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <section>
            <SectionHeader title={copy.identity} className="pb-6" />
            <div className="grid gap-3 sm:grid-cols-2">
              {profile.identity.map((item) => (
                <div key={item} className="portfolio-card p-4">
                  <Badge variant="secondary">Identity</Badge>
                  <p className="mt-4 font-medium">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHeader title={copy.principles} className="pb-6" />
            <div className="divide-y divide-border rounded-xl border border-border bg-card">
              {profile.principles.map((item, index) => (
                <div key={item} className="grid gap-3 p-4 sm:grid-cols-[3rem_1fr]">
                  <span className="font-mono text-sm text-muted-foreground">
                    0{index + 1}
                  </span>
                  <p className="leading-7">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHeader title={copy.interests} className="pb-6" />
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((item) => (
                <Badge key={item} variant="outline" className="h-7 px-3">
                  {item}
                </Badge>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
