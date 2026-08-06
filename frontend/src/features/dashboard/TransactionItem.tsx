import toomaanIcon from "../../assets/images/toomaan-white.svg";
import type { LastFiveOrderPrice } from "../../types/order.type";

export default function TransactionItem({
  transaction,
}: {
  transaction: LastFiveOrderPrice;
}) {
  return (
    <li className="bg-[#3F5247] text-white flex p-1.5 xl:p-2 2xl:p-3 justify-between items-center rounded-lg w-full shadow">
      <p className="font-medium text-sm xl:text-[1rem] 2xl:text-xl">
        {transaction.totalPrice.toLocaleString()}
      </p>
      <img src={toomaanIcon} alt="تومان" className="lg:w-7 xl:w-8 2xl:w-9" />
    </li>
  );
}
