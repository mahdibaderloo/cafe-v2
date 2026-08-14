import coffeeImage from "../assets/images/login-pic.png";
import LoginForm from "../features/login/LoginForm";

// import backIcon from "../assets/images/back.svg";
// import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="w-full h-screen bg-[#485158] flex flex-col justify-center items-center">
      <div className="lg:w-[85%] xl:w-260 h-120 xl:h-145 flex flex-col justify-center items-center">
        {/* <Link
          to="/"
          className="self-end flex items-center gap-2 text-white text-lg lg:cursor-pointer pb-6"
        >
          <p>بازگشت</p>
          <img src={backIcon} alt="" />
        </Link> */}
        <div className="flex lg:w-full h-full bg-white rounded-3xl overflow-hidden">
          <LoginForm />
          <section className="lg:w-[40%] xl:w-[38%]">
            <img src={coffeeImage} alt="image" className="" />
          </section>
        </div>
      </div>
    </div>
  );
}
