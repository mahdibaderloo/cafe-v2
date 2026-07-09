import { create } from "zustand";
import type { CategoryStore } from "../types/category.type";

export const useCategoryStore = create<CategoryStore>()((set) => ({
  category: 1,
  setCategory: (category) => set({ category }),
  line: 4,
  setLine: (line) => set({ line }),
}));
