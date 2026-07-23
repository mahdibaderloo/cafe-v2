import { useQuery } from "@tanstack/react-query";
import { getItem } from "../../services/item";

export function useItem(id: number) {
  return useQuery({
    queryKey: ["item", id],
    queryFn: () => getItem(id),
  });
}
