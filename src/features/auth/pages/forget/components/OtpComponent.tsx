import { useRef } from "react"
import { useForm, SubmitHandler } from "react-hook-form"

import { useAppSelector } from "@/store/hooks"
import { useVerifycodeMutation } from "@/features/auth/api/authAPI"

type Inputs = {
  otp: string[]
}

const OtpComponent = () => {
  const [verifycode, { isError }] = useVerifycodeMutation()
  const email = useAppSelector(state => state.auth.reset?.email)

  const { register, handleSubmit, setValue } = useForm<Inputs>()

  const inputsRef = useRef<HTMLInputElement[]>([])

  const onSubmit: SubmitHandler<Inputs> = data => {
    const otpCode = data.otp.join("")
    verifycode({ otp: otpCode })
  }

  const handleChange = (element: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = element.target.value
    if (isNaN(Number(value))) return
    setValue(`otp.${index}`, value)
    if (value !== "" && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === "Backspace" && index > 0 && !inputsRef.current[index].value) {
      inputsRef.current[index - 1].focus()
    }
  }

  return (
    <section className="relative flex select-none flex-col items-center justify-between gap-1 font-bold">
      <h1 className="text-2xl text-primary-first md:text-3xl lg:text-4xl">تحقق من الايميل الخاص بك</h1>
      <p className="text-sm text-Grey-first md:text-base">
        أدخل الرمز الذي تم إرساله إليه
        <br />
        <span className="text-primary-second">{email}</span>
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex w-full flex-col items-center justify-between gap-10">
        <div className="flex gap-2">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              {...register(`otp.${index}`, { required: true })}
              //@ts-expect-error no problem
              ref={el => (inputsRef.current[index] = el)}
              onChange={e => handleChange(e, index)}
              onKeyDown={e => handleKeyDown(e, index)}
              type="text"
              maxLength={1}
              className="md:border-1 size-[40px] rounded-[5px] border border-primary-second px-[10px] py-[2px] text-xl text-primary-second outline-none focus:border-primary-second md:size-[50px] md:text-3xl lg:size-[68px] lg:text-4xl"
            />
          ))}
        </div>

        <button type="submit" className="h-[39px] rounded-[8px] bg-[#002ABA] px-40 font-bold text-primary-fourth">
          التالي
        </button>
      </form>
      <p className="mt-8 text-[14px] text-Grey-first">
        <button className="text-primary-second"> انقر لاعادة الارسال</button>
        لم تحصل علي الرمز ؟
      </p>
      {isError && <p className="absolute -bottom-6 text-red-600"> something wrong </p>}
    </section>
  )
}

export default OtpComponent
