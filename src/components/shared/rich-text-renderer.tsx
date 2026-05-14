import "server-only";

import { cn } from "@/lib/utils";

type RichTextRendererProps = {
  html: string;
  className?: string;
};

/**
 * Consumes sanitized HTML emitted at publish-time via the CMS pipeline.
 */
export function RichTextRenderer({ html, className }: RichTextRendererProps) {
  if (!html) {
    return null;
  }

  return (
    <div
      className={cn("portfolio-prose", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
