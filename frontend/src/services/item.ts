import type { ItemRequest, ItemResponse } from "../types/item.type";
import { apiClient } from "./api";

export async function getItems(id: number) {
  return apiClient<ItemResponse[]>(`items/category-id/${id}`);
}

export async function getItem(id: number) {
  return apiClient<ItemResponse>(`items/${id}`);
}

export async function createItem(data: ItemRequest) {
  return apiClient<ItemResponse>("items/create-item", {
    method: "POST",
    body: JSON.stringify(data),
    auth: true,
  });
}

export async function updateItem(id: number, data: ItemRequest) {
  return apiClient<ItemResponse>(`items/update/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    auth: true,
  });
}

export async function deleteItem(id: number) {
  return apiClient(`items/delete/${id}`, {
    method: "DELETE",
    auth: true,
  });
}
