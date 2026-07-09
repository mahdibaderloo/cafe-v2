import toast from "react-hot-toast";
import cartIcon from "../../assets/images/cart.svg";
import { useCartStore } from "../../store/cartStore";
import { useNavigate } from "react-router-dom";
import type { Item } from "../../types/item.type";

export default function AddToCartButton({ item }: { item: Item }) {
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
        <span className="text-[0.5rem] sm:text-sm">
          محصول به سبد خرید اضافه شد
        </span>
        <button
          className="text-[#4c3d34] underline text-[0.5rem] sm:text-sm"
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
      className="flex items-center justify-center gap-0.5 sm:gap-2 bg-(--green-color) w-20 sm:w-full h-6 sm:h-9 rounded-lg sm:rounded-xl"
      onClick={handleClickAdd}
    >
      <span className="text-[0.52rem] sm:text-[0.7rem] font-semibold text-white">
        افزودن به{" "}
      </span>
      <img src={cartIcon} alt="icon" className="rotate-y-180 w-4 sm:w-5.5" />
    </button>
  );
}
