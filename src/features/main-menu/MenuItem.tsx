import cartIcon from "../../assets/images/cart.svg";

interface ItemProps {
  item: {
    id: number;
    product: string;
    image: string;
    category: string;
    price: number;
    desc: string;
  };
  image: string;
}

export default function MenuItem({ item, image }: ItemProps) {
  return (
    <li className="bg-[linear-gradient(304.79deg,#748F80_-6.47%,#503D32_108.97%)] mx-2 py-2 px-3 rounded-3xl flex h-32">
      <div>
        <img src={image} alt="product-image" className="w-full mt-6" />
      </div>
      <div className="flex flex-col justify-between">
        <div className="text-white flex flex-col justify-center items-center gap-2 mb-4 mt-2 font-medium">
          <p className="text-[0.9rem] text-center">{item.product}</p>
          <p className="text-[0.7rem]">{item.price.toLocaleString()}</p>
        </div>
        <button className="flex items-center justify-center gap-0.5 bg-(--green-color) w-22 h-6 rounded-lg">
          <span className="text-[0.52rem] font-semibold text-white">
            افزودن به{" "}
          </span>
          <img src={cartIcon} alt="icon" className="rotate-y-180 w-4" />
        </button>
      </div>
    </li>
  );
}
