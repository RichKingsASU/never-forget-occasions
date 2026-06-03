import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const AuroraText = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <span
    className={cn(
      "relative inline-block bg-clip-text text-transparent",
      "bg-[length:200%_auto] animate-gradient-shift",
      className
    )}
    style={{
      backgroundImage:
        "linear-gradient(110deg, hsl(var(--primary)) 0%, hsl(var(--primary-glow)) 25%, hsl(var(--accent)) 50%, hsl(var(--primary-glow)) 75%, hsl(var(--primary)) 100%)",
    }}
  >
    {children}
  </span>
);