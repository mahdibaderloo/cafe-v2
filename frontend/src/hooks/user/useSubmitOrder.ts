import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { submitOrder } from "../../services/order";

export function useSubmitOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitOrder,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["orders"],
          refetchType: "all",
        }),
        queryClient.invalidateQueries({
          queryKey: ["stats"],
          refetchType: "all",
        }),
        queryClient.invalidateQueries({
          queryKey: ["last-five-transactions"],
          refetchType: "all",
        }),
      ]);

      toast.success("سفارش شما با موفقیت ثبت شد");
    },
    onError: (error: Error) => {
      toast.error("مشکلی در ثبت سفارش پیش آمده. مجدد تلاش کنید", {
        style: { width: "fit-content" },
      });
      console.error(error);
    },
  });
}
