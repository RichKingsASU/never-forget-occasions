import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { seedOrders, type MockOrder } from "@/lib/mock-data";

interface OrdersCtx {
  orders: MockOrder[];
  add: (order: MockOrder) => void;
  findOrder: (id: string) => MockOrder | undefined;
}

const Ctx = createContext<OrdersCtx | null>(null);
const KEY = "nfo.orders.v1";

export const OrdersProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<MockOrder[]>(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(KEY) ?? "null");
      return Array.isArray(stored) && stored.length > 0 ? stored : seedOrders;
    } catch { return seedOrders; }
  });

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(orders)); }, [orders]);

  const value = useMemo<OrdersCtx>(() => ({
    orders,
    add: (order) => setOrders((p) => [order, ...p]),
    findOrder: (id) => orders.find((o) => o.id === id),
  }), [orders]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useOrders = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useOrders must be inside OrdersProvider");
  return v;
};