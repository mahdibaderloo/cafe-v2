import profileIcon from "../../assets/images/profile.svg";

export default function TransactionsProfileBox() {
  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center mt-12">
      <div className="w-24 h-24 rounded-full bg-gray-200 flex justify-center items-center cursor-pointer shadow-md">
        <img src={profileIcon} alt="Profile icon" className="w-12" />
      </div>
      <p className="font-medium">Admin</p>
    </div>
  );
}
