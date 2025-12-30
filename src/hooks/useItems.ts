import { useQuery } from "@tanstack/react-query";
import supabase from "../supabase/supabase";

export function useItems() {
  return useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
  });
}

async function fetchItems() {
  const { data: items, error } = await supabase.from("items").select("*");

  if (error) throw new Error("Can't fetch items.");

  return items;
}
