import { useAppSelector } from "@/store/hooks"
import { useForm, SubmitHandler } from "react-hook-form"
import { useResetpasswordMutation } from "@/features/auth/api/authAPI"

type Inputs = {
  password: string
  confirmPassword: string
}

const ResetPassword = () => {
  const [resetpassword] = useResetpasswordMutation()
  const email = useAppSelector(state => state.auth.reset?.email)

  const { register, handleSubmit } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = data => {
    resetpassword({
      email: email,
      password: data.password
    })
  }

  return (
    <section className="flex flex-col items-center justify-between gap-1 font-bold">
      <h1 className="text-2xl text-primary-first md:text-3xl lg:text-4xl">انشاء كلمة مرور جديدة</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex w-full flex-col items-center justify-between gap-10 px-10">
        <label htmlFor="password" className="relative lg:w-[calc(100%+8rem)]">
          <span className="ml-1 text-primary-first"> New Password</span>

          <svg className={`absolute left-3 top-[42px] transition-all`} width="16" height="16" viewBox="0 0 16 16" fill="Grey-third " xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.00033 11.3337C7.6467 11.3337 7.30757 11.1932 7.05752 10.9431C6.80747 10.6931 6.66699 10.3539 6.66699 10.0003C6.66699 9.26033 7.26033 8.66699 8.00033 8.66699C8.35395 8.66699 8.69309 8.80747 8.94313 9.05752C9.19318 9.30757 9.33366 9.6467 9.33366 10.0003C9.33366 10.3539 9.19318 10.6931 8.94313 10.9431C8.69309 11.1932 8.35395 11.3337 8.00033 11.3337ZM12.0003 13.3337V6.66699H4.00033V13.3337H12.0003ZM12.0003 5.33366C12.3539 5.33366 12.6931 5.47413 12.9431 5.72418C13.1932 5.97423 13.3337 6.31337 13.3337 6.66699V13.3337C13.3337 13.6873 13.1932 14.0264 12.9431 14.2765C12.6931 14.5265 12.3539 14.667 12.0003 14.667H4.00033C3.6467 14.667 3.30756 14.5265 3.05752 14.2765C2.80747 14.0264 2.66699 13.6873 2.66699 13.3337V6.66699C2.66699 5.92699 3.26033 5.33366 4.00033 5.33366H4.66699V4.00033C4.66699 3.11627 5.01818 2.26842 5.6433 1.6433C6.26842 1.01818 7.11627 0.666992 8.00033 0.666992C8.43807 0.666992 8.87152 0.753211 9.27594 0.920727C9.68036 1.08824 10.0478 1.33377 10.3573 1.6433C10.6669 1.95283 10.9124 2.3203 11.0799 2.72471C11.2474 3.12913 11.3337 3.56259 11.3337 4.00033V5.33366H12.0003ZM8.00033 2.00033C7.46989 2.00033 6.96118 2.21104 6.58611 2.58611C6.21104 2.96118 6.00033 3.46989 6.00033 4.00033V5.33366H10.0003V4.00033C10.0003 3.46989 9.78961 2.96118 9.41454 2.58611C9.03947 2.21104 8.53076 2.00033 8.00033 2.00033Z"
              fill="#95A3D5"
            />
          </svg>

          <input
            autoComplete="false"
            type="email"
            id="password"
            {...register("password")}
            placeholder="new password"
            className="inputfield px-[13px] py-[14px] outline-none placeholder:pl-5 placeholder:text-sm placeholder:text-Grey-third"
          />
        </label>

        <label htmlFor="confirmPassword" className="relative lg:w-[calc(100%+8rem)]">
          <span className="ml-1 text-primary-first"> Confirm Password</span>
          <svg className={`absolute left-3 top-[42px] transition-all`} width="16" height="16" viewBox="0 0 16 16" fill="Grey-third " xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.00033 11.3337C7.6467 11.3337 7.30757 11.1932 7.05752 10.9431C6.80747 10.6931 6.66699 10.3539 6.66699 10.0003C6.66699 9.26033 7.26033 8.66699 8.00033 8.66699C8.35395 8.66699 8.69309 8.80747 8.94313 9.05752C9.19318 9.30757 9.33366 9.6467 9.33366 10.0003C9.33366 10.3539 9.19318 10.6931 8.94313 10.9431C8.69309 11.1932 8.35395 11.3337 8.00033 11.3337ZM12.0003 13.3337V6.66699H4.00033V13.3337H12.0003ZM12.0003 5.33366C12.3539 5.33366 12.6931 5.47413 12.9431 5.72418C13.1932 5.97423 13.3337 6.31337 13.3337 6.66699V13.3337C13.3337 13.6873 13.1932 14.0264 12.9431 14.2765C12.6931 14.5265 12.3539 14.667 12.0003 14.667H4.00033C3.6467 14.667 3.30756 14.5265 3.05752 14.2765C2.80747 14.0264 2.66699 13.6873 2.66699 13.3337V6.66699C2.66699 5.92699 3.26033 5.33366 4.00033 5.33366H4.66699V4.00033C4.66699 3.11627 5.01818 2.26842 5.6433 1.6433C6.26842 1.01818 7.11627 0.666992 8.00033 0.666992C8.43807 0.666992 8.87152 0.753211 9.27594 0.920727C9.68036 1.08824 10.0478 1.33377 10.3573 1.6433C10.6669 1.95283 10.9124 2.3203 11.0799 2.72471C11.2474 3.12913 11.3337 3.56259 11.3337 4.00033V5.33366H12.0003ZM8.00033 2.00033C7.46989 2.00033 6.96118 2.21104 6.58611 2.58611C6.21104 2.96118 6.00033 3.46989 6.00033 4.00033V5.33366H10.0003V4.00033C10.0003 3.46989 9.78961 2.96118 9.41454 2.58611C9.03947 2.21104 8.53076 2.00033 8.00033 2.00033Z"
              fill="#95A3D5"
            />
          </svg>

          <input
            autoComplete="false"
            type="email"
            id="confirmPassword"
            {...register("confirmPassword")}
            placeholder="new password"
            className="inputfield px-[13px] py-[14px] outline-none placeholder:pl-5 placeholder:text-sm placeholder:text-Grey-third"
          />
        </label>

        <button type="submit" className="h-[39px] w-full rounded-[8px] bg-[#002ABA] text-primary-fourth">
          Reset
        </button>
      </form>
    </section>
  )
}

export default ResetPassword
