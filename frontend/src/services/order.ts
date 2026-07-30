import type {
  LastFiveOrderPrice,
  OrdersResponse,
  SubmitOrderRequest,
  SubmitOrderResponse,
} from "../types/order.type";

export async function submitOrder(
  data: SubmitOrderRequest,
): Promise<SubmitOrderResponse> {
  const response = await fetch(
    `http://localhost:8080/api/orders/submit-order`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "خطا در ثبت سفارش");
  }

  return response.json();
}

export async function getAllOrders(token: string): Promise<OrdersResponse[]> {
  const response = await fetch("http://localhost:8080/api/orders", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "خطا در پردازش سفارشات");
  }

  return response.json();
}

export async function getOrder(
  token: string,
  id: number,
): Promise<OrdersResponse> {
  const response = await fetch(`http://localhost:8080/api/orders/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "خطا در پردازش سفارشات");
  }

  return response.json();
}

export async function getLastFivePrice(
  token: string,
): Promise<LastFiveOrderPrice[]> {
  const response = await fetch(`http://localhost:8080/api/orders/last-five`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "خطا در دریافت آخرین تراکنش ها");
  }

  return response.json();
}
