import phoneAsset from "@/assets/phone-calendar.png.asset.json";
import {
  Video,
  Bell,
  Gift,
  Users,
  Store,
  HeartHandshake,
  BarChart3,
  Building2,
  Sparkles,
} from "lucide-react";

export const FeatureBento = () => (
  <section id="features" className="relative py-24 md:py-32">
    <div className="mx-auto max-w-7xl px-4 md:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Built to feel human</p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Everything you need to be the thoughtful one
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          A full operating system for relationships, powered by AI you can actually trust.
        </p>
      </div>

      <div className="mt-16 grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-6">
        {/* AI Videos — large */}
        <div className="group relative col-span-1 row-span-2 overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/15 via-card to-card p-7 md:col-span-3">
          <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gradient-primary opacity-25 blur-3xl transition group-hover:opacity-40" />
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-soft">
            <Video className="h-5 w-5" />
          </div>
          <h3 className="mt-5 font-display text-2xl font-semibold">AI-personalized video greetings</h3>
          <p className="mt-2 text-muted-foreground">
            Cinematic templates, voice-matched scripts, and 60-second renders. Your message — at scale.
          </p>

          <div className="relative mt-6 overflow-hidden rounded-2xl border border-border/60 bg-background/40">
            <img
              src={phoneAsset.url}
              alt="Floating iPhone showing NFO calendar with reminder, video, and gift cards"
              className="mx-auto h-64 w-full object-contain"
              loading="lazy"
            />
            <Sparkles className="absolute right-3 top-3 h-4 w-4 text-primary" />
          </div>
        </div>

        {/* Smart reminders */}
        <div className="group col-span-1 overflow-hidden rounded-3xl border border-border/60 bg-card p-6 md:col-span-3 transition hover:-translate-y-1">
          <div className="flex items-start gap-4">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/15 text-accent-foreground">
              <Bell className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold">Smart reminder engine</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Calm pings at the right time. Never another 11pm "happy birthday" text.
              </p>
            </div>
          </div>
        </div>

        {/* Marketplace */}
        <div className="group col-span-1 overflow-hidden rounded-3xl border border-border/60 bg-card p-6 md:col-span-3 transition hover:-translate-y-1">
          <div className="flex items-start gap-4">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-success/15">
              <Gift className="h-5 w-5 text-success" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold">Curated gift marketplace</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Flowers, gift cards, experiences. Pre-vetted, autoshipped, beautifully wrapped.
              </p>
            </div>
          </div>
        </div>

        {/* Family plans */}
        <div className="group col-span-1 overflow-hidden rounded-3xl border border-border/60 bg-card p-6 md:col-span-2 transition hover:-translate-y-1">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <h3 className="mt-4 font-display text-lg font-semibold">Shared family plans</h3>
          <p className="mt-1 text-sm text-muted-foreground">One calendar, five accounts.</p>
        </div>

        {/* Creators */}
        <div className="group col-span-1 overflow-hidden rounded-3xl border border-border/60 bg-card p-6 md:col-span-2 transition hover:-translate-y-1">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10">
            <Store className="h-5 w-5 text-primary" />
          </div>
          <h3 className="mt-4 font-display text-lg font-semibold">Creator marketplace</h3>
          <p className="mt-1 text-sm text-muted-foreground">Independent makers, vetted gifts.</p>
        </div>

        {/* Group gifting */}
        <div className="group col-span-1 overflow-hidden rounded-3xl border border-border/60 bg-card p-6 md:col-span-2 transition hover:-translate-y-1">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10">
            <HeartHandshake className="h-5 w-5 text-primary" />
          </div>
          <h3 className="mt-4 font-display text-lg font-semibold">Group gifting</h3>
          <p className="mt-1 text-sm text-muted-foreground">Pool funds, one delivery.</p>
        </div>

        {/* Analytics */}
        <div className="group col-span-1 overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-accent/15 via-card to-card p-6 md:col-span-3 transition hover:-translate-y-1">
          <div className="flex items-start justify-between">
            <div>
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/15">
                <BarChart3 className="h-5 w-5 text-accent" />
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold">Emotional analytics</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                See which relationships need a little more love this quarter.
              </p>
            </div>
            <div className="hidden h-20 items-end gap-1.5 sm:flex">
              {[40, 65, 55, 80, 72, 90, 60].map((h, i) => (
                <div
                  key={i}
                  className="w-2 rounded-full bg-gradient-to-t from-primary/40 to-primary"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* HR */}
        <div className="group col-span-1 overflow-hidden rounded-3xl border border-border/60 bg-card p-6 md:col-span-3 transition hover:-translate-y-1">
          <div className="flex items-start gap-4">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold">Corporate HR celebrations</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Birthdays, work-iversaries, milestones — automated for your whole team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);