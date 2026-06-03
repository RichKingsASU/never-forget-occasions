import { supabase } from "../supabaseClient";
import type { Tables, TablesInsert, TablesUpdate } from "../supabaseClient";

export const listContacts = async (): Promise<Tables<"contacts">[]> => {
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw error;
  return data || [];
};

export const getContact = async (id: string): Promise<Tables<"contacts">> => {
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const createContact = async (
  input: Omit<TablesInsert<"contacts">, "user_id">
): Promise<Tables<"contacts">> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Authentication required");

  const { data, error } = await supabase
    .from("contacts")
    .insert({
      ...input,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateContact = async (
  id: string,
  input: TablesUpdate<"contacts">
): Promise<Tables<"contacts">> => {
  const { data, error } = await supabase
    .from("contacts")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteContact = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("contacts")
    .delete()
    .eq("id", id);

  if (error) throw error;
};
