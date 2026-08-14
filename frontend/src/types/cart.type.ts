export interface CartItem {
  id: number;
  productName: string;
  image: string;
  description: string;
  categoryId: string;
  categoryName: string;
  price: number;
  count: number;
}

export interface CartItemProp {
  item: CartItem;
  increase: (id: number) => void;
  decrease: (id: number) => void;
}

export interface CartStore {
  items: CartItem[];
  totalPrice: number;

  discountValue: number;
  discountType: "PERCENTAGE" | "FIXED_AMOUNT" | null;
  discountCode: string | null;
  discountedPrice: number;

  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  removeAll: () => void;
  increaseItemCount: (id: number) => void;
  decreaseItemCount: (id: number) => void;

  applyDiscount: (
    code: string,
    type: "PERCENTAGE" | "FIXED_AMOUNT",
    value: number,
  ) => void;

  removeDiscount: () => void;
}
