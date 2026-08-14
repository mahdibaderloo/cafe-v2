import { useMutation, useQueryClient } from "@tanstack/react-query";
import { expireDiscountCode } from "../../services/dashboard";
import { toast } from "react-hot-toast";

export function useExpireDiscount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => expireDiscountCode(id),
    onSuccess: () => {
      toast.success("کد تخفیف با موفقیت غیر فعال شد");
      queryClient.invalidateQueries({ queryKey: ["discounts", "discount"] });
    },
    onError: () => {
      toast.success("خطا در غیر فعال سازی کد تخفیف ");
    },
  });
}
