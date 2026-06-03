import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  duration?: number; // seconds
}

export const Marquee = ({
  children,
  className,
  reverse,
  pauseOnHover = true,
  duration = 30,
}: Props) => (
  <div
    className={cn(
      "group/marquee relative flex w-full overflow-hidden",
      "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
      className
    )}
    style={{ ["--marquee-duration" as string]: `${duration}s` }}
  >
    {Array.from({ length: 2 }).map((_, i) => (
      <div
        key={i}
        aria-hidden={i === 1}
        className={cn(
          "flex shrink-0 items-center gap-12 px-6 animate-marquee",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
    ))}
  </div>
);