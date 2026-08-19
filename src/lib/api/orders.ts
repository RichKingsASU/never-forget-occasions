import { supabase } from "../supabaseClient";
import type { Tables } from "../supabaseClient";
import type { Json } from "../database.types";

export interface OrderWithItems extends Tables<"orders"> {
  order_items: Tables<"order_items">[];
}

export interface CreateOrderItemInput {
  giftId: string;
  name: string;
  variant?: string;
  qty: number;
}

export interface CreateOrderInput {
  recipient_contact_id: string | null;
  channel: string | null;
  items: CreateOrderItemInput[];
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
  const { data: order, error } = await supabase.rpc("create_order", {
    recipient_contact_id: input.recipient_contact_id,
    channel: input.channel,
    items: input.items as unknown as Json,
  });

  if (error) throw error;

  return getOrder(order.id);
};
