import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { CountUp } from "@/components/effects/CountUp";
import { Marquee } from "@/components/effects/Marquee";
import { ActivityTicker } from "@/components/effects/ActivityTicker";

const stats = [
  { value: 2_400_000, suffix: "+", label: "Occasions remembered", format: "compact" as const },
  { value: 840_000, suffix: "+", label: "Gifts delivered", format: "compact" as const },
  { value: 12_400, suffix: "", label: "5-star reviews", format: "compact" as const },
  { value: 98, suffix: "%", label: "On-time delivery", format: "plain" as const },
];

const logos = ["TechCrunch", "Forbes", "Fast Company", "The Verge", "Product Hunt", "Wired", "Vogue", "Bloomberg", "Architectural Digest"];

const testimonials = [
  {
    quote: "I used to apologize for forgetting. Now I'm the friend who somehow always remembers.",
    name: "Priya Shah",
    role: "Designer · NYC",
    gradient: "from-rose-400 to-pink-500",
  },
  {
    quote: "The AI video for my dad's 70th made him cry. In a good way. Worth every cent.",
    name: "Marcus Lee",
    role: "PM · Toronto",
    gradient: "from-sky-400 to-indigo-500",
  },
  {
    quote: "Our HR team automated 400 work-iversaries this year. Zero forgotten, zero spreadsheets.",
    name: "Elena Ruiz",
    role: "People Ops · Madrid",
    gradient: "from-emerald-400 to-teal-500",
  },
];

export const SocialProof = () => (
  <section className="relative py-24 md:py-32">
    <div className="mx-auto max-w-7xl px-4 md:px-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <Card
            key={s.label}
            className="border-0 bg-gradient-card p-6 text-center shadow-soft"
          >
            <CountUp
              value={s.value}
              suffix={s.suffix}
              format={s.format}
              className="font-display text-3xl font-bold text-gradient md:text-4xl tabular-nums"
            />
            <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <Marquee duration={40}>
          {logos.map((l) => (
            <span key={l} className="font-display text-xl font-semibold tracking-tight text-muted-foreground/70 hover:text-foreground transition">
              {l}
            </span>
          ))}
        </Marquee>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-[2fr,1fr]">
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Card
            key={t.name}
            className="relative overflow-hidden border-0 bg-card p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-card"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <Quote className="absolute right-5 top-5 h-8 w-8 text-primary/15" />
            <p className="font-display text-lg leading-snug">"{t.quote}"</p>
            <div className="mt-6 flex items-center gap-3">
              <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${t.gradient}`} />
              <div>
                <p className="font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
        <ActivityTicker />
      </div>
    </div>
  </section>
);