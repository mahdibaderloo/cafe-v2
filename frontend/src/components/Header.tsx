import { useNavigate } from "react-router-dom";
import backButton from "../assets/images/back.svg";

type Text = { text: string };

export default function Header({ text }: Text) {
  const navigate = useNavigate();

  return (
    <header className="w-full h-fit flex justify-between items-center p-4">
      <div className="w-[10%]" />
      <h3 className="text-white text-xl sm:text-2xl font-bold">{text}</h3>
      <div
        className="bg-[#14512F] rounded-xl h-10 w-10 sm:h-12 sm:w-12 flex justify-center items-center"
        onClick={() => navigate(-1)}
      >
        <img src={backButton} alt="icon" className="" />
      </div>
    </header>
  );
}
