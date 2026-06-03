import { Navigation } from "@/components/Navigation";
import { GiftCard } from "@/components/GiftCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Heart, Star, Gift } from "lucide-react";

export const GiftCatalog = () => {
  const categories = [
    { id: "all", label: "All Gifts", count: 156 },
    { id: "gift-cards", label: "Gift Cards", count: 45 },
    { id: "flowers", label: "Flowers", count: 32 },
    { id: "food", label: "Food & Treats", count: 28 },
    { id: "experiences", label: "Experiences", count: 25 },
    { id: "jewelry", label: "Jewelry", count: 18 },
    { id: "tech", label: "Tech", count: 8 }
  ];

  const occasions = [
    "Birthday", "Anniversary", "Graduation", "Valentine's Day", 
    "Mother's Day", "Father's Day", "Holiday", "Thank You"
  ];

  const sampleGifts = [
    {
      id: "1",
      name: "Starbucks Gift Card",
      category: "Gift Cards",
      price: 25,
      provider: "Starbucks",
      occasions: ["Birthday", "Thank You", "Holiday"],
      description: "Perfect for coffee lovers. Redeemable at any Starbucks location.",
      rating: 4.8,
      isPopular: true,
      deliveryTime: "Instant"
    },
    {
      id: "2", 
      name: "Premium Rose Bouquet",
      category: "Flowers",
      price: 65,
      provider: "FTD",
      occasions: ["Anniversary", "Valentine's Day", "Birthday"],
      description: "Beautiful dozen red roses with premium delivery.",
      rating: 4.9,
      deliveryTime: "Same Day"
    },
    {
      id: "3",
      name: "Amazon Gift Card",
      category: "Gift Cards", 
      price: 50,
      provider: "Amazon",
      occasions: ["Birthday", "Graduation", "Holiday"],
      description: "The gift that lets them choose exactly what they want.",
      rating: 4.7,
      isPopular: true,
      deliveryTime: "Instant"
    },
    {
      id: "4",
      name: "Gourmet Chocolate Box",
      category: "Food & Treats",
      price: 35,
      provider: "Godiva",
      occasions: ["Valentine's Day", "Anniversary", "Thank You"],
      description: "Assorted premium chocolates in elegant packaging.",
      rating: 4.6,
      deliveryTime: "1-2 Days"
    },
    {
      id: "5",
      name: "Spa Day Experience",
      category: "Experiences",
      price: 120,
      provider: "Spafinder",
      occasions: ["Birthday", "Mother's Day", "Anniversary"],
      description: "Relaxing spa experience at premium locations nationwide.",
      rating: 4.8,
      deliveryTime: "Digital Voucher"
    },
    {
      id: "6",
      name: "DoorDash Credit",
      category: "Food & Treats",
      price: 30,
      provider: "DoorDash",
      occasions: ["Birthday", "Thank You", "Holiday"],
      description: "Let them enjoy their favorite meal delivered fresh.",
      rating: 4.5,
      deliveryTime: "Instant"
    }
  ];

  return (
    <div className="dark min-h-dvh bg-background text-foreground">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-walnut/40" />
        <div className="absolute inset-0 bg-aurora opacity-30" />
        <div className="absolute inset-0 bg-canvas-grid opacity-[0.3]" />
        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-corten/15 blur-[140px]" />
      </div>
      <Navigation currentPage="gifts" />

      <div className="p-4 md:p-6 lg:ml-64">
        <div className="mx-auto max-w-[1600px]">
          {/* Header */}
          <div className="glass-panel glass-inset mb-4 flex items-center justify-between p-4">
            <div>
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-corten">
                <span className="dot-neon inline-block h-1.5 w-1.5 rounded-full" aria-hidden="true" />
                catalog · 156 sku · live inventory
              </p>
              <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight">Marketplace</h1>
            </div>
            <Button size="sm" className="h-8 gap-1.5 bg-corten text-xs text-white hover:bg-corten/90">
              <Gift className="h-3.5 w-3.5" aria-hidden="true" /> Browse by occasion
            </Button>
          </div>

          {/* Search and filters */}
          <div className="glass-panel glass-inset mb-3 flex flex-col gap-2 p-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input
                type="search"
                aria-label="Search gifts"
                placeholder="Search SKUs, providers, occasions…"
                className="h-9 rounded-md border-border/60 bg-background/40 pl-9 font-mono text-xs"
              />
            </div>
            <div className="flex gap-1.5" role="toolbar" aria-label="Filters">
              <Button variant="ghost" size="sm" className="h-8 gap-1.5 border border-border/60 text-xs"><Filter className="h-3.5 w-3.5" aria-hidden="true" /> Price</Button>
              <Button variant="ghost" size="sm" className="h-8 gap-1.5 border border-border/60 text-xs"><Heart className="h-3.5 w-3.5" aria-hidden="true" /> Popular</Button>
              <Button variant="ghost" size="sm" className="h-8 gap-1.5 border border-border/60 text-xs"><Star className="h-3.5 w-3.5" aria-hidden="true" /> Top-rated</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-[260px_1fr]">
            {/* Categories Sidebar */}
            <aside aria-label="Filter facets">
              <div className="glass-panel glass-inset sticky top-4 p-4">
                <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">categories</h3>
                <div className="space-y-0.5">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      aria-pressed={category.id === "all"}
                      className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-sm transition ${
                        category.id === 'all'
                          ? "bg-corten/15 text-corten ring-1 ring-corten/30"
                          : "text-muted-foreground hover:bg-card/60 hover:text-foreground"
                      }`}
                    >
                      <span>{category.label}</span>
                      <span className="font-mono text-[10px] tabular-nums text-muted-foreground">{category.count}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-5 border-t border-border/40 pt-4">
                  <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">occasions</h3>
                  <div className="flex flex-wrap gap-1">
                    {occasions.map((occasion) => (
                      <Badge
                        key={occasion}
                        variant="secondary"
                        className="h-5 cursor-pointer border border-border/50 bg-background/40 px-1.5 text-[10px] hover:border-corten/40 hover:text-corten"
                      >
                        {occasion}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Gift Grid */}
            <div>
              <div className="mb-2 flex items-center justify-between px-1">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  results · <span className="text-foreground">{sampleGifts.length}</span> of 156
                </h2>
                <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                  <span>sort</span>
                  <select aria-label="Sort by" className="rounded-md border border-border/60 bg-background/40 px-2 py-1 text-xs">
                    <option>Popularity</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Rating</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
                {sampleGifts.map((gift) => (
                  <GiftCard key={gift.id} {...gift} />
                ))}
              </div>

              {/* Load More */}
              <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4 font-mono text-[11px] text-muted-foreground">
                <span>showing 6 of 156</span>
                <Button size="sm" variant="ghost" className="h-8 border border-border/60 text-xs">Load more →</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};