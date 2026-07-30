import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItem } from "../../services/item";
import type { ItemRequest } from "../../types/item.type";
import { toast } from "react-hot-toast";
import useModalStore from "../../store/modal";

export function useAddItem() {
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ItemRequest) => createItem(data),
    onSuccess: () => {
      toast.success("آیتم جدید با موفقیت اضافه شد");
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (error: Error) => {
      toast.error("خطا در ثبت آیتم جدید");
      console.error(error);
    },
  });
}
