export async function getItems(id: number) {
  const response = await fetch(
    `http://localhost:8080/api/items/category-id/${id}`,
  );
  return response.json();
}

export async function getItem(id: number) {
  const response = await fetch(`http://localhost:8080/api/items/${id}`);
  return response.json();
}
