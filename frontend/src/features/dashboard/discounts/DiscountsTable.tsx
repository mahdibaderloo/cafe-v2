import DiscountsPaginationBox from "./DiscountsPaginationBox";
import { useDiscounts } from "../../../hooks/dashboard/useDiscounts";
import DiscountsTableHeader from "./DiscountsTableHeader";
import EmptyDiscountsRow from "./EmptyDiscountsRow";
import DiscountsTableRow from "./DiscountsTableRow";

export default function DiscountsTable() {
  const { data, isLoading } = useDiscounts();

  if (isLoading) return <p>Loading...</p>;

  return (
    <ul className="flex flex-col items-center justify-center flex-wrap lg:w-[90%] 2xl:w-200 mx-auto mt-8 xl:mt-20 2xl:mt-16 rounded-2xl overflow-hidden border-3 border-[#f4f4f4] divide-y-2 divide-[#f4f4f4]">
      <DiscountsTableHeader />
      {data?.length === 0 ? (
        <EmptyDiscountsRow />
      ) : (
        data?.map((discount) => (
          <DiscountsTableRow key={discount.id} data={discount} />
        ))
      )}
      {data?.length !== 0 && <DiscountsPaginationBox />}
    </ul>
  );
}
