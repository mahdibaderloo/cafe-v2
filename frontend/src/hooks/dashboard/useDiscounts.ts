import { useQuery } from "@tanstack/react-query";
import { getAllDiscounts } from "../../services/dashboard";
import { useAdminStore } from "../../store/adminStore";

export function useDiscounts() {
  const { admin } = useAdminStore();

  return useQuery({
    queryKey: ["discounts"],
    queryFn: () => getAllDiscounts(admin?.token as string),
  });
}
