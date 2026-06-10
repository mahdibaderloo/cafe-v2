import profileIcon from "../../assets/images/profile.svg";

export default function DashboardTransactionsBox() {
  return (
    <div className="bg-white h-screen w-70">
      <div className="w-full flex flex-col gap-4 justify-center items-center mt-12">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex justify-center items-center cursor-pointer shadow-md">
          <img src={profileIcon} alt="Profile icon" className="w-10" />
        </div>
        <p className="font-medium">Admin</p>
      </div>
    </div>
  );
}
