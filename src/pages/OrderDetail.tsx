import { useEffect } from "react";
import { Link, useParams, useSearchParams, Navigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, Check, Truck, Sparkles, ChevronRight, ArrowRight, MapPin } from "lucide-react";
import { useOrders } from "@/context/OrdersContext";
import { formatCurrency, type OrderStatus } from "@/lib/mock-data";
import { toast } from "sonner";

const STEPS: { id: OrderStatus; label: string; icon: typeof Check }[] = [
  { id: "placed",    label: "Placed",     icon: Check },
  { id: "preparing", label: "Preparing",  icon: Package },
  { id: "shipped",   label: "Shipped",    icon: Truck },
  { id: "delivered", label: "Delivered",  icon: Sparkles },
];

export const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [params] = useSearchParams();
  const { findOrder } = useOrders();
  const isNew = params.get("new") === "1";

  useEffect(() => {
    if (isNew) toast.success("Order placed — we'll take it from here");
  }, [isNew]);

  if (!id) return <Navigate to="/orders" replace />;
  const order = findOrder(id);
  if (!order) return <Navigate to="/orders" replace />;

  const stepIdx = STEPS.findIndex((s) => s.id === order.status);

  return (
    <div className="dark relative min-h-dvh bg-background text-foreground">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-walnut/40" />
        <div className="absolute inset-0 bg-canvas-grid opacity-[0.3]" />
      </div>

      {isNew && (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="absolute block h-2 w-2 rounded-full opacity-0"
              style={{
                left: `${(i * 173) % 100}%`,
                top: "-5%",
                background: ["hsl(var(--primary))","hsl(var(--corten))","hsl(var(--accent))","hsl(var(--success))"][i % 4],
                animation: `confetti-pop 2.4s ease-out ${i * 50}ms forwards`,
              }}
            />
          ))}
        </div>
      )}

      <Navigation currentPage="gifts" />

      <div className="lg:ml-64">
        <main className="px-4 py-6 md:px-8">
          <div className="mx-auto max-w-[1100px] space-y-5">
            <nav className="flex items-center gap-1.5 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link to="/orders" className="hover:text-foreground">Orders</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="font-mono text-foreground">{order.id}</span>
            </nav>

            <Card className="glass-panel border-0 p-6">
              <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-corten">order · {order.id}</p>
                  <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">
                    {isNew ? "Order placed " : "Order "}
                    <span className="text-corten">✦</span>
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Placed {new Date(order.date + "T00:00:00").toLocaleDateString(undefined,{month:"long",day:"numeric",year:"numeric"})}
                    {order.tracking && <> · Tracking <span className="font-mono">{order.tracking}</span></>}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline"><Link to="/orders">All orders</Link></Button>
                  <Button asChild className="bg-corten text-white hover:bg-corten/90"><Link to="/gifts">Send another <ArrowRight className="h-4 w-4" /></Link></Button>
                </div>
              </div>

              {/* Timeline */}
              <div className="mt-6 grid grid-cols-4 gap-2">
                {STEPS.map((s, i) => {
                  const done = i <= stepIdx;
                  const Icon = s.icon;
                  return (
                    <div key={s.id} className="flex flex-col items-center text-center">
                      <div className={`grid h-10 w-10 place-items-center rounded-full ${done ? "bg-corten text-white" : "bg-card text-muted-foreground"}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className={`mt-2 text-xs ${done ? "text-foreground font-medium" : "text-muted-foreground"}`}>{s.label}</p>
                      {i < STEPS.length - 1 && (
                        <div className={`mt-2 hidden h-px w-full md:block ${i < stepIdx ? "bg-corten" : "bg-border"}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>

            <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
              <Card className="glass-panel border-0 p-6">
                <h2 className="font-display text-lg font-semibold">Items</h2>
                <ul className="mt-4 divide-y divide-border/40">
                  {order.items.map((it, i) => (
                    <li key={i} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                      <div className={`h-16 w-16 flex-shrink-0 rounded-lg bg-gradient-to-br ${it.hue}`} />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">{it.name}</p>
                        {it.variant && <p className="text-xs text-muted-foreground">{it.variant}</p>}
                        <p className="mt-1 text-xs text-muted-foreground">Qty {it.qty}</p>
                      </div>
                      <span className="font-display text-base font-semibold tabular-nums">{formatCurrency(it.qty * it.price)}</span>
                    </li>
                  ))}
                </ul>

                {order.greeting && (
                  <>
                    <Separator className="my-5 bg-border/50" />
                    <h3 className="font-display text-base font-semibold">Greeting</h3>
                    <p className="mt-2 whitespace-pre-wrap rounded-lg border border-border/60 bg-background/40 p-4 text-sm leading-relaxed">{order.greeting}</p>
                    {order.channel && <p className="mt-2 text-[11px] text-muted-foreground">Channel · {order.channel}</p>}
                  </>
                )}
              </Card>

              <div className="space-y-3">
                <Card className="glass-panel border-0 p-5">
                  <h3 className="font-display text-base font-semibold">Recipient</h3>
                  <p className="mt-2 text-sm font-medium">{order.recipient.name}</p>
                  {order.recipient.address && <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> {order.recipient.address}</p>}
                </Card>
                <Card className="glass-panel border-0 p-5">
                  <h3 className="font-display text-base font-semibold">Total</h3>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-sm text-muted-foreground">Order total</span>
                    <span className="font-display text-2xl font-semibold tabular-nums">{formatCurrency(order.total)}</span>
                  </div>
                  <Separator className="my-3 bg-border/50" />
                  <p className="text-[11px] text-muted-foreground">Charged to Visa ending in 4242</p>
                </Card>
                <Badge className="block h-auto w-full justify-center border-0 bg-success/15 py-2 text-success">
                  Carbon-neutral shipping included
                </Badge>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrderDetail;