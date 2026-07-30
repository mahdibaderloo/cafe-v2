import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateItem } from "../../services/item";
import type { ItemRequest } from "../../types/item.type";
import { toast } from "react-hot-toast";
import useModalStore from "../../store/modal";

export function useUpdateItem() {
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ItemRequest }) =>
      updateItem(id, data),
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
