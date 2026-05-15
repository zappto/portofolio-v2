"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavigation } from "@/config/admin-navigation";

export function AdminBreadcrumb() {
  const pathname = usePathname();
  const current = adminNavigation.find((item) => item.href === pathname);
  const label =
    current?.label ??
    pathname
      .split("/")
      .filter(Boolean)
      .at(-1)
      ?.replaceAll("-", " ") ??
    "Dashboard";

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm">
      <Link
        href="/admin"
        className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        Admin
      </Link>
      <ChevronRight aria-hidden="true" />
      <span className="font-medium capitalize text-foreground">{label}</span>
    </nav>
  );
}
