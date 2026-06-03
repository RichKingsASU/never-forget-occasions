import { useMemo, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Store, Star, MapPin, Package } from "lucide-react";
import { toast } from "sonner";

type Creator = {
  id: string;
  name: string;
  handle: string;
  craft: string;
  city: string;
  rating: number;
  reviews: number;
  products: number;
  hue: string;
  bio: string;
  tags: string[];
};

const CREATORS: Creator[] = [
  { id: "cr1", name: "Mira Okafor",   handle: "@mira.studio",  craft: "Floral design",     city: "Brooklyn, NY",  rating: 4.9, reviews: 412, products: 28, hue: "from-corten/40 to-primary/30", bio: "Slow-grown bouquets and dried arrangements. Same-day in NYC.", tags: ["Bouquets", "Dried florals", "Same-day"] },
  { id: "cr2", name: "Hiro Tanaka",   handle: "@hiro.ceramics", craft: "Ceramics",         city: "Kyoto, JP",     rating: 5.0, reviews: 198, products: 14, hue: "from-accent/40 to-primary/30", bio: "Hand-thrown stoneware. Each piece signed and dated.",                  tags: ["Wheel-thrown", "Glazed", "Limited"] },
  { id: "cr3", name: "Sara Whitfield", handle: "@sara.bakes",   craft: "Patisserie",       city: "Austin, TX",    rating: 4.8, reviews: 631, products: 22, hue: "from-amber-500/40 to-corten/30", bio: "Croissants, canelés, and seasonal tarts. Ships nationwide.",            tags: ["Pastry", "Gift box", "Nationwide"] },
  { id: "cr4", name: "Diego Marín",   handle: "@diego.mezcal", craft: "Spirits & mezcal", city: "Oaxaca, MX",    rating: 4.9, reviews: 287, products: 9,  hue: "from-corten/50 to-amber-500/30", bio: "Small-batch mezcal from family palenques in Sola de Vega.",            tags: ["Spirits", "Single-origin"] },
  { id: "cr5", name: "Lena Park",     handle: "@lena.print",   craft: "Letterpress",      city: "Portland, OR",  rating: 4.7, reviews: 154, products: 31, hue: "from-primary/40 to-accent/30", bio: "Letterpress cards and custom monograms on cotton paper.",              tags: ["Stationery", "Custom"] },
  { id: "cr6", name: "Noah Ashforth", handle: "@noah.woodshop", craft: "Woodworking",      city: "Asheville, NC", rating: 4.9, reviews: 92,  products: 11, hue: "from-amber-500/30 to-muted", bio: "Heirloom cutting boards and turned bowls from local hardwoods.",        tags: ["Wood", "Heirloom"] },
];

const CRAFTS = ["All", "Floral design", "Ceramics", "Patisserie", "Spirits & mezcal", "Letterpress", "Woodworking"] as const;

export const Creators = () => {
  const [q, setQ] = useState("");
  const [craft, setCraft] = useState<(typeof CRAFTS)[number]>("All");
  const [following, setFollowing] = useState<Set<string>>(new Set());

  const filtered = useMemo(
    () =>
      CREATORS.filter(
        (c) =>
          (craft === "All" || c.craft === craft) &&
          (q === "" || c.name.toLowerCase().includes(q.toLowerCase()) || c.handle.toLowerCase().includes(q.toLowerCase()) || c.craft.toLowerCase().includes(q.toLowerCase()))
      ),
    [q, craft]
  );

  const toggle = (id: string, name: string) => {
    setFollowing((s) => {
      const next = new Set(s);
      if (next.has(id)) { next.delete(id); toast(`Unfollowed ${name}`); }
      else { next.add(id); toast.success(`Following ${name}`); }
      return next;
    });
  };

  return (
    <div className="dark min-h-dvh bg-background text-foreground">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-walnut/40" />
        <div className="absolute inset-0 bg-canvas-grid opacity-[0.3]" />
        <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-corten/20 blur-[120px]" />
      </div>

      <Navigation currentPage="creators" />

      <div className="lg:ml-64">
        <main className="px-4 py-6 md:px-8">
          <div className="mx-auto max-w-[1500px] space-y-5">
            <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-corten">
                  <Store className="h-3 w-3" /> marketplace · makers
                </p>
                <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">Independent creators</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Vetted makers shipping the kind of gifts you can't find on a shelf.
                </p>
              </div>
              <Button variant="ghost" className="border border-border/60" onClick={() => toast.info("Application portal coming soon")}>
                Apply to sell
              </Button>
            </header>

            <div className="glass-panel flex flex-col gap-3 p-3 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search creators, crafts, cities…" className="h-10 border-border/60 bg-card/60 pl-9" aria-label="Search creators" />
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {CRAFTS.map((c) => (
                  <button key={c} onClick={() => setCraft(c)} className={`rounded-full border px-3 py-1 text-xs transition ${craft === c ? "border-corten/60 bg-corten/15 text-corten" : "border-border/60 text-muted-foreground hover:text-foreground"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((c) => {
                const initials = c.name.split(" ").map((n) => n[0]).join("");
                const isFollowing = following.has(c.id);
                return (
                  <Card key={c.id} className="glass-panel overflow-hidden border-0 p-0">
                    <div className={`h-24 bg-gradient-to-br ${c.hue}`} />
                    <div className="p-5">
                      <div className="-mt-12 flex items-end justify-between">
                        <Avatar className="h-16 w-16 ring-4 ring-card">
                          <AvatarFallback className="bg-gradient-to-br from-primary to-corten font-semibold text-primary-foreground">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <Button size="sm" variant={isFollowing ? "outline" : "default"} onClick={() => toggle(c.id, c.name)} className={isFollowing ? "" : "bg-corten text-white hover:bg-corten/90"}>
                          {isFollowing ? "Following" : "Follow"}
                        </Button>
                      </div>
                      <div className="mt-3">
                        <p className="font-display text-base font-semibold leading-tight">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.handle} · {c.craft}</p>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.bio}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-corten text-corten" /> {c.rating} <span className="text-muted-foreground/60">({c.reviews})</span></span>
                        <span className="flex items-center gap-1"><Package className="h-3.5 w-3.5" /> {c.products} products</span>
                        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {c.city}</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {c.tags.map((t) => (
                          <Badge key={t} variant="secondary" className="border-border/60 bg-background/40 text-[10px]">{t}</Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Creators;