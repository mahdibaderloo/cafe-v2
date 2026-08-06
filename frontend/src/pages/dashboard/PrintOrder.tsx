import { useNavigate, useParams } from "react-router-dom";
import { useOrders } from "../../hooks/dashboard/useOrders";
import type { OrderItemResponse } from "../../types/order.type";
import { calcTotal } from "../../utils/dashboard";
import { formatJalaliDate } from "../../utils/date";

export default function PrintOrder() {
  const { data: orders, isLoading } = useOrders();
  const params = useParams();
  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;

  const order = orders?.[0];

  if (!order)
    return (
      <div className="w-full pt-60 flex flex-col gap-8 justify-center items-center">
        <p className="w-full text-center font-medium text-red-700 text-xl">
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
    <div
      dir="rtl"
      className="mx-auto mt-12 h-fit w-xl border bg-white px-6 pt-8 pb-40"
    >
      <h1 className="mb-12 text-center text-3xl font-bold">کافه لیلو</h1>

      <div className="mb-12 space-y-2 text-lg">
        <div className="flex gap-4">
          <span className="font-medium">شماره فاکتور :</span>
          <span>{orders.length}</span>
        </div>

        <div className="flex gap-4">
          <span className="font-medium">تاریخ فاکتور :</span>
          <span>{formatJalaliDate(order.createdAt)}</span>
        </div>

        <div className="flex gap-4">
          <span className="font-medium">زمان صدور :</span>
          <span>{formatJalaliDate(Date.now()!)}</span>
        </div>
      </div>

      <table className="mb-12 w-full border-collapse border-2 border-black text-center">
        <thead>
          <tr className="divide-x-2 border-2 border-black text-sm">
            <th className="w-5 -rotate-90">ردیف</th>
            <th className="w-50 p-1">نام کالا</th>

            <th className="flex flex-col">
              <span className="border-b-2 p-1">تعداد</span>
              <span className="p-1">واحد</span>
            </th>

            <th className="p-2">فی</th>
            <th className="p-1">بهای کل</th>
          </tr>
        </thead>

        <tbody>
          {order.items.map((item: OrderItemResponse, index: number) => (
            <tr
              key={item.id}
              className="divide-x-2 border-2 border-black text-sm"
            >
              <td>{index + 1}</td>

              <td className="p-1">{item.itemName}</td>

              <td className="flex flex-col">
                <span className="border-b-2 p-1">{item.count}</span>
                <span className="p-1">عدد</span>
              </td>

              <td className="p-2">{item.price.toLocaleString()}</td>

              <td>{(item.price * item.count).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="w-full text-center font-medium">
        <tbody className="divide-y-2 border-2 border-black text-sm">
          <tr className="flex divide-x-2">
            <td className="flex-1 p-2">تعداد اقلام</td>
            <td className="flex-1 p-2">{totalItems}</td>
          </tr>

          <tr className="flex divide-x-2">
            <td className="flex-1 p-2">مبلغ کل</td>
            <td className="flex-1 p-2">{order.totalPrice.toLocaleString()}</td>
          </tr>

          <tr className="flex divide-x-2">
            <td className="flex-1 p-2">تخفیف</td>
            <td className="flex-1 p-2">{showDiscount}</td>
          </tr>

          <tr className="flex divide-x-2">
            <td className="flex-1 p-2">مبلغ قابل پرداخت (تومان)</td>
            <td className="flex-1 p-2">
              {calcTotal(
                order.totalPrice,
                order.discountValue,
                order.discountType,
              ).toLocaleString()}
            </td>
          </tr>

          <tr className="flex divide-x-2">
            <td className="flex-1 p-2">مبلغ تسویـه شـده (تومان)</td>
            <td className="flex-1 p-2">
              {calcTotal(
                order.totalPrice,
                order.discountValue,
                order.discountType,
              ).toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>

      <p className="mt-8 text-right text-lg">ممنون از خریدتون...</p>
    </div>
  );
}
