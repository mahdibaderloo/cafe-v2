import { useQuery } from "@tanstack/react-query";
import supabase from "../supabase/supabase";

interface Items {
  id: number;
  product: string;
  image: string;
  category: string;
  price: number;
  desc: string;
}

export function useItems() {
  return useQuery<Items[]>({
    queryKey: ["items"],
    queryFn: fetchItems,
  });
}

async function fetchItems() {
  const { data: items, error } = await supabase.from("items").select("*");

  if (error) throw new Error("Can't fetch items.");

  return items;
}
