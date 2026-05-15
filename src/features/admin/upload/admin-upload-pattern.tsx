"use client";

import { ImageIcon, Loader2, Trash2, Upload } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/browser";

const allowedTypes = ["image/png", "image/jpeg", "image/webp", "application/pdf"];
const maxFileSize = 4 * 1024 * 1024;
const buckets = ["avatars", "projects", "blogs", "case-studies", "playground", "resumes", "general"];

type UploadResult = {
  bucket: string;
  path: string;
  publicUrl: string;
  type: string;
};

export function AdminUploadPattern() {
  const [bucket, setBucket] = useState("general");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const previewUrl = useMemo(() => {
    if (!file || !file.type.startsWith("image/")) {
      return "";
    }

    return URL.createObjectURL(file);
  }, [file]);

  function validateFile(nextFile: File) {
    if (!allowedTypes.includes(nextFile.type)) {
      return "Use PNG, JPG, WebP, or PDF files.";
    }

    if (nextFile.size > maxFileSize) {
      return "File must be 4 MB or smaller.";
    }

    return "";
  }

  async function uploadFile() {
    if (!file) {
      setError("Choose a file before uploading.");
      return;
    }

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setPending(true);
    setError("");

    const extension = file.name.split(".").pop() ?? "bin";
    const path = `admin/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${extension}`;
    const supabase = createClient();
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      setError(uploadError.message);
      setPending(false);
      return;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    setResult({
      bucket,
      path,
      publicUrl: data.publicUrl,
      type: file.type,
    });
    setPending(false);
  }

  async function deleteUploadedFile() {
    if (!result) {
      return;
    }

    setPending(true);
    const supabase = createClient();
    const { error: deleteError } = await supabase.storage
      .from(result.bucket)
      .remove([result.path]);

    if (deleteError) {
      setError(deleteError.message);
      setPending(false);
      return;
    }

    setResult(null);
    setPending(false);
  }

  return (
    <section className="portfolio-card p-5">
      <div className="flex flex-col gap-2 border-b border-border pb-5">
        <h2 className="text-2xl">Upload system pattern</h2>
        <p className="text-sm text-muted-foreground">
          File type and size validation, Supabase Storage upload, public URL return,
          preview, and delete/replace support.
        </p>
      </div>
      <div className="mt-5 grid gap-5">
        <label className="grid gap-2">
          <span className="text-sm font-medium">Storage bucket</span>
          <select
            value={bucket}
            onChange={(event) => setBucket(event.target.value)}
            className="h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {buckets.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="grid min-h-40 cursor-pointer place-items-center rounded-xl border border-dashed border-border bg-muted/30 p-5 text-center transition-[background-color,border-color] hover:border-border-strong hover:bg-muted/50">
          <input
            type="file"
            accept={allowedTypes.join(",")}
            className="sr-only"
            onChange={(event) => {
              const nextFile = event.target.files?.[0] ?? null;
              setResult(null);
              setFile(nextFile);
              setError(nextFile ? validateFile(nextFile) : "");
            }}
          />
          <span className="grid gap-3">
            <ImageIcon className="mx-auto text-muted-foreground" aria-hidden="true" />
            <span className="font-medium">
              {file ? file.name : "Choose image or resume file"}
            </span>
            <span className="text-sm text-muted-foreground">
              PNG, JPG, WebP, or PDF up to 4 MB.
            </span>
          </span>
        </label>

        {previewUrl ? (
          <div className="overflow-hidden rounded-xl border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element -- local object URL preview */}
            <img src={previewUrl} alt="Selected upload preview" className="max-h-72 w-full object-cover" />
          </div>
        ) : null}

        {error ? (
          <p role="alert" className="rounded-lg border border-danger/30 bg-danger/10 p-3 text-sm text-danger">
            {error}
          </p>
        ) : null}

        {result ? (
          <div className="rounded-lg border border-border bg-muted/35 p-3 text-sm">
            <p className="font-medium">Uploaded path</p>
            <p className="mt-1 break-all font-mono text-xs text-muted-foreground">
              {result.path}
            </p>
            <a
              href={result.publicUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 block break-all text-primary underline-offset-4 hover:underline"
            >
              {result.publicUrl}
            </a>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <Button type="button" onClick={uploadFile} disabled={pending || !file}>
            {pending ? (
              <Loader2 data-icon="inline-start" aria-hidden="true" />
            ) : (
              <Upload data-icon="inline-start" aria-hidden="true" />
            )}
            {pending ? "Uploading…" : "Upload File"}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={pending || !result}
            onClick={deleteUploadedFile}
          >
            <Trash2 data-icon="inline-start" aria-hidden="true" />
            Delete Uploaded File
          </Button>
        </div>
      </div>
    </section>
  );
}
