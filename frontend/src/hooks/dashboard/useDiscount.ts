import { useQuery } from "@tanstack/react-query";
import { getDiscount } from "../../services/dashboard";
import { useAdminStore } from "../../store/adminStore";

export function useDiscount(id: number) {
  const { admin } = useAdminStore();

  return useQuery({
    queryKey: ["discount", id],
    queryFn: () => getDiscount(admin?.token as string, id),
  });
}
