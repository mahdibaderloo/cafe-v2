import { create } from "zustand";
import type { ModalStore, ModalType } from "../types/modal.type";

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  type: "order",

  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  setType: (type: ModalType) => set({ type }),
}));

export default useModalStore;
