import type {
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
