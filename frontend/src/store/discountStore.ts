import { create } from "zustand";
import type { DiscountStore } from "../types/order.type";

export const useDiscountStore = create<DiscountStore>()((set) => ({
  selectedDiscount: 1,
  setSelectedDiscount: (id) => set({ selectedDiscount: id }),
}));
