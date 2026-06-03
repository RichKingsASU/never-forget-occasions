import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listOrders, getOrder, createOrder } from "@/lib/api/orders";
import type { CreateOrderInput } from "@/lib/api/orders";

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: listOrders,
  });
};

export const useOrder = (id: string | undefined) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => (id ? getOrder(id) : Promise.reject("No order ID provided")),
    enabled: !!id,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateOrderInput) => createOrder(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
