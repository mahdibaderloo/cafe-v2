import { create } from "zustand";
import type { ItemResponse } from "../types/item.type";

interface ProductStore {
  item: ItemResponse | null;
  setItem: (item: ItemResponse) => void;
}

export const useProductStore = create<ProductStore>()((set) => ({
  item: null,
  setItem: (item) => set({ item }),
}));
