import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} from "@/lib/api/contacts";
import type { TablesInsert, TablesUpdate } from "@/lib/supabaseClient";
import { toast } from "sonner";

export const useContacts = () => {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: listContacts,
  });
};

export const useContact = (id: string | undefined) => {
  return useQuery({
    queryKey: ["contact", id],
    queryFn: () => (id ? getContact(id) : Promise.reject("No contact ID provided")),
    enabled: !!id,
  });
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: Omit<TablesInsert<"contacts">, "user_id">) => createContact(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: TablesUpdate<"contacts"> }) =>
      updateContact(id, input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      queryClient.invalidateQueries({ queryKey: ["contact", data.id] });
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteContact(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      queryClient.invalidateQueries({ queryKey: ["contact", id] });
    },
  });
};
