import DashboardHeader from "../features/dashboard/DashboardHeader";
import DashboardNav from "../features/dashboard/DashboardNav";
import DashboardTransactionsBox from "../features/dashboard/DashboardTransactionsBox";

export default function Dashboard() {
  return (
    <div className="overflow-hidden flex justify-between">
      <DashboardNav />
      <main className="bg-[#C8D2DA] w-full">
        <DashboardHeader title="داشبورد" />
      </main>
      <DashboardTransactionsBox />
    </div>
  );
}
