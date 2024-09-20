import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInformationSchema } from "@/schema/signup";
import { TpersonalInformation } from "@/types";
import { useSignupUserMutation } from "@/features/auth/api/authAPI";
import Google from "@/features/auth/google/Google";
import useCheckUsername from "@/hooks/useCheckUsername";

import emailIcon from "@/assets/auth/signup/email.svg";
import passwordIcon from "@/assets/auth/signup/password.svg";
import phoneIcon from "@/assets/auth/signup/phone.svg";
import usernameIcon from "@/assets/auth/signup/username.svg";
import arrowIcon from "@/assets/global/rightArrow.svg";
import { Navigate, useNavigate } from "react-router-dom";
import useGoodBass from "@/hooks/useGoodBass";

import "../index.css"

const PersonalInformation = () => {
  const navigate = useNavigate();
  const [signupUser, { isLoading }] = useSignupUserMutation();

  const { ProgressBar, checkPassword } = useGoodBass();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<TpersonalInformation>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: {
      phone: "+20",
    },
  });

  const { status, ui } = useCheckUsername<TpersonalInformation>(
    watch("username"),
    setError,
    clearErrors,
  );

  const onSubmit = async (data: TpersonalInformation) => {
    const response = await signupUser({
      ...data,
    });
    if (response?.error) {
      //@ts-expect-error error is defined
      if (response?.error?.status === 400) {
        //@ts-expect-error error is defined
        if (response.error.data.errors[0].path === "Email")
          setError("email", {
            type: "server",
            message: "Email already exists",
          });
        //@ts-expect-error error is defined
        if (response.error.data.errors[0].path === "Username")
          setError("username", {
            type: "server",
            //@ts-expect-error error is defined
            message: response.error.data.errors[0].msg,
          });
      }
    } else {
      navigate("/signup/university", { replace: true });
      return <Navigate to={"/signup/university"} />;
    }
  };

  return (
    <section
      dir="rtl"
      className="flex w-[calc(100%-5rem)] flex-grow flex-col items-center px-20"
    >
      <Google type="sign" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center gap-5"
      >
        <label htmlFor="arabicName" className="relative w-full max-w-[515px]">
          <span className="ml-1 text-primary-first">
            الاسم الرباعي باللغة العربية{" "}
          </span>
          <input
            autoComplete="false"
            id="arabicName"
            type="text"
            {...register("arabicName", {
              required: "required",
            })}
            placeholder="الاسم الرباعي"
            className={`inputfield py-[14px] pl-2 pr-2 ${errors.arabicName ? "border-red-500" : ""} `}
          />
        </label>

        <label htmlFor="username" className="relative w-full max-w-[515px]">
          <span className="ml-2 text-primary-first">اسم المستخدم</span>
          <img
            src={usernameIcon}
            alt=""
            className={`absolute left-3 top-[42px] ${watch().username ? "hidden" : ""} transition-all`}
          />
          {ui}
          <input
            dir="ltr"
            autoComplete="false"
            id="username"
            type="text"
            {...register("username", {
              required: "required",
            })}
            placeholder="username"
            className={`inputfield px-[13px] py-[14px] placeholder:pl-7 ${(errors.username && errors.username?.message !== "less") || status === "unValid" ? "border-red-500" : ""} `}
          />
        </label>

        <label htmlFor="phone" className="relative w-full max-w-[515px]">
          <span className="ml-2 text-primary-first">رقم الهاتف</span>
          <img
            src={phoneIcon}
            alt=""
            className={`absolute left-3 top-[42px] ${watch().phone ? "hidden" : ""} transition-all`}
          />
          <input
            dir="ltr"
            autoComplete="false"
            id="phone"
            type="text"
            {...register("phone", {
              required: "required",
            })}
            placeholder="eg: +201012345678"
            className={`inputfield px-[13px] py-[14px] placeholder:pl-6 ${errors.phone ? "border-red-500" : ""} `}
          />
        </label>

        <label htmlFor="email" className="relative w-full max-w-[515px]">
          <span className="ml-2 text-primary-first">البريد الالكتروني</span>
          <img
            src={emailIcon}
            alt=""
            className={`absolute left-3 top-[42px] ${watch().email ? "hidden" : ""} fill-Grey-third transition-all`}
          />
          <input
            dir="ltr"
            autoComplete="false"
            id="email"
            type="text"
            {...register("email", {
              required: "required",
            })}
            placeholder={errors.email ? "eg: example@gmail.com" : "Email"}
            className={`inputfield px-[13px] py-[14px] placeholder:pl-6 ${errors.email ? "border-red-500" : ""} `}
          />
        </label>

        <label htmlFor="password" className="relative w-full max-w-[515px]">
          <span className="ml-2 text-primary-first">كلمة المرور</span>
          <img
            src={passwordIcon}
            alt=" "
            className={`absolute left-3 top-[42px] ${watch().password ? "hidden" : ""} transition-all`}
          />
          <input
            dir="ltr"
            autoComplete="false"
            id="password"
            type="password"
            {...register("password", {
              required: "required",
              onChange(event) {
                checkPassword(event.target.value);
              },
            })}
            placeholder="Password"
            className={`inputfield px-[13px] py-[14px] placeholder:pl-6 ${errors.password ? "border-red-500" : ""} `}
          />
          {ProgressBar}
        </label>

        <label
          htmlFor="confirmPassword"
          className="relative w-full max-w-[515px]"
        >
          <span className="ml-2 text-primary-first">تأكيد كلمة المرور</span>
          <img
            src={passwordIcon}
            alt="passwordIcon"
            className={`absolute left-3 top-[42px] ${watch().confirmPassword ? "hidden" : ""} transition-all`}
          />
          <input
            dir="ltr"
            autoComplete="false"
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: "required",
            })}
            placeholder="Confirm Password"
            className={`inputfield px-[13px] py-[14px] placeholder:pl-6 ${errors.confirmPassword ? "border-red-500" : ""} `}
          />
        </label>

        <p className="flex flex-wrap gap-4 text-center text-red-500">
          {errors.email?.type === "server" && errors.email.message}
          {errors.username?.type === "server" && errors.username.message}
        </p>
        <button
          disabled={status === "unValid" || status === "loading"}
          type="submit"
          className="flex h-[48px] w-full max-w-[480px] items-center justify-center gap-2 rounded-[8px] bg-primary-second py-[7px] text-primary-fourth duration-500 hover:bg-primary-first disabled:bg-Grey-first"
        >
          {isLoading ? (
            <p
              className="text-surface h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            ></p>
          ) : (
            <img src={arrowIcon} alt="" className="size-6" />
          )}
          الخطوة التالية
        </button>
      </form>
    </section>
  );
};

export default PersonalInformation;
