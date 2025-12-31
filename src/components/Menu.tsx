import menuIcon from "../assets/images/menu.svg";

export default function Menu() {
  return (
    <div className="bg-(--green-color) w-10 h-10 flex justify-center items-center rounded-xl fixed right-4 bottom-4 shadow-[0px_1px_2px_0px_#00000073]">
      <img src={menuIcon} alt="icon" className="w-6" />
    </div>
  );
}
