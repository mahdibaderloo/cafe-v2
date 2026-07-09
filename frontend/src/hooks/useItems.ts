import { useQuery } from "@tanstack/react-query";
import { getItems } from "../services/item";
import { useCategoryStore } from "../store/categoryStore";

interface Items {
  id: number;
  productName: string;
  image: string;
  category: string;
  price: number;
  desc: string;
}

export function useItems() {
  const { category, line } = useCategoryStore();
  const selectedCategory = line ? line : category;

  return useQuery<Items[]>({
    queryKey: ["items", category, line],
    queryFn: () => getItems(selectedCategory as number),
  });
}
