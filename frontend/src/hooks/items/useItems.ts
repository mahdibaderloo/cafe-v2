import { useQuery } from "@tanstack/react-query";
import { getItems } from "../../services/item";
import { useCategoryStore } from "../../store/categoryStore";
import type { ItemResponse } from "../../types/item.type";

export function useItems() {
  const { category, line } = useCategoryStore();
  const selectedCategory = line ? line : category;

  return useQuery<ItemResponse[]>({
    queryKey: ["items", category, line],
    queryFn: () => getItems(selectedCategory as number),
  });
}
