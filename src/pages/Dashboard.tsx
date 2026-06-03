import { Navigation } from "@/components/Navigation";
import { DashboardStats } from "@/components/DashboardStats";
import { GreetingGenerator } from "@/components/ai/GreetingGenerator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Plus, Gift, Calendar, Bell, Package, Search, Sparkles, Send,
  ShoppingBag, ArrowRight, Activity, ShieldCheck, Filter, Command, Radio,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const RelationshipChart = () => {
  // Canvas-style sparkline rendered as SVG — high information density, zero chrome.
  const series = [
    { name: "Family",      data: [42, 51, 49, 60, 66, 72, 80, 88, 92] },
    { name: "Close friends", data: [30, 34, 40, 38, 50, 58, 62, 70, 74] },
    { name: "Colleagues",  data: [20, 26, 24, 28, 32, 30, 36, 38, 41] },
  ];
  const colors = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--corten))"];
  const W = 320, H = 96, P = 4;
  const max = 100;
  const path = (d: number[]) =>
    d
      .map((v, i) => {
        const x = P + (i * (W - 2 * P)) / (d.length - 1);
        const y = H - P - (v / max) * (H - 2 * P);
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-24 w-full" role="img" aria-label="Relationship engagement trend, last 9 weeks">
      <defs>
        {colors.map((c, i) => (
          <linearGradient key={i} id={`fill-${i}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={c} stopOpacity="0.35" />
            <stop offset="100%" stopColor={c} stopOpacity="0" />
          </linearGradient>
        ))}
      </defs>
      {series.map((s, i) => (
        <g key={s.name}>
          <path d={`${path(s.data)} L${W - P},${H - P} L${P},${H - P} Z`} fill={`url(#fill-${i})`} />
          <path d={path(s.data)} fill="none" stroke={colors[i]} strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
};

const Tick = ({
  label,
  value,
  hint,
  tone = "primary",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "primary" | "corten" | "neon";
}) => (
  <div className="flex items-baseline justify-between border-b border-border/40 py-1.5 last:border-0">
    <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
    <span className="flex items-center gap-2 tabular-nums">
      <span className={`text-sm font-semibold ${tone === "corten" ? "text-corten" : tone === "neon" ? "text-success" : "text-foreground"}`}>{value}</span>
      {hint && <span className="text-[10px] text-muted-foreground">{hint}</span>}
    </span>
  </div>
);

const ConfirmSend = ({ recipient, channel, when, children }: { recipient: string; channel: string; when: string; children: React.ReactNode }) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
    <AlertDialogContent className="glass-panel border-border/70">
      <AlertDialogHeader>
        <AlertDialogTitle className="font-display flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-corten" aria-hidden="true" /> Confirm dispatch
        </AlertDialogTitle>
        <AlertDialogDescription className="space-y-2">
          <span>This will trigger an outbound greeting. Review before dispatch.</span>
          <span className="mt-2 block rounded-lg border border-border/60 bg-background/50 p-3 text-xs font-mono">
            <span className="block">recipient: <span className="text-foreground">{recipient}</span></span>
            <span className="block">channel:   <span className="text-foreground">{channel}</span></span>
            <span className="block">schedule:  <span className="text-foreground">{when}</span></span>
          </span>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={() => toast.success(`Greeting dispatched to ${recipient}`)} className="bg-corten text-white hover:bg-corten/90">
          Dispatch now
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const upcomingOccasions = [
    { name: "Sarah Chen",   event: "Birthday",     date: "Mar 15", daysUntil: 3,  status: "scheduled", channel: "Email · SMS", hasGift: true,  giftName: "Starbucks Gift Card" },
    { name: "John & Lisa",  event: "Anniversary",  date: "Apr 08", daysUntil: 28, status: "scheduled", channel: "Email",       hasGift: true,  giftName: "Rose Bouquet" },
    { name: "Mom",          event: "Mother's Day", date: "May 12", daysUntil: 45, status: "draft",     channel: "Video Mail",  hasGift: false, giftName: "" },
    { name: "Devon K.",     event: "Promotion",    date: "Jun 21", daysUntil: 18, status: "queued",    channel: "Slack",       hasGift: true,  giftName: "DoorDash $30" },
    { name: "Priya N.",     event: "Housewarming", date: "Jul 04", daysUntil: 31, status: "draft",     channel: "Email",       hasGift: false, giftName: "" },
  ];

  const statusTone: Record<string, string> = {
    scheduled: "bg-success/15 text-success ring-1 ring-success/30",
    queued:    "bg-primary/15 text-primary ring-1 ring-primary/30",
    draft:     "bg-corten/15 text-corten ring-1 ring-corten/40",
    pending:   "bg-muted text-muted-foreground ring-1 ring-border",
  };

  return (
    <div className="dark min-h-dvh bg-background text-foreground">
      {/* Cinematic backdrop — Southwest Desert Modern */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-walnut/40" />
        <div className="absolute inset-0 bg-aurora opacity-40" />
        <div className="absolute inset-0 bg-canvas-grid opacity-[0.35]" />
        <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-corten/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-primary/20 blur-[140px]" />
      </div>

      <Navigation currentPage="dashboard" />

      <div className="lg:ml-64">
        {/* Operator top bar */}
        <header
          role="banner"
          className="sticky top-0 z-30 flex items-center gap-3 border-b border-border/60 bg-background/70 px-4 py-2.5 backdrop-blur-xl md:px-6"
        >
          <div className="flex items-center gap-2 pr-2 text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
            <span className="dot-neon inline-block h-1.5 w-1.5 rounded-full" aria-hidden="true" />
            <span aria-live="polite">live · 03 jun 26 · 09:42 utc</span>
          </div>
          <div className="hidden h-5 w-px bg-border md:block" aria-hidden="true" />
          <div className="relative hidden flex-1 max-w-xl md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              type="search"
              aria-label="Search contacts, occasions, and gifts"
              placeholder="Search · ⌘K"
              className="h-9 rounded-lg border-border/60 bg-card/60 pl-9 font-mono text-xs backdrop-blur"
            />
            <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-border bg-background/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">
              <Command className="inline h-3 w-3" aria-hidden="true" />K
            </kbd>
          </div>
          <div className="flex flex-1 items-center justify-end gap-1.5 md:flex-none">
            <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs" aria-label="Filters">
              <Filter className="h-3.5 w-3.5" aria-hidden="true" /> Filter
            </Button>
            <Button variant="ghost" size="icon" aria-label="Notifications, 1 unread" className="relative h-8 w-8">
              <Bell className="h-4 w-4" aria-hidden="true" />
              <span className="dot-neon absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full" aria-hidden="true" />
            </Button>
            <div className="lg:hidden"><ThemeToggle /></div>
            <div className="ml-1 grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary to-corten text-[11px] font-semibold text-primary-foreground" aria-label="Account: Alex">AX</div>
          </div>
        </header>

        <main className="px-4 py-5 md:px-6">
          <div className="mx-auto max-w-[1600px] space-y-4">
            {/* Command header */}
            <section aria-labelledby="dash-heading" className="glass-panel glass-inset flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-corten">
                  <Radio className="h-3 w-3" aria-hidden="true" /> control plane · operator: alex
                </p>
                <h1 id="dash-heading" className="mt-1 font-display text-2xl font-semibold tracking-tight">
                  5 occasions queued · 3 gifts in-flight · 1 review pending
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <Button variant="ghost" size="sm" className="h-8 gap-1.5 border border-border/60 text-xs">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" /> Calendar
                </Button>
                <Button variant="ghost" size="sm" className="h-8 gap-1.5 border border-border/60 text-xs" asChild>
                  <Link to="/gifts" aria-label="Browse gift marketplace">
                    <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" /> Marketplace
                  </Link>
                </Button>
                <GreetingGenerator
                  trigger={
                    <Button size="sm" className="h-8 gap-1.5 bg-corten text-white hover:bg-corten/90">
                      <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> New greeting
                    </Button>
                  }
                />
              </div>
            </section>

            {/* KPI row */}
            {loading ? (
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4" aria-busy="true" aria-label="Loading metrics">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="glass-panel h-[112px] p-4">
                    <Skeleton className="shimmer h-8 w-8 rounded-lg" />
                    <Skeleton className="shimmer mt-3 h-7 w-20" />
                    <Skeleton className="shimmer mt-2 h-3 w-24" />
                  </div>
                ))}
              </div>
            ) : (
              <DashboardStats />
            )}

            {/* BENTO GRID */}
            <div className="grid grid-cols-12 gap-3">
              {/* Occasions queue — primary operator surface */}
              <section
                aria-labelledby="queue-h"
                className="glass-panel glass-inset col-span-12 overflow-hidden xl:col-span-8"
              >
                <header className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <Activity className="h-3.5 w-3.5 text-corten" aria-hidden="true" />
                    <h2 id="queue-h" className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">dispatch queue</h2>
                    <Badge className="ml-1 h-5 border-0 bg-corten/15 px-1.5 font-mono text-[10px] text-corten">{upcomingOccasions.length}</Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">View all <ArrowRight className="h-3 w-3" aria-hidden="true" /></Button>
                </header>

                <div role="table" aria-label="Upcoming occasions" className="divide-y divide-border/40">
                  <div role="row" className="grid grid-cols-[60px_1fr_120px_120px_100px_160px] items-center gap-3 bg-card/30 px-4 py-1.5 text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                    <span role="columnheader">eta</span>
                    <span role="columnheader">recipient · event</span>
                    <span role="columnheader">channel</span>
                    <span role="columnheader">gift</span>
                    <span role="columnheader">status</span>
                    <span role="columnheader" className="text-right">actions</span>
                  </div>
                  {loading
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="grid grid-cols-[60px_1fr_120px_120px_100px_160px] items-center gap-3 px-4 py-3">
                          <Skeleton className="shimmer h-6 w-10" />
                          <Skeleton className="shimmer h-5 w-40" />
                          <Skeleton className="shimmer h-4 w-20" />
                          <Skeleton className="shimmer h-4 w-24" />
                          <Skeleton className="shimmer h-5 w-16" />
                          <Skeleton className="shimmer h-7 w-32 justify-self-end" />
                        </div>
                      ))
                    : upcomingOccasions.map((o) => (
                        <div
                          key={o.name}
                          role="row"
                          className="group grid grid-cols-[60px_1fr_120px_120px_100px_160px] items-center gap-3 px-4 py-2.5 transition hover:bg-card/40"
                        >
                          <div role="cell" className="flex flex-col items-start">
                            <span className="font-display text-lg font-semibold tabular-nums leading-none">{o.daysUntil}</span>
                            <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">days · {o.date}</span>
                          </div>
                          <div role="cell" className="min-w-0">
                            <p className="truncate text-sm font-medium leading-tight">{o.name}</p>
                            <p className="truncate text-xs text-muted-foreground">{o.event}</p>
                          </div>
                          <div role="cell" className="font-mono text-[11px] text-muted-foreground">{o.channel}</div>
                          <div role="cell" className="flex items-center gap-1.5 text-xs">
                            {o.hasGift ? (
                              <>
                                <Package className="h-3 w-3 text-success" aria-hidden="true" />
                                <span className="truncate">{o.giftName}</span>
                              </>
                            ) : (
                              <span className="text-muted-foreground/60">—</span>
                            )}
                          </div>
                          <div role="cell">
                            <Badge className={`h-5 border-0 px-1.5 font-mono text-[10px] uppercase tracking-wider ${statusTone[o.status]}`}>
                              {o.status}
                            </Badge>
                          </div>
                          <div role="cell" className="flex items-center justify-end gap-1.5">
                            <GreetingGenerator
                              initialRecipient={o.name}
                              initialOccasion={o.event}
                              trigger={
                                <Button size="sm" variant="ghost" className="h-7 gap-1 border border-border/60 text-xs">
                                  <Sparkles className="h-3 w-3" aria-hidden="true" /> Draft
                                </Button>
                              }
                            />
                            <ConfirmSend recipient={o.name} channel={o.channel} when={`${o.date} · 09:00 local`}>
                              <Button size="sm" className="h-7 gap-1 bg-corten text-[11px] text-white hover:bg-corten/90">
                                <Send className="h-3 w-3" aria-hidden="true" /> Dispatch
                              </Button>
                            </ConfirmSend>
                          </div>
                        </div>
                      ))}
                </div>
              </section>

              {/* AI co-pilot — frosted suggestion surface */}
              <section
                aria-labelledby="copilot-h"
                className="glass-panel glass-inset ring-corten col-span-12 overflow-hidden p-4 md:col-span-6 xl:col-span-4"
              >
                <header className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="grid h-7 w-7 place-items-center rounded-md bg-gradient-primary text-primary-foreground">
                      <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    </div>
                    <h2 id="copilot-h" className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">co-pilot · suggestion</h2>
                  </div>
                  <Badge className="h-5 border-0 bg-corten/15 px-1.5 font-mono text-[10px] text-corten">priority</Badge>
                </header>
                <p className="text-sm leading-relaxed">
                  <span className="text-muted-foreground">Sarah's birthday lands in</span>{" "}
                  <span className="font-semibold text-corten">3 days</span>.
                  Draft a warm message + pair the artisan coffee box she loved last year ($28 · 4.9★)?
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <GreetingGenerator
                    initialRecipient="Sarah Chen"
                    initialOccasion="Birthday"
                    trigger={<Button size="sm" className="bg-corten text-white hover:bg-corten/90">Draft it</Button>}
                  />
                  <Button size="sm" variant="ghost" className="border border-border/60">Snooze 24h</Button>
                </div>
                <div className="mt-4 rounded-lg border border-border/40 bg-background/40 p-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  <div className="flex items-center justify-between"><span>tone</span><span className="text-foreground">warm · personal</span></div>
                  <div className="mt-1 flex items-center justify-between"><span>est. cost</span><span className="text-foreground">$28.00</span></div>
                  <div className="mt-1 flex items-center justify-between"><span>approval</span><span className="text-corten">required</span></div>
                </div>
              </section>

              {/* Relationship pulse — canvas-style chart */}
              <section
                aria-labelledby="pulse-h"
                className="glass-panel glass-inset col-span-12 overflow-hidden p-4 md:col-span-6 xl:col-span-5"
              >
                <header className="mb-2 flex items-center justify-between">
                  <h2 id="pulse-h" className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">relationship pulse · 9w</h2>
                  <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    <span className="flex items-center gap-1"><span className="h-1.5 w-3 rounded-sm bg-primary" />family</span>
                    <span className="flex items-center gap-1"><span className="h-1.5 w-3 rounded-sm bg-accent" />friends</span>
                    <span className="flex items-center gap-1"><span className="h-1.5 w-3 rounded-sm bg-corten" />colleagues</span>
                  </div>
                </header>
                {loading ? <Skeleton className="shimmer h-24 w-full rounded" /> : <RelationshipChart />}
                <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                  {[
                    { l: "Family",    v: "92", d: "+6" },
                    { l: "Friends",   v: "74", d: "+4" },
                    { l: "Colleagues", v: "41", d: "−3" },
                  ].map((m) => (
                    <div key={m.l} className="rounded-md border border-border/40 bg-background/40 py-2">
                      <p className="font-display text-xl font-semibold tabular-nums">{m.v}</p>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{m.l} · {m.d}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Live stream + system telemetry */}
              <section
                aria-labelledby="stream-h"
                className="glass-panel glass-inset col-span-12 overflow-hidden p-4 xl:col-span-3"
              >
                <header className="mb-2 flex items-center justify-between">
                  <h2 id="stream-h" className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">activity stream</h2>
                  <span className="dot-neon h-1.5 w-1.5 rounded-full" aria-hidden="true" />
                </header>
                <ol className="space-y-2" aria-live="polite">
                  {[
                    { t: "09:41", m: "Greeting → Sarah C.", c: "text-success" },
                    { t: "09:38", m: "Gift queued · DoorDash", c: "text-primary" },
                    { t: "09:22", m: "Draft pending approval", c: "text-corten" },
                    { t: "09:11", m: "FTD ack · Anniversary", c: "text-success" },
                    { t: "08:54", m: "Calendar sync · 4 events", c: "text-muted-foreground" },
                  ].map((e) => (
                    <li key={e.t} className="flex items-center gap-3 border-b border-border/30 pb-1.5 font-mono text-[11px] last:border-0">
                      <span className="tabular-nums text-muted-foreground">{e.t}</span>
                      <span className={e.c}>•</span>
                      <span className="truncate">{e.m}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-3 border-t border-border/40 pt-3">
                  <Tick label="latency p95" value="184ms" tone="neon" />
                  <Tick label="queue depth" value="12" hint="of 50" />
                  <Tick label="ai credits" value="847" hint="/ 1000" tone="corten" />
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};