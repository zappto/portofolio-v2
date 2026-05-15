import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "portfolio-button group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap border bg-clip-padding text-sm font-medium outline-none select-none transition-[background-color,border-color,color,box-shadow,opacity,transform] duration-[var(--duration-base)] ease-[var(--ease-out)] focus-visible:ring-[var(--focus-ring-width)] focus-visible:ring-ring/35 disabled:pointer-events-none disabled:opacity-50 active:not-aria-[haspopup]:translate-y-px [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      tone: {
        inherit: "",
        professional: "portfolio-button-tone-professional",
        playful: "portfolio-button-tone-playful border-border-strong",
      },
      variant: {
        default:
          "border-primary bg-primary text-primary-foreground hover:opacity-90",
        outline:
          "border-border bg-background text-foreground hover:bg-muted aria-expanded:bg-muted",
        secondary:
          "border-secondary bg-secondary text-secondary-foreground hover:opacity-90 aria-expanded:bg-secondary",
        ghost:
          "border-transparent bg-transparent hover:bg-muted aria-expanded:bg-muted data-[visual=playful]:shadow-none",
        destructive:
          "border-danger bg-danger text-white hover:opacity-90 focus-visible:ring-danger/30",
        link: "border-transparent bg-transparent text-primary underline-offset-4 hover:underline data-[visual=playful]:shadow-none",
      },
      size: {
        default: "h-10 gap-2 rounded-lg px-4",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 text-[0.8rem]",
        lg: "h-11 gap-2 rounded-xl px-5",
        icon: "size-10 rounded-lg",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      tone: "inherit",
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  tone = "inherit",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-tone={tone === "inherit" ? undefined : tone}
      data-size={size}
      className={cn(buttonVariants({ variant, tone, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
