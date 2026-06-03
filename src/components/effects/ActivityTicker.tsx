import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Gift, Heart, Sparkles, Video } from "lucide-react";

const events = [
  { who: "Sarah", what: "sent a video to Mom", icon: Video, tone: "from-rose-400 to-pink-500" },
  { who: "Marcus", what: "scheduled a rose bouquet", icon: Gift, tone: "from-emerald-400 to-teal-500" },
  { who: "Priya", what: "saved Dad's anniversary", icon: Heart, tone: "from-amber-400 to-orange-500" },
  { who: "Elena", what: "generated 12 team greetings", icon: Sparkles, tone: "from-sky-400 to-indigo-500" },
  { who: "Jonas", what: "delivered a tasting menu", icon: Gift, tone: "from-fuchsia-400 to-purple-500" },
  { who: "Mei", what: "scheduled Grandma's birthday", icon: Heart, tone: "from-pink-400 to-rose-500" },
  { who: "Tomás", what: "sent a Starbucks gift card", icon: Gift, tone: "from-emerald-400 to-lime-500" },
  { who: "Anya", what: "drafted an AI birthday script", icon: Sparkles, tone: "from-violet-400 to-indigo-500" },
];

export const ActivityTicker = () => {
  const [items, setItems] = useState(() => events.slice(0, 4));

  useEffect(() => {
    let idx = 4;
    const t = setInterval(() => {
      const next = events[idx % events.length];
      idx++;
      setItems((prev) => [next, ...prev].slice(0, 4));
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative h-[280px] overflow-hidden rounded-3xl border border-border/60 glass-card p-4">
      <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          Live activity
        </span>
        <span className="font-mono text-foreground/60">now</span>
      </div>
      <ul className="space-y-2">
        <AnimatePresence initial={false}>
          {items.map((e, i) => {
            const Icon = e.icon;
            return (
              <motion.li
                key={`${e.who}-${e.what}-${i}-${items.length}`}
                layout
                initial={{ opacity: 0, y: -16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 rounded-2xl border border-border/40 bg-card/50 px-3 py-2.5"
              >
                <div className={`grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br ${e.tone} text-white`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">
                    <span className="font-medium">{e.who}</span>{" "}
                    <span className="text-muted-foreground">{e.what}</span>
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">just now</p>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
};