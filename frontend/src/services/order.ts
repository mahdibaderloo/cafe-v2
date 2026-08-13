import type {
  LastFiveOrderPrice,
  OrdersResponse,
  SubmitOrderRequest,
  SubmitOrderResponse,
} from "../types/order.type";
import type { PaginatedResponse } from "../types/pagination";
import { apiClient } from "./api";

export function submitOrder(data: SubmitOrderRequest) {
  return apiClient<SubmitOrderResponse>("orders/submit-order", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getAllOrders(page: number, size: number) {
  return apiClient<PaginatedResponse<OrdersResponse>>(
    `orders?page=${page}&size=${size}`,
    {
      auth: true,
    },
  );
}

export function getOrder(id: number) {
  return apiClient<OrdersResponse>(`orders/${id}`, {
    auth: true,
  });
}

export function getLastFivePrice() {
  return apiClient<LastFiveOrderPrice[]>("orders/last-five", {
    auth: true,
  });
}
