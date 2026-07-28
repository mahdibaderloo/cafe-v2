import useModalStore from "../../../store/modal";
import type { OrdersResponse } from "../../../types/order.type";
import { useOrderStore } from "../../../store/orderStore";
import toomaanIcon from "../../../assets/images/toomaan.svg";

export default function OrderTableRow({ data }: { data: OrdersResponse }) {
  const { openModal, setType } = useModalStore();
  const { setSelectedOrder } = useOrderStore();

  function handleOpenModal() {
    setSelectedOrder(data.id);
    setType("order");
    openModal();
  }

  return (
    <li className="flex w-full" onClick={handleOpenModal}>
      <div className="w-1/4 px-4 py-2 text-[#748F80] border-l-2 border-[#587062] flex justify-center items-center">
        <p className="text-sm xl:text-[1rem] 2xl:text-lg 2xl:font-medium">
          {data.orderCode}
        </p>
      </div>
      <div className="w-1/4 px-4 py-2 text-[#748F80] border-l-2 border-[#587062] flex justify-center items-center">
        <p className="text-sm xl:text-[1rem] 2xl:text-lg 2xl:font-medium">
          {data.username}
        </p>
      </div>
      <div className="w-1/4 px-4 py-2 text-[#748F80] border-l-2 border-[#587062] flex justify-center items-center">
        <p className="text-sm xl:text-[1rem] 2xl:text-lg 2xl:font-medium">
          {data.totalPrice}
          <img src={toomaanIcon} alt="تومان" />
        </p>
      </div>
      <div className="w-1/4 px-4 py-2 text-[#748F80] flex justify-center items-center">
        <p className="text-sm xl:text-[1rem] 2xl:text-lg 2xl:font-medium">
          {data.phoneNumber}
        </p>
      </div>
    </li>
  );
}
