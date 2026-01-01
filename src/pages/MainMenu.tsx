import { Link } from "react-router-dom";

export default function MainMenu() {
  return (
    <div className="w-full">
      <main className="w-[75%]"></main>
      <nav className="bg-[#596D6C] overflow-scroll w-[25%] flex items-center justify-center shadow-[0px_0px_6px_-1px_#000000E5] py-3">
        <ul className="flex flex-col gap-2.5">
          <li className="mt-0.5 bg-(--green-color) p-0.5 pb-1 rounded-xl overflow-hidden flex flex-col justify-center items-center">
            <Link to="/" className="flex flex-col items-center gap-1">
              <div className="bg-[#D9D9D9] rounded-[0.625rem] overflow-hidden w-12 h-12 flex justify-center items-center">
                <img src="" alt="{item.label}" className="" />
              </div>
              <p className="text-[0.5rem] text-white font-medium">قهوه داغ</p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
