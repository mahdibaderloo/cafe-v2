import { useMutation } from "@tanstack/react-query";
import supabase from "../supabase/supabase";

interface Submit {
  totalPrice: number;
  username: string;
  mobile: number;
  order: string;
  isTakeAway: boolean;
  desc?: string;
}

export function useSubmitOrder() {
  return useMutation({
    mutationFn: submitOrder,
    onSuccess: () => {
      console.log("Successfully");
    },
    onError: (err) => {
      console.log(err.message);
    },
  });
}

async function submitOrder(data: Submit) {
  const { error } = await supabase.from("orders").insert([
    {
      username: data.username,
      mobile: data.mobile,
      order: JSON.parse(data.order),
      total_price: data.totalPrice,
      is_takeaway: data.isTakeAway,
      desc: data.desc || "",
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }
}
