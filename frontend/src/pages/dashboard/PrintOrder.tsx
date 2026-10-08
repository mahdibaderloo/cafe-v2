import { useNavigate, useParams } from "react-router-dom";
import type { OrderItemResponse } from "../../types/order.type";
import { calcTotal } from "../../utils/dashboard";
import { formatJalaliDate } from "../../utils/date";
import { coffeeCategories } from "../../utils/categories";
import { useOrderStore } from "../../store/orderStore";
import { useOrder } from "../../hooks/dashboard/useOrder";
import { useEffect, useState } from "react";

export default function PrintOrder() {
  const { selectedOrder } = useOrderStore();
  const { data: order, isLoading } = useOrder(selectedOrder);
  const params = useParams();
  const navigate = useNavigate();
  const [issuedAt] = useState(() => Date.now());

  useEffect(() => {
    if (!isLoading && order) {
      const timer = setTimeout(() => {
        window.print();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isLoading, order]);

  if (isLoading) return <p>Loading...</p>;

  if (!order)
    return (
      <div className="w-full overflow-x-hidden lg:pt-60 flex flex-col gap-4 lg:gap-8 justify-center items-center">
        <p className="w-full text-center font-medium text-red-700 lg:text-xl">
          سفارشی با کد {params.orderId} یافت نشد !
        </p>
        <button
          className="bg-[#485158] hover:bg-[#383d41] text-white py-2 px-8 text-lg rounded-2xl lg:cursor-pointer"
          onClick={() => navigate("/dashboard/orders")}
        >
          بازگشت
        </button>
      </div>
    );

  const showDiscount = order?.discountValue
    ? order.discountType === "PERCENTAGE"
      ? `${order.discountValue}%`
      : order.discountValue.toLocaleString()
    : "0";

  const totalItems = order.items.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="w-full overflow-x-hidden flex justify-center">
      <div
        dir="rtl"
        className="mt-4 sm:mt-6 md:mt-8 lg:mt-12 h-fit w-full max-w-xl box-border bg-white px-2 sm:px-4 lg:px-6 pt-4 lg:pt-8 pb-8 lg:pb-40 lg:border"
      >
        <h1 className="mb-4 lg:mb-12 text-center text-xl lg:text-3xl font-bold">
          کافه لیلو
        </h1>

        <div className="mb-4 lg:mb-12 space-y-2 text-sm sm:text-base lg:text-lg">
          <div className="flex flex-wrap gap-2 lg:gap-4">
            <span className="font-medium">شماره فاکتور :</span>
            <span className="break-all">{order.id}</span>
          </div>

          <div className="flex flex-wrap gap-2 lg:gap-4">
            <span className="font-medium">تاریخ فاکتور :</span>
            <span>{formatJalaliDate(order.createdAt)}</span>
          </div>

          <div className="flex flex-wrap gap-2 lg:gap-4">
            <span className="font-medium">زمان صدور :</span>
            <span>{formatJalaliDate(issuedAt)}</span>
          </div>
        </div>

        <div className="mb-4 lg:mb-12 w-full overflow-hidden">
          <table className="w-full border-collapse border-2 border-black text-center table-fixed">
            <colgroup>
              <col style={{ width: "8%" }} />
              <col style={{ width: "32%" }} />
              <col style={{ width: "16%" }} />
              <col style={{ width: "22%" }} />
              <col style={{ width: "22%" }} />
            </colgroup>

            <thead>
              <tr className="border-2 border-black text-[0.65rem] sm:text-xs md:text-sm">
                <th className="border-l-2 border-black p-0.5 sm:p-1">ردیف</th>
                <th className="border-l-2 border-black p-0.5 sm:p-1">
                  نام کالا
                </th>
                <th className="border-l-2 border-black p-0.5 sm:p-1">
                  <span className="flex flex-col">
                    <span className="border-b-2 border-black pb-0.5 sm:pb-1">
                      تعداد
                    </span>
                    <span className="pt-0.5 sm:pt-1">واحد</span>
                  </span>
                </th>
                <th className="border-l-2 border-black p-0.5 sm:p-1">فی</th>
                <th className="p-0.5 sm:p-1">بهای کل</th>
              </tr>
            </thead>

            <tbody>
              {order.items.map((item: OrderItemResponse, index: number) => {
                const itemTitle = coffeeCategories.includes(item.categoryName)
                  ? `${item.itemName} (${item.categoryName})`
                  : item.itemName;

                return (
                  <tr
                    key={item.id}
                    className="border-2 border-black text-[0.65rem] sm:text-xs md:text-sm"
                  >
                    <td className="border-l-2 border-black p-0.5 sm:p-1">
                      {index + 1}
                    </td>

                    <td className="border-l-2 border-black p-0.5 sm:p-1 wrap-break-word">
                      {itemTitle}
                    </td>

                    <td className="border-l-2 border-black p-0.5 sm:p-1">
                      <span className="flex flex-col">
                        <span className="border-b-2 border-black pb-0.5 sm:pb-1">
                          {item.count}
                        </span>
                        <span className="pt-0.5 sm:pt-1">عدد</span>
                      </span>
                    </td>

                    <td className="border-l-2 border-black p-0.5 sm:p-1 wrap-break-word">
                      {item.price.toLocaleString()}
                    </td>

                    <td className="p-0.5 sm:p-1 wrap-break-word">
                      {(item.price * item.count).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="w-full overflow-hidden">
          <table className="w-full text-center font-medium table-fixed border-2 border-black">
            <tbody className="text-[0.65rem] sm:text-xs md:text-sm">
              <tr className="border-b-2 border-black">
                <td className="w-1/2 border-l-2 border-black p-1 sm:p-2">
                  تعداد اقلام
                </td>
                <td className="w-1/2 p-1 sm:p-2">{totalItems}</td>
              </tr>

              <tr className="border-b-2 border-black">
                <td className="w-1/2 border-l-2 border-black p-1 sm:p-2">
                  مبلغ کل
                </td>
                <td className="w-1/2 p-1 sm:p-2 wrap-break-word">
                  {order.totalPrice.toLocaleString()}
                </td>
              </tr>

              <tr className="border-b-2 border-black">
                <td className="w-1/2 border-l-2 border-black p-1 sm:p-2">
                  تخفیف
                </td>
                <td className="w-1/2 p-1 sm:p-2 wrap-break-word">
                  {showDiscount}
                </td>
              </tr>

              <tr className="border-b-2 border-black">
                <td className="w-1/2 border-l-2 border-black p-1 sm:p-2">
                  مبلغ قابل پرداخت (تومان)
                </td>
                <td className="w-1/2 p-1 sm:p-2 wrap-break-word">
                  {calcTotal(
                    order.totalPrice,
                    order.discountValue,
                    order.discountType,
                  ).toLocaleString()}
                </td>
              </tr>

              <tr>
                <td className="w-1/2 border-l-2 border-black p-1 sm:p-2">
                  مبلغ تسویـه شـده (تومان)
                </td>
                <td className="w-1/2 p-1 sm:p-2 wrap-break-word">
                  {calcTotal(
                    order.totalPrice,
                    order.discountValue,
                    order.discountType,
                  ).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-8 text-right text-sm sm:text-base lg:text-lg">
          ممنون از خریدتون...
        </p>
      </div>
    </div>
  );
}
