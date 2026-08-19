import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Search, Star, Plus, Filter, X, ShoppingBag, Gift as GiftIcon, Clock } from "lucide-react";
import { mockGifts, formatCurrency, type GiftCategory } from "@/lib/mock-data";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/effects/TiltCard";
import { CartSheet } from "@/components/cart/CartSheet";
import { CatalogPreviewBanner } from "@/components/gifts/CatalogPreviewBanner";
import { toast } from "sonner";

const CATEGORIES: ("All" | GiftCategory)[] = ["All", "Gift Cards", "Flowers", "Food & Treats", "Experiences", "Home", "Wellness", "Tech", "Jewelry"];
const OCCASIONS = ["All", "Birthday", "Anniversary", "Mother's Day", "Holiday", "Thank You", "Promotion", "Housewarming", "Valentine's Day", "Just because"];
const SPEEDS = ["Any", "Instant", "Same-day", "Next-day", "2-3 days"] as const;

export const GiftCatalog = () => {
  const { add, count } = useCart();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [occ, setOcc] = useState<(typeof OCCASIONS)[number]>("All");
  const [price, setPrice] = useState<[number, number]>([0, 250]);
  const [minRating, setMinRating] = useState(0);
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>("Any");
  const [sort, setSort] = useState<"popular" | "newest" | "price-asc" | "price-desc" | "rating">("popular");

  const filtered = useMemo(() => {
    let arr = mockGifts.filter((g) =>
      (cat === "All" || g.category === cat) &&
      (occ === "All" || g.occasions.includes(occ)) &&
      g.price >= price[0] && g.price <= price[1] &&
      g.rating >= minRating &&
      (speed === "Any" || g.deliveryTime === speed) &&
      (q === "" || g.name.toLowerCase().includes(q.toLowerCase()) || g.provider.toLowerCase().includes(q.toLowerCase()))
    );
    switch (sort) {
      case "newest":     arr = [...arr].sort((a,b) => (b.badges?.includes("new") ? 1:0) - (a.badges?.includes("new") ? 1:0)); break;
      case "price-asc":  arr = [...arr].sort((a,b) => a.price - b.price); break;
      case "price-desc": arr = [...arr].sort((a,b) => b.price - a.price); break;
      case "rating":     arr = [...arr].sort((a,b) => b.rating - a.rating); break;
      default:           arr = [...arr].sort((a,b) => b.reviewCount - a.reviewCount);
    }
    return arr;
  }, [q, cat, occ, price, minRating, speed, sort]);

  const reset = () => { setQ(""); setCat("All"); setOcc("All"); setPrice([0,250]); setMinRating(0); setSpeed("Any"); };

  return (
    <div className="dark min-h-dvh bg-background text-foreground">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-walnut/40" />
        <div className="absolute inset-0 bg-canvas-grid opacity-[0.3]" />
        <div className="absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-corten/20 blur-[120px]" />
      </div>

      <Navigation currentPage="gifts" />

      <div className="lg:ml-64">
        <main className="px-4 py-6 md:px-8">
          <div className="mx-auto max-w-[1500px] space-y-5">
            <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-corten">
                  <GiftIcon className="h-3 w-3" /> marketplace · gifts
                </p>
                <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">Curated for every occasion</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {filtered.length} gift{filtered.length === 1 ? "" : "s"} · vetted creators
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CartSheet
                  trigger={
                    <Button variant="outline" className="gap-1.5">
                      <ShoppingBag className="h-4 w-4" /> Cart
                      {count > 0 && <Badge className="ml-1 h-5 border-0 bg-corten/15 px-1.5 font-mono text-[10px] text-corten">{count}</Badge>}
                    </Button>
                  }
                />
              </div>
            </header>

            <CatalogPreviewBanner />

            <div className="grid gap-4 xl:grid-cols-[260px_1fr]">
              {/* Filter rail */}
              <aside className="glass-panel sticky top-4 h-fit space-y-5 p-4 xl:max-h-[calc(100dvh-6rem)] xl:overflow-y-auto">
                <div className="flex items-center justify-between">
                  <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    <Filter className="mr-1 inline h-3 w-3" /> filters
                  </h2>
                  <button onClick={reset} className="text-[11px] text-muted-foreground hover:text-foreground">
                    <X className="mr-0.5 inline h-3 w-3" /> Reset
                  </button>
                </div>

                <div>
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Category</p>
                  <div className="space-y-1">
                    {CATEGORIES.map((c) => (
                      <button key={c} onClick={() => setCat(c)} className={`w-full rounded-md px-2.5 py-1.5 text-left text-xs transition ${cat === c ? "bg-corten/15 text-corten" : "text-muted-foreground hover:bg-card/60 hover:text-foreground"}`}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Occasion</p>
                  <div className="flex flex-wrap gap-1">
                    {OCCASIONS.map((o) => (
                      <button key={o} onClick={() => setOcc(o)} className={`rounded-full border px-2.5 py-1 text-[11px] transition ${occ === o ? "border-corten/60 bg-corten/15 text-corten" : "border-border/60 text-muted-foreground hover:text-foreground"}`}>
                        {o}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Price</p>
                    <p className="font-mono text-[11px] tabular-nums">{formatCurrency(price[0])} – {formatCurrency(price[1])}</p>
                  </div>
                  <Slider min={0} max={250} step={5} value={price} onValueChange={(v) => setPrice([v[0], v[1]] as [number, number])} />
                </div>

                <div>
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Min rating</p>
                  <div className="flex gap-1">
                    {[0, 4, 4.5, 4.8].map((r) => (
                      <button key={r} onClick={() => setMinRating(r)} className={`flex-1 rounded-md border px-2 py-1.5 text-[11px] transition ${minRating === r ? "border-corten/60 bg-corten/15 text-corten" : "border-border/60 text-muted-foreground hover:text-foreground"}`}>
                        {r === 0 ? "Any" : `${r}+`}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Delivery</p>
                  <Select value={speed} onValueChange={(v) => setSpeed(v as typeof speed)}>
                    <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {SPEEDS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </aside>

              <div className="space-y-4">
                <div className="glass-panel flex flex-col gap-3 p-3 md:flex-row md:items-center">
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search gifts, brands, creators…" className="h-10 border-border/60 bg-card/60 pl-9" aria-label="Search gifts" />
                  </div>
                  <Select value={sort} onValueChange={(v) => setSort(v as typeof sort)}>
                    <SelectTrigger className="h-10 md:w-48"><SelectValue placeholder="Sort by" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most popular</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="rating">Top rated</SelectItem>
                      <SelectItem value="price-asc">Price · low to high</SelectItem>
                      <SelectItem value="price-desc">Price · high to low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {filtered.length === 0 ? (
                  <Card className="glass-panel border-0 p-12 text-center">
                    <p className="font-display text-lg">No gifts match those filters</p>
                    <p className="mt-1 text-sm text-muted-foreground">Try widening your price range or clearing a filter.</p>
                    <Button className="mt-4 bg-corten text-white hover:bg-corten/90" onClick={reset}>Reset filters</Button>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((g) => (
                      <TiltCard key={g.id} max={5}>
                      <Card className="glass-panel group overflow-hidden border-0 p-0 transition hover:-translate-y-0.5">
                        <Link to={`/gifts/${g.slug}`} className="block">
                          <motion.div
                            layoutId={`gift-hero-${g.slug}`}
                            className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${g.hue}`}
                          >
                            <div className="absolute inset-0 bg-canvas-grid opacity-25" />
                            <div className="absolute left-3 top-3 flex gap-1.5">
                              {g.badges?.map((b) => (
                                <Badge key={b} className={`h-5 border-0 px-1.5 font-mono text-[10px] uppercase ${
                                  b === "popular" ? "bg-corten/90 text-white" :
                                  b === "new"     ? "bg-success/80 text-white" :
                                  b === "eco"     ? "bg-emerald-700/80 text-white" :
                                                    "bg-background/70 text-foreground backdrop-blur"
                                }`}>{b}</Badge>
                              ))}
                            </div>
                            <Badge className="absolute right-3 top-3 h-5 border-0 bg-background/70 px-1.5 font-mono text-[10px] text-foreground backdrop-blur">
                              <Clock className="mr-1 h-3 w-3" /> {g.deliveryTime}
                            </Badge>
                          </motion.div>
                        </Link>
                        <div className="p-4">
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{g.provider}</p>
                            <span className="flex items-center gap-1 text-xs">
                              <Star className="h-3 w-3 fill-corten text-corten" /> {g.rating}
                              <span className="text-muted-foreground/60">({g.reviewCount})</span>
                            </span>
                          </div>
                          <Link to={`/gifts/${g.slug}`}>
                            <h3 className="mt-1 line-clamp-1 font-display text-base font-semibold leading-tight hover:text-corten">{g.name}</h3>
                          </Link>
                          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{g.description}</p>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="font-display text-lg font-semibold tabular-nums">{formatCurrency(g.price)}</span>
                            <Button
                              size="sm"
                              className="h-8 gap-1 bg-corten text-xs text-white hover:bg-corten/90"
                              onClick={(e) => {
                                e.preventDefault();
                                add({ giftId: g.id, slug: g.slug, name: g.name, qty: 1, unitPrice: g.price, hue: g.hue });
                                toast.success(`${g.name} added to cart`);
                              }}
                            >
                              <Plus className="h-3.5 w-3.5" /> Add
                            </Button>
                          </div>
                        </div>
                      </Card>
                      </TiltCard>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GiftCatalog;