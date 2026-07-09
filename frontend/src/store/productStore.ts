import { create } from "zustand";
import type { Item } from "../types/item.type";

interface ProductStore {
  item: Item | null;
  setItem: (item: Item) => void;
}

export const useProductStore = create<ProductStore>()((set) => ({
  item: null,
  setItem: (item) => set({ item }),
}));
