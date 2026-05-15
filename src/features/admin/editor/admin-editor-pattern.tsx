"use client";

import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("./rich-text-editor"), {
  ssr: false,
  loading: () => (
    <div className="portfolio-card p-5 text-sm text-muted-foreground">
      Loading editor…
    </div>
  ),
});

export function AdminEditorPattern() {
  return <RichTextEditor />;
}
