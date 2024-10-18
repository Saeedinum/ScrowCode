import { useGoogleLogin } from "@react-oauth/google"
import googleIcon from "/src/assets/auth/google.svg"
import { useState } from "react"
import { useGoogleSignupQuery } from "../api/authAPI"
import { Tuser } from "@/types/google"

const Google = ({ type }: { type: "sign" | "login" }) => {
  const [user, setUser] = useState<Tuser | null>(null)

  const login = useGoogleLogin({
    onSuccess: codeResponse => setUser(codeResponse as Tuser),
    onError: error => {
      console.error("Login Failed:", error)
    }
  })

  useGoogleSignupQuery(user as Tuser, {
    skip: user === null
  })

  return (
    <>
      <button
        disabled
        dir="rtl"
        onClick={() => login()}
        title="we are working on this"
        className="inputlabel my-5 flex cursor-pointer items-center justify-center gap-[10px] text-nowrap rounded-[8px] border-[1px] border-solid border-[#002ABA] bg-[#002ABA] py-[7px] text-primary-fourth duration-300 hover:bg-primary-first hover:text-primary-fourth disabled:cursor-auto disabled:bg-gray-600 sm:my-8"
      >
        {type === "login" && <p>تسجيل الدخول عن طريق جوجل</p>}
        {type === "sign" && <p>انشاء حسابك عن طريق جوجل</p>}
        <img src={googleIcon} alt="" />
      </button>
    </>
  )
}

export default Google
