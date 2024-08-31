import { useForm, SubmitHandler } from "react-hook-form";

import { useForgetpassMutation } from "../../../api/authAPI";

import locklogo from "/src/assets/auth/lock.png";
import { Link } from "react-router-dom"

type Inputs = {
  email: string;
};

const EmailComponent = () => {
  const [forgetpass, { data, error, isLoading, isSuccess, isError }] =
    useForgetpassMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    forgetpass(data);
  };

  return (
    <section className="flex flex-col items-center justify-between gap-1 font-bold">
      <img src={locklogo} alt="" className="mb-5" />
      <h1 className="text-4xl text-primary-first">Forget Your Password ?</h1>
      <p className="text-base text-Grey-first">
        A code will be sent to your email to reset password
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 flex w-full flex-col items-center justify-between gap-10"
      >
        <label htmlFor="email" className="relative w-[calc(100%+8rem)]">
          <span className="ml-1 text-primary-first">Email Address</span>

          <input
            autoComplete="false"
            type="email"
            id="email"
            {...register("email", {
              required: "required",
            })}
            placeholder="enter your email address"
            className="h-[52px] w-full rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] px-[13px] py-[14px] outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-Grey-third"
          />
        </label>

        <button
          type="submit"
          className="h-[39px] w-full rounded-[8px] bg-primary-second text-primary-fourth"
        >
          Send code
				</button>
				
      </form>
				<Link to={"/login"} className="text-sm text-Grey-first">Back to Login</Link>
    </section>
  );
};

export default EmailComponent;
