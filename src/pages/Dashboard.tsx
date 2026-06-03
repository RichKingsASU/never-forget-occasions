import { Navigation } from "@/components/Navigation";
import { DashboardStats } from "@/components/DashboardStats";
import { ContactCard } from "@/components/ContactCard";
import { GreetingGenerator } from "@/components/ai/GreetingGenerator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Gift,
  Calendar,
  Bell,
  Package,
  Search,
  Sparkles,
  Send,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const upcomingOccasions = [
    {
      name: "Sarah Chen",
      event: "Birthday",
      date: "March 15",
      daysUntil: 3,
      status: "scheduled",
      hasGift: true,
      giftName: "Starbucks Gift Card"
    },
    {
      name: "Mom",
      event: "Mother's Day", 
      date: "May 12",
      daysUntil: 45,
      status: "pending",
      hasGift: false
    },
    {
      name: "John & Lisa",
      event: "Anniversary",
      date: "April 8",
      daysUntil: 28,
      status: "scheduled",
      hasGift: true,
      giftName: "Rose Bouquet"
    }
  ];

  const recentContacts = [
    {
      name: "Sarah Chen",
      email: "sarah@email.com",
      relationship: "Friend",
      nextOccasion: {
        event: "Birthday",
        date: "March 15",
        daysUntil: 3
      },
      avatar: "",
      giftPreferences: ["Coffee", "Books", "Tech"],
      recentGifts: [
        { name: "Amazon Gift Card", status: "delivered" as const, date: "Feb 14" }
      ]
    },
    {
      name: "Michael Rodriguez",
      email: "michael@email.com", 
      phone: "+1 (555) 123-4567",
      relationship: "Colleague",
      nextOccasion: {
        event: "Work Anniversary",
        date: "March 22",
        daysUntil: 10
      },
      avatar: "",
      giftPreferences: ["Food", "Wine", "Experience"],
      recentGifts: []
    },
    {
      name: "Emma Thompson",
      email: "emma@email.com",
      relationship: "Sister",
      nextOccasion: {
        event: "Graduation",
        date: "May 15",
        daysUntil: 48
      },
      avatar: "",
      giftPreferences: ["Jewelry", "Flowers", "Spa"],
      recentGifts: [
        { name: "Pandora Gift Card", status: "pending" as const, date: "Mar 1" }
      ]
    }
  ];

  return (
    <div className="min-h-dvh bg-background">
      <Navigation currentPage="dashboard" />

      <div className="lg:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border/60 bg-background/80 px-4 py-3 backdrop-blur-xl md:px-8">
          <div className="relative hidden flex-1 max-w-md md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search contacts, occasions, gifts…"
              className="rounded-full border-border/60 bg-card pl-9"
            />
          </div>
          <div className="flex flex-1 items-center justify-end gap-2 md:flex-none">
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative rounded-full">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
            </Button>
            <div className="lg:hidden"><ThemeToggle /></div>
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-pink-400 to-purple-500" aria-label="Account" />
          </div>
        </header>

        <main className="px-4 py-8 md:px-8">
          <div className="mx-auto max-w-7xl space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Wednesday · June 3
                </p>
                <h1 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
                  Welcome back, Alex
                </h1>
                <p className="mt-1 text-muted-foreground">
                  5 upcoming occasions · 3 gifts scheduled · 1 message needs your review
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline">
                  <Calendar className="h-4 w-4" /> Calendar
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/gifts">
                    <ShoppingBag className="h-4 w-4" /> Browse gifts
                  </Link>
                </Button>
                <GreetingGenerator
                  trigger={
                    <Button variant="hero">
                      <Sparkles className="h-4 w-4" /> New greeting
                    </Button>
                  }
                />
              </div>
            </div>

            {/* Quick actions strip */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                { icon: Plus, label: "Add occasion", tint: "from-primary/15 to-primary/5" },
                { icon: Sparkles, label: "AI greeting", tint: "from-accent/15 to-accent/5" },
                { icon: Gift, label: "Send a gift", tint: "from-success/15 to-success/5" },
                { icon: Calendar, label: "Open calendar", tint: "from-pink-500/15 to-pink-500/5" },
              ].map((a) => {
                const Icon = a.icon;
                return (
                  <button
                    key={a.label}
                    className={`group flex items-center gap-3 rounded-2xl border border-border/60 bg-gradient-to-br ${a.tint} p-4 text-left transition hover:-translate-y-0.5 hover:shadow-card`}
                  >
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-card shadow-soft">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 font-medium">{a.label}</div>
                    <ArrowRight className="h-4 w-4 -translate-x-1 text-muted-foreground transition group-hover:translate-x-0 group-hover:text-foreground" />
                  </button>
                );
              })}
            </div>

            <DashboardStats />

            {/* Main grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Upcoming */}
              <div className="lg:col-span-2">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-display text-xl font-semibold">Upcoming occasions</h2>
                  <Button variant="ghost" size="sm">View all <ArrowRight className="h-3 w-3" /></Button>
                </div>
                <div className="space-y-3">
                  {upcomingOccasions.map((o, i) => (
                    <Card
                      key={i}
                      className="group flex items-center gap-4 border-0 bg-card p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card"
                    >
                      <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-secondary">
                        <span className="font-display text-lg font-bold text-primary">
                          {o.daysUntil}
                        </span>
                        <span className="absolute -bottom-1 rounded-full bg-card px-1.5 text-[9px] font-semibold uppercase text-muted-foreground shadow-soft">
                          days
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium leading-tight">{o.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {o.event} · {o.date}
                        </p>
                        {o.hasGift && (
                          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-success">
                            <Package className="h-3 w-3" /> {o.giftName}
                          </div>
                        )}
                      </div>
                      <div className="hidden flex-col items-end gap-1.5 sm:flex">
                        <Badge
                          className={`border-0 text-[10px] uppercase tracking-wider ${
                            o.status === "scheduled"
                              ? "bg-success/15 text-success"
                              : "bg-amber-500/15 text-amber-600"
                          }`}
                        >
                          {o.status}
                        </Badge>
                        {o.hasGift && (
                          <Badge className="border-0 bg-primary/10 text-[10px] uppercase tracking-wider text-primary">
                            Gift
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <GreetingGenerator
                          initialRecipient={o.name}
                          initialOccasion={o.event}
                          trigger={
                            <Button size="sm" variant="hero">
                              <Sparkles className="h-3.5 w-3.5" /> Greeting
                            </Button>
                          }
                        />
                        <Button size="sm" variant="outline">
                          <Send className="h-3.5 w-3.5" /> Send
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Side column: AI assistant + insights */}
              <div className="space-y-6">
                <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/15 via-card to-accent/10 p-5 shadow-soft">
                  <div aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-primary opacity-30 blur-2xl" />
                  <div className="relative">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <p className="font-display text-base font-semibold">AI assistant</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "Sarah's birthday is in 3 days. Want me to draft a heartfelt message and pair it with the artisan coffee box she loved last year?"
                    </p>
                    <div className="mt-4 flex gap-2">
                      <GreetingGenerator
                        initialRecipient="Sarah Chen"
                        initialOccasion="Birthday"
                        trigger={<Button size="sm" variant="hero">Yes, draft it</Button>}
                      />
                      <Button size="sm" variant="ghost">Maybe later</Button>
                    </div>
                  </div>
                </Card>

                <Card className="border-0 bg-card p-5 shadow-soft">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="font-display text-base font-semibold">Relationship pulse</p>
                    <Badge className="border-0 bg-accent/15 text-accent">This quarter</Badge>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Family", pct: 92, tone: "from-primary/40 to-primary" },
                      { name: "Close friends", pct: 74, tone: "from-accent/40 to-accent" },
                      { name: "Colleagues", pct: 41, tone: "from-amber-400/40 to-amber-500" },
                    ].map((r) => (
                      <div key={r.name}>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>{r.name}</span>
                          <span className="text-muted-foreground">{r.pct}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${r.tone}`}
                            style={{ width: `${r.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Colleagues are quieter than usual. Want to schedule a small team treat?
                  </p>
                </Card>

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="font-display text-base font-semibold">Recent contacts</h2>
                    <Button variant="ghost" size="sm">View all</Button>
                  </div>
                  <div className="space-y-3">
                    {recentContacts.slice(0, 2).map((contact, index) => (
                      <ContactCard key={index} {...contact} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};