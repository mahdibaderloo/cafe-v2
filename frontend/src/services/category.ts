export async function getCategories() {
  const response = await fetch("http://localhost:8080/api/categories");
  return response.json();
}
