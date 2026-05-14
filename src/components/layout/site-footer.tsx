import { getTranslations } from "next-intl/server";

export async function SiteFooter() {
  const footer = await getTranslations("Footer");

  return (
    <footer className="border-t border-border/70">
      <div className="container-wide flex flex-col gap-3 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>{footer("summary")}</p>
        <p>{footer("tagline")}</p>
      </div>
    </footer>
  );
}
