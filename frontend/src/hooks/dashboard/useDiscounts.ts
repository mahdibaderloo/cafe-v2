import { useQuery } from "@tanstack/react-query";
import { getAllDiscounts } from "../../services/dashboard";

export function useDiscounts(page: number, size: number = 10) {
  return useQuery({
    queryKey: ["discounts"],
    queryFn: () => getAllDiscounts(page, size),
  });
}
