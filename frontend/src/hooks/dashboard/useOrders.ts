import { useQuery } from "@tanstack/react-query";
import { useAdminStore } from "../../store/adminStore";
import { getAllOrders } from "../../services/order";

export function useOrders() {
  const { admin } = useAdminStore();

  return useQuery({
    queryKey: ["orders"],
    queryFn: () => getAllOrders(admin?.token as string),
  });
}
