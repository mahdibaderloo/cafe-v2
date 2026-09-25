import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../services/order";

export function useOrders(page: number, size: number = 10) {
  return useQuery({
    queryKey: ["orders", page, size],
    queryFn: () => {
      return getAllOrders(page, size);
    },
    refetchInterval: 10000,
  });
}
