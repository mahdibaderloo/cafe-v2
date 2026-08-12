import { useQuery } from "@tanstack/react-query";
import { getDiscount } from "../../services/dashboard";

export function useDiscount(id: number) {
  return useQuery({
    queryKey: ["discount", id],
    queryFn: () => getDiscount(id),
  });
}
