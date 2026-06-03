import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listOccasions,
  listOccasionsByContact,
  getOccasion,
  createOccasion,
  updateOccasion,
  deleteOccasion,
} from "@/lib/api/occasions";
import type { TablesInsert, TablesUpdate } from "@/lib/supabaseClient";

export const useOccasions = () => {
  return useQuery({
    queryKey: ["occasions"],
    queryFn: listOccasions,
  });
};

export const useOccasionsByContact = (contactId: string | undefined) => {
  return useQuery({
    queryKey: ["occasions", "contact", contactId],
    queryFn: () => (contactId ? listOccasionsByContact(contactId) : Promise.reject("No contact ID provided")),
    enabled: !!contactId,
  });
};

export const useOccasion = (id: string | undefined) => {
  return useQuery({
    queryKey: ["occasion", id],
    queryFn: () => (id ? getOccasion(id) : Promise.reject("No occasion ID provided")),
    enabled: !!id,
  });
};

export const useCreateOccasion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: Omit<TablesInsert<"occasions">, "user_id">) => createOccasion(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["occasions"] });
      queryClient.invalidateQueries({ queryKey: ["occasions", "contact", data.contact_id] });
    },
  });
};

export const useUpdateOccasion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: TablesUpdate<"occasions"> }) =>
      updateOccasion(id, input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["occasions"] });
      queryClient.invalidateQueries({ queryKey: ["occasions", "contact", data.contact_id] });
      queryClient.invalidateQueries({ queryKey: ["occasion", data.id] });
    },
  });
};

export const useDeleteOccasion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, contactId }: { id: string; contactId: string }) => deleteOccasion(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["occasions"] });
      queryClient.invalidateQueries({ queryKey: ["occasions", "contact", variables.contactId] });
      queryClient.invalidateQueries({ queryKey: ["occasion", variables.id] });
    },
  });
};
