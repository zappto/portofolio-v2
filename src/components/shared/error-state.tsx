type ErrorStateProps = {
  title: string;
  description?: React.ReactNode;
  retry?: React.ReactNode;
};

export function ErrorState({ title, description, retry }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col gap-4 rounded-xl border border-danger/35 bg-danger/5 px-6 py-8 text-danger"
    >
      <div className="space-y-2">
        <p className="font-heading font-semibold text-danger">{title}</p>
        {description ? (
          <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {retry}
    </div>
  );
}
