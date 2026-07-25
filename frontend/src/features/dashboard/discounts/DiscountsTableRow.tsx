import useModalStore from "../../../store/modal";
import { useOrderStore } from "../../../store/orderStore";
import type { DiscountResponse } from "../../../types/dashboard.type";

export default function DiscountsTableRow({
  data,
}: {
  data: DiscountResponse;
}) {
  const { openModal, setType } = useModalStore();
  const { setSelectedOrder } = useOrderStore();

  function handleOpenModal() {
    setSelectedOrder(data.id);
    setType("order");
    openModal();
  }

  return (
    <li className="flex w-full lg:cursor-pointer" onClick={handleOpenModal}>
      <div className="w-1/3 px-4 py-2 text-white border-l-2 border-[#f4f4f4] flex justify-center items-center bg-[#485158]">
        <p className="text-sm xl:text-[1rem] 2xl:text-lg 2xl:font-medium">
          {data.code}
        </p>
      </div>
      <div className="w-1/3 px-4 py-2 text-white border-l-2 border-[#f4f4f4] flex justify-center items-center bg-[#485158]">
        <p className="text-sm xl:text-[1rem] 2xl:text-lg 2xl:font-medium">
          {`${data.discountValue} ${data.type === "PERCENTAGE" ? "%" : ""}`}
        </p>
      </div>
      <div className="w-1/3 px-4 py-2 text-white flex justify-center items-center bg-[#485158]">
        <div
          className={`${data.isActive ? "bg-[#7A9686] border-2 border-[#2D4336] text-[#10743D]" : "bg-[#D77575] border-2 border-[#790000] text-[#790000]"} rounded-xl text-xs xl:text-[1rem] font-medium w-24 2xl:w-30 py-1 text-center`}
        >
          {data.isActive ? "فعال" : "غیر فعال"}
        </div>
      </div>
    </li>
  );
}
