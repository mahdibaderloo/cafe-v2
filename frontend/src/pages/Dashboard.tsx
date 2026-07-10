import { Outlet } from "react-router-dom";
import DashboardNav from "../features/dashboard/DashboardNav";
import DashboardTransactionsBox from "../features/dashboard/DashboardTransactionsBox";
import Modal from "../features/modal/Modal";

export default function Dashboard() {
  return (
    <>
      <div className="overflow-hidden flex justify-between">
        <DashboardNav />
        <main className="bg-gray-300 w-full">
          <Outlet />
        </main>
        <DashboardTransactionsBox />
      </div>
      <Modal />
    </>
  );
}
