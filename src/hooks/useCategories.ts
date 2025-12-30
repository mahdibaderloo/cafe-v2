import { useMemo } from "react";
import { useItems } from "./useItems";
import { CATEGORIES } from "../utils/categories";

interface Category {
  label: string;
  image: string;
}

export function useCategories() {
  const { data: items, isLoading, isError } = useItems();

  const categories = useMemo<Category[]>(() => {
    if (!items) return [];

    return Object.values(
      items.reduce((acc, item) => {
        const category = CATEGORIES[item.category];
        if (!category) return acc;

        acc[category.label] = category;
        return acc;
      }, {} as Record<string, Category>)
    );
  }, [items]);

  return {
    categories,
    isLoading,
    isError,
  };
}
