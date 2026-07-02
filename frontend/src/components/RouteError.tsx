import { Link } from "react-router-dom";
import errorImage from "../assets/images/error.png";

export default function RouteError() {
  return (
    <div className="bg-[linear-gradient(167.62deg,rgba(80,61,50,0.98)_13.19%,#738E7F_95.21%)] h-screen">
      <img src={errorImage} alt="cup-image" className="mx-auto sm:w-100" />
      <div className="absolute left-1/2 -translate-x-1/2 top-[52%] sm:top-[62%] w-full flex flex-col justify-center">
        <div className="w-full text-center font-iran-sans text-white text-[0.7rem] sm:text-[1rem] font-semibold flex flex-col gap-1">
          <p>خطایی پیش آمده است.</p>
          <p>لطفا بار دیگر تلاش کنید.</p>
        </div>
        <Link
          to="/"
          className="bg-white w-fit mx-auto mt-4 sm:mt-6 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] text-[#503d32] font-iran-sans font-semibold text-[0.7rem] sm:text-[1rem] rounded-[0.6rem] px-5 sm:px-10 py-1 sm:py-3"
        >
          تلاش مجدد
        </Link>
      </div>
    </div>
  );
}
