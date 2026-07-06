import { create } from "zustand";

type CategoryStore = {
  category: number;
  setCategory: (category: number) => void;
  line: number | null;
  setLine: (line: number | null) => void;
};

export const useCategoryStore = create<CategoryStore>()((set) => ({
  category: 1,
  setCategory: (category) => set({ category }),
  line: null,
  setLine: (line) => set({ line }),
}));
