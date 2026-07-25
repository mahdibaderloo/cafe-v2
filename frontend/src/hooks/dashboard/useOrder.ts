import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../../services/order";
import { useAdminStore } from "../../store/adminStore";

export function useOrder(id: number) {
  const { admin } = useAdminStore();

  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder(admin?.token as string, id),
  });
}
