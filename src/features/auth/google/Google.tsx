import { useGoogleLogin } from "@react-oauth/google";
import googleIcon from "/src/assets/auth/google.svg";
import { useState } from "react";
import { useGoogleSignupQuery } from "../api/authAPI";
import { Tuser } from "@/types/google";

const Google = () => {
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
        onClick={() => login()}
        className="my-8 flex w-[calc(100%-3rem)] cursor-pointer items-center justify-center gap-[10px] rounded-[8px] border-[1px] border-solid border-[#002ABA] bg-[#002ABA] px-[83px] py-[7px] text-primary-fourth duration-300 hover:bg-primary-first hover:text-primary-fourth"
      >
        <img src={googleIcon} alt="" />
        <p>Sign in with Google</p>
      </button>
    </>
  );
};

export default Google;
