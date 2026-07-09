import { useQuery } from "@tanstack/react-query";
import { getLines } from "../services/category";
import { useCategoryStore } from "../store/categoryStore";

export function useLines() {
  const { line } = useCategoryStore();

  return useQuery({
    queryKey: ["lines", line],
    queryFn: () => getLines(line!),
    enabled: !!line,
  });
}
