export interface Item {
  id: number;
  productName: string;
  image: string;
  categoryId: string;
  categoryName: string;
  price: number;
  desc: string;
}

export interface MenuItemsProps {
  items: Item[];
  onToggleDetails: (e: React.MouseEvent) => void;
}
