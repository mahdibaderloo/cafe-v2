import { useQuery } from "@tanstack/react-query";
import { stats } from "../../services/dashboard";

export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: () => {
      return stats();
    },
    refetchInterval: 30000,
    retry: false,
  });
}
