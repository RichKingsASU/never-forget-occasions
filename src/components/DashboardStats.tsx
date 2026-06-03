import { Card } from "@/components/ui/card";
import { CheckCircle, Users, Gift, Clock, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

type Stat = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  change: string;
  trend: number[];
  icon: typeof Gift;
  accent: "primary" | "success" | "accent" | "warm";
};

const stats: Stat[] = [
  { label: "Videos sent", value: 47, change: "+12 this month", trend: [4, 6, 5, 7, 9, 8, 12], icon: CheckCircle, accent: "primary" },
  { label: "Gifts delivered", value: 23, prefix: "", suffix: "", change: "$340 total value", trend: [2, 3, 5, 4, 6, 5, 8], icon: Gift, accent: "success" },
  { label: "Scheduled", value: 18, change: "Next 30 days", trend: [3, 4, 5, 6, 7, 8, 9], icon: Clock, accent: "accent" },
  { label: "Contacts", value: 156, change: "+8 this month", trend: [120, 128, 132, 140, 145, 150, 156], icon: Users, accent: "warm" },
];

const accents: Record<Stat["accent"], { chip: string; bar: string }> = {
  primary: { chip: "bg-primary/15 text-primary ring-1 ring-primary/30", bar: "from-primary/30 to-primary" },
  success: { chip: "bg-success/15 text-success ring-1 ring-success/30", bar: "from-success/30 to-success" },
  accent:  { chip: "bg-accent/15 text-accent ring-1 ring-accent/30",   bar: "from-accent/30 to-accent" },
  warm:    { chip: "bg-corten/15 text-corten ring-1 ring-corten/40",   bar: "from-corten/30 to-corten" },
};

const useCountUp = (target: number, duration = 900) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return v;
};

const Spark = ({ data, accent }: { data: number[]; accent: Stat["accent"] }) => {
  const max = Math.max(...data);
  return (
    <div className="flex h-10 items-end gap-[3px]" role="img" aria-label="trend sparkline">
      {data.map((d, i) => (
        <div
          key={i}
          className={`w-1 rounded-sm bg-gradient-to-t ${accents[accent].bar}`}
          style={{ height: `${(d / max) * 100}%` }}
        />
      ))}
    </div>
  );
};

const StatCard = ({ stat }: { stat: Stat }) => {
  const v = useCountUp(stat.value);
  const Icon = stat.icon;
  return (
    <Card
      role="figure"
      aria-label={`${stat.label}: ${stat.value}. ${stat.change}`}
      className="glass-panel glass-inset group relative overflow-hidden p-4 transition hover:border-primary/40"
    >
      <div className="mb-3 flex items-start justify-between">
        <div className={`grid h-8 w-8 place-items-center rounded-lg ${accents[stat.accent].chip}`}>
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
        <Spark data={stat.trend} accent={stat.accent} />
      </div>
      <p className="font-display text-2xl font-semibold tabular-nums tracking-tight">
        {v.toLocaleString()}
      </p>
      <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {stat.label}
      </p>
      <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
        <TrendingUp className="h-3 w-3 text-success" aria-hidden="true" /> {stat.change}
      </p>
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition group-hover:opacity-100" />
    </Card>
  );
};

export const DashboardStats = () => (
  <div className="grid grid-cols-2 gap-3 lg:grid-cols-4" role="group" aria-label="Operational metrics">
    {stats.map((s) => (
      <StatCard key={s.label} stat={s} />
    ))}
  </div>
);