import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { publicNavigation, utilityNavigation } from "@/config/navigation";
import { ThemeControls } from "@/components/theme/theme-controls";
import { Link } from "@/i18n/navigation";

type SiteShellProps = {
  children: React.ReactNode;
};

export async function SiteShell({ children }: SiteShellProps) {
  const navigation = await getTranslations("Navigation");
  const footer = await getTranslations("Footer");

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <header className="portfolio-nav sticky top-0 z-40">
        <div className="container-wide flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            className="font-heading text-sm font-semibold tracking-normal"
          >
            Frontend Engineer
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex"
          >
            {publicNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-foreground"
              >
                {navigation(item.labelKey)}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button asChild variant="outline" size="sm">
              <Link href={utilityNavigation.resume}>Resume</Link>
            </Button>
            <ThemeControls />
          </div>
        </div>

        <div className="border-t border-border/60 md:hidden">
          <div className="container-wide flex items-center gap-3 overflow-x-auto py-3">
            <nav
              aria-label="Mobile navigation"
              className="flex min-w-max items-center gap-4 text-sm font-medium text-muted-foreground"
            >
              {publicNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {navigation(item.labelKey)}
                </Link>
              ))}
            </nav>
            <div className="ml-auto">
              <ThemeControls />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border/70">
        <div className="container-wide flex flex-col gap-3 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>{footer("summary")}</p>
          <p>Professional first. Playful when useful.</p>
        </div>
      </footer>
    </div>
  );
}
