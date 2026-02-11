import toast from "react-hot-toast";
import cartIcon from "../../assets/images/cart.svg";
import { useCartStore } from "../../store/cartStore";
import { useNavigate } from "react-router-dom";

interface Item {
  id: number;
  product: string;
  image: string;
  category: string;
  price: number;
  desc: string;
}

interface ItemProp {
  item: Item;
}

export default function AddToCartButton({ item }: ItemProp) {
  const { addItem } = useCartStore();
  const navigate = useNavigate();

  const selectedItem = {
    ...item,
    count: 1,
  };

  function handleClickAdd(e: React.MouseEvent) {
    e.stopPropagation();
    toast.success((t) => (
      <div className="flex justify-between items-center gap-4">
        <span>محصول به سبد خرید اضافه شد</span>
        <button
          className="text-[#4c3d34] underline text-[0.5rem]"
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
      className="flex items-center justify-center gap-0.5 bg-(--green-color) w-22 h-6 rounded-lg"
      onClick={handleClickAdd}
    >
      <span className="text-[0.52rem] font-semibold text-white">
        افزودن به{" "}
      </span>
      <img src={cartIcon} alt="icon" className="rotate-y-180 w-4" />
    </button>
  );
}
