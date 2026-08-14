import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartStore } from "../types/cart.type";
import { calculateDiscountedPrice } from "../utils/discount";

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      totalPrice: 0,

      discountValue: 0,
      discountType: null,
      discountCode: null,
      discountedPrice: 0,

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);

          const updatedItems = existing
            ? state.items.map((i) =>
                i.id === item.id ? { ...i, count: i.count + 1 } : i,
              )
            : [...state.items, { ...item, count: 1 }];

          const totalPrice = updatedItems.reduce(
            (sum, item) => sum + item.price * item.count,
            0,
          );

          return {
            items: updatedItems,
            totalPrice,
            discountedPrice: calculateDiscountedPrice(
              totalPrice,
              state.discountType,
              state.discountValue,
            ),
          };
        }),

      removeItem: (id) =>
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== id);

          const totalPrice = updatedItems.reduce(
            (sum, item) => sum + item.price * item.count,
            0,
          );

          return {
            items: updatedItems,
            totalPrice,
            discountedPrice: calculateDiscountedPrice(
              totalPrice,
              state.discountType,
              state.discountValue,
            ),
          };
        }),

      removeAll: () =>
        set(() => ({
          items: [],
          totalPrice: 0,
          discountValue: 0,
          discountType: null,
          discountCode: null,
          discountedPrice: 0,
        })),

      increaseItemCount: (id) =>
        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.id === id && item.count < 15
              ? { ...item, count: item.count + 1 }
              : item,
          );

          const totalPrice = updatedItems.reduce(
            (sum, item) => sum + item.price * item.count,
            0,
          );

          return {
            items: updatedItems,
            totalPrice,
            discountedPrice: calculateDiscountedPrice(
              totalPrice,
              state.discountType,
              state.discountValue,
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

          const totalPrice = updatedItems.reduce(
            (sum, i) => sum + i.price * i.count,
            0,
          );

          return {
            items: updatedItems,
            totalPrice,
            discountedPrice: calculateDiscountedPrice(
              totalPrice,
              state.discountType,
              state.discountValue,
            ),
          };
        }),

      applyDiscount: (code, type, value) =>
        set((state) => ({
          discountCode: code,
          discountType: type,
          discountValue: value,
          discountedPrice: calculateDiscountedPrice(
            state.totalPrice,
            type,
            value,
          ),
        })),

      removeDiscount: () =>
        set((state) => ({
          discountCode: null,
          discountType: null,
          discountValue: 0,
          discountedPrice: state.totalPrice,
        })),
    }),
    {
      name: "liilo-cart",
    },
  ),
);
