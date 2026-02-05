import { useMutation } from "@tanstack/react-query";
import supabase from "../supabase/supabase";

interface Submit {
  totalPrice: number;
  username: string;
  mobile: number;
  order: string;
  isTakeAway: boolean;
}

export function useSubmitOrder() {
  return useMutation({
    mutationFn: submitOrder,
  });
}

async function submitOrder(data: Submit) {
  const { error } = await supabase.from("orders").insert([
    {
      username: data.username,
      mobile: data.mobile,
      order: data.order,
      total_price: data.totalPrice,
      is_takeaway: data.isTakeAway,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }
}
