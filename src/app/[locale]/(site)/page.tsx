import { ArrowRight, BriefcaseBusiness, Gauge, Layers3 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default async function HomePage() {
  const t = await getTranslations("HomePage");

  return (
    <section className="container-wide grid min-h-[calc(100dvh-9rem)] content-center gap-10 py-16 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="flex max-w-3xl flex-col justify-center">
        <p className="text-ui-label mb-5 text-muted-foreground">
          {t("eyebrow")}
        </p>
        <h1>{t("title")}</h1>
        <p className="text-body-relaxed mt-6 max-w-2xl text-muted-foreground sm:text-lg">
          {t("description")}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/projects">
              {t("primaryCta")}
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">{t("secondaryCta")}</Link>
          </Button>
        </div>
      </div>

      <aside className="grid content-center gap-3">
        <div className="portfolio-card p-5">
          <div className="mb-4 flex size-10 items-center justify-center rounded-md bg-muted">
            <Layers3 className="size-5" aria-hidden="true" />
          </div>
          <h2 className="font-heading text-xl font-semibold">
            {t("overviewTitle")}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {t("overviewDescription")}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <div className="portfolio-card p-4">
            <BriefcaseBusiness className="mb-3 size-5" aria-hidden="true" />
            <p className="text-sm font-medium">Recruiter-ready structure</p>
          </div>
          <div className="portfolio-card p-4">
            <Gauge className="mb-3 size-5" aria-hidden="true" />
            <p className="text-sm font-medium">Performance-first foundation</p>
          </div>
        </div>
      </aside>
    </section>
  );
}
