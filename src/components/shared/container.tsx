import { cn } from "@/lib/utils";

type ContainerProps = React.ComponentProps<"div">;

export function Container({
  wide = false,
  className,
  ...props
}: ContainerProps & { wide?: boolean }) {
  return (
    <div
      data-slot="container"
      className={cn(wide ? "container-wide" : "container-page", className)}
      {...props}
    />
  );
}
