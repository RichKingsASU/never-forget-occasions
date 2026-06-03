import { supabase } from "../supabaseClient";
import type { Tables, TablesInsert } from "../supabaseClient";

export interface OrderWithItems extends Tables<"orders"> {
  order_items: Tables<"order_items">[];
}

export interface CreateOrderInput {
  recipient_contact_id: string | null;
  channel: string | null;
  total_cents: number;
  items: Omit<TablesInsert<"order_items">, "order_id">[];
}

export const listOrders = async (): Promise<OrderWithItems[]> => {
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as OrderWithItems[]) || [];
};

export const getOrder = async (id: string): Promise<OrderWithItems> => {
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as OrderWithItems;
};

export const createOrder = async (
  input: CreateOrderInput
): Promise<OrderWithItems> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Authentication required");

  // Perform inside a transaction-like sequence (since Supabase JS has no multi-table transactional insert,
  // we do the order first, then order items). Note: the orders RLS & initial_schema policies allow inserts.
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      recipient_contact_id: input.recipient_contact_id,
      channel: input.channel,
      total_cents: input.total_cents,
      user_id: user.id,
      status: "pending",
    })
    .select()
    .single();

  if (orderError) throw orderError;

  const itemsWithOrderId = input.items.map((item) => ({
    ...item,
    order_id: order.id,
  }));

  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .insert(itemsWithOrderId)
    .select();

  if (itemsError) {
    // Attempt rollback/delete order to clean up since items failed
    await supabase.from("orders").delete().eq("id", order.id);
    throw itemsError;
  }

  return {
    ...order,
    order_items: items || [],
  };
};
