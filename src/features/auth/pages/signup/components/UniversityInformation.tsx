import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { universityInformationSchema } from "@/schema/signup";
import { TuniversityInformation } from "@/types";

const UniversityInformation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TuniversityInformation>({
    resolver: zodResolver(universityInformationSchema),
  });

  const onSubmit = async (data: TuniversityInformation) => {
    console.log(data);
  };

  console.log(errors);

  return (
    <section className="flex w-[calc(100%-5rem)] flex-grow flex-col items-center px-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center gap-7"
      >
        <label htmlFor="university" className="relative w-full">
          <span className="ml-2 text-primary-first">University</span>
          <input
            autoComplete="false"
            id="email"
            type="text"
            {...register("university", {
              required: "required",
            })}
            placeholder="university"
            className={`h-[52px] w-full rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] px-[13px] py-[14px] outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-Grey-third`}
          />
        </label>

        <label htmlFor="college" className="relative w-full">
          <span className="ml-2 text-primary-first">College</span>

          <input
            autoComplete="false"
            id="college"
            type="text"
            {...register("college", {
              required: "required",
            })}
            placeholder="college"
            className={`h-[52px] w-full rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] px-[13px] py-[14px] outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-Grey-third`}
          />
        </label>

        <label htmlFor="level" className="relative w-full">
          <span className="ml-2 text-primary-first">Level</span>

          <input
            autoComplete="false"
            id="level"
            type="text"
            {...register("level", {
              required: "required",
            })}
            placeholder="level"
            className={`h-[52px] w-full rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] px-[13px] py-[14px] outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-Grey-third`}
          />
        </label>

        <label htmlFor="department" className="relative w-full">
          <span className="ml-2 text-primary-first">Department</span>

          <input
            autoComplete="false"
            id="department"
            type="text"
            {...register("department", {
              required: "required",
            })}
            placeholder="department"
            className={`h-[52px] w-full rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] px-[13px] py-[14px] outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-Grey-third`}
          />
        </label>

        <label htmlFor="universityEmail" className="relative w-full">
          <span className="ml-2 text-primary-first">University Email</span>

          <input
            autoComplete="false"
            id="universityEmail"
            type="text"
            {...register("universityEmail", {
              required: "required",
            })}
            placeholder={
              errors.universityEmail
                ? "eg: ugs.1234@ci.suez.edu.eg"
                : "University Email"
            }
            className={`h-[52px] w-full rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] px-[13px] py-[14px] outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-Grey-third ${errors.universityEmail ? "border-red-500" : ""} `}
          />
        </label>
        <div className="mt-10 flex w-full gap-20">
          <button
            type="submit"
            className="flex h-[39px] w-full items-center justify-center gap-2 rounded-[8px] bg-primary-second py-[7px] text-primary-fourth duration-500 hover:bg-primary-first"
          >
            Prev Step
          </button>

          <button
            type="submit"
            className="flex h-[39px] w-full items-center justify-center gap-2 rounded-[8px] bg-primary-second py-[7px] text-primary-fourth duration-500 hover:bg-primary-first"
          >
            Next Step
            <svg
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.833008 7.5H14.1663M14.1663 7.5L8.16634 1.5M14.1663 7.5L8.16634 13.5"
                stroke="white"
                stroke-width="2"
              />
            </svg>
          </button>
        </div>
      </form>
    </section>
  );
};

export default UniversityInformation;
