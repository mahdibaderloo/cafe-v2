import Transactions from "./Transactions";
import TransactionsProfileBox from "./TransactionsProfileBox";

export default function DashboardTransactionsBox() {
  return (
    <div className="bg-white h-screen w-70 flex flex-col justify-between gap-16">
      <TransactionsProfileBox />
      <Transactions />
    </div>
  );
}
