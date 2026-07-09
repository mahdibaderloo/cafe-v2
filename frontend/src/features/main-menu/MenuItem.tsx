import { useCartStore } from "../../store/cartStore";
import { useProductStore } from "../../store/productStore";
import type { Item } from "../../types/item.type";
import AddToCartButton from "./AddToCartButton";
import ChangeCountButton from "./ChangeCountButton";

interface ItemProps {
  item: Item;
  onToggleDetails: (e: React.MouseEvent) => void;
}

export default function MenuItem({ item, onToggleDetails }: ItemProps) {
  const { setItem } = useProductStore();
  const { items } = useCartStore();

  const existingItem = items.find((i) => i.id === item.id);

  function handleSetItem(item: Item) {
    setItem(item);
  }

  return (
    <li
      className="bg-[linear-gradient(304.79deg,#748F80_-6.47%,#503D32_108.97%)] mx-2 py-2 sm:py-3 px-3 rounded-3xl flex justify-between sm:gap-4 h-34 sm:h-40"
      onClick={(e) => {
        handleSetItem(item);
        onToggleDetails(e);
      }}
    >
      <div className="sm:w-34 flex items-center justify-center p-1">
        <img
          src={`http://localhost:8080/uploads/categories/${item.image}`}
          alt="product-image"
          className="w-full"
        />
      </div>
      <div className="sm:w-[40%] flex flex-col justify-between items-center">
        <div className="text-white w-full flex flex-col justify-center items-center gap-4 mb-2 mt-2 font-medium">
          <p className="text-[0.8rem] sm:text-[1rem] text-center">
            {item.productName}
          </p>
          <p className="text-[0.7rem] sm:text-[0.9rem]">
            {item.price.toLocaleString()}
          </p>
        </div>
        {existingItem ? (
          <ChangeCountButton id={item.id} />
        ) : (
          <AddToCartButton item={item} />
        )}
      </div>
    </li>
  );
}
