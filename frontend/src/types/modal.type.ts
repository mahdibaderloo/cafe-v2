export interface ModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export interface ItemFormData {
  productName: string;
  price: number;
  description: string;
}
