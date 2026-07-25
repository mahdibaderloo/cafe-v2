import { create } from "zustand";
import type { OrderStore } from "../types/order.type";

export const useOrderStore = create<OrderStore>()((set) => ({
  selectedOrder: 1,
  setSelectedOrder: (id) => set({ selectedOrder: id }),
}));
