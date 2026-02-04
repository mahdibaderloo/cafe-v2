import { useProductStore } from "../../store/productStore";
import AddToCartButton from "./AddToCartButton";

interface Item {
  id: number;
  product: string;
  image: string;
  category: string;
  price: number;
  desc: string;
}
interface ItemProps {
  item: Item;
  image: string;
  onToggleDetails: (e: React.MouseEvent) => void;
}

export default function MenuItem({ item, image, onToggleDetails }: ItemProps) {
  const { setItem } = useProductStore();

  function handleSetItem(item: Item) {
    setItem(item);
  }

  return (
    <li
      className="bg-[linear-gradient(304.79deg,#748F80_-6.47%,#503D32_108.97%)] mx-2 py-2 px-3 rounded-3xl flex h-34"
      onClick={(e) => {
        handleSetItem(item);
        onToggleDetails(e);
      }}
    >
      <div>
        <img src={image} alt="product-image" className="w-full mt-6" />
      </div>
      <div className="flex flex-col justify-between">
        <div className="text-white flex flex-col justify-center items-center gap-4 mb-2 mt-2 font-medium">
          <p className="text-[0.9rem] text-center">{item.product}</p>
          <p className="text-[0.7rem]">{item.price.toLocaleString()}</p>
        </div>
        <AddToCartButton item={item} />
      </div>
    </li>
  );
}
