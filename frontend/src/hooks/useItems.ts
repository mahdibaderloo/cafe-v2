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
  const selectedCategory = category ? category : line;

  return useQuery<Items[]>({
    queryKey: ["items"],
    queryFn: () => getItems(selectedCategory as number),
  });
}
