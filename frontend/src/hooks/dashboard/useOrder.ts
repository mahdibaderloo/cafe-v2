import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../../services/order";

export function useOrder(id: number) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder(id),
  });
}
