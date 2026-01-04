import { useCategoryStore } from "../../store/categoryStore";
import { itemImageUrl } from "../../utils/imageUrl";
import MenuItem from "./MenuItem";

interface Item {
  id: number;
  product: string;
  image: string;
  category: string;
  price: number;
  desc: string;
}

interface MenuItemsProps {
  items: Item[];
  onToggleDetails: (e: React.MouseEvent) => void;
}

export default function MenuItems({ items, onToggleDetails }: MenuItemsProps) {
  const { category } = useCategoryStore();
  const filteredItems = items.filter((item) => item.category === category);
  const sortedItems = [...filteredItems].sort((a, b) => a.price - b.price);

  return (
    <div className="w-[75%] bg-[linear-gradient(350.98deg,#738E7F_37.99%,#4C3D34_102.51%)] overflow-scroll">
      <ul className="flex flex-col gap-3 my-3">
        {sortedItems.map((item) => {
          const imageUrl = itemImageUrl(item.category, item.image);
          return (
            <MenuItem
              key={item.id}
              item={item}
              image={imageUrl}
              onToggleDetails={onToggleDetails}
            />
          );
        })}
      </ul>
    </div>
  );
}
