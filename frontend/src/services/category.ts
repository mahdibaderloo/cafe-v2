export async function getCategories() {
  const response = await fetch("http://localhost:8080/api/categories");
  return response.json();
}

export async function getLines(categoryId: number) {
  if (!categoryId) return [];

  const response = await fetch(
    `http://localhost:8080/api/categories/${categoryId}/children`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch lines");
  }

  return response.json();
}
