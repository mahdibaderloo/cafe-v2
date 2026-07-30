export interface ItemResponse {
  id: number;
  productName: string;
  image: string;
  description: string;
  categoryId: string;
  categoryName: string;
  price: number;
  desc: string;
}

export interface ItemRequest {
  productName: string;
  price: number;
  image: string;
  description: string;
  categoryId: number;
}

export interface MenuItemsProps {
  items: ItemResponse[];
  onToggleDetails: (e: React.MouseEvent) => void;
}
