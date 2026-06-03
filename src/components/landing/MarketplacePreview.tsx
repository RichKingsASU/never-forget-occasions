import { Star, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TiltCard } from "@/components/effects/TiltCard";

const items = [
  { name: "Garden Rose Bouquet", maker: "FTD Studio", price: 64, rating: 4.9, tag: "Flowers", tone: "from-rose-400/30 to-pink-300/20", h: "h-72" },
  { name: "Starbucks Gift Card", maker: "Starbucks", price: 25, rating: 4.8, tag: "Gift Cards", tone: "from-emerald-400/30 to-teal-300/20", h: "h-56" },
  { name: "Tasting Menu for Two", maker: "Eleven Tables", price: 220, rating: 5.0, tag: "Experiences", tone: "from-amber-400/30 to-orange-300/20", h: "h-64" },
  { name: "Hand-thrown Ceramic Vase", maker: "Studio Iris", price: 88, rating: 4.7, tag: "Handmade", tone: "from-sky-400/30 to-indigo-300/20", h: "h-80" },
  { name: "Custom Portrait Print", maker: "Atelier Noor", price: 145, rating: 4.9, tag: "Personalized Art", tone: "from-fuchsia-400/30 to-purple-300/20", h: "h-60" },
  { name: "Artisan Coffee Box", maker: "Kindred Roasters", price: 42, rating: 4.8, tag: "Subscription", tone: "from-orange-400/30 to-rose-300/20", h: "h-72" },
  { name: "Hot-air Balloon Ride", maker: "Skyline Co.", price: 350, rating: 4.9, tag: "Luxury", tone: "from-violet-400/30 to-indigo-300/20", h: "h-64" },
  { name: "Belgian Chocolate Tower", maker: "Godiva", price: 58, rating: 4.6, tag: "Treats", tone: "from-amber-400/30 to-yellow-300/20", h: "h-56" },
];

export const MarketplacePreview = () => (
  <section id="marketplace" className="relative py-24 md:py-32">
    <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    <div className="mx-auto max-w-7xl px-4 md:px-8">
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Marketplace</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Gifts you'd actually pick yourself
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Curated by humans. Delivered by us. Reviewed by 12,400 senders.
          </p>
        </div>
        <Button asChild variant="outline" size="lg" className="shrink-0">
          <Link to="/gifts">Browse the catalog</Link>
        </Button>
      </div>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-4 [&>*]:mb-4 [&>*]:break-inside-avoid">
        {items.map((it) => (
          <TiltCard key={it.name} max={6}>
            <article className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card transition hover:shadow-card">
              <div className={`relative ${it.h} overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${it.tone}`} />
                <div className="absolute inset-0 bg-aurora opacity-40" />
                <button
                  aria-label={`Save ${it.name} to wishlist`}
                  className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-background/80 backdrop-blur transition hover:bg-background"
                >
                  <Heart className="h-4 w-4" />
                </button>
                <Badge className="absolute left-3 top-3 border-0 bg-background/80 text-foreground backdrop-blur">
                  {it.tag}
                </Badge>
              </div>
              <div className="space-y-2 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-medium leading-tight">{it.name}</h3>
                    <p className="text-xs text-muted-foreground">by {it.maker}</p>
                  </div>
                  <span className="font-display text-lg font-semibold">${it.price}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {it.rating} · verified creator
                </div>
              </div>
            </article>
          </TiltCard>
        ))}
      </div>
    </div>
  </section>
);