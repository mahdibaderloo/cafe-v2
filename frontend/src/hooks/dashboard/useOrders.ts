import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../services/order";

export function useOrders(page: number, size: number = 10) {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => getAllOrders(page, size),
  });
}
