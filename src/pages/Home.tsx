import mainPic from "../assets/images/main-pic.png";
import coffee from "../assets/images/coffee.png";
import { useCategories } from "../hooks/useCategories";

export default function Home() {
  const { categories } = useCategories();
  console.log(categories);
  return (
    <div className="w-full bg-[#503C31]">
      <img src={mainPic} alt="main pic" className="w-full" />
      <div className="min-h-screen w-full bg-[linear-gradient(180deg,#503C31_0%,#748F80_100%)]">
        <ul className="pt-3 p-5 flex items-center justify-between gap-3 flex-wrap">
          <li className="w-18 bg-(--green-color) p-0.5 rounded-xl overflow-hidden flex flex-col justify-center items-center">
            <div className="bg-[#D9D9D9] rounded-[0.625rem] overflow-hidden w-17 h-17 flex justify-center items-center">
              <img src={coffee} alt="coffee" />
            </div>
            <p className="text-[0.625rem] text-white py-1 font-medium">
              نوشیدنی داغ
            </p>
          </li>
          <li className="w-18 bg-(--green-color) p-0.5 rounded-xl overflow-hidden flex flex-col justify-center items-center">
            <div className="bg-[#D9D9D9] rounded-[0.625rem] overflow-hidden w-17 h-17 flex justify-center items-center">
              <img src={coffee} alt="coffee" />
            </div>
            <p className="text-[0.625rem] text-white py-1 font-medium">
              نوشیدنی داغ
            </p>
          </li>
          <li className="w-18 bg-(--green-color) p-0.5 rounded-xl overflow-hidden flex flex-col justify-center items-center">
            <div className="bg-[#D9D9D9] rounded-[0.625rem] overflow-hidden w-17 h-17 flex justify-center items-center">
              <img src={coffee} alt="coffee" />
            </div>
            <p className="text-[0.625rem] text-white py-1 font-medium">
              نوشیدنی داغ
            </p>
          </li>
          <li className="w-18 bg-(--green-color) p-0.5 rounded-xl overflow-hidden flex flex-col justify-center items-center">
            <div className="bg-[#D9D9D9] rounded-[0.625rem] overflow-hidden w-17 h-17 flex justify-center items-center">
              <img src={coffee} alt="coffee" />
            </div>
            <p className="text-[0.625rem] text-white py-1 font-medium">
              نوشیدنی داغ
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
