import type { ItemRequest, ItemResponse } from "../types/item.type";

export async function getItems(id: number): Promise<ItemResponse[]> {
  const response = await fetch(
    `http://localhost:8080/api/items/category-id/${id}`,
  );
  return response.json();
}

export async function getItem(id: number): Promise<ItemResponse> {
  const response = await fetch(`http://localhost:8080/api/items/${id}`);
  return response.json();
}

export async function createItem(data: ItemRequest): Promise<ItemResponse> {
  const response = await fetch(`http://localhost:8080/api/items/create-item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("خطا در ایجاد آیتم");
  }

  return response.json();
}

export async function updateItem(
  id: number,
  data: ItemRequest,
): Promise<ItemResponse> {
  const response = await fetch(`http://localhost:8080/api/items/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("خطا در بروزرسانی آیتم");
  }

  return response.json();
}

export async function deleteItem(id: number) {
  const response = await fetch(`http://localhost:8080/api/items/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("خطا در حذف آیتم");
  }

  return response;
}
