import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginUserMutation } from "../../api/authAPI";

import background from "/src/assets//auth//login.png";
import logo from "/src/assets/logo.svg";
import mainlogo from "/src/assets/MainLogo.svg";
import googleIcon from "/src/assets/auth/google.svg";
import { TLoginData } from "@/types/auth"

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

const Login = () => {
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    watch,
    // formState: { isDirty, dirtyFields },
  } = useForm<TLoginData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: TLoginData) => {
    await loginUser(data).unwrap();
    navigate("/");
  };

  return (
    <main className="relative flex max-h-screen w-screen select-none justify-start">
      <section className="relative flex h-screen w-1/2 items-center justify-center bg-Grey-fourth text-primary-first">
        <img src={background} alt="" className="absolute h-full w-full" />
        <img
          src={mainlogo}
          alt=""
          className="absolute left-9 top-3 select-none"
        />
        <div className="flex items-end gap-5 text-center text-4xl font-bold">
          <p className="flex flex-col">
            <span className="pl-16">Log in</span>
            <span> Get your team </span>
          </p>
          <p className="max-w-fit animate-typing overflow-hidden border-r-4 border-r-black text-[40px] font-bold">
            Faster
          </p>
        </div>
      </section>
      <section className="flex w-1/2 flex-col items-center justify-start p-7 pt-4">
        <div className="flex w-full items-center justify-between">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
          <p className="font-bold text-[#6679BE]">
            Don't Have An Account ?{" "}
            <Link
              to={"/signup"}
              className="pl-1 text-primary-first underline decoration-2 underline-offset-4"
            >
              sign up
            </Link>
          </p>
        </div>
        <div className="flex w-full flex-col items-center px-16 pt-5 font-bold">
          <h1 className="text-[32px] text-primary-first">Welcome Back</h1>
          <p className="text-[14px] text-[#6679BE]">
            log in to Be Attached with your team
            <hr className="m-2 h-[2px] w-[calc(100%-2rem)] bg-[#6679BE]" />
          </p>
          <div className="mt-8 flex w-full cursor-pointer items-center justify-center gap-[10px] rounded-[8px] border-[1px] border-solid border-primary-first px-[83px] py-[7px] text-primary-first duration-300 hover:bg-primary-first hover:text-primary-fourth">
            <img src={googleIcon} alt="" />
            <p>Log in with Google</p>
          </div>
          <p className="mt-2 text-[13px] text-Grey-third">
            Or use your Email to Log in
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-5"
          >
            <label htmlFor="email" className="relative">
              <span className="ml-1 text-primary-first">Email</span>
              <svg
                className={`absolute left-3 top-[42px] ${watch().email ? "hidden" : ""} transition-all`}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="Grey-third "
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.95 3.684L8.637 8.912C8.45761 9.06063 8.23196 9.14196 7.999 9.14196C7.76604 9.14196 7.54039 9.06063 7.361 8.912L1.051 3.684C1.01714 3.78591 0.999922 3.89261 1 4V12C1 12.2652 1.10536 12.5196 1.29289 12.7071C1.48043 12.8946 1.73478 13 2 13H14C14.2652 13 14.5196 12.8946 14.7071 12.7071C14.8946 12.5196 15 12.2652 15 12V4C15.0004 3.89267 14.9835 3.78597 14.95 3.684ZM2 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V12C16 12.5304 15.7893 13.0391 15.4142 13.4142C15.0391 13.7893 14.5304 14 14 14H2C1.46957 14 0.960859 13.7893 0.585786 13.4142C0.210714 13.0391 0 12.5304 0 12V4C0 3.46957 0.210714 2.96086 0.585786 2.58579C0.960859 2.21071 1.46957 2 2 2ZM1.79 3L7.366 7.603C7.54459 7.7505 7.76884 7.83144 8.00046 7.83199C8.23209 7.83254 8.45672 7.75266 8.636 7.606L14.268 3H1.79Z"
                  fill="#95A3D5"
                />
              </svg>
              <input
                autoComplete="false"
                id="email"
                type="text"
                {...register("email", {
                  required: "required",
                })}
                placeholder="Email"
                className="h-[52px] w-full rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] px-[13px] py-[14px] outline-none placeholder:pl-6 placeholder:text-sm placeholder:text-Grey-third"
              />
            </label>
            <label htmlFor="password" className="relative">
              <span className="ml-1 text-primary-first">Password</span>
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
                autoComplete="false"
                type="password"
                id="password"
                {...register("password", {
                  required: "required",
                })}
                placeholder="password"
                className="h-[52px] w-full rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] px-[13px] py-[14px] outline-none placeholder:pl-6 placeholder:text-sm placeholder:text-Grey-third"
              />
            </label>

            <div className="flex items-center justify-between text-[#6694FF]">
              <label
                htmlFor="remember"
                className="flex cursor-pointer items-center"
              >
                <input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  className="peer relative h-4 w-4 cursor-pointer appearance-none rounded-[4px] border border-gray-300 transition duration-200 checked:border-primary-first checked:bg-primary-first focus:outline-none"
                />
                <span className="ml-2 text-sm peer-checked:text-primary-first">
                  Remember me
                </span>
              </label>
              <Link to={"/forgetPassword"} className="text-sm hover:underline">
                Forget Password?
              </Link>
            </div>
            <button
              type="submit"
              className="h-[39px] rounded-[8px] bg-primary-first py-[7px] text-primary-fourth hover:bg-gradient-to-r hover:from-[#001354] hover:to-[#002ABA]"
            >
              Log in
            </button>
          </form>
        </div>
        <div className="mt-10 flex gap-2 text-center font-bold text-primary-first">
          <p className="">created by scrow team</p>
          <Link to={"/contact"} className="text-Grey-first underline">
            contact us
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Login;
