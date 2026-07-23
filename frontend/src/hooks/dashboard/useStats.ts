import { useQuery } from "@tanstack/react-query";
import { stats } from "../../services/dashboard";
import { useAdminStore } from "../../store/adminStore";

export function useStats() {
  const { admin, isAuthenticated } = useAdminStore();

  return useQuery({
    queryKey: ["stats"],
    queryFn: () => stats(admin?.token as string),
    enabled: !!admin?.token && isAuthenticated,
    retry: false,
  });
}
