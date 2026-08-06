export interface OrderItemRequest {
  itemId: number;
  count: number;
}

export interface SubmitOrderRequest {
  username: string;
  phoneNumber: string;
  takeAway: boolean;
  description: string;
  items: OrderItemRequest[];
}

export interface OrderItemResponse {
  id: number;
  itemId: number;
  itemName: string;
  itemDescription: string;
  categoryName: string;
  count: number;
  price: number;
  subtotal: number;
}

export interface SubmitOrderResponse {
  id: number;
  createdAt: string;
  totalPrice: number;
  username: string;
  phoneNumber: string;
  takeAway: boolean;
  description: string;
  orderCode: string;
  items: OrderItemResponse[];
}

export interface OrdersResponse {
  id: number;
  createdAt: string;
  totalPrice: number;
  username: string;
  phoneNumber: string;
  takeAway: boolean;
  description: string;
  orderCode: string;
  items: OrderItemResponse[];
  discountType: string;
  discountValue: number;
}

export interface OrderStore {
  selectedOrder: number;
  setSelectedOrder: (id: number) => void;
}

export interface DiscountStore {
  selectedDiscount: number;
  setSelectedDiscount: (id: number) => void;
}

export interface LastFiveOrderPrice {
  orderId: number;
  totalPrice: number;
}

export interface SubmitProps {
  isSubmitOpen: boolean;
  onClose: () => void;
}
