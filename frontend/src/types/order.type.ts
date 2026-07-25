export interface OrderItem {
  itemId: number;
  count: number;
}

export interface SubmitOrderRequest {
  username: string;
  phoneNumber: string;
  takeAway: boolean;
  description: string;
  items: OrderItem[];
}

export interface OrderItemResponse {
  id: number;
  itemId: number;
  itemName: string;
  itemDescription: string;
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
}

export interface OrderStore {
  selectedOrder: number;
  setSelectedOrder: (id: number) => void;
}
