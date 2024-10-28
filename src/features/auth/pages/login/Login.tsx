import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLoginUserMutation } from "../../api/authAPI"

import background from "/src/assets//auth//login.webp"
import logo from "/src/assets/global/logo.svg"
import { TLoginData } from "@/types/auth"
import Google from "../../google/Google"

const schema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Please enter a valid email" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" })
})

const Login = () => {
  const navigate = useNavigate()
  const [loginUser, { isLoading }] = useLoginUserMutation()

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors }
  } = useForm<TLoginData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: TLoginData) => {
    try {
      const response = await loginUser(data)
      if ("data" in response.data) {
        navigate("/")
      }
    } catch (error) {
      setError("email", {
        type: "server",
        message: "invalid email or password"
      })
      setError("password", { type: "server", message: "invalid" }, { shouldFocus: true })
    }
  }

  return (
    <main className="relative flex max-h-screen select-none">
      <section className="relative hidden h-screen w-[40%] items-center justify-center overflow-hidden bg-Grey-fourth text-primary-first lg:flex">
        <img src={background} alt="f" />
      </section>
      <section dir="rtl" className="flex flex-grow flex-col items-center justify-start p-5 pt-4 max-sm:w-screen sm:p-7">
        <div className="flex w-full items-center justify-between">
          <p className="flex flex-col items-center font-bold text-[#6679BE] sm:flex-row">
            ليس لديك حساب ؟
            <Link to={"/signup"} className="pl-1 text-primary-first underline decoration-2 underline-offset-4">
              انشاء حساب
            </Link>
          </p>
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="flex w-full flex-col items-center p-10 pt-5 font-bold sm:px-16">
          <h1 className="text-[32px] text-primary-first">تسجيل الدخول</h1>
          <p className="text-[14px] text-[#6679BE]">سجل دخولك الان لتكون تيمك علي سكرو</p>
          <hr className="m-2 h-[2px] w-[15rem] bg-[#6679BE]" />
          <Google type={"login"} />
          <p className="text-[13px] text-Grey-third sm:mt-2">أو سجل الدخول عن طريق بريدك الالكتروني</p>
          <form onSubmit={handleSubmit(onSubmit)} className="flex w-full max-w-[500px] flex-col gap-5">
            <label htmlFor="email" className="relative max-w-[500px]">
              <span className="ml-1 text-primary-first">البريد الالكتروني</span>
              <svg
                className={`absolute right-3 top-[42px] ${watch().email ? "hidden" : ""} transition-all`}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="Grey-third "
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.95 3.684L8.637 8.912C8.45761 9.06063 8.23196 9.14196 7.999 9.14196C7.76604 9.14196 7.54039 9.06063 7.361 8.912L1.051 3.684C1.01714 3.78591 0.999922 3.89261 1 4V12C1 12.2652 1.10536 12.5196 1.29289 12.7071C1.48043 12.8946 1.73478 13 2 13H14C14.2652 13 14.5196 12.8946 14.7071 12.7071C14.8946 12.5196 15 12.2652 15 12V4C15.0004 3.89267 14.9835 3.78597 14.95 3.684ZM2 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V12C16 12.5304 15.7893 13.0391 15.4142 13.4142C15.0391 13.7893 14.5304 14 14 14H2C1.46957 14 0.960859 13.7893 0.585786 13.4142C0.210714 13.0391 0 12.5304 0 12V4C0 3.46957 0.210714 2.96086 0.585786 2.58579C0.960859 2.21071 1.46957 2 2 2ZM1.79 3L7.366 7.603C7.54459 7.7505 7.76884 7.83144 8.00046 7.83199C8.23209 7.83254 8.45672 7.75266 8.636 7.606L14.268 3H1.79Z"
                  fill="#95A3D5"
                />
              </svg>
              <input
                dir="ltr"
                autoComplete="false"
                id="email"
                type="text"
                {...register("email", {
                  required: "required"
                })}
                placeholder="بريدك الالكتروني هنا"
                className={`h-[52px] w-full max-w-[500px] rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] px-[13px] py-[14px] outline-none placeholder:pr-6 placeholder:text-sm placeholder:text-Grey-third ${errors.email ? "border-red-500" : ""}`}
              />
            </label>
            <label htmlFor="password" className="relative max-w-[500px]">
              <span className="ml-1 text-primary-first"> كلمة المرور</span>
              <svg
                className={`absolute right-3 top-[42px] ${watch().password ? "hidden" : ""} transition-all`}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="Grey-third "
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.00033 11.3337C7.6467 11.3337 7.30757 11.1932 7.05752 10.9431C6.80747 10.6931 6.66699 10.3539 6.66699 10.0003C6.66699 9.26033 7.26033 8.66699 8.00033 8.66699C8.35395 8.66699 8.69309 8.80747 8.94313 9.05752C9.19318 9.30757 9.33366 9.6467 9.33366 10.0003C9.33366 10.3539 9.19318 10.6931 8.94313 10.9431C8.69309 11.1932 8.35395 11.3337 8.00033 11.3337ZM12.0003 13.3337V6.66699H4.00033V13.3337H12.0003ZM12.0003 5.33366C12.3539 5.33366 12.6931 5.47413 12.9431 5.72418C13.1932 5.97423 13.3337 6.31337 13.3337 6.66699V13.3337C13.3337 13.6873 13.1932 14.0264 12.9431 14.2765C12.6931 14.5265 12.3539 14.667 12.0003 14.667H4.00033C3.6467 14.667 3.30756 14.5265 3.05752 14.2765C2.80747 14.0264 2.66699 13.6873 2.66699 13.3337V6.66699C2.66699 5.92699 3.26033 5.33366 4.00033 5.33366H4.66699V4.00033C4.66699 3.11627 5.01818 2.26842 5.6433 1.6433C6.26842 1.01818 7.11627 0.666992 8.00033 0.666992C8.43807 0.666992 8.87152 0.753211 9.27594 0.920727C9.68036 1.08824 10.0478 1.33377 10.3573 1.6433C10.6669 1.95283 10.9124 2.3203 11.0799 2.72471C11.2474 3.12913 11.3337 3.56259 11.3337 4.00033V5.33366H12.0003ZM8.00033 2.00033C7.46989 2.00033 6.96118 2.21104 6.58611 2.58611C6.21104 2.96118 6.00033 3.46989 6.00033 4.00033V5.33366H10.0003V4.00033C10.0003 3.46989 9.78961 2.96118 9.41454 2.58611C9.03947 2.21104 8.53076 2.00033 8.00033 2.00033Z"
                  fill="#95A3D5"
                />
              </svg>

              <input
                dir="ltr"
                autoComplete="false"
                type="password"
                id="password"
                {...register("password", {
                  required: "required"
                })}
                placeholder="كلمة المرور هنا"
                className={`h-[52px] w-full max-w-[500px] rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] px-[13px] py-[14px] outline-none placeholder:pr-6 placeholder:text-sm placeholder:text-Grey-third ${errors.password ? "border-red-500" : ""}`}
              />
            </label>

            <div className="flex items-center justify-between text-[#6694FF]">
              <Link to={"/forgetPassword"} className="text-sm hover:underline">
                هل نسيت الرقم السري؟
              </Link>
              <label htmlFor="remember" className="flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  className="peer relative h-4 w-4 cursor-pointer appearance-none rounded-[4px] border border-gray-300 transition duration-200 checked:border-primary-first checked:bg-primary-first focus:outline-none"
                />
                <span className="mr-2 text-sm peer-checked:text-primary-first">تذكرني</span>
              </label>
            </div>
            <button type="submit" className="relative h-[39px] rounded-[8px] bg-primary-first py-[7px] text-primary-fourth hover:bg-gradient-to-r hover:from-[#001354] hover:to-[#002ABA]">
              {isLoading ? (
                <p
                  className="text-surface absolute left-[48%] top-[9px] inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-primary-third border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                  role="status"
                ></p>
              ) : (
                " تسجيل الدخول"
              )}
              <p className="absolute -bottom-7 left-[50%] flex translate-x-[-50%] flex-wrap gap-4 text-center text-red-500">{errors.email?.type === "server" && errors.email.message}</p>
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Login
