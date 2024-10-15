import { Link } from "react-router-dom";

import EmailComponent from "./components/EmailComponent";
import OtpComponent from "./components/OtpComponent";
import ResetPassword from "./components/ResetPassword";

import { useAppSelector } from "@/store/hooks";

import logo from "@/assets/global/logo.svg";

const ForgetPassword = () => {
  const reset = useAppSelector((state) => state.auth.reset);

  return (
    <main className="relative flex h-screen  items-center justify-center">
      <Link to={"/"} className="absolute left-4 top-4 lg:p-8 lg:pl-28">
        <img src={logo} alt="" />
      </Link>

      {reset?.email === null &&
      reset?.newPassword === null &&
      reset?.otp === null ? (
        <EmailComponent />
      ) : reset?.email !== null &&
        reset?.newPassword === null &&
        reset?.otp === null ? (
        <OtpComponent />
      ) : (
        <ResetPassword />
      )}
      <div className="flex- absolute bottom-4 flex gap-1 text-center font-bold text-primary-first">
        <Link to={"/contact"} className="text-Grey-first underline">
          تواصل معنا
        </Link>
        <p className="">تم الانشاء عن طريق تيم سكرو</p>
      </div>
    </main>
  );
};

export default ForgetPassword;
