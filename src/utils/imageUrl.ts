const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export function categoryImageUrl(value: string) {
  const imageUrl = `${SUPABASE_URL}/storage/v1/object/public/categories/${value}`;
  return imageUrl;
}
