import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "shimmer" | "wave" | "pulse";
}

function Skeleton({
  className,
  variant = "shimmer",
  ...props
}: SkeletonProps) {
  const variantStyles = {
    default: "animate-pulse bg-muted",
    shimmer:
      "relative overflow-hidden bg-gradient-to-r from-muted via-muted/60 to-muted before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
    wave: "animate-wave bg-gradient-to-r from-muted via-primary/5 to-muted bg-[length:200%_100%]",
    pulse:
      "animate-pulse-glow bg-gradient-to-r from-muted via-primary/10 to-muted",
  };

  return (
    <div
      data-slot="skeleton"
      className={cn("rounded-md", variantStyles[variant], className)}
      {...props}
    />
  );
}

export { Skeleton };
