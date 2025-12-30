import { useQuery } from "@tanstack/react-query";
import supabase from "../supabase/supabase";

export function useItems() {
  return useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const { data: items, error } = await supabase.from("items").select("*");

      if (error) return null;

      console.log(items);
      return items;
    },
  });
}
