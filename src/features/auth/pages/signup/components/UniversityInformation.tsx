import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { universityInformationSchema } from "@/schema/signup";
import { TuniversityInformation } from "@/types";
import { signup } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";

const UniversityInformation = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TuniversityInformation>({
    resolver: zodResolver(universityInformationSchema),
  });

  const onSubmit = async (data: TuniversityInformation) => {
    dispatch(
      signup({
        UniversityInformation: data,
      }),
    );
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
          <select
            id="university"
            className={`h-[52px] w-full rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] px-[13px] py-[14px] outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-Grey-third`}
            {...register("university")}
          >
            <option value="Suez canal university">Suez Canal University</option>
          </select>
        </label>
        <label htmlFor="college" className="relative w-full">
          <span className="ml-2 text-primary-first">College</span>
          <select
            id="collage"
            {...register("college", {
              required: "required",
            })}
            className={`h-[52px] w-full rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] px-[13px] py-[14px] outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-Grey-third`}
          >
            <option value="computer and information">
              Computers and Informatics
            </option>
          </select>
        </label>
        <label htmlFor="level" className="relative w-full">
          <span className="ml-2 text-primary-first">Level</span>
          <select
            defaultValue="1"
            id="level"
            {...register("level", {
              valueAsNumber: true,
            })}
            className={`h-[52px] w-full rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] px-[13px] py-[14px] outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-Grey-third`}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </label>
        <label htmlFor="department" className="relative w-full">
          <span className="ml-2 text-primary-first">Department</span>
          <select
            id="department"
            {...register("department", {})}
            className={`h-[52px] w-full rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] px-[13px] py-[14px] outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-Grey-third`}
          >
            <option value="general">General</option>
            <option value="bio">BioInformatics</option>
            <option value="soft">Software</option>
            <option value="CS">Computer Science </option>
            <option value="is">Information Systems</option>
            <option value="ai">Artificial Inteligence</option>
          </select>
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
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
      </form>
    </section>
  );
};

export default UniversityInformation;
