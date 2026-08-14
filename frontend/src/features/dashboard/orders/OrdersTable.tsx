import { useState } from "react";
import { useOrders } from "../../../hooks/dashboard/useOrders";
import EmptyOrdersRow from "./EmptyOrdersRow";
import OrderTableHeader from "./OrderTableHeader";
import OrderTableRow from "./OrderTableRow";
import OrdersPaginationBox from "./OrdersPaginationBox";

export default function OrdersTable() {
  const [page, setPage] = useState(0);
  const { data, isLoading } = useOrders(page);

  if (isLoading) return <p>Loading...</p>;

  return (
    <ul className="flex flex-col items-center justify-center flex-wrap lg:w-[90%] 2xl:w-200 mx-auto mt-8 xl:mt-20 2xl:mt-16 rounded-2xl overflow-hidden border-2 border-[#587062] divide-y-2 divide-[#587062]">
      <OrderTableHeader />
      {data?.content.length === 0 ? (
        <EmptyOrdersRow />
      ) : (
        data?.content
          .sort((a, b) => b.id - a.id)
          .map((order) => <OrderTableRow key={order.id} data={order} />)
      )}
      {data?.content.length !== 0 && (
        <OrdersPaginationBox
          page={page}
          onSetPage={setPage}
          totalPages={data?.totalPages as number}
        />
      )}
    </ul>
  );
}
