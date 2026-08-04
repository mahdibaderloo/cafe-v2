import { useQuery } from "@tanstack/react-query";
import { getAllDiscounts } from "../../services/dashboard";

export function useDiscounts() {
  return useQuery({
    queryKey: ["discounts"],
    queryFn: () => getAllDiscounts(),
  });
}
