import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Props {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  format?: "plain" | "compact";
  className?: string;
}

const formatNumber = (n: number, decimals: number, format: Props["format"]) => {
  if (format === "compact") {
    return new Intl.NumberFormat("en", {
      notation: "compact",
      maximumFractionDigits: decimals,
    }).format(n);
  }
  return n.toLocaleString("en", { maximumFractionDigits: decimals, minimumFractionDigits: decimals });
};

export const CountUp = ({
  value,
  suffix = "",
  prefix = "",
  duration = 1800,
  decimals = 0,
  format = "plain",
  className,
}: Props) => {
  const { ref, inView } = useScrollAnimation<HTMLSpanElement>({ threshold: 0.3 });
  const [n, setN] = useState(0);
  const raf = useRef<number>();

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatNumber(n, decimals, format)}
      {suffix}
    </span>
  );
};