import { useEffect, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSignupUserMutation } from "@/features/auth/api/authAPI"
import VerifyEmail from "./VerifyEmail"
import { trackInformationSchema } from "@/schema/signup"

import { TtrackInformation } from "@/types"

import { useAppSelector } from "@/store/hooks"

import githubIcon from "@/assets/global/github.svg"
import linkedinIcon from "@/assets/global/linkedin.svg"
import behanceIcon from "@/assets/global/behance.svg"

import "../index.css"
import toast from "react-hot-toast"
import { SignupStepsContextType } from "@/types/auth"

const TrackInformation = () => {
  const navigate = useNavigate()

  const { currentStep } = useOutletContext<SignupStepsContextType>()

  useEffect(() => {
    if (currentStep < 3) {
      navigate("/signup") // Redirect if accessed directly
    }
  }, [currentStep, navigate])

  const [signupUser, { isLoading }] = useSignupUserMutation()

  const tracks = useAppSelector(state => state.auth.tracks)
  const PersonalInformation = useAppSelector(state => state.auth.signup.PersonalInformation)
  const UniversityInformation = useAppSelector(state => state.auth.signup.UniversityInformation)
  const TrackInformation = useAppSelector(state => state.auth.signup.TrackInformation)

  const [verify, setVerify] = useState<boolean>(false)
  const handleVerifyDialog = (e: boolean) => {
    setVerify(e)
  }

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors }
  } = useForm<TtrackInformation>({
    defaultValues: {
      ...TrackInformation
    },
    resolver: zodResolver(trackInformationSchema)
  })

  const onSubmit = async (data: TtrackInformation) => {
    try {
      const response = await signupUser({
        ...PersonalInformation,
        ...UniversityInformation,
        ...data
      }).unwrap()

      if (response.status === "success") {
        localStorage.setItem("token", response.token)
      }

      handleVerifyDialog(true)
    } catch {
      toast.error("حدث خطأ ما تأكد من بياناتك و أعد المحاولة")
    }
  }

  return (
    <section className="mb-10 flex flex-grow flex-col items-center">
      <VerifyEmail open={verify} handleVerifyDialog={handleVerifyDialog} />
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center justify-center gap-5 px-10">
        <div className="w-full">
          <label dir="rtl" htmlFor="track" className="mb-2 block font-bold">
            اختر التراك الخاص بك
          </label>
          <div className="flex flex-wrap justify-center gap-2 md:max-w-[550px]">
            {tracks.map(track => (
              <div
                key={track._id}
                className={`relative flex h-[51px] w-[165px] items-center text-nowrap rounded-lg border border-Grey-first p-[10px] text-sm text-gray-600 ${watch().track == track._id ? "border-[#407BFF] bg-blue-100 text-[#407BFF]" : ""}`}
              >
                <input {...register("track")} type="radio" id={track.slug} value={track._id} className="radio-hidden" />
                <label htmlFor={track.slug} className="relative flex flex-1 cursor-pointer items-center pl-4">
                  <span className="radio-custom"></span>
                  {track.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div dir="rtl" className="flex w-full flex-col items-start p-4">
          <label htmlFor="track" className="mb-2 block font-bold">
            المهارت
          </label>
          <div className="flex flex-wrap justify-center gap-2 md:max-w-[500px]">
            {tracks
              .find(track => track._id == watch().track)
              ?.skills.map(skill => (
                <div
                  key={skill.name}
                  //no id to use as key
                  className={`relative flex h-[51px] w-fit items-center text-nowrap rounded-lg border border-Grey-first p-[10px] text-sm lowercase text-gray-600 ${getValues("skills")?.includes(skill.name) ? "border-[#407BFF] bg-blue-100 text-blue-600" : ""}`}
                >
                  <input {...register("skills")} type="checkbox" id={skill.name} value={skill.name} className="hidden" />
                  <label htmlFor={skill.name} className="relative flex flex-1 cursor-pointer items-center pl-1">
                    {skill.name}
                  </label>
                </div>
              ))}
          </div>
        </div>

        <label htmlFor="github" className="inputlabel">
          <span className="ml-2 text-primary-first">Github</span>
          <img src={githubIcon} alt="" className={`absolute left-3 top-[37px] ${watch().github ? "hidden" : ""} transition-all`} />
          <input
            autoComplete="false"
            id="github"
            type="text"
            {...register("github", {
              required: "required"
            })}
            placeholder={"github link"}
            className={`inputfield px-[13px] py-[14px] placeholder-shown:pl-9 ${errors.github ? "border-1 border-red-600" : ""} `}
          />
          {errors.github && <span className="text-sm text-red-900">eg: https://github.com/example</span>}
        </label>
        <label htmlFor="linkedin" className="inputlabel">
          <span className="ml-2 text-primary-first">LinkedIn </span>
          <img src={linkedinIcon} alt="" className={`absolute left-3 top-[37px] ${watch().linkedin ? "hidden" : ""} transition-all`} />
          <input
            autoComplete="false"
            id="linkedin"
            type="text"
            {...register("linkedin")}
            placeholder={"linked in link"}
            className={`inputfield px-[13px] py-[14px] placeholder-shown:pl-9 ${errors.linkedin ? "border-1 border-red-600" : ""} `}
          />
          {errors.linkedin && <span className="text-sm text-red-900">eg: https://linkedin.com/in/example</span>}
        </label>
        <label htmlFor="behance" className="inputlabel">
          <span className="ml-2 text-primary-first">
            Behance
            <span className="text-sm text-[#A0A1A3]">( Ui/Ux avability )</span>
          </span>

          <img src={behanceIcon} alt="" className={`absolute left-3 top-[37px] ${watch().behance ? "hidden" : ""} transition-all`} />
          <input
            autoComplete="false"
            id="behance"
            type="text"
            {...register("behance")}
            placeholder={"behance link"}
            className={`inputfield px-[13px] py-[14px] placeholder-shown:pl-9 ${errors.behance ? "border-red-600" : ""} `}
          />
          {errors.behance && <span className="absolutebottom-0 max-w-fit text-sm text-red-900">eg: https://behance.net/example</span>}
        </label>
        <button
          type="button"
          onClick={() => navigate("/signup/university", { replace: true })}
          className="inputlabel flex h-[39px] items-center justify-center gap-2 rounded-[8px] bg-primary-second py-[7px] text-primary-fourth"
        >
          الخطوة السابقة
        </button>
        <button
          disabled={isLoading}
          type="submit"
          className="inputlabel flex h-[39px] items-center justify-center gap-2 rounded-[8px] bg-[#002ABA] py-[7px] text-primary-fourth duration-500 hover:bg-primary-first"
        >
          {isLoading ? (
            <p
              className="text-surface h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            ></p>
          ) : (
            "تسجيل الدخول"
          )}
        </button>
        <p className="text-center text-sm text-[#A0A1A3]">
          من خلال التسجيل، فإنك توافق على
          <span className="text-primary-second">شروط الاستخدام وسياسة الخصوصية </span>
          الخاصة بنا
        </p>
      </form>
    </section>
  )
}

export default TrackInformation
