import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Play, Star, Calendar, Gift, Bell } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AuroraText } from "@/components/effects/AuroraText";
import { WordRotate } from "@/components/effects/WordRotate";
import { BorderBeam } from "@/components/effects/BorderBeam";
import heroAsset from "@/assets/hero-gift.png.asset.json";

export const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yFloat1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yFloat2 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Aurora */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-aurora animate-aurora opacity-90" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-50 dark:opacity-20" />
      {/* Floating particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-primary/40 animate-float-slow"
            style={{
              top: `${(i * 53) % 100}%`,
              left: `${(i * 37) % 100}%`,
              animationDelay: `${(i % 7) * 0.6}s`,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr,1fr]">
          <motion.div style={{ y: yText, opacity: opacityFade }} className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              New · AI video greetings v2
              <Sparkles className="h-3 w-3 text-primary" />
            </div>

            <h1 className="font-display text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Never forget a{" "}
              <WordRotate
                className="text-gradient-hero"
                words={["birthday", "milestone", "anniversary", "promotion", "thank you"]}
              />
              .<br className="hidden md:block" /> Send an <AuroraText>AI video</AuroraText> &amp; gift in 60 seconds.
            </h1>

            <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
              Never Forget Occasions remembers birthdays, anniversaries, and the small moments — then
              generates personal video greetings, schedules a curated gift, and delivers it for you.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative inline-flex overflow-hidden rounded-full">
                <Button size="lg" variant="hero" asChild className="relative text-base">
                  <Link to="/dashboard">
                    Start free trial
                    <Sparkles className="h-4 w-4" />
                  </Link>
                </Button>
                <BorderBeam size={120} duration={5} />
              </div>
              <Button size="lg" variant="outline" className="text-base">
                <Play className="h-4 w-4" />
                Watch 60s demo
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 text-sm text-muted-foreground">
              <div className="flex items-center -space-x-2">
                {[
                  "from-pink-400 to-rose-500",
                  "from-amber-400 to-orange-500",
                  "from-sky-400 to-indigo-500",
                  "from-emerald-400 to-teal-500",
                  "from-fuchsia-400 to-purple-500",
                ].map((g, i) => (
                  <div
                    key={i}
                    className={`h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br ${g}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-medium text-foreground">4.9</span>
                <span>· 12,400 happy senders</span>
              </div>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div style={{ y: yImage }} className="relative animate-fade-in-up" >
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-hero opacity-30 blur-3xl" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-premium">
              <img
                src={heroAsset.url}
                alt="iPhone with a soft gradient lockscreen beside a cream gift box, purple ribbon, and pale rose on linen"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

              {/* Floating cards */}
              <motion.div style={{ y: yFloat1 }} className="absolute left-4 top-4 hidden animate-float rounded-2xl border border-border/60 bg-card/90 px-3 py-2 text-sm shadow-card backdrop-blur-xl sm:block">
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-primary">
                    <Bell className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">In 3 days</p>
                    <p className="font-medium leading-tight">Mom's birthday</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                style={{ y: yFloat2, animationDelay: "1.2s" }}
                className="absolute right-4 top-20 hidden animate-float rounded-2xl border border-border/60 bg-card/90 px-3 py-2 text-sm shadow-card backdrop-blur-xl sm:block"
              >
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-xl bg-success/15">
                    <Gift className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Sent</p>
                    <p className="font-medium leading-tight">Rose bouquet · FTD</p>
                  </div>
                </div>
              </motion.div>

              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-border/60 bg-card/90 p-4 shadow-card backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary">
                      <Calendar className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">This week</p>
                      <p className="font-display text-base font-semibold">4 celebrations scheduled</p>
                    </div>
                  </div>
                  <div className="flex h-9 items-center rounded-full bg-gradient-primary px-3 text-xs font-semibold text-primary-foreground shadow-soft">
                    All on autopilot
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Press logos */}
        <div className="mt-16 flex flex-col items-center gap-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">As featured in</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 opacity-70">
            {["TechCrunch", "Forbes", "Fast Company", "The Verge", "Product Hunt"].map((p) => (
              <span key={p} className="font-display text-lg font-semibold tracking-tight text-muted-foreground">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};