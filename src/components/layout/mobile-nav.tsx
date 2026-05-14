"use client";

import { Menu } from "lucide-react";
import { useMemo, useState } from "react";

import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { VisualModeToggle } from "@/components/layout/visual-mode-toggle";
import { utilityNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export type MobileNavItem = { href: string; label: string };

type MobileNavProps = {
  items: MobileNavItem[];
  sheetTitle: string;
  resumeLabel: string;
};

export function MobileNav({ items, sheetTitle, resumeLabel }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const brand = useMemo(() => siteConfig.author, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon-sm"
          tone="inherit"
          aria-label={sheetTitle}
          className="md:hidden"
          type="button"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col gap-6">
        <SheetHeader>
          <SheetTitle>{sheetTitle}</SheetTitle>
          <p className="text-left text-sm font-medium text-foreground">
            {brand}
          </p>
        </SheetHeader>
        <nav aria-label={sheetTitle} className="flex flex-col gap-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={utilityNavigation.resume}
            className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
            onClick={() => setOpen(false)}
          >
            {resumeLabel}
          </Link>
        </nav>
        <div className="mt-auto flex flex-col gap-4 border-t border-border/60 pt-6">
          <div className="flex flex-wrap gap-2">
            <ThemeSwitcher />
            <LocaleSwitcher />
          </div>
          <VisualModeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
}
