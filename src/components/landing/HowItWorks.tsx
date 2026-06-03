import { CalendarHeart, Wand2, Send } from "lucide-react";
import storyboardAsset from "@/assets/nfo-storyboard.png.asset.json";

const steps = [
  {
    icon: CalendarHeart,
    title: "Remember",
    body: "Import contacts and sync your calendars. We surface every milestone — birthdays, anniversaries, work-iversaries, the small ones too.",
    bullets: ["Google · Outlook · Apple sync", "Smart relationship grouping", "Recurring reminders"],
  },
  {
    icon: Wand2,
    title: "Personalize",
    body: "Our AI assistant drafts a heartfelt video script and message in your voice. Pick a tone, swap a line, hit generate.",
    bullets: ["5 emotional tones", "Multilingual responses", "AI video templates"],
  },
  {
    icon: Send,
    title: "Deliver",
    body: "Schedule a gift from a curated marketplace and let us handle the delivery. You'll get a quiet confirmation when it lands.",
    bullets: ["Flowers · gift cards · experiences", "Group gifting", "Delivery tracking"],
  },
];

export const HowItWorks = () => (
  <section id="how" className="relative py-24 md:py-32">
    <div className="mx-auto max-w-7xl px-4 md:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">How it works</p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Three steps. Zero forgotten birthdays.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          A calm, automated rhythm for the people who matter.
        </p>
      </div>

      <div className="relative mt-16 grid gap-6 md:grid-cols-3">
        {/* Connector line */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block"
        />
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className="group relative rounded-3xl border border-border/60 bg-card p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-card"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-2xl bg-gradient-primary opacity-30 blur-xl transition group-hover:opacity-60" />
                  <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-soft">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <span className="font-display text-sm font-semibold text-muted-foreground">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-display text-2xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.body}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-foreground/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="mt-8 overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-premium">
        <img
          src={storyboardAsset.url}
          alt="Storyboard collage showing gift browsing, flowers, anniversary celebration, memory videos, package opening, reminders, and message writing"
          className="aspect-[16/9] w-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  </section>
);