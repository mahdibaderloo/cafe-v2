import type { Category } from "../types/category.type";
import { apiClient } from "./api";

export async function getCategories() {
  return apiClient<Category[]>("categories");
}

export async function getLines(categoryId: number) {
  if (!categoryId) return [];
  return apiClient<Category[]>(`categories/${categoryId}/children`);
}
