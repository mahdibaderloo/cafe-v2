import { Outlet } from "react-router-dom";
import DashboardNav from "../features/dashboard/DashboardNav";
import DashboardTransactionsBox from "../features/dashboard/DashboardTransactionsBox";
import Modal from "../features/modal/Modal";
import useModalStore from "../store/modal";

export default function Dashboard() {
  const { isOpen } = useModalStore();

  return (
    <>
      <div className="overflow-hidden flex justify-between">
        <DashboardNav />
        <main className="bg-gray-300 w-full">
          <Outlet />
        </main>
        <DashboardTransactionsBox />
      </div>
      {isOpen && <Modal />}
    </>
  );
}
