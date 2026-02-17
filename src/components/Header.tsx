import { useNavigate } from "react-router-dom";
import backButton from "../assets/images/back.svg";

type Text = { text: string };

export default function Header({ text }: Text) {
  const navigate = useNavigate();

  return (
    <header className="w-full h-fit flex justify-between items-center p-4">
      <div className="w-[8%]" />
      <h3 className="text-white sm:text-xl font-bold">{text}</h3>
      <div
        className="bg-[#14512F] rounded-xl h-7.5 w-7.5 sm:h-9 sm:w-9 flex justify-center items-center"
        onClick={() => navigate(-1)}
      >
        <img src={backButton} alt="icon" className="sm:w-5" />
      </div>
    </header>
  );
}
