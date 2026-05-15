import Link from "next/link";
import { adminNavigation } from "@/config/admin-navigation";
import { cn } from "@/lib/utils";

type AdminSidebarProps = {
  className?: string;
};

export function AdminSidebar({ className }: AdminSidebarProps) {
  return (
    <aside
      className={cn(
        "hidden border-r border-border bg-background/95 lg:block",
        className,
      )}
    >
      <div className="flex h-16 items-center border-b border-border px-5">
        <div>
          <p className="font-heading text-sm font-semibold">Portfolio Admin</p>
          <p className="text-xs text-muted-foreground">Content operating panel</p>
        </div>
      </div>
      <nav aria-label="Admin navigation" className="flex flex-col gap-1 p-3">
        {adminNavigation.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-9 items-center gap-3 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-[background-color,color] hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
            >
              <Icon aria-hidden="true" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
