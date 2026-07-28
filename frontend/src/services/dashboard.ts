import type {
  DashboardStats,
  DiscountResponse,
  LoginCredentials,
  LoginResponse,
} from "../types/dashboard.type.ts";

export async function login(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  const response = await fetch(`http://localhost:8080/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "خطا در ورود");
  }

  return response.json();
}

export async function stats(token: string): Promise<DashboardStats> {
  const response = await fetch(`http://localhost:8080/api/orders/stats`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "خطا در دریافت اطلاعات");
  }

  return response.json();
}

export async function getAllDiscounts(
  token: string,
): Promise<DiscountResponse[]> {
  const response = await fetch(`http://localhost:8080/api/discount/all`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "خطا در دریافت اطلاعات");
  }

  return response.json();
}

export async function getDiscount(
  token: string,
  id: number,
): Promise<DiscountResponse> {
  const response = await fetch(`http://localhost:8080/api/discount/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "خطا در دریافت اطلاعات");
  }

  return response.json();
}
