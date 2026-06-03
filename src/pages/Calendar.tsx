import { useMemo, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, CalendarDays, Sparkles, Gift, Package } from "lucide-react";
import { mockOccasions, daysUntil, formatDate } from "@/lib/mock-data";
import { GreetingGenerator } from "@/components/ai/GreetingGenerator";
import { Link } from "react-router-dom";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const WEEKDAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const statusTone: Record<string, string> = {
  scheduled: "bg-success/15 text-success ring-1 ring-success/30",
  queued:    "bg-primary/15 text-primary ring-1 ring-primary/30",
  draft:     "bg-corten/15 text-corten ring-1 ring-corten/40",
};

export const Calendar = () => {
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const { cells, monthOccasions } = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const first = new Date(year, month, 1);
    const startDow = first.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: { date: Date | null }[] = [];
    for (let i = 0; i < startDow; i++) cells.push({ date: null });
    for (let d = 1; d <= daysInMonth; d++) cells.push({ date: new Date(year, month, d) });
    while (cells.length % 7 !== 0) cells.push({ date: null });

    const monthOccasions = mockOccasions
      .filter((o) => {
        const d = new Date(o.date + "T00:00:00");
        return d.getFullYear() === year && d.getMonth() === month;
      })
      .sort((a, b) => a.date.localeCompare(b.date));

    return { cells, monthOccasions };
  }, [cursor]);

  const occByDay = useMemo(() => {
    const map = new Map<number, typeof mockOccasions>();
    for (const o of monthOccasions) {
      const d = new Date(o.date + "T00:00:00").getDate();
      const arr = map.get(d) ?? [];
      arr.push(o);
      map.set(d, arr);
    }
    return map;
  }, [monthOccasions]);

  const isToday = (d: Date) =>
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate();

  return (
    <div className="dark min-h-dvh bg-background text-foreground">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-walnut/40" />
        <div className="absolute inset-0 bg-canvas-grid opacity-[0.3]" />
        <div className="absolute -top-32 left-0 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
      </div>

      <Navigation currentPage="calendar" />

      <div className="lg:ml-64">
        <main className="px-4 py-6 md:px-8">
          <div className="mx-auto max-w-[1500px] space-y-5">
            <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-corten">
                  <CalendarDays className="h-3 w-3" /> calendar · month view
                </p>
                <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">
                  {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {monthOccasions.length} occasion{monthOccasions.length === 1 ? "" : "s"} this month
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <Button variant="ghost" size="icon" aria-label="Previous month"
                  onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setCursor(new Date(today.getFullYear(), today.getMonth(), 1))}>
                  Today
                </Button>
                <Button variant="ghost" size="icon" aria-label="Next month"
                  onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </header>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_360px]">
              <Card className="glass-panel border-0 p-4">
                <div className="grid grid-cols-7 gap-1 border-b border-border/40 pb-2">
                  {WEEKDAYS.map((d) => (
                    <div key={d} className="px-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 pt-2">
                  {cells.map((c, i) => {
                    if (!c.date) return <div key={i} className="aspect-[6/5] rounded-md bg-card/20" />;
                    const list = occByDay.get(c.date.getDate()) ?? [];
                    const today_ = isToday(c.date);
                    return (
                      <div
                        key={i}
                        className={`aspect-[6/5] overflow-hidden rounded-md border p-1.5 text-left transition ${
                          today_
                            ? "border-corten/60 bg-corten/10"
                            : "border-border/40 bg-card/40 hover:border-border/80"
                        }`}
                      >
                        <div className={`flex items-center justify-between text-[11px] ${today_ ? "text-corten" : "text-muted-foreground"}`}>
                          <span className="font-mono">{c.date.getDate()}</span>
                          {list.length > 0 && (
                            <span className="rounded-full bg-primary/20 px-1.5 font-mono text-[9px] text-primary">{list.length}</span>
                          )}
                        </div>
                        <div className="mt-1 space-y-0.5">
                          {list.slice(0, 2).map((o) => (
                            <div key={o.id} className="truncate rounded bg-background/60 px-1 py-0.5 text-[10px]">
                              <span className="text-foreground">{o.contactName}</span>
                              <span className="text-muted-foreground"> · {o.event}</span>
                            </div>
                          ))}
                          {list.length > 2 && (
                            <div className="px-1 text-[10px] text-muted-foreground">+{list.length - 2} more</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card className="glass-panel border-0 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    upcoming · this month
                  </h2>
                  <Badge className="h-5 border-0 bg-corten/15 px-1.5 font-mono text-[10px] text-corten">
                    {monthOccasions.length}
                  </Badge>
                </div>
                {monthOccasions.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-border/60 p-6 text-center">
                    <p className="font-display text-sm">Nothing scheduled</p>
                    <p className="mt-1 text-xs text-muted-foreground">A quiet month. Add an occasion to fill it.</p>
                    <Button asChild size="sm" className="mt-3 bg-corten text-white hover:bg-corten/90">
                      <Link to="/contacts">Open contacts</Link>
                    </Button>
                  </div>
                ) : (
                  <ul className="divide-y divide-border/40">
                    {monthOccasions.map((o) => {
                      const d = daysUntil(o.date);
                      return (
                        <li key={o.id} className="flex items-center gap-3 py-3">
                          <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-lg bg-background/60 ring-1 ring-border/60">
                            <span className="font-display text-base font-semibold tabular-nums leading-none">
                              {new Date(o.date + "T00:00:00").getDate()}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">{o.contactName}</p>
                            <p className="truncate text-xs text-muted-foreground">
                              {o.event} · {formatDate(o.date)}
                              {d >= 0 && ` · in ${d}d`}
                            </p>
                            <div className="mt-1 flex items-center gap-1.5">
                              <Badge className={`h-4 border-0 px-1.5 font-mono text-[9px] uppercase tracking-wider ${statusTone[o.status]}`}>
                                {o.status}
                              </Badge>
                              {o.hasGift && (
                                <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                  <Package className="h-3 w-3 text-success" /> {o.giftName}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <GreetingGenerator
                              initialRecipient={o.contactName}
                              initialOccasion={o.event}
                              trigger={
                                <Button size="icon" variant="ghost" className="h-8 w-8" aria-label={`Draft greeting for ${o.contactName}`}>
                                  <Sparkles className="h-4 w-4" />
                                </Button>
                              }
                            />
                            <Button size="icon" variant="ghost" className="h-8 w-8" aria-label="Send gift" asChild>
                              <Link to="/gifts"><Gift className="h-4 w-4" /></Link>
                            </Button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Calendar;