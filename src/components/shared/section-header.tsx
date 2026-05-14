import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: string;
  description?: React.ReactNode;
  eyebrow?: string;
  className?: string;
  aside?: React.ReactNode;
};

export function SectionHeader({
  title,
  description,
  eyebrow,
  className,
  aside,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 pb-10 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl space-y-2">
        {eyebrow ? (
          <span className="text-ui-label text-muted-foreground">{eyebrow}</span>
        ) : null}
        <div className="space-y-2">
          <h2 className="text-foreground">{title}</h2>
          {description ? (
            <p className="text-body-relaxed text-muted-foreground">{description}</p>
          ) : null}
        </div>
      </div>
      {aside ? <div className="flex shrink-0 gap-3">{aside}</div> : null}
    </div>
  );
}
