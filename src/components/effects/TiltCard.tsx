import { ReactNode, useRef, MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
  max?: number; // max tilt degrees
}

export const TiltCard = ({ children, className, max = 8 }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${(-y * max).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * max).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${(x * 100 + 50).toFixed(2)}%`);
    el.style.setProperty("--my", `${(y * 100 + 50).toFixed(2)}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformStyle: "preserve-3d", perspective: "900px" }}
      className={cn("group/tilt relative", className)}
    >
      <div
        className="relative transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
        }}
      >
        {children}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
          style={{
            background:
              "radial-gradient(circle at var(--mx,50%) var(--my,50%), hsl(0 0% 100% / 0.18), transparent 45%)",
          }}
        />
      </div>
    </div>
  );
};