import { useMemo } from "react";
import { useItems } from "./useItems";
import { CATEGORIES } from "../utils/categories";

export function useCategories() {
  const { data: items, isLoading, isError } = useItems();

  const categories = useMemo(() => {
    if (!items) return [];

    return CATEGORIES.filter((uiCategory) =>
      items.some((item) => uiCategory.dbCategories.includes(item.category))
    );
  }, [items]);

  return { categories, isLoading, isError };
}
