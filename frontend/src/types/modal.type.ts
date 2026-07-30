export type ModalType =
  | "edit-item"
  | "add-item"
  | "order"
  | "discount-info"
  | "add-discount"
  | "submit";

export interface ModalStore {
  isOpen: boolean;
  type: ModalType;
  openModal: () => void;
  closeModal: () => void;
  setType: (type: ModalType) => void;
}

export interface ItemFormData {
  productName: string;
  price: number;
  description: string;
}
