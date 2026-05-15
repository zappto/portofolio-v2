"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const adminContentSchema = z.object({
  title: z.string().min(6, "Title needs at least 6 characters."),
  slug: z
    .string()
    .min(3, "Slug needs at least 3 characters.")
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and dashes."),
  excerpt: z.string().min(24, "Excerpt should explain the content clearly."),
  status: z.enum(["draft", "published", "archived"]),
});

type AdminContentForm = z.infer<typeof adminContentSchema>;

export function AdminFormPattern() {
  const form = useForm<AdminContentForm>({
    resolver: zodResolver(adminContentSchema),
    mode: "onChange",
    defaultValues: {
      title: "Portfolio CMS Foundation",
      slug: "portfolio-cms-foundation",
      excerpt:
        "Architecture notes for the dynamic portfolio CMS and professional public pages.",
      status: "draft",
    },
    shouldFocusError: true,
  });
  const {
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = form;

  useEffect(() => {
    function handleBeforeUnload(event: BeforeUnloadEvent) {
      if (!isDirty) {
        return;
      }

      event.preventDefault();
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  async function onSubmit(data: AdminContentForm) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (data.title.toLowerCase().includes("error")) {
      toast.error("Save failed", {
        description: "Remove the word error from the title and try again.",
      });
      return;
    }

    toast.success("Draft saved", {
      description: "Validation passed and the form state was reset.",
    });
    reset(data);
  }

  return (
    <section className="portfolio-card p-5">
      <div className="flex flex-col gap-2 border-b border-border pb-5">
        <h2 className="text-2xl">Admin form pattern</h2>
        <p className="text-sm text-muted-foreground">
          React Hook Form, Zod validation, field errors, loading state, dirty warning,
          and toast feedback.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <FieldGroup>
          <Field data-invalid={!!errors.title}>
            <FieldLabel htmlFor="admin-title">Title</FieldLabel>
            <Input
              id="admin-title"
              aria-invalid={!!errors.title}
              autoComplete="off"
              {...register("title")}
            />
            <FieldDescription>Use a concrete content title.</FieldDescription>
            <FieldError errors={[errors.title]} />
          </Field>

          <Field data-invalid={!!errors.slug}>
            <FieldLabel htmlFor="admin-slug">Slug</FieldLabel>
            <Input
              id="admin-slug"
              aria-invalid={!!errors.slug}
              autoComplete="off"
              {...register("slug")}
            />
            <FieldDescription>Lowercase URL segment for routing.</FieldDescription>
            <FieldError errors={[errors.slug]} />
          </Field>

          <Field data-invalid={!!errors.excerpt}>
            <FieldLabel htmlFor="admin-excerpt">Excerpt</FieldLabel>
            <Textarea
              id="admin-excerpt"
              aria-invalid={!!errors.excerpt}
              className="min-h-28"
              {...register("excerpt")}
            />
            <FieldDescription>Short summary shown on public cards.</FieldDescription>
            <FieldError errors={[errors.excerpt]} />
          </Field>

          <Field data-invalid={!!errors.status}>
            <FieldLabel htmlFor="admin-status">Status</FieldLabel>
            <select
              id="admin-status"
              aria-invalid={!!errors.status}
              className="h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              {...register("status")}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
            <FieldError errors={[errors.status]} />
          </Field>

          {isDirty ? (
            <p className="rounded-lg border border-warning/30 bg-warning/10 p-3 text-sm text-muted-foreground">
              Dirty state warning: this draft has unsaved changes.
            </p>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 data-icon="inline-start" aria-hidden="true" />
              ) : null}
              {isSubmitting ? "Saving…" : "Save Draft"}
            </Button>
            <Button type="button" variant="outline" onClick={() => reset()}>
              Reset
            </Button>
          </div>
        </FieldGroup>
      </form>
    </section>
  );
}
