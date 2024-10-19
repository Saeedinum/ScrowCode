import { Link } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form"
import { useForgetpassMutation } from "@/features/auth/api/authAPI"

type Inputs = {
  email: string
}

const EmailComponent = () => {
  const [forgetpass] = useForgetpassMutation()

  const { register, handleSubmit } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = data => {
    forgetpass(data.email)
  }

  return (
    <section className="flex flex-col items-center justify-between gap-1 font-bold">
      <h1 className="text-2xl text-primary-first md:text-3xl lg:text-4xl">هل نسيت كلمة المرور؟</h1>
      <p className="text-sm text-Grey-first md:text-base">سنرسل كود الي بريدك الالكتروني لتسترجع كلمة المرور</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex w-full flex-col items-center gap-10">
        <label dir="rtl" htmlFor="email" className="relative max-w-[500px]">
          <span className="ml-1 text-primary-first">البريد الالكتروني</span>
          <input
            dir="ltr"
            autoComplete="false"
            id="email"
            type="text"
            {...register("email", {
              required: "required"
            })}
            className={`mt-1 h-[52px] w-full max-w-[500px] rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] px-[13px] py-[14px] outline-none placeholder:pr-6 placeholder:text-sm placeholder:text-Grey-third`}
          />
        </label>

        <button type="submit" className="h-[39px] w-full rounded-[8px] bg-primary-second text-primary-fourth">
          Send code
        </button>
      </form>
      <Link to={"/login"} className="text-sm text-Grey-first">
        الرجوع لصفحة التسجيل
      </Link>
    </section>
  )
}

export default EmailComponent
