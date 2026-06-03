import graduationAsset from "@/assets/graduation.png.asset.json";
import { Cake, Heart, GraduationCap, Gift, Sparkles, Baby } from "lucide-react";

const small = [
  { icon: Cake, label: "Birthdays", tone: "from-pink-400/30 to-rose-500/20" },
  { icon: Heart, label: "Anniversaries", tone: "from-rose-400/30 to-fuchsia-500/20" },
  { icon: Gift, label: "Holidays", tone: "from-amber-400/30 to-orange-500/20" },
  { icon: Baby, label: "New baby", tone: "from-sky-400/30 to-indigo-500/20" },
  { icon: Sparkles, label: "Promotions", tone: "from-emerald-400/30 to-teal-500/20" },
];

export const Occasions = () => (
  <section id="occasions" className="relative py-20 md:py-28">
    <div className="mx-auto max-w-7xl px-4 md:px-8">
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">Occasions we celebrate</p>
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            From caps in the air to candles on the cake.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            One calendar for every milestone — birthdays, weddings, graduations and the in-between moments
            that matter most.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
        {/* Hero graduation card */}
        <div className="group relative overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-premium">
          <img
            src={graduationAsset.url}
            alt="Graduates throwing caps into a sunset sky"
            className="aspect-[16/10] h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-3 py-1 text-xs font-medium backdrop-blur-md">
                <GraduationCap className="h-3.5 w-3.5 text-primary" />
                Graduation season
              </div>
              <h3 className="font-display text-2xl font-semibold md:text-3xl">
                Don't miss their big day.
              </h3>
              <p className="mt-1 max-w-md text-sm text-muted-foreground">
                Auto-scheduled video greetings and curated gifts for every grad in your circle.
              </p>
            </div>
          </div>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
          {small.map(({ icon: Icon, label, tone }) => (
            <div
              key={label}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${tone} opacity-60`} />
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-4 font-display text-lg font-semibold">{label}</p>
              <p className="text-xs text-muted-foreground">Tap to plan ahead</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);