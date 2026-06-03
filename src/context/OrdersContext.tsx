import { createContext, useContext, useMemo } from "react";
import { useOrders as useOrdersQuery, useCreateOrder } from "@/hooks/useOrders";
import { toast } from "sonner";

interface OrdersCtx {
  orders: any[];
  add: (order: any) => void;
  findOrder: (id: string) => any | undefined;
}

const Ctx = createContext<OrdersCtx | null>(null);

export const OrdersProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: rawOrders = [] } = useOrdersQuery();
  const createOrderMutation = useCreateOrder();

  // Map Supabase Order structure back to what UI expects for MockOrder compatibility
  const mappedOrders = useMemo(() => {
    return rawOrders.map((o) => ({
      id: o.id,
      date: o.created_at.slice(0, 10),
      status: o.status,
      total: o.total_cents / 100,
      recipient: {
        name: o.recipient_contact_id ? "Recipient" : "Unknown", // Can be resolved or mocked
      },
      // Since actual products/gifts are still mockGifts, we mock the single item details on the fly
      items: (o.order_items || []).map((item) => ({
        name: item.label,
        qty: item.qty,
        price: item.price_cents / 100,
        hue: "from-primary to-secondary",
        variant: "",
      })),
      greeting: "",
      channel: o.channel || "Email",
    }));
  }, [rawOrders]);

  const value = useMemo<OrdersCtx>(() => ({
    orders: mappedOrders,
    add: async (orderInput) => {
      try {
        // orderInput is in MockOrder shape, we convert it to CreateOrderInput
        const items = orderInput.items.map((i: any) => ({
          label: i.name,
          qty: i.qty,
          price_cents: Math.round(i.price * 100),
          asset_id: null,
        }));

        await createOrderMutation.mutateAsync({
          recipient_contact_id: null, // Defer to null if no contact_id matched
          channel: orderInput.channel || null,
          total_cents: Math.round(orderInput.total * 100),
          items,
        });
      } catch (err: any) {
        console.error(err);
        toast.error("Failed to place order in Supabase");
      }
    },
    findOrder: (id) => mappedOrders.find((o) => o.id === id),
  }), [mappedOrders, createOrderMutation]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useOrders = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useOrders must be inside OrdersProvider");
  return v;
};