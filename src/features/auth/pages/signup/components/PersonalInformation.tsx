import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { personalInformationSchema } from "@/schema/signup";
import { TpersonalInformation } from "@/types";
import { useAppDispatch } from "@/store/hooks";
import { signup } from "@/features/auth/authSlice";
import Google from "@/features/auth/google/Google";
import { useSignupUserMutation } from "@/features/auth/api/authAPI";
import useCheckUsername from "@/hooks/useCheckUsername";

import emailIcon from "@/assets/auth/signup/email.svg";
import passwordIcon from "@/assets/auth/signup/password.svg";
import phoneIcon from "@/assets/auth/signup/phone.svg";
import usernameIcon from "@/assets/auth/signup/username.svg";
import arrowIcon from "@/assets/global/rightArrow.svg";

const PersonalInformation = () => {
  const dispatch = useAppDispatch();
  const [signupUser, { isError: signupError }] = useSignupUserMutation();

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
      password: "qwe123Q!",
      confirmPassword: "qwe123Q!",
    },
  });

  const { status, ui } = useCheckUsername<TpersonalInformation>(watch("username"), setError, clearErrors);
  
  console.log(errors.username?.message , status)

  const onSubmit = async (data: TpersonalInformation) => {
    await signupUser({
      ...data,
    });
    if (!signupError)
      dispatch(
        signup({
          PersonalInformation: {
            ...data,
          },
        }),
      );
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
          <svg
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
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            className={`inputfield px-[13px] py-[14px] placeholder:pl-7 ${(errors.username && errors.username?.message !== "less") || status === "unValid" ? "border-red-500" : ""} `}
              fill="#95A3D5"
            />
          </svg>
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
          <svg
            className={`absolute left-3 top-[42px] ${watch().email ? "hidden" : ""} transition-all`}
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
            className={`inputfield px-[13px] py-[14px] placeholder:pl-6 ${errors.email ? "border-red-500" : ""} `}
            })}
            placeholder={errors.email ? "eg: example@gmail.com" : "Email"}
            className={`h-[52px] w-full rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] px-[13px] py-[14px] outline-none placeholder:pl-6 placeholder:text-sm placeholder:text-Grey-third ${errors.email ? "border-red-500" : ""} `}
          />
        </label>

        <label htmlFor="password" className="relative w-full max-w-[515px]">
          <span className="ml-2 text-primary-first">كلمة المرور</span>
          <svg
            className={`absolute left-3 top-[42px] ${watch().password ? "hidden" : ""} transition-all`}
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
            id="password"
            type="password"
            {...register("password", {
              required: "required",
            })}
            placeholder="Password"
            className={`inputfield px-[13px] py-[14px] placeholder:pl-6 ${errors.password ? "border-red-500" : ""} `}
          />
        </label>

        <label
          htmlFor="confirmPassword"
          className="relative w-full max-w-[515px]"
        >
          <span className="ml-2 text-primary-first">تأكيد كلمة المرور</span>
          <svg
            className={`absolute left-3 top-[42px] ${watch().confirmPassword ? "hidden" : ""} transition-all`}
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
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: "required",
            })}
            placeholder="Confirm Password"
            className={`inputfield px-[13px] py-[14px] placeholder:pl-6 ${errors.confirmPassword ? "border-red-500" : ""} `}
          />
        </label>

        <button
          disabled={status === "unValid" || status === "loading"}
          type="submit"
          className="my-4 flex h-[48px] w-full max-w-[480px] items-center justify-center gap-2 rounded-[8px] bg-primary-second py-[7px] text-primary-fourth duration-500 hover:bg-primary-first disabled:bg-Grey-first"
        >
          {isLoading ? (
            <p
              className="text-surface h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            ></p>
          ) : (
            <img src={arrowIcon} alt="" className="size-6" />
          )}
};

export default PersonalInformation;
