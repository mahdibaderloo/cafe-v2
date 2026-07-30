import closeIcon from "../../assets/images/close.svg";
import { useOrder } from "../../hooks/dashboard/useOrder";
import useModalStore from "../../store/modal";
import { useOrderStore } from "../../store/orderStore";
import toomaanIcon from "../../assets/images/toomaan-white.svg";

export default function ModalOrder() {
  const { closeModal } = useModalStore();
  const { selectedOrder } = useOrderStore();
  const { data, isLoading } = useOrder(selectedOrder);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bg-[#485158] rounded-2xl p-6 2xl:p-8 flex flex-col items-center w-150 2xl:w-240 z-50">
      <div className="w-full flex items-center justify-between">
        <p className="font-medium text-white xl:text-lg 2xl:text-xl">
          اطلاعات مشتری
        </p>
        <div className="flex items-center gap-8">
          {
            <p className="bg-[#E2E2E2] w-24 py-3 text-[#485158] text-center rounded-2xl font-medium text-lg 2xl:text-xl">
              بیرون بر
            </p>
          }
          <img
            src={closeIcon}
            alt="close-icon"
            className="lg:cursor-pointer"
            onClick={() => closeModal()}
          />
        </div>
      </div>

      <div className="w-full flex items-center gap-30 mt-6 text-white text-[1rem] 2xl:text-lg">
        <p className="font-medium">
          نام مشتری : <span className="font-light mr-4">{data?.username}</span>
        </p>
        <p className="font-medium">
          شماره تماس :{" "}
          <span className="font-light mr-4">{data?.phoneNumber}</span>
        </p>
      </div>

      <div className="w-full flex flex-col justify-start">
        <p className="font-medium text-white xl:text-lg 2xl:text-xl self-start mt-10">
          اطلاعات سفارش
        </p>
        <div className="w-full flex flex-col items-start gap-2 mt-6 text-white text-[1rem] 2xl:text-lg">
          <p className="font-medium">
            کد سفارش :{" "}
            <span className="font-light mr-4">{data?.orderCode}</span>
          </p>
          <p className="font-medium">
            تاریخ : <span className="font-light mr-4">{data?.createdAt}</span>
          </p>
        </div>
      </div>

      <ul className="flex flex-col items-center justify-center flex-wrap lg:w-[90%] 2xl:w-200 mx-auto mt-8 xl:mt-20 2xl:mt-16 rounded-xl overflow-hidden border-2 border-[#E2E2E2] divide-y-2 divide-[#E2E2E2] text-xs xl:text-sm 2xl:text-[1rem]">
        <li className="w-full flex ">
          <div className="w-1/3 px-4 py-2 text-white border-l-2 border-[#E2E2E2] flex justify-center items-center">
            <p>محصول</p>
          </div>
          <div className="w-1/3 px-4 py-2 text-white border-l-2 border-[#E2E2E2] flex justify-center items-center">
            <p>قیمت</p>
          </div>
          <div className="w-1/3 px-4 py-2 text-white flex justify-center items-center">
            <p>تعداد</p>
          </div>
        </li>
        {data?.items.map((item) => (
          <li className="w-full flex ">
            <div className="w-1/3 px-4 py-2 text-white border-l-2 border-[#E2E2E2] flex justify-center items-center">
              <p>{`${item.itemName} (${item.categoryName})`}</p>
            </div>
            <div className="w-1/3 px-4 py-2 text-white border-l-2 border-[#E2E2E2] flex justify-center items-center">
              <p>{item.price}</p>
              <img src={toomaanIcon} alt="تومان" />
            </div>
            <div className="w-1/3 px-4 py-2 text-white flex justify-center items-center">
              <p>{item.count}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="w-full flex items-center justify-between mt-8 2xl:mt-16 2xl:text-lg">
        <div className="flex items-center gap-2">
          <p className="font-medium text-white">قابل پرداخت : </p>
          <div className="font-light mr-2 flex items-center">
            <p>{data?.totalPrice}</p>
            <img
              src={toomaanIcon}
              alt="تومان"
              className="lg:w-6 xl:w-7 2xl:w-8"
            />
          </div>
        </div>
        <button className="bg-[#95999D] hover:bg-[#7e8081] text-white text-sm xl:text-[1rem] 2xl:text-lg px-4 py-2 xl:px-6 xl:py-3 rounded-2xl transition-all duration-150 lg:cursor-pointer">
          چاپ فاکتور
        </button>
      </div>
    </div>
  );
}
