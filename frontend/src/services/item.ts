export async function getItems(id: number) {
  const response = await fetch(
    `http://localhost:8080/api/items/category-id/${id}`,
  );
  return response.json();
}
