export function ExternalLink({
  children,
  className,
  rel = "noopener noreferrer",
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={className} rel={rel} {...props}>
      {children}
    </a>
  );
}
