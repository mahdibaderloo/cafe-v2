import { Outlet, useLocation } from "react-router-dom";
import DashboardNav from "../features/dashboard/DashboardNav";
import DashboardTransactionsBox from "../features/dashboard/DashboardTransactionsBox";
import Modal from "../features/modal/Modal";
import useModalStore from "../store/modal";
import PrintOrder from "./dashboard/PrintOrder";

export default function Dashboard() {
  const { isOpen } = useModalStore();
  const location = useLocation();
  const isPrintPage = location.pathname.includes("/print");

  return (
    <>
      {isPrintPage ? (
        <PrintOrder />
      ) : (
        <div className="overflow-hidden flex justify-between">
          <DashboardNav />
          <main className="bg-gray-300 w-full">
            <Outlet />
          </main>
          <DashboardTransactionsBox />
        </div>
      )}
      {isOpen && <Modal />}
    </>
  );
}
