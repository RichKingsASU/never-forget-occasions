import { useMemo, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Search, Video, Clock, Sparkles, Heart } from "lucide-react";
import { toast } from "sonner";

type Template = {
  id: string;
  title: string;
  category: "Birthday" | "Anniversary" | "Holiday" | "Milestone" | "Just because";
  duration: string;
  vibe: string;
  premium?: boolean;
  hue: string;
};

const TEMPLATES: Template[] = [
  { id: "t1", title: "Confetti Pop",      category: "Birthday",     duration: "0:20", vibe: "Playful · upbeat",   hue: "from-corten/40 to-primary/30" },
  { id: "t2", title: "Slow Sunday",       category: "Anniversary",  duration: "0:35", vibe: "Cinematic · warm",   premium: true, hue: "from-primary/40 to-accent/30" },
  { id: "t3", title: "Holiday Hearth",    category: "Holiday",      duration: "0:25", vibe: "Cozy · nostalgic",   hue: "from-corten/50 to-amber-500/30" },
  { id: "t4", title: "First Day",         category: "Milestone",    duration: "0:30", vibe: "Hopeful · sunrise",  hue: "from-accent/40 to-primary/30" },
  { id: "t5", title: "Quiet Note",        category: "Just because", duration: "0:15", vibe: "Minimal · intimate", hue: "from-muted to-primary/20" },
  { id: "t6", title: "Big Reveal",        category: "Milestone",    duration: "0:40", vibe: "Bold · cinematic",   premium: true, hue: "from-corten/50 to-primary/40" },
  { id: "t7", title: "Sunset Letter",     category: "Anniversary",  duration: "0:28", vibe: "Romantic · golden",  hue: "from-amber-500/40 to-corten/30" },
  { id: "t8", title: "Polaroid Stack",    category: "Birthday",     duration: "0:22", vibe: "Retro · handcrafted", hue: "from-primary/30 to-accent/40" },
  { id: "t9", title: "Winter Whisper",    category: "Holiday",      duration: "0:18", vibe: "Quiet · snowfall",   hue: "from-accent/40 to-background" },
];

const CATEGORIES = ["All", "Birthday", "Anniversary", "Holiday", "Milestone", "Just because"] as const;

export const Templates = () => {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [favs, setFavs] = useState<Set<string>>(new Set());

  const filtered = useMemo(
    () =>
      TEMPLATES.filter(
        (t) =>
          (cat === "All" || t.category === cat) &&
          (q === "" || t.title.toLowerCase().includes(q.toLowerCase()) || t.vibe.toLowerCase().includes(q.toLowerCase()))
      ),
    [q, cat]
  );

  const toggleFav = (id: string) => {
    setFavs((s) => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="dark min-h-dvh bg-background text-foreground">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-walnut/40" />
        <div className="absolute inset-0 bg-canvas-grid opacity-[0.3]" />
        <div className="absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-corten/20 blur-[120px]" />
      </div>

      <Navigation currentPage="templates" />

      <div className="lg:ml-64">
        <main className="px-4 py-6 md:px-8">
          <div className="mx-auto max-w-[1500px] space-y-5">
            <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-corten">
                  <Video className="h-3 w-3" /> video · templates
                </p>
                <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">
                  Cinematic templates
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Hand-crafted looks for every kind of occasion. Pick one and let the AI do the words.
                </p>
              </div>
              <Button className="bg-corten text-white hover:bg-corten/90" onClick={() => toast.info("Custom template builder coming soon")}>
                <Sparkles className="h-4 w-4" /> Build custom
              </Button>
            </header>

            <div className="glass-panel flex flex-col gap-3 p-3 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search templates by name or vibe…" className="h-10 border-border/60 bg-card/60 pl-9" aria-label="Search templates" />
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {CATEGORIES.map((c) => (
                  <button key={c} onClick={() => setCat(c)} className={`rounded-full border px-3 py-1 text-xs transition ${cat === c ? "border-corten/60 bg-corten/15 text-corten" : "border-border/60 text-muted-foreground hover:text-foreground"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((t) => (
                <Card key={t.id} className="glass-panel group overflow-hidden border-0 p-0 transition hover:-translate-y-0.5">
                  <div className={`relative aspect-video overflow-hidden bg-gradient-to-br ${t.hue}`}>
                    <div className="absolute inset-0 bg-canvas-grid opacity-30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        aria-label={`Preview ${t.title}`}
                        onClick={() => toast.success(`Loading preview · ${t.title}`)}
                        className="grid h-14 w-14 place-items-center rounded-full bg-background/80 text-foreground backdrop-blur transition group-hover:scale-110"
                      >
                        <Play className="h-5 w-5" fill="currentColor" />
                      </button>
                    </div>
                    <div className="absolute left-3 top-3 flex gap-1.5">
                      <Badge className="h-5 border-0 bg-background/70 px-1.5 font-mono text-[10px] text-foreground backdrop-blur">
                        <Clock className="mr-1 h-3 w-3" /> {t.duration}
                      </Badge>
                      {t.premium && (
                        <Badge className="h-5 border-0 bg-corten/90 px-1.5 font-mono text-[10px] text-white">PRO</Badge>
                      )}
                    </div>
                    <button
                      onClick={() => toggleFav(t.id)}
                      aria-label={favs.has(t.id) ? "Unfavorite" : "Favorite"}
                      className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-background/70 backdrop-blur transition hover:scale-110"
                    >
                      <Heart className={`h-4 w-4 ${favs.has(t.id) ? "fill-corten text-corten" : "text-muted-foreground"}`} />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-base font-semibold leading-tight">{t.title}</h3>
                      <Badge variant="secondary" className="border-border/60 bg-background/40 text-[10px]">{t.category}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{t.vibe}</p>
                    <Button size="sm" className="mt-3 w-full bg-corten text-white hover:bg-corten/90" onClick={() => toast.success(`Using template · ${t.title}`)}>
                      <Sparkles className="h-3.5 w-3.5" /> Use this template
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Templates;