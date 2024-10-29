import { Link, Outlet, useLocation } from "react-router-dom"
import background from "/src/assets//auth//login.webp"
import logo from "/src/assets/global/logo.svg"
import { useEffect, useState } from "react"

const SignUp = () => {
  const [backgroundStep, setBackgroundStep] = useState<number>()
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === "/signup") {
      setBackgroundStep(1)
    } else if (pathname === "/signup/university") {
      setBackgroundStep(2)
    } else {
      setBackgroundStep(3)
    }
  }, [pathname])

  return (
    <main className="relative flex select-none justify-start">
      <section dir="rtl" className="relative flex max-h-screen w-[calc(40%)] flex-col items-center justify-center bg-Grey-fourth text-primary-first max-md:hidden">
        <img src={background} alt="" className="" />
        <img src={background} alt="" className="bg-Grey-fourth" />
        <div className="absolute flex flex-col items-center gap-5 text-center text-[32px]">
          <p className="flex flex-col font-bold">
            <span>انشئ حسابك لتكتشف</span>
            <span> التيمات المناسبة لك </span>
          </p>
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-xl font-medium text-[#001354]">
              {backgroundStep === 1 && "1. البيانات الشخصية"}
              {backgroundStep === 2 && "2. البيانات الجامعية"}
              {backgroundStep === 3 && "3. التراك الخاص بك"}
            </h2>
            <p className="text-[13px] text-[#6679BE]">خطوة {backgroundStep} من 3</p>
            <div className="flex gap-2">
              {backgroundStep === 1 && <p className="h-[3px] w-[53px] bg-primary-second"></p>}
              <p className="h-[3px] w-[31px] bg-primary-first"></p>
              {backgroundStep === 2 && <p className="h-[3px] w-[53px] bg-primary-second"></p>}
              <p className="h-[3px] w-[24px] bg-primary-first"></p>
              {backgroundStep === 3 && <p className="h-[3px] w-[53px] bg-primary-second"></p>}
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-grow flex-col items-center justify-start font-bold">
        <div className="flex w-full items-center justify-between px-8 pr-10 pt-5 lg:px-16">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
            <p className="flex flex-col items-center font-bold text-[#6679BE] sm:flex-row">
              <Link to={"/login"} className="pl-1 text-primary-first underline decoration-2 underline-offset-4">
                تسجيل الدخول
              </Link>
              لديك حساب بالفعل؟
            </p>
        </div>

        <h1 className="mt-2 text-[32px] text-primary-first">مرحبا بك في سكرو</h1>
        <p className="flex flex-col items-center text-[14px] text-[#6679BE]">
          ! انشئ حسابك الان لتسطيع الدخول في تيم بسرعه
          <span className="m-2 h-[1px] w-[calc(100%+2rem)] bg-[#6679BE]"></span>
        </p>
        <Outlet />
      </section>
    </main>
  )
}

export default SignUp
