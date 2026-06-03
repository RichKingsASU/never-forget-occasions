import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/mock-data";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export const CartSheet = ({ trigger }: { trigger?: React.ReactNode }) => {
  const { items, remove, update, subtotal, count } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger ?? (
          <Button variant="ghost" size="icon" className="relative" aria-label={`Open cart, ${count} items`}>
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-corten px-1 font-mono text-[9px] font-bold text-white">
                {count}
              </span>
            )}
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="dark flex w-full flex-col gap-0 bg-background p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border/60 p-5 text-left">
          <SheetTitle className="font-display flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" /> Your cart
            <Badge className="h-5 border-0 bg-corten/15 px-1.5 font-mono text-[10px] text-corten">{count}</Badge>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="grid h-full place-items-center text-center">
              <div>
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-corten/15 text-corten">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <p className="mt-3 font-display text-base font-semibold">Your cart is empty</p>
                <p className="mt-1 text-xs text-muted-foreground">Add a gift to start the moment.</p>
                <Button asChild size="sm" className="mt-4 bg-corten text-white hover:bg-corten/90">
                  <Link to="/gifts">Browse gifts</Link>
                </Button>
              </div>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((l) => (
                <li key={l.id} className="flex gap-3 rounded-xl border border-border/60 bg-card/40 p-3">
                  <div className={`h-16 w-16 flex-shrink-0 rounded-lg bg-gradient-to-br ${l.hue}`} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{l.name}</p>
                    {l.variant && <p className="text-[11px] text-muted-foreground">{l.variant}</p>}
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center rounded-md border border-border/60">
                        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => update(l.id, { qty: Math.max(1, l.qty - 1) })} aria-label="Decrease quantity">
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center font-mono text-xs tabular-nums">{l.qty}</span>
                        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => update(l.id, { qty: l.qty + 1 })} aria-label="Increase quantity">
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <span className="ml-auto text-sm tabular-nums">{formatCurrency(l.qty * l.unitPrice)}</span>
                      <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => remove(l.id)} aria-label="Remove item">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="border-t border-border/60 p-5 sm:flex-col">
            <div className="flex w-full items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-display text-lg font-semibold tabular-nums">{formatCurrency(subtotal)}</span>
            </div>
            <div className="mt-3 flex w-full gap-2">
              <Button asChild variant="outline" className="flex-1">
                <Link to="/cart">View cart</Link>
              </Button>
              <Button asChild className="flex-1 bg-corten text-white hover:bg-corten/90">
                <Link to="/checkout">Checkout <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};