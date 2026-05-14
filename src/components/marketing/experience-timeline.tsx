import { cn } from "@/lib/utils";
import type { PortfolioNavVariant } from "@/components/marketing/types";

type TimelineItem = {
  id: string;
  title: string;
  subtitle?: string;
  period?: string;
  body?: React.ReactNode;
  tags?: readonly string[];
};

type ExperienceTimelineProps = {
  items: TimelineItem[];
  variant?: PortfolioNavVariant;
};

export function ExperienceTimeline({ items, variant = "professional" }: ExperienceTimelineProps) {
  return (
    <ol className="relative flex flex-col gap-8">
      {items.map((item, index) => (
        <li key={item.id} className="flex gap-6">
          <div className="flex flex-col items-center">
            <span
              className={cn(
                "size-3 rounded-full border border-border bg-card",
                variant === "playful" && "size-4 border-2 border-border-strong",
              )}
            />
            {index < items.length - 1 ? (
              <span aria-hidden className="mt-2 min-h-12 w-px flex-1 bg-border" />
            ) : null}
          </div>
          <div className="flex-1 space-y-2 pb-6">
            <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
              <p className="font-heading text-lg font-semibold">{item.title}</p>
              {item.period ? (
                <p className="text-ui-label text-muted-foreground">{item.period}</p>
              ) : null}
            </div>
            {item.subtitle ? (
              <p className="text-sm font-medium text-muted-foreground">{item.subtitle}</p>
            ) : null}
            {item.body}
            {item.tags?.length ? (
              <div className="flex flex-wrap gap-2 pt-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
