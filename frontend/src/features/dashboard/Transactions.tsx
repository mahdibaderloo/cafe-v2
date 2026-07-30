import { useLastFiveOrdersPrice } from "../../hooks/dashboard/useLastFiveOrdersPrice";
import EmptyTransactions from "./EmptyTransactions";
import TransactionItem from "./TransactionItem";

export default function Transactions() {
  const { data, isLoading } = useLastFiveOrdersPrice();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bg-[#748F80] p-2 rounded-t-xl h-90 2xl:h-110 shadow-[0px_-3px_6px_0px_#00000040]">
      <p className="text-sm font-medium p-2 2xl:my-3 text-white xl:text-lg 2xl:text-xl">
        تراکنش ها
      </p>
      <ul className="flex flex-col justify-center items-center gap-2 mt-4 2xl:mt-8">
        {data?.length === 0 ? (
          <EmptyTransactions />
        ) : (
          data?.map((transaction) => (
            <TransactionItem
              key={transaction.orderId}
              transaction={transaction}
            />
          ))
        )}
      </ul>
    </div>
  );
}
