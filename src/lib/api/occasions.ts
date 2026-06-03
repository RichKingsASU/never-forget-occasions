import { supabase } from "../supabaseClient";
import type { Tables, TablesInsert, TablesUpdate } from "../supabaseClient";

export const listOccasions = async (): Promise<Tables<"occasions">[]> => {
  const { data, error } = await supabase
    .from("occasions")
    .select("*")
    .order("date", { ascending: true });

  if (error) throw error;
  return data || [];
};

export const listOccasionsByContact = async (
  contactId: string
): Promise<Tables<"occasions">[]> => {
  const { data, error } = await supabase
    .from("occasions")
    .select("*")
    .eq("contact_id", contactId)
    .order("date", { ascending: true });

  if (error) throw error;
  return data || [];
};

export const getOccasion = async (id: string): Promise<Tables<"occasions">> => {
  const { data, error } = await supabase
    .from("occasions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const createOccasion = async (
  input: Omit<TablesInsert<"occasions">, "user_id">
): Promise<Tables<"occasions">> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Authentication required");

  const { data, error } = await supabase
    .from("occasions")
    .insert({
      ...input,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateOccasion = async (
  id: string,
  input: TablesUpdate<"occasions">
): Promise<Tables<"occasions">> => {
  const { data, error } = await supabase
    .from("occasions")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteOccasion = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("occasions")
    .delete()
    .eq("id", id);

  if (error) throw error;
};
