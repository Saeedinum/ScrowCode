import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { universityInformationSchema } from "@/schema/signup"
import { TuniversityInformation } from "@/types"
import { signup } from "@/features/auth/authSlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { useNavigate, useOutletContext } from "react-router-dom"
import { useGetTracksQuery } from "@/features/auth/api/authAPI"
import { SignupStepsContextType } from "@/types/auth"
import { useEffect } from "react"

const UniversityInformation = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { currentStep, goToNextStep } = useOutletContext<SignupStepsContextType>()

  useEffect(() => {
    if (currentStep < 2) {
      navigate("/signup") // Redirect if accessed directly
    }
  }, [currentStep, navigate])

  const UniversityInformation = useAppSelector(state => state.auth.signup.UniversityInformation)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TuniversityInformation>({
    resolver: zodResolver(universityInformationSchema),
    defaultValues: {
      ...UniversityInformation
    }
  })

  const onSubmit = async (data: TuniversityInformation) => {
    dispatch(
      signup({
        UniversityInformation: data
      })
    )
    goToNextStep()
    navigate("/signup/track", { replace: true })
  }

  useGetTracksQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
    refetchOnFocus: false
  })

  return (
    <section dir="rtl" className="flex w-[calc(100%-5rem)] flex-grow flex-col items-center lg:px-20">
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center gap-7">
        <label htmlFor="university" className="inputlabel">
          <span className="ml-2 text-primary-first">الجامعة االملتحق بها</span>
          <select id="university" className={`inputfield px-[13px] py-[14px] placeholder:pr-1`} {...register("university")}>
            <option value="Suez canal university">جامعة قناة السويس</option>
          </select>
        </label>
        <label htmlFor="college" className="inputlabel">
          <span className="ml-2 text-primary-first">الكلية الملتحق بها</span>
          <select
            id="collage"
            {...register("college", {
              required: "required"
            })}
            className={`inputfield px-[13px] py-[14px] placeholder:pr-1`}
          >
            <option value="computer and information">كلية الحاسبات والمعلومات</option>
          </select>
        </label>
        <label htmlFor="level" className="inputlabel">
          <span className="ml-2 text-primary-first">المرحلة الجامعية</span>
          <select
            defaultValue="1"
            id="level"
            {...register("level", {
              valueAsNumber: true
            })}
            className={`inputfield px-[13px] py-[14px] placeholder:pl-1`}
          >
            <option value="1">الفرقة الأولى</option>
            <option value="2">الفرقة الثانية</option>
            <option value="3">الفرقة الثالثة</option>
            <option value="4">الفرقة الرابعة</option>
          </select>
        </label>
        <label htmlFor="department" className="inputlabel">
          <span className="ml-2 text-primary-first">القسم</span>
          <select id="department" {...register("department", {})} className={`inputfield px-[13px] py-[14px] placeholder:pl-1`}>
            <option value="Bio">BioInformatics</option>
            <option value="Software">Software</option>
            <option value="CS">Computer Science </option>
            <option value="IS">Information Systems</option>
            <option value="AI">Artificial Inteligence</option>
            <option value="cybersecurity">Cyper Security</option>
            <option value="IT">IT</option>
          </select>
        </label>
        <label htmlFor="universityEmail" className="inputlabel">
          <span className="ml-2 text-primary-first">البريد الجامعي</span>
          <input
            autoComplete="false"
            id="universityEmail"
            type="text"
            {...register("universityEmail", {
              required: "required"
            })}
            dir="ltr"
            placeholder="eg: ugs.1234@ci.suez.edu.eg"
            className={`inputfield px-[13px] py-[14px] placeholder:pl-1 ${errors.universityEmail ? "border-red-500" : ""} `}
          />
        </label>
        <button
          type="button"
          onClick={() => navigate("/signup", { replace: true })}
          className="inputlabel flex h-[39px] items-center justify-center gap-2 rounded-[8px] bg-primary-second py-[7px] text-primary-fourth"
        >
          الخطوة السابقة
        </button>
        <button
          type="submit"
          className="inputlabel flex h-[39px] items-center justify-center gap-2 rounded-[8px] bg-primary-second py-[7px] text-primary-fourth duration-500 hover:bg-primary-first max-sm:mb-10"
        >
          الخطوة التالية
          <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.833008 7.5H14.1663M14.1663 7.5L8.16634 1.5M14.1663 7.5L8.16634 13.5" stroke="white" strokeWidth="2" />
          </svg>
        </button>
      </form>
    </section>
  )
}

export default UniversityInformation
