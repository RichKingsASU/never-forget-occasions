import { createContext, useContext, useEffect, useMemo, useState } from "react";

export interface CartLine {
  id: string;            // line id
  giftId: string;
  slug: string;
  name: string;
  variant?: string;
  qty: number;
  unitPrice: number;
  hue: string;
  scheduledFor?: string; // ISO
  giftMessage?: string;
}

interface CartCtx {
  items: CartLine[];
  add: (line: Omit<CartLine, "id">) => void;
  remove: (id: string) => void;
  update: (id: string, patch: Partial<CartLine>) => void;
  clear: () => void;
  count: number;
  subtotal: number;
}

const Ctx = createContext<CartCtx | null>(null);
const KEY = "nfo.cart.v1";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartLine[]>(() => {
    try { return JSON.parse(localStorage.getItem(KEY) ?? "[]"); } catch { return []; }
  });

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(items)); }, [items]);

  const value = useMemo<CartCtx>(() => ({
    items,
    add: (line) =>
      setItems((prev) => {
        const key = `${line.giftId}::${line.variant ?? ""}`;
        const existing = prev.find((l) => `${l.giftId}::${l.variant ?? ""}` === key);
        if (existing) {
          return prev.map((l) => (l === existing ? { ...l, qty: l.qty + line.qty } : l));
        }
        return [...prev, { ...line, id: `ln_${Date.now()}_${Math.random().toString(36).slice(2,7)}` }];
      }),
    remove: (id) => setItems((p) => p.filter((l) => l.id !== id)),
    update: (id, patch) => setItems((p) => p.map((l) => (l.id === id ? { ...l, ...patch } : l))),
    clear: () => setItems([]),
    count: items.reduce((n, l) => n + l.qty, 0),
    subtotal: items.reduce((n, l) => n + l.qty * l.unitPrice, 0),
  }), [items]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useCart = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be inside CartProvider");
  return v;
};