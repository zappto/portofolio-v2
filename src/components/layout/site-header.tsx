"use client";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { utilityNavigation } from "@/config/navigation";
import { useVisualMode } from "@/components/theme/visual-mode-provider";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { VisualModeToggle } from "@/components/layout/visual-mode-toggle";
import {
  MobileNav,
  type MobileNavItem,
} from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

type SiteHeaderProps = {
  navItems: MobileNavItem[];
  resumeLabel: string;
  mobileSheetTitle: string;
};

export function SiteHeader({
  navItems,
  resumeLabel,
  mobileSheetTitle,
}: SiteHeaderProps) {
  const { visualMode } = useVisualMode();

  return (
    <header
      className={cn(
        "portfolio-nav sticky top-0 z-40",
        visualMode === "playful" ? "portfolio-nav-playful" : null,
      )}
    >
      <div className="container-wide flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-heading text-sm font-semibold tracking-normal"
        >
          {siteConfig.author}
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="outline" size="sm">
            <Link href={utilityNavigation.resume}>{resumeLabel}</Link>
          </Button>
          <ThemeSwitcher />
          <VisualModeToggle />
          <LocaleSwitcher />
        </div>

        <MobileNav
          items={navItems}
          sheetTitle={mobileSheetTitle}
          resumeLabel={resumeLabel}
        />
      </div>
    </header>
  );
}
