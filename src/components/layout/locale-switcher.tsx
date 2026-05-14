"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const alternateLocale = locale === "id" ? "en" : "id";

  return (
    <Link
      href={pathname}
      locale={alternateLocale}
      className="inline-flex h-9 items-center rounded-md border border-border/80 px-3 text-sm font-medium uppercase transition-colors hover:bg-muted"
    >
      {alternateLocale}
    </Link>
  );
}
