import coffeeImage from "../assets/images/login-pic.png";
import LoginForm from "../features/login/LoginForm";

import backIcon from "../assets/images/back.svg";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="w-full h-screen bg-[#485158] flex flex-col justify-center items-center">
      <Link
        to="/"
        className="pr-152 flex items-center gap-2 text-white text-sm lg:cursor-pointer pb-2"
      >
        <p>بازگشت</p>
        <img src={backIcon} alt="" />
      </Link>
      <div className="flex lg:w-[80%] xl:w-200 h-80 xl:h-100 bg-white rounded-3xl overflow-hidden">
        <LoginForm />
        <section className="lg:w-[45%] xl:w-[38%]">
          <img src={coffeeImage} alt="image" className="" />
        </section>
      </div>
    </div>
  );
}
