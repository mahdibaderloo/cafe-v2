import { create } from "zustand";

type CategoryStore = {
  category: string;
  setCategory: (category: string) => void;
  lines: string[];
  setLines: (lines: string[]) => void;
};

export const useCategoryStore = create<CategoryStore>()((set) => ({
  category: "cold",
  setCategory: (category) => set({ category }),
  lines: [],
  setLines: (lines) => set({ lines }),
}));
