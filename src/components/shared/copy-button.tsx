"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useCallback, useState, type ComponentProps } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CopyButtonProps = Omit<
  ComponentProps<typeof Button>,
  "onClick" | "children" | "type"
> & {
  value: string;
  label?: string;
  successToast?: string;
};

export function CopyButton({
  value,
  label = "Copy",
  successToast = "Copied to clipboard.",
  variant = "outline",
  size = "sm",
  className,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(successToast);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      toast.error("Could not copy. Try selecting the text manually.");
    }
  }, [successToast, value]);

  return (
    <Button
      {...props}
      type="button"
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={cn("gap-2", className)}
      aria-live="polite"
      aria-label={label}
    >
      {copied ? (
        <>
          <CheckIcon className="size-4" />
          Copied
        </>
      ) : (
        <>
          <CopyIcon className="size-4" />
          {label}
        </>
      )}
    </Button>
  );
}
