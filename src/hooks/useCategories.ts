import { useMemo } from "react";
import { useItems } from "./useItems";

export function useCategories() {
  const { data: items, isLoading, isError } = useItems();

  const categories = useMemo(() => {
    if (!items) return [];
    return [...new Set(items.map((item) => item.category))];
  }, [items]);

  return {
    categories,
    isLoading,
    isError,
  };
}
