import { Link } from "react-router-dom";

import EmailComponent from "./components/EmailComponent";
import OtpComponent from "./components/OtpComponent";
import ResetPassword from "./components/ResetPassword";

import { useAppSelector } from "../../../../store/hooks";

import logo from "/src/assets/global/logo.svg";

const ForgetPassword = () => {
  const reset = useAppSelector((state) => state.auth.reset);

  return (
    <main className="relative flex h-screen flex-col items-center justify-center">
      <Link to={"/"} className="absolute left-0 top-0 p-8 pl-28">
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
        <p className="">created by scrow team</p>
        <Link to={"/contact"} className="text-Grey-first underline">
          contact us
        </Link>
      </div>
    </main>
  );
};

export default ForgetPassword;
