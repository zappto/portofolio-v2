type EmptyStateProps = {
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  icon?: React.ReactNode;
};

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border/80 bg-muted/10 px-6 py-14 text-center">
      {icon}
      <div className="max-w-md space-y-2">
        <p className="font-heading text-base font-semibold text-foreground">{title}</p>
        {description ? (
          <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
