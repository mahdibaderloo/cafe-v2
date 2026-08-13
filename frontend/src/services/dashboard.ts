import type {
  DashboardStats,
  DiscountRequest,
  DiscountResponse,
  LoginCredentials,
  LoginResponse,
} from "../types/dashboard.type.ts";
import type { PaginatedResponse } from "../types/pagination.ts";
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

export async function getAllDiscounts(page: number, size: number) {
  return apiClient<PaginatedResponse<DiscountResponse>>(
    `discount/all?page=${page}&size=${size}`,
    {
      auth: true,
    },
  );
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
