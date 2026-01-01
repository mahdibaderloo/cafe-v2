import { create } from "zustand";

interface Item {
  id: number;
  product: string;
  image: string;
  category: string;
  price: number;
  desc: string;
}

type ItemsStore = {
  category: string;
  items: Item[];
  setItems: () => void;
};

export const useItemsStore = create<ItemsStore>()((set) => ({
  category: "cold",
  items: [],
  setItems: () =>
    set((state) => ({
      items: state.items.filter((item) => item.category === state.category),
    })),
}));
