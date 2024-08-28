import { useForm, SubmitHandler } from "react-hook-form";

import { useVerifycodeMutation } from "../../../api/authAPI";
import { useAppSelector } from "../../../../../store/hooks";

import emaillogo from "/src/assets/auth/email.png";
import { useRef } from "react";

type Inputs = {
  otp: string[];
};

const OtpComponent = () => {
  const [verifycode, { data, error, isLoading, isSuccess, isError }] =
    useVerifycodeMutation();
  const email = useAppSelector((state) => state.auth.reset?.email);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const inputsRef = useRef<HTMLInputElement[]>([]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const otpCode = data.otp.join("");
    verifycode({ otp: otpCode });
  };

  const handleChange = (
    element: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = element.target.value;
    if (isNaN(Number(value))) return;
    setValue(`otp.${index}`, value);
    if (value !== "" && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (
      event.key === "Backspace" &&
      index > 0 &&
      !inputsRef.current[index].value
    ) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <section className="flex select-none flex-col items-center justify-between gap-1 font-bold">
      <img src={emaillogo} alt="" className="mb-5" />
      <h1 className="text-4xl text-primary-first">Check Your Email</h1>
      <p className="text-center text-base text-Grey-first">
        Enter the code that was sent to <br />
        <span className="text-primary-second">{email}</span>
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 flex w-full flex-col items-center justify-between gap-10"
      >
        <div className="flex gap-2">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              {...register(`otp.${index}`, { required: true })}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              type="text"
              maxLength={1}
              className="h-[69px] w-[68px] rounded-[8px] border-2 border-primary-second px-[20px] py-[4px] text-[40px] text-primary-second focus:border-primary-second"
            />
          ))}
        </div>

        <button
          type="submit"
          className="h-[39px] rounded-[8px] bg-[#002ABA] px-40 font-bold text-primary-fourth"
        >
          Next
        </button>
      </form>
      <p className="mt-8 text-[14px] text-Grey-first">
        Didn't get the code?{" "}
        <button className="text-primary-second">Click to resend</button>
      </p>
    </section>
  );
};

export default OtpComponent;
