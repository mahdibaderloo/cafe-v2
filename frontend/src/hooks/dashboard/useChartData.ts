import { useQuery } from "@tanstack/react-query";
import { getChartData } from "../../services/order";

export function useChartData(year: number) {
  return useQuery({
    queryKey: ["chart", year],
    queryFn: () => getChartData(year),
  });
}
