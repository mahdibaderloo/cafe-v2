import { create } from "zustand";

interface Product {
  id: number;
  product: string;
  category: string;
  image: string;
  price: number;
  desc: string;
}

interface ProductStore {
  item: Product | null;
  setItem: (item: Product) => void;
}

export const useProductStore = create<ProductStore>()((set) => ({
  item: null,
  setItem: (item) => set({ item }),
}));
