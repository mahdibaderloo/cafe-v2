import profileIcon from "../../assets/images/profile.svg";

export default function TransactionsProfileBox() {
  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center mt-14">
      <div className="w-24 h-24 xl:w-30 xl:h-30 2xl:w-40 2xl:h-40 rounded-full bg-gray-300 flex justify-center items-center cursor-pointer shadow-md">
        <img src={profileIcon} alt="Profile icon" className="w-12 xl:w-14 xl:w-18" />
      </div>
      <p className="font-medium text-white xl:text-xl 2xl:text-2xl xl:mt-2">Admin</p>
    </div>
  );
}
