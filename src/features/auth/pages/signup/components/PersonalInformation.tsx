import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { personalInformationSchema } from "@/schema/signup";
import { TpersonalInformation } from "@/types";
import { useAppDispatch } from "@/store/hooks";
import { signup } from "@/features/auth/authSlice";
import Google from "@/features/auth/google/Google";
import {
  useCheckUsernameMutation,
  useSignupUserMutation,
} from "@/features/auth/api/authAPI";
import { useEffect, useState } from "react";

const PersonalInformation = () => {
  const dispatch = useAppDispatch();

  const [checkUsername, { data, isLoading, isError }] =
    useCheckUsernameMutation();
  const [signupUser, { isError: signupError }] = useSignupUserMutation();

  const [usernameStatus, setUsernameStatus] = useState<JSX.Element>(<></>);

  useEffect(() => {
    if (data === "creative") {
      setUsernameStatus(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="green-500"
          className="absolute right-5 top-[40px] size-6 fill-green-600 font-bold"
        >
          <path
            fillRule="evenodd"
            d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
            clipRule="evenodd"
          />
        </svg>,
      );
    } else if (isError) {
      setError("username", {
        type: "custom",
        message: "username not available",
      });
      setUsernameStatus(
        <>
          <p className="absolute right-12 top-[40px] font-medium text-red-600">
            username not available
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="absolute right-5 top-[40px] size-6 fill-red-600 font-bold"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </>,
      );
    }
  }, [data, isError]);

  const handleUsernmae = async (value: string) => {
    const isValid = await trigger("username");
    if (!isValid) {
      setUsernameStatus(<></>);
      return;
    }
    await checkUsername({ username: value });
  };

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setError,
    formState: { errors },
  } = useForm<TpersonalInformation>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: {
      password: "qwe123Q!",
      confirmPassword: "qwe123Q!",
    },
  });

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
            className={`h-[52px] w-full rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] py-[14px] pl-2 outline-none placeholder:pr-2 placeholder:text-sm placeholder:text-Grey-third ${errors.arabicName ? "border-red-500" : ""} `}
          />
        </label>

        <label htmlFor="username" className="relative w-full max-w-[515px]">
          <span className="ml-2 text-primary-first">اسم المستخدم</span>
          <svg
            className={`absolute left-3 top-[42px] ${watch().username ? "hidden" : ""} transition-all`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 20V19C5 17.1435 5.7375 15.363 7.05025 14.0503C8.36301 12.7375 10.1435 12 12 12M12 12C13.8565 12 15.637 12.7375 16.9497 14.0503C18.2625 15.363 19 17.1435 19 19V20M12 12C13.0609 12 14.0783 11.5786 14.8284 10.8284C15.5786 10.0783 16 9.06087 16 8C16 6.93913 15.5786 5.92172 14.8284 5.17157C14.0783 4.42143 13.0609 4 12 4C10.9391 4 9.92172 4.42143 9.17157 5.17157C8.42143 5.92172 8 6.93913 8 8C8 9.06087 8.42143 10.0783 9.17157 10.8284C9.92172 11.5786 10.9391 12 12 12Z"
              stroke="#95A3D5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {isLoading && (
            <p
              className="text-surface absolute right-5 top-[44px] inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-primary-first border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            ></p>
          )}
          {!isLoading && usernameStatus}
          <input
            dir="ltr"
            autoComplete="false"
            id="username"
            type="text"
            {...register("username", {
              required: "required",
              onBlur: (event) => handleUsernmae(event.target.value),
            })}
            placeholder="username"
            className={`h-[52px] w-full rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] px-[13px] py-[14px] outline-none placeholder:pl-7 placeholder:text-sm placeholder:text-Grey-third ${errors.username || isError ? "border-red-500" : ""} `}
          />
        </label>

        <label htmlFor="phone" className="relative w-full max-w-[515px]">
          <span className="ml-2 text-primary-first">رقم الهاتف</span>
          <svg
            className={`absolute left-3 top-[42px] ${watch().phone ? "hidden" : ""} transition-all`}
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.0189 10.0371L10.4314 9.85586C10.2447 9.83394 10.0555 9.8546 9.878 9.91631C9.70047 9.97801 9.53923 10.0791 9.4064 10.2121L8.2564 11.3621C6.48214 10.4597 5.04001 9.01762 4.13765 7.24336L5.2939 6.08711C5.56265 5.81836 5.6939 5.44336 5.65015 5.06211L5.4689 3.48711C5.43346 3.18222 5.28714 2.90101 5.0578 2.69701C4.82845 2.49302 4.53209 2.3805 4.22515 2.38086H3.1439C2.43765 2.38086 1.85015 2.96836 1.8939 3.67461C2.22515 9.01211 6.4939 13.2746 11.8251 13.6059C12.5314 13.6496 13.1189 13.0621 13.1189 12.3559V11.2746C13.1251 10.6434 12.6501 10.1121 12.0189 10.0371Z"
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
            className={`h-[52px] w-full rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] px-[13px] py-[14px] outline-none placeholder:pl-6 placeholder:text-sm placeholder:text-Grey-third ${errors.phone ? "border-red-500" : ""} `}
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
              required: "required",
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
            className={`h-[52px] w-full rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] px-[13px] py-[14px] outline-none placeholder:pl-6 placeholder:text-sm placeholder:text-Grey-third ${errors.password ? "border-red-500" : ""} `}
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
            className={`h-[52px] w-full rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] px-[13px] py-[14px] outline-none placeholder:pl-6 placeholder:text-sm placeholder:text-Grey-third ${errors.confirmPassword ? "border-red-500" : ""} `}
          />
        </label>

        <button
          disabled={isError}
          type="submit"
          className="my-4 flex h-[48px] w-full max-w-[480px] items-center justify-center gap-2 rounded-[8px] bg-primary-second py-[7px] text-primary-fourth duration-500 hover:bg-primary-first disabled:bg-Grey-first"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.833008 7.5H14.1663M14.1663 7.5L8.16634 1.5M14.1663 7.5L8.16634 13.5"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
          الخطوة التالية
        </button>
        <p className="text-center text-red-500">
          {signupError && "an error happend"}
        </p>
      </form>
    </section>
  );
};

export default PersonalInformation;
