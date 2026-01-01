import { itemImageUrl } from "../../utils/imageUrl";
import MenuItem from "./MenuItem";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

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
}

export default function MenuItems({ items }: MenuItemsProps) {
  return (
    <div className="w-[75%] bg-[linear-gradient(350.98deg,#738E7F_37.99%,#4C3D34_102.51%)] overflow-scroll">
      <ul className="flex flex-col gap-3 my-3">
        {items.map((item) => {
          const imageUrl = itemImageUrl(item.category, item.image);
          return <MenuItem key={item.id} item={item} image={imageUrl} />;
        })}
      </ul>
    </div>
  );
}
