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
  primary: { chip: "bg-primary/10 text-primary", bar: "from-primary/40 to-primary" },
  success: { chip: "bg-success/15 text-success", bar: "from-success/40 to-success" },
  accent: { chip: "bg-accent/15 text-accent", bar: "from-accent/40 to-accent" },
  warm: { chip: "bg-amber-500/15 text-amber-500", bar: "from-amber-400/40 to-amber-500" },
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
    <div className="flex h-10 items-end gap-1">
      {data.map((d, i) => (
        <div
          key={i}
          className={`w-1.5 rounded-full bg-gradient-to-t ${accents[accent].bar}`}
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
    <Card className="group relative overflow-hidden border-0 bg-gradient-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card">
      <div className="mb-4 flex items-start justify-between">
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${accents[stat.accent].chip}`}>
          <Icon className="h-5 w-5" />
        </div>
        <Spark data={stat.trend} accent={stat.accent} />
      </div>
      <p className="font-display text-3xl font-bold tracking-tight">{v.toLocaleString()}</p>
      <p className="mt-0.5 text-sm font-medium">{stat.label}</p>
      <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
        <TrendingUp className="h-3 w-3 text-success" /> {stat.change}
      </p>
    </Card>
  );
};

export const DashboardStats = () => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
    {stats.map((s) => (
      <StatCard key={s.label} stat={s} />
    ))}
  </div>
);