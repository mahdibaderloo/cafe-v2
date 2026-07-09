import profileIcon from "../../assets/images/profile.svg";

export default function TransactionsProfileBox() {
  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center mt-14">
      <div className="w-24 h-24 rounded-full bg-gray-300 flex justify-center items-center cursor-pointer shadow-md">
        <img src={profileIcon} alt="Profile icon" className="w-12" />
      </div>
      <p className="font-medium text-white">Admin</p>
    </div>
  );
}
