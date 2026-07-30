import toast from "react-hot-toast";
import cartIcon from "../../assets/images/cart.svg";
import { useCartStore } from "../../store/cartStore";
import { useNavigate } from "react-router-dom";
import type { ItemResponse } from "../../types/item.type";

export default function AddToCartButton({ item }: { item: ItemResponse }) {
  const { addItem } = useCartStore();
  const navigate = useNavigate();

  const selectedItem = {
    ...item,
    count: 1,
  };

  function handleClickAdd(e: React.MouseEvent) {
    e.stopPropagation();
    toast.success((t) => (
      <div className="flex justify-between items-center gap-4 w-full">
        <span className="text-sm">محصول به سبد خرید اضافه شد</span>
        <button
          className="text-[#4c3d34] underline text-sm"
          onClick={() => {
            toast.dismiss(t.id);
            navigate("/shopping-cart");
          }}
        >
          مشاهده سبد خرید
        </button>
      </div>
    ));

    addItem(selectedItem);
  }

  return (
    <button
      className="flex items-center justify-center gap-2 sm:gap-2 bg-(--green-color) w-28 sm:w-32 h-8 sm:h-12 rounded-lg sm:rounded-xl"
      onClick={handleClickAdd}
    >
      <span className="text-sm font-medium text-white">افزودن به </span>
      <img src={cartIcon} alt="icon" className="rotate-y-180 w-5 sm:w-6.5" />
    </button>
  );
}
