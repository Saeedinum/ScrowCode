import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

import { useRef } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useLoginUserMutation, useVerifyEmailStudentMutation } from "@/features/auth/api/authAPI"
import { useAppSelector } from "@/store/hooks"
import { useNavigate } from "react-router-dom"
import { toast } from "@/hooks/use-toast"

type Inputs = {
  otp: string[]
}

const VerifyEmail = ({ open, handleVerifyDialog }: { open: boolean; handleVerifyDialog: (e: boolean) => void }) => {
  const navigate = useNavigate()
  const { register, handleSubmit, setValue } = useForm<Inputs>()
  const inputsRef = useRef<HTMLInputElement[]>([])
  const signupData = useAppSelector(state => state.auth.signup)

  const [verifyEmailStudent, { isLoading }] = useVerifyEmailStudentMutation()
  const [loginUser, { isLoading: isLoggingIn }] = useLoginUserMutation()

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const otpCode = data.otp.join("")
    const token = localStorage.getItem("token")!

    try {
      const response = await verifyEmailStudent({
        code: otpCode,
        token: token
      }).unwrap()

      if (response.status === "success") {
        const userData = {
          email: signupData.PersonalInformation.email,
          password: signupData.PersonalInformation.password
        }

        toast({
          title: "تم بنجاح",
          description: "تم تأكيد البريد الالكتروني بنجاح",
          variant: "default"
        })
        await loginUser(userData).unwrap()

        setTimeout(() => {
          navigate("/", { replace: true })
        }, 1000)
      } else {
        throw Error(`Verification failed: ${response?.message || "No message provided"}`)
      }
    } catch {
      toast({
        title: "حدث خطأ ما",
        description: "حدث خطأ اثناء التحقق من البريد الالكتروني",
        variant: "destructive"
      })
    }
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
    <AlertDialog open={open} onOpenChange={handleVerifyDialog}>
      <AlertDialogContent className="" dir="rtl">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex flex-col items-center justify-center text-xl font-bold text-primary-first lg:text-2xl">
            سنرسل لك رمز التأكيد الخاص بك
            <p className="flex flex-col items-center justify-center gap-0 text-[15px] font-semibold text-[#5D6A93]">{signupData.PersonalInformation.email || ""}</p>
          </AlertDialogTitle>
          <section dir="ltr" className="flex w-full select-none flex-col items-center font-bold">
            <button type="button" onClick={() => handleVerifyDialog(false)} className="absolute right-2 top-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ff0000" className="size-6">
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center justify-between gap-5">
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
              <button type="submit" disabled={isLoading || isLoggingIn} className="ml-auto mr-auto h-[39px] rounded-[8px] bg-[#002ABA] px-10 font-bold text-primary-fourth">
                {isLoading ? (
                  <p
                    className="text-surface h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status"
                  ></p>
                ) : isLoggingIn ? (
                  "جاري تسجيل الدخول..."
                ) : (
                  "تأكيد"
                )}
              </button>
            </form>
            <p className="mt-8 text-[14px] text-Grey-first">
              <button type="button" className="text-primary-second">
                اضغط لاعادة الارسال
              </button>
              لم يصل لك الكود ؟
            </p>
          </section>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-4"></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default VerifyEmail
