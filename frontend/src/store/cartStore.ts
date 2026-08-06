import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartStore } from "../types/cart.type";

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      totalPrice: 0,

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);

          const updatedItems = existing
            ? state.items.map((i) =>
                i.id === item.id ? { ...i, count: i.count + 1 } : i,
              )
            : [...state.items, { ...item, count: 1 }];

          return {
            items: updatedItems,
            totalPrice: updatedItems.reduce(
              (sum, item) => sum + item.price * item.count,
              0,
            ),
          };
        }),

      removeItem: (id) =>
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== id);

          return {
            items: updatedItems,
            totalPrice: updatedItems.reduce(
              (sum, item) => sum + item.price * item.count,
              0,
            ),
          };
        }),

      removeAll: () =>
        set(() => ({
          items: [],
          totalPrice: 0,
        })),

      increaseItemCount: (id) =>
        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.id === id && item.count < 15
              ? { ...item, count: item.count + 1 }
              : item,
          );

          return {
            items: updatedItems,
            totalPrice: updatedItems.reduce(
              (sum, i) => sum + i.price * i.count,
              0,
            ),
          };
        }),

      decreaseItemCount: (id) =>
        set((state) => {
          const updatedItems = state.items
            .map((item) =>
              item.id === id ? { ...item, count: item.count - 1 } : item,
            )
            .filter((item) => item.count > 0);

          return {
            items: updatedItems,
            totalPrice: updatedItems.reduce(
              (sum, i) => sum + i.price * i.count,
              0,
            ),
          };
        }),
    }),

    {
      name: "liilo-cart",
    },
  ),
);
