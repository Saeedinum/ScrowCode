import { useGoogleLogin } from "@react-oauth/google";
import googleIcon from "/src/assets/auth/google.svg";
import { useState } from "react";
import { useGoogleSignupQuery } from "../api/authAPI";
import { Tuser } from "@/types/google";

const Google = ({ type }: { type: "sign" | "login" }) => {
  const [user, setUser] = useState<Tuser | null>(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse as Tuser),
    onError: (error) => {
      console.error("Login Failed:", error);
    },
  });

  useGoogleSignupQuery(user as Tuser, {
    skip: user === null,
  });

  return (
    <>
      <button
        dir="rtl"
        onClick={() => login()}
        className="my-5 flex w-[calc(100%-2rem)] cursor-pointer items-center justify-center gap-[10px] text-nowrap rounded-[8px] border-[1px] border-solid border-[#002ABA] bg-[#002ABA] py-[7px] text-primary-fourth duration-300 hover:bg-primary-first hover:text-primary-fourth sm:my-8 sm:w-[503px]"
      >
        {type === "login" && <p>تسجيل الدخول عن طريق جوجل</p>}
        {type === "sign" && <p>انشاء حسابك عن طريق جوجل</p>}
        <img src={googleIcon} alt="" />
      </button>
    </>
  );
};

export default Google;
