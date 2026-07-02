import { useMutation } from "@tanstack/react-query";
import supabase from "../supabase/supabase";
import toast from "react-hot-toast";

interface Submit {
  totalPrice: number;
  username: string;
  mobile: string | "-";
  order: string;
  isTakeAway: boolean;
  desc?: string;
}

export function useSubmitOrder() {
  return useMutation({
    mutationFn: submitOrder,
    onSuccess: () => {
      toast.success("سفارش شما با موفقیت ثبت شد", {
        style: { width: "fit-content" },
      });
    },
    onError: () => {
      toast.error("مشکلی در ثبت سفارش پیش آمده. مجدد تلاش کنید", {
        style: { width: "fit-content" },
      });
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
