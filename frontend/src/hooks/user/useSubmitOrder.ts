import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { submitOrder } from "../../services/order";

export function useSubmitOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stats"] });
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
