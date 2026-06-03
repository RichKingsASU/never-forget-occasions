import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Shield, Truck, RotateCcw } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/mock-data";
import { toast } from "sonner";

export const Cart = () => {
  const { items, remove, update, subtotal, clear } = useCart();
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const shipping = subtotal === 0 ? 0 : subtotal >= 50 ? 0 : 6;
  const tax = Math.round((subtotal - discount) * 0.08);
  const total = Math.max(0, subtotal - discount + shipping + tax);

  const apply = () => {
    if (promo.trim().toUpperCase() === "NFO10") {
      setDiscount(Math.round(subtotal * 0.1));
      toast.success("Promo applied · 10% off");
    } else {
      toast.error("That promo code didn't work");
    }
  };

  return (
    <div className="dark min-h-dvh bg-background text-foreground">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-walnut/40" />
        <div className="absolute inset-0 bg-canvas-grid opacity-[0.3]" />
      </div>
      <Navigation currentPage="gifts" />
      <div className="lg:ml-64">
        <main className="px-4 py-6 md:px-8">
          <div className="mx-auto max-w-[1200px] space-y-5">
            <header>
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-corten">
                <ShoppingBag className="h-3 w-3" /> checkout · cart
              </p>
              <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">Your cart</h1>
              <p className="mt-1 text-sm text-muted-foreground">{items.length} item{items.length === 1 ? "" : "s"} ready to send.</p>
            </header>

            {items.length === 0 ? (
              <Card className="glass-panel border-0 p-12 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-corten/15 text-corten">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <h2 className="mt-4 font-display text-xl font-semibold">Nothing here yet</h2>
                <p className="mt-1 text-sm text-muted-foreground">Browse the marketplace and find the perfect gift.</p>
                <Button asChild className="mt-5 bg-corten text-white hover:bg-corten/90">
                  <Link to="/gifts">Browse gifts</Link>
                </Button>
              </Card>
            ) : (
              <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
                <Card className="glass-panel border-0 p-0">
                  <ul className="divide-y divide-border/40">
                    {items.map((l) => (
                      <li key={l.id} className="flex gap-4 p-5">
                        <div className={`h-24 w-24 flex-shrink-0 rounded-xl bg-gradient-to-br ${l.hue}`} />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <Link to={`/gifts/${l.slug}`} className="font-display text-base font-semibold hover:text-corten">{l.name}</Link>
                              {l.variant && <p className="text-xs text-muted-foreground">{l.variant}</p>}
                              {l.scheduledFor && <p className="mt-1 text-[11px] text-muted-foreground">Scheduled · {new Date(l.scheduledFor + "T00:00:00").toLocaleDateString()}</p>}
                              {l.giftMessage && <p className="mt-1 text-[11px] italic text-muted-foreground">"{l.giftMessage}"</p>}
                            </div>
                            <span className="font-display text-base font-semibold tabular-nums">{formatCurrency(l.qty * l.unitPrice)}</span>
                          </div>
                          <div className="mt-3 flex items-center gap-3">
                            <div className="flex items-center rounded-md border border-border/60">
                              <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => update(l.id, { qty: Math.max(1, l.qty - 1) })} aria-label="Decrease quantity"><Minus className="h-3 w-3" /></Button>
                              <span className="w-8 text-center font-mono text-xs tabular-nums">{l.qty}</span>
                              <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => update(l.id, { qty: l.qty + 1 })} aria-label="Increase quantity"><Plus className="h-3 w-3" /></Button>
                            </div>
                            <button onClick={() => { remove(l.id); toast(`${l.name} removed`); }} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive">
                              <Trash2 className="h-3.5 w-3.5" /> Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between border-t border-border/40 p-4">
                    <Button asChild variant="ghost" size="sm"><Link to="/gifts">← Continue shopping</Link></Button>
                    <Button variant="ghost" size="sm" onClick={() => { clear(); toast("Cart cleared"); }} className="text-muted-foreground hover:text-destructive">
                      Clear cart
                    </Button>
                  </div>
                </Card>

                <div className="space-y-3">
                  <Card className="glass-panel border-0 p-5">
                    <h2 className="font-display text-base font-semibold">Order summary</h2>
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="tabular-nums">{formatCurrency(subtotal)}</span></div>
                      {discount > 0 && (
                        <div className="flex justify-between text-success"><span>Discount</span><span className="tabular-nums">−{formatCurrency(discount)}</span></div>
                      )}
                      <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="tabular-nums">{shipping === 0 ? "Free" : formatCurrency(shipping)}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Tax (est.)</span><span className="tabular-nums">{formatCurrency(tax)}</span></div>
                      <Separator className="my-3 bg-border/50" />
                      <div className="flex items-baseline justify-between">
                        <span className="font-display text-base font-semibold">Total</span>
                        <span className="font-display text-xl font-semibold tabular-nums">{formatCurrency(total)}</span>
                      </div>
                    </div>
                    <Button onClick={() => navigate("/checkout")} className="mt-4 w-full bg-corten text-white hover:bg-corten/90">
                      Checkout <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Card>

                  <Card className="glass-panel border-0 p-5">
                    <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      <Tag className="h-3.5 w-3.5" /> Promo code
                    </p>
                    <div className="mt-2 flex gap-2">
                      <Input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="NFO10" className="h-9" />
                      <Button size="sm" variant="outline" onClick={apply}>Apply</Button>
                    </div>
                    <p className="mt-1.5 text-[11px] text-muted-foreground">Try <Badge className="border-0 bg-corten/15 px-1.5 font-mono text-[10px] text-corten">NFO10</Badge> for 10% off.</p>
                  </Card>

                  <Card className="glass-panel border-0 p-4">
                    <ul className="space-y-2 text-[11px] text-muted-foreground">
                      <li className="flex items-center gap-2"><Shield className="h-3.5 w-3.5 text-corten" /> Secure encrypted checkout</li>
                      <li className="flex items-center gap-2"><Truck className="h-3.5 w-3.5 text-corten" /> Free shipping on orders over $50</li>
                      <li className="flex items-center gap-2"><RotateCcw className="h-3.5 w-3.5 text-corten" /> 30-day easy returns</li>
                    </ul>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Cart;