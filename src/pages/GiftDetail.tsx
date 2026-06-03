import { useMemo, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tabs, TabsList, TabsTrigger, TabsContent,
} from "@/components/ui/tabs";
import {
  Star, Plus, Minus, ShoppingBag, Zap, Share2, Truck, Shield, RotateCcw, ChevronRight, Clock,
} from "lucide-react";
import { findGift, mockGifts, mockReviews, formatCurrency, estimateDelivery } from "@/lib/mock-data";
import { useCart } from "@/context/CartContext";
import { CartSheet } from "@/components/cart/CartSheet";
import { toast } from "sonner";

export const GiftDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const gift = slug ? findGift(slug) : undefined;
  const navigate = useNavigate();
  const { add } = useCart();

  const [variant, setVariant] = useState(() => gift?.variants?.options[0]);
  const [qty, setQty] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);
  const [message, setMessage] = useState("");
  const [sendDate, setSendDate] = useState("");

  const related = useMemo(
    () => gift ? mockGifts.filter((g) => g.id !== gift.id && (g.category === gift.category || g.occasions.some((o) => gift.occasions.includes(o)))).slice(0, 4) : [],
    [gift]
  );

  if (!gift) return <Navigate to="/gifts" replace />;

  const unitPrice = gift.price + (variant?.priceDelta ?? 0);
  const reviews = mockReviews[gift.id] ?? [];

  const gradients = [gift.hue, "from-primary/40 to-accent/30", "from-corten/30 to-primary/20", "from-amber-500/40 to-corten/30"];

  const addToCart = () => {
    add({
      giftId: gift.id, slug: gift.slug, name: gift.name, variant: variant?.label,
      qty, unitPrice, hue: gift.hue,
      giftMessage: message || undefined, scheduledFor: sendDate || undefined,
    });
    toast.success(`${gift.name} added to cart`);
  };
  const buyNow = () => { addToCart(); navigate("/checkout"); };

  return (
    <div className="dark min-h-dvh bg-background text-foreground">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-walnut/40" />
        <div className="absolute inset-0 bg-canvas-grid opacity-[0.3]" />
      </div>

      <Navigation currentPage="gifts" />

      <div className="lg:ml-64">
        <main className="px-4 py-6 md:px-8">
          <div className="mx-auto max-w-[1400px] space-y-6">
            <nav className="flex items-center gap-1.5 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link to="/gifts" className="hover:text-foreground">Marketplace</Link>
              <ChevronRight className="h-3 w-3" />
              <span>{gift.category}</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground">{gift.name}</span>
              <CartSheet />
            </nav>

            <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
              {/* Gallery */}
              <div className="space-y-3">
                <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br ${gradients[imgIdx]}`}>
                  <div className="absolute inset-0 bg-canvas-grid opacity-25" />
                  <div className="absolute left-4 top-4 flex gap-1.5">
                    {gift.badges?.map((b) => (
                      <Badge key={b} className="h-6 border-0 bg-background/80 px-2 font-mono text-[10px] uppercase backdrop-blur">{b}</Badge>
                    ))}
                  </div>
                  <Button variant="ghost" size="icon" className="absolute right-3 top-3 h-9 w-9 rounded-full bg-background/80 backdrop-blur"
                    onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Link copied"); }} aria-label="Share">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {gradients.map((g, i) => (
                    <button key={i} onClick={() => setImgIdx(i)}
                      className={`aspect-square overflow-hidden rounded-lg bg-gradient-to-br ${g} ring-2 ${imgIdx === i ? "ring-corten" : "ring-transparent"}`}
                      aria-label={`View image ${i + 1}`}>
                      <div className="h-full w-full bg-canvas-grid opacity-25" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-corten">{gift.category} · {gift.provider}</p>
                <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">{gift.name}</h1>
                <div className="mt-2 flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-corten text-corten" /> {gift.rating}
                    <span className="text-muted-foreground">· {gift.reviewCount} reviews</span>
                  </span>
                  <span className="text-muted-foreground">·</span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> {gift.deliveryTime}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{gift.description}</p>

                <div className="mt-5 flex items-baseline gap-3">
                  <span className="font-display text-4xl font-semibold tabular-nums">{formatCurrency(unitPrice)}</span>
                  <span className="text-xs text-muted-foreground">Arrives by {estimateDelivery(gift.deliveryTime)}</span>
                </div>

                {gift.variants && (
                  <div className="mt-5">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{gift.variants.label}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {gift.variants.options.map((v) => (
                        <button key={v.id} onClick={() => setVariant(v)}
                          className={`rounded-lg border px-3 py-1.5 text-xs transition ${variant?.id === v.id ? "border-corten bg-corten/15 text-corten" : "border-border/60 hover:border-border"}`}>
                          {v.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-5">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Quantity</p>
                  <div className="inline-flex items-center rounded-lg border border-border/60">
                    <Button size="icon" variant="ghost" className="h-9 w-9" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity"><Minus className="h-4 w-4" /></Button>
                    <span className="w-10 text-center font-mono tabular-nums">{qty}</span>
                    <Button size="icon" variant="ghost" className="h-9 w-9" onClick={() => setQty(qty + 1)} aria-label="Increase quantity"><Plus className="h-4 w-4" /></Button>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 rounded-xl border border-border/60 bg-card/40 p-4">
                  <div className="grid gap-1.5">
                    <Label htmlFor="gd-msg">Gift message <span className="text-muted-foreground">(optional)</span></Label>
                    <Textarea id="gd-msg" value={message} onChange={(e) => setMessage(e.target.value)} rows={2} placeholder="A short note included with the gift…" />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="gd-date">Schedule send <span className="text-muted-foreground">(optional)</span></Label>
                    <Input id="gd-date" type="date" value={sendDate} onChange={(e) => setSendDate(e.target.value)} />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <Button size="lg" variant="outline" onClick={addToCart} className="gap-1.5">
                    <ShoppingBag className="h-4 w-4" /> Add to cart
                  </Button>
                  <Button size="lg" onClick={buyNow} className="gap-1.5 bg-corten text-white hover:bg-corten/90">
                    <Zap className="h-4 w-4" /> Buy now
                  </Button>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2 text-[11px] text-muted-foreground">
                  <div className="flex items-start gap-2 rounded-lg border border-border/60 p-3"><Truck className="h-4 w-4 text-corten" /> <span><b className="text-foreground">Free shipping</b><br/>orders over $50</span></div>
                  <div className="flex items-start gap-2 rounded-lg border border-border/60 p-3"><RotateCcw className="h-4 w-4 text-corten" /> <span><b className="text-foreground">30-day</b><br/>easy returns</span></div>
                  <div className="flex items-start gap-2 rounded-lg border border-border/60 p-3"><Shield className="h-4 w-4 text-corten" /> <span><b className="text-foreground">Guaranteed</b><br/>delivery</span></div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="about" className="space-y-4">
              <TabsList className="glass-panel h-auto justify-start gap-1 border-0 bg-transparent p-1">
                {[["about","About"],["reviews",`Reviews (${reviews.length})`],["shipping","Shipping & returns"],["creator","About the creator"]].map(([v,l]) => (
                  <TabsTrigger key={v} value={v} className="data-[state=active]:bg-corten/20 data-[state=active]:text-corten">{l}</TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="about">
                <Card className="glass-panel border-0 p-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">{gift.longDescription}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {gift.occasions.map((o) => (
                      <Badge key={o} variant="secondary" className="border-border/60 bg-background/40 text-[10px]">{o}</Badge>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card className="glass-panel border-0 p-6 space-y-4">
                  {reviews.map((r, i) => (
                    <div key={i} className="border-b border-border/40 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8"><AvatarFallback className="bg-gradient-to-br from-primary to-corten text-[11px] font-semibold text-primary-foreground">{r.author.split(" ").map(n=>n[0]).join("")}</AvatarFallback></Avatar>
                        <div>
                          <p className="text-sm font-medium">{r.author}</p>
                          <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                            {Array.from({length:5}).map((_,i)=><Star key={i} className={`h-3 w-3 ${i < r.rating ? "fill-corten text-corten" : "text-muted"}`} />)}
                            <span className="ml-1">{r.date}</span>
                          </p>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
                    </div>
                  ))}
                </Card>
              </TabsContent>

              <TabsContent value="shipping">
                <Card className="glass-panel border-0 p-6 space-y-3 text-sm text-muted-foreground">
                  <p><b className="text-foreground">Delivery:</b> {gift.deliveryTime}. Estimated arrival {estimateDelivery(gift.deliveryTime)}.</p>
                  <p><b className="text-foreground">Returns:</b> 30 days, no questions asked. Digital gifts can be reissued to a different recipient within 7 days.</p>
                  <p><b className="text-foreground">International:</b> Available in 38 countries through our partner network.</p>
                </Card>
              </TabsContent>

              <TabsContent value="creator">
                <Card className="glass-panel border-0 p-6">
                  {gift.creatorId ? (
                    <div className="flex items-start gap-4">
                      <Avatar className="h-14 w-14"><AvatarFallback className="bg-gradient-to-br from-primary to-corten text-base font-semibold text-primary-foreground">{gift.provider.split(" ").map(n=>n[0]).join("")}</AvatarFallback></Avatar>
                      <div className="flex-1">
                        <p className="font-display text-lg font-semibold">{gift.provider}</p>
                        <p className="text-xs text-muted-foreground">Independent creator on NFO</p>
                        <p className="mt-2 text-sm text-muted-foreground">Small-batch, hand-finished, made with intention. Every order helps support an independent maker.</p>
                        <Button asChild size="sm" variant="outline" className="mt-3">
                          <Link to={`/creators/${gift.creatorId}`}>View profile <ChevronRight className="h-3.5 w-3.5" /></Link>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Fulfilled by <b className="text-foreground">{gift.provider}</b>, a trusted NFO partner.</p>
                  )}
                </Card>
              </TabsContent>
            </Tabs>

            {/* Related */}
            {related.length > 0 && (
              <section className="space-y-3">
                <h2 className="font-display text-xl font-semibold">You might also like</h2>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {related.map((r) => (
                    <Link key={r.id} to={`/gifts/${r.slug}`} className="group">
                      <Card className="glass-panel overflow-hidden border-0 p-0 transition group-hover:-translate-y-0.5">
                        <div className={`aspect-square bg-gradient-to-br ${r.hue}`}><div className="h-full w-full bg-canvas-grid opacity-25" /></div>
                        <div className="p-3">
                          <p className="line-clamp-1 text-xs font-medium">{r.name}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{formatCurrency(r.price)}</p>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default GiftDetail;