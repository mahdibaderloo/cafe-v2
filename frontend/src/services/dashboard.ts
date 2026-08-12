import type {
  DashboardStats,
  DiscountRequest,
  DiscountResponse,
  LoginCredentials,
  LoginResponse,
} from "../types/dashboard.type.ts";
import { apiClient } from "./api.ts";

export async function login(credentials: LoginCredentials) {
  return apiClient<LoginResponse>("users/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function stats(): Promise<DashboardStats> {
  return apiClient<DashboardStats>("orders/stats", {
    auth: true,
  });
}

export async function getAllDiscounts() {
  return apiClient<DiscountResponse[]>("discount/all", {
    auth: true,
  });
}

export async function getDiscount(id: number) {
  return apiClient<DiscountResponse>(`discount/${id}`, {
    auth: true,
  });
}

export async function addNewDiscount(data: DiscountRequest) {
  return apiClient<DiscountResponse>("discount/submit-code", {
    method: "POST",
    auth: true,
    body: JSON.stringify(data),
  });
}
