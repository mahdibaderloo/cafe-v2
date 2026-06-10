import DashboardHeader from "../features/dashboard/DashboardHeader";
import DashboardNav from "../features/dashboard/DashboardNav";

export default function Dashboard() {
  return (
    <div className="overflow-hidden flex">
      <DashboardNav />
      <main className="bg-[#C8D2DA]">
        <DashboardHeader title="داشبورد" />
      </main>
    </div>
  );
}
