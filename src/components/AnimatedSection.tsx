import { ReactNode, ElementType, CSSProperties } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

type Animation = "fade-up" | "fade-left" | "fade-right" | "scale";

interface Props {
  children: ReactNode;
  animation?: Animation;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  as?: ElementType;
  id?: string;
}

const initialMap: Record<Animation, string> = {
  "fade-up": "opacity-0 translate-y-8",
  "fade-left": "opacity-0 -translate-x-8",
  "fade-right": "opacity-0 translate-x-8",
  scale: "opacity-0 scale-95",
};

export const AnimatedSection = ({
  children,
  animation = "fade-up",
  delay = 0,
  threshold = 0.1,
  rootMargin,
  className,
  as: Tag = "div",
  id,
}: Props) => {
  const { ref, inView } = useScrollAnimation<HTMLElement>({ threshold, rootMargin });
  const style: CSSProperties = {
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    transitionDuration: "700ms",
    transitionProperty: "opacity, transform",
    willChange: "opacity, transform",
  };
  return (
    <Tag
      ref={ref as never}
      id={id}
      style={style}
      className={cn(
        inView ? "opacity-100 translate-x-0 translate-y-0 scale-100" : initialMap[animation],
        className
      )}
    >
      {children}
    </Tag>
  );
};