import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  description?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
};

export function PageHeader({
  title,
  description,
  breadcrumbs,
  className,
  actions,
}: PageHeaderProps) {
  return (
    <section className={cn("section-y pt-16", className)}>
      <div className="container-page flex flex-col gap-6">
        {breadcrumbs}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-3">
            <h1>{title}</h1>
            {description ? (
              <p className="text-lg text-muted-foreground md:text-xl">{description}</p>
            ) : null}
          </div>
          {actions ? (
            <div className="flex flex-wrap gap-3 md:justify-end">{actions}</div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
