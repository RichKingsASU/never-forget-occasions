import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Package, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useOrders } from "@/context/OrdersContext";
import { formatCurrency, type OrderStatus } from "@/lib/mock-data";

const statusTone: Record<OrderStatus, string> = {
  placed:    "bg-primary/15 text-primary ring-1 ring-primary/30",
  preparing: "bg-corten/15 text-corten ring-1 ring-corten/40",
  shipped:   "bg-accent/15 text-accent-foreground ring-1 ring-accent/30",
  delivered: "bg-success/15 text-success ring-1 ring-success/30",
};

export const Orders = () => {
  const { orders } = useOrders();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | OrderStatus>("all");

  const filtered = useMemo(() => orders.filter((o) =>
    (status === "all" || o.status === status) &&
    (q === "" || o.id.toLowerCase().includes(q.toLowerCase()) || o.recipient.name.toLowerCase().includes(q.toLowerCase()))
  ), [orders, q, status]);

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
                <Package className="h-3 w-3" /> account · order history
              </p>
              <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">Your orders</h1>
              <p className="mt-1 text-sm text-muted-foreground">{orders.length} order{orders.length === 1 ? "" : "s"} all-time.</p>
            </header>

            <div className="glass-panel flex flex-col gap-3 p-3 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by order # or recipient…" className="h-10 border-border/60 bg-card/60 pl-9" />
              </div>
              <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
                <SelectTrigger className="h-10 md:w-48"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="placed">Placed</SelectItem>
                  <SelectItem value="preparing">Preparing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filtered.length === 0 ? (
              <Card className="glass-panel border-0 p-12 text-center">
                <p className="font-display text-lg">No orders match</p>
                <p className="mt-1 text-sm text-muted-foreground">Try a different filter or search.</p>
              </Card>
            ) : (
              <Card className="glass-panel border-0 p-0">
                <ul className="divide-y divide-border/40">
                  {filtered.map((o) => (
                    <li key={o.id}>
                      <Link to={`/orders/${o.id}`} className="flex items-center gap-4 p-4 transition hover:bg-card/40">
                        <div className="flex -space-x-2">
                          {o.items.slice(0,3).map((it, i) => (
                            <div key={i} className={`h-12 w-12 rounded-lg bg-gradient-to-br ${it.hue} ring-2 ring-background`} />
                          ))}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-mono text-xs text-muted-foreground">{o.id}</p>
                            <Badge className={`h-5 border-0 px-1.5 font-mono text-[10px] uppercase ${statusTone[o.status]}`}>{o.status}</Badge>
                          </div>
                          <p className="mt-0.5 text-sm font-medium">To {o.recipient.name}</p>
                          <p className="text-xs text-muted-foreground">{new Date(o.date + "T00:00:00").toLocaleDateString(undefined,{month:"short",day:"numeric",year:"numeric"})} · {o.items.length} item{o.items.length===1?"":"s"}</p>
                        </div>
                        <span className="font-display text-base font-semibold tabular-nums">{formatCurrency(o.total)}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Orders;