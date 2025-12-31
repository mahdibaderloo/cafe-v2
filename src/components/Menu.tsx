import menuIcon from "../assets/images/menu.svg";

export default function Menu() {
  return (
    <div className="bg-(--green-color) w-[2.938rem] h-[2.938rem] flex justify-center items-center rounded-xl fixed right-5 bottom-5 shadow-[0px_1px_2px_0px_#00000073]">
      <img src={menuIcon} alt="icon" className="w-7" />
    </div>
  );
}
