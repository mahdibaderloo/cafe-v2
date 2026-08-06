import { useQuery } from "@tanstack/react-query";
import { getLastFivePrice } from "../../services/order";

export function useLastFiveOrdersPrice() {
  return useQuery({
    queryKey: ["last-five-transactions"],
    queryFn: getLastFivePrice,
  });
}
