import { useQuery } from "@tanstack/react-query";
import { useAdminStore } from "../../store/adminStore";
import { getLastFivePrice } from "../../services/order";

export function useLastFiveOrdersPrice() {
  const { admin } = useAdminStore();

  return useQuery({
    queryKey: ["last-five-transactions"],
    queryFn: () => getLastFivePrice(admin?.token as string),
  });
}
