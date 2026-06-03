import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
}

export const BorderBeam = ({
  className,
  size = 200,
  duration = 6,
  borderWidth = 1.5,
  colorFrom = "hsl(var(--primary))",
  colorTo = "hsl(var(--accent))",
}: Props) => (
  <div
    aria-hidden
    style={
      {
        "--size": `${size}px`,
        "--duration": `${duration}s`,
        "--border-width": `${borderWidth}px`,
        "--color-from": colorFrom,
        "--color-to": colorTo,
      } as React.CSSProperties
    }
    className={cn(
      "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]",
      "[border:var(--border-width)_solid_transparent]",
      "![mask-clip:padding-box,border-box]",
      "![mask-composite:intersect]",
      "[mask:linear-gradient(transparent,transparent),linear-gradient(black,black)]",
      "after:absolute after:aspect-square after:w-[var(--size)]",
      "after:animate-border-beam after:[offset-anchor:calc(var(--anchor,90)*1%)_50%]",
      "after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)]",
      "after:[offset-path:rect(0_auto_auto_0_round_var(--size))]",
      className
    )}
  />
);