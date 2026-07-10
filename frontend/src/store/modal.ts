import { create } from "zustand";
import type { ModalStore } from "../types/modal.type";

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,

  openModal: () => set({ isOpen: true }),

  closeModal: () => set({ isOpen: false }),
}));

export default useModalStore;
