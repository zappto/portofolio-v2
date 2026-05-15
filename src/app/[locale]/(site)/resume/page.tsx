import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { getResume, normalizeLocale } from "@/lib/portfolio/content";

export default async function ResumePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = normalizeLocale(localeParam);
  const resume = await getResume(locale);
  const copy = {
    id: {
      title: "Resume",
      description:
        "Preview resume berbasis locale, informasi versi, dan placeholder tracking download.",
      preview: "Resume preview",
      updated: "Terakhir diperbarui",
      tracking: "Download event placeholder: resume_download",
    },
    en: {
      title: "Resume",
      description:
        "Locale-based resume preview, version information, and a download tracking placeholder.",
      preview: "Resume preview",
      updated: "Last updated",
      tracking: "Download event placeholder: resume_download",
    },
  }[locale];

  return (
    <>
      <PageHeader
        title={copy.title}
        description={copy.description}
        actions={
          <Button asChild>
            <a href={resume.fileUrl} download>
              {resume.fileLabel}
              <Download aria-hidden="true" />
            </a>
          </Button>
        }
      />
      <Container className="section-y grid gap-8 lg:grid-cols-[1fr_0.42fr]">
        <section className="portfolio-card min-h-[34rem] p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5">
            <div>
              <p className="text-ui-label text-muted-foreground">{copy.preview}</p>
              <h2 className="mt-2 text-3xl">Frontend Engineer</h2>
            </div>
            <Badge variant="secondary">{resume.version}</Badge>
          </div>
          <p className="mt-6 max-w-2xl leading-7 text-muted-foreground">{resume.summary}</p>
          <div className="mt-8 space-y-3">
            {resume.highlights.map((item) => (
              <div key={item} className="rounded-lg border border-border bg-muted/35 p-4">
                {item}
              </div>
            ))}
          </div>
        </section>
        <aside className="portfolio-card h-fit p-6">
          <p className="text-ui-label text-muted-foreground">{copy.updated}</p>
          <p className="mt-2 text-2xl">{resume.updated}</p>
          <p className="mt-6 rounded-lg border border-border bg-muted/40 p-3 font-mono text-xs text-muted-foreground">
            {copy.tracking}
          </p>
        </aside>
      </Container>
    </>
  );
}
