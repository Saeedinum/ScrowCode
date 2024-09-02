import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

import { useCreateTeamMutation, useGetTracksQuery } from "../api/createTeamAPI";

import { TCreateTeamData } from "@/types";
import { useAppSelector } from "@/store/hooks";
import { Link } from "react-router-dom";
import { Ttracks } from "@/types/auth";

import background from "/src/assets/create.png";
import mainlogo from "/src/assets/MainLogo.svg";

import "../index.css";
import Track from "../components/Track";

const CreateTeam = () => {
  const user = useAppSelector((state) => state.auth.user);

  const [createTeam] = useCreateTeamMutation();
  const { data: tracks } = useGetTracksQuery();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TCreateTeamData>({
    shouldUnregister: true,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    //@ts-expect-error  can't see what's wrong here , while I'am using teamMembers TS ecpect requirement
    name: "teamMembers",
  });
  const onSubmit: SubmitHandler<TCreateTeamData> = (data) => {
    console.log(data);
    if (user?.token) createTeam({ data, token: user?.token });
  };

  const handleTrackNeeds = (
    index: number,
    value: number,
    teck: string,
  ): void => {
    setValue(`requirement.${index}.number`, value);
    setValue(`requirement.${index}.tech`, teck);
  };

  return (
    <main className="relative flex select-none justify-start">
      <section className="relative flex items-center justify-center bg-Grey-fourth text-primary-first">
        <img src={background} alt="" className="" />
        <img
          src={mainlogo}
          alt=""
          className="absolute left-9 top-3 w-16 select-none"
        />
        <div className="absolute bottom-10 flex flex-col gap-1 text-center font-bold text-primary-first">
          <p className="">created by scrow team</p>
          <Link to={"/contact"} className="text-Grey-first underline">
            contact us
          </Link>
        </div>
      </section>
      <section className="flex w-1/2 flex-grow flex-col items-center justify-start px-16 py-0 font-bold">
        <h1 className="mt-5 text-[32px] text-primary-first">Create Team</h1>
        <p className="flex flex-col items-center text-[14px] text-[#6679BE]">
          Create your team and Complete it Now !
          <span className="m-2 h-[1px] w-[calc(100%+2rem)] bg-[#6679BE]"></span>
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 flex w-full flex-col items-start"
        >
          <div className="w-full">
            <h2 className="text-[20px] text-primary-first">
              1.Set Your Project Details{" "}
            </h2>
            <div className="mb-5 mt-5 flex items-center justify-between gap-5">
              <label htmlFor="projectName" className="relative w-full">
                <span className="ml-1 text-primary-first">Project name</span>
                <input
                  autoComplete="false"
                  id="projectName"
                  type="text"
                  {...register("projectName", {
                    required: "required",
                  })}
                  placeholder="Project name"
                  className={`h-[52px] w-full rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] py-[14px] pl-2 outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-Grey-third ${errors.projectName ? "border-red-500" : ""} `}
                />
              </label>

              <label htmlFor="projectCategorie" className="relative w-full">
                <span className="ml-1 text-primary-first">
                  Project Categorie
                </span>

                <select
                  autoComplete="false"
                  id="projectCategorie"
                  {...register("projectCategorie", {
                    required: "required",
                  })}
                  className={`h-[52px] w-full rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] py-[14px] pl-2 outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-Grey-third`}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </label>
            </div>
            <label
              htmlFor="projectDescription"
              className="relative h-40 w-full"
            >
              <span className="ml-2 text-primary-first">
                Project Description
              </span>
              <textarea
                autoComplete="false"
                id="projectDescription"
                {...register("projectDescription", {
                  required: "required",
                })}
                placeholder="Project Description"
                className={`h-[163px] max-h-[180px] min-h-[100px] w-full rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] px-[13px] py-[14px] outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-Grey-third ${errors.projectDescription ? "border-red-500" : ""} `}
              ></textarea>
            </label>
          </div>
          <span className="my-5 h-[1px] w-[calc(100%+3rem)] place-self-center bg-[#BCBCBC]"></span>
          <div className="w-full">
            <div>
              <h2 className="flex items-center text-[20px] text-primary-first">
                2. Select Team Requriments{" "}
                <svg
                  className="ml-7"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.20866 5.37533H6.79199V3.95866H8.20866M8.20866 11.042H6.79199V6.79199H8.20866M7.50033 0.416992C6.57013 0.416992 5.64904 0.600208 4.78965 0.956179C3.93026 1.31215 3.1494 1.8339 2.49165 2.49165C1.16327 3.82004 0.416992 5.62171 0.416992 7.50033C0.416992 9.37894 1.16327 11.1806 2.49165 12.509C3.1494 13.1667 3.93026 13.6885 4.78965 14.0445C5.64904 14.4004 6.57013 14.5837 7.50033 14.5837C9.37894 14.5837 11.1806 13.8374 12.509 12.509C13.8374 11.1806 14.5837 9.37894 14.5837 7.50033C14.5837 6.57013 14.4004 5.64904 14.0445 4.78965C13.6885 3.93026 13.1667 3.1494 12.509 2.49165C11.8512 1.8339 11.0704 1.31215 10.211 0.956179C9.35161 0.600208 8.43052 0.416992 7.50033 0.416992Z"
                    fill="#5D6A93"
                  />
                </svg>
                <span className="ml-1 text-[12px] text-[#5D6A93]">
                  The maximum number of members is 8
                </span>
              </h2>

              <div className="my-6 grid grid-cols-1 gap-5 text-nowrap sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {tracks?.map((track: Ttracks, index) => (
                  <div
                    key={track._id}
                    className="relative my-5 flex items-center"
                  >
                    <input
                      {...register(`requirement.${index}.trackID`)}
                      type="checkbox"
                      id={track.slug}
                      value={track._id}
                      className="peer hidden"
                    />
                    <label
                      htmlFor={track.slug}
                      className="relative flex cursor-pointer items-center text-primary-second"
                    >
                      <span className="mr-2 flex h-4 w-4 items-center justify-center rounded border border-primary-first bg-white peer-checked:bg-primary-first">
                        <svg
                          width="17"
                          height="12"
                          viewBox="0 0 17 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.7555 1.97467L6.25545 11.4747C6.17271 11.5577 6.07439 11.6236 5.96613 11.6685C5.85788 11.7135 5.74181 11.7366 5.62459 11.7366C5.50737 11.7366 5.39131 11.7135 5.28305 11.6685C5.17479 11.6236 5.07647 11.5577 4.99373 11.4747L0.837482 7.31842C0.754637 7.23557 0.68892 7.13722 0.644084 7.02898C0.599248 6.92074 0.576172 6.80472 0.576172 6.68756C0.576172 6.5704 0.599248 6.45438 0.644084 6.34614C0.68892 6.2379 0.754637 6.13955 0.837482 6.0567C0.920328 5.97386 1.01868 5.90814 1.12692 5.8633C1.23517 5.81847 1.35118 5.79539 1.46834 5.79539C1.5855 5.79539 1.70152 5.81847 1.80976 5.8633C1.918 5.90814 2.01636 5.97386 2.0992 6.0567L5.62533 9.58283L14.4952 0.714435C14.6625 0.547121 14.8895 0.453125 15.1261 0.453125C15.3627 0.453125 15.5896 0.547121 15.7569 0.714435C15.9243 0.88175 16.0182 1.10868 16.0182 1.3453C16.0182 1.58191 15.9243 1.80884 15.7569 1.97615L15.7555 1.97467Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      {track.name}
                    </label>

                    <Track
                      styles="hidden peer-checked:flex"
                      index={index}
                      handleNeeds={handleTrackNeeds}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <span className="my-5 h-[1px] w-[calc(100%+3rem)] place-self-center bg-[#BCBCBC]"></span>
          <div className="w-full">
            <div className="flex w-full items-center justify-between">
              <h2 className="text-[20px] text-primary-first">
                3.Add Team Members
              </h2>
              <button
                //@ts-expect-error  can't see what's wrong here , while I'am using teamMembers TS ecpect requirement
                onClick={() => append("")}
                type="button"
                disabled={fields.length >= 7}
                className="flex h-[45px] w-[93px] items-center justify-center gap-[6px] rounded-[20px] bg-primary-third p-[10px] text-primary-fourth"
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12.5" cy="12.5" r="12.5" fill="#6694FF" />
                  <path
                    d="M19.7913 13.5413H13.5413V19.7913H11.458V13.5413H5.20801V11.458H11.458V5.20801H13.5413V11.458H19.7913V13.5413Z"
                    fill="white"
                  />
                </svg>
                Add
              </button>
            </div>
            <div className="mb-5 mt-5 grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-2">
              {fields.map((field, index) => (
                <label
                  key={field.id}
                  htmlFor="teamMembers"
                  className="relative"
                >
                  <span className="ml-1 text-primary-first">Team member 1</span>
                  <input
                    autoComplete="off"
                    id="teamMembers"
                    type="text"
                    {...register(`teamMembers.${index}`)}
                    placeholder="@Saeed"
                    className={`h-[52px] w-full rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] py-[14px] pl-2 outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-Grey-third`}
                  />
                  <svg
                    onClick={() => remove(index)}
                    className="absolute right-4 top-10 cursor-pointer"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="9"
                      cy="9"
                      r="9"
                      className="hover:fill-red-600"
                      fill="#5D6A93"
                    />
                    <path
                      d="M14.3438 9.00063C14.3438 9.1707 14.2762 9.3338 14.1559 9.45406C14.0357 9.57431 13.8726 9.64188 13.7025 9.64188H4.2975C4.12743 9.64188 3.96433 9.57431 3.84407 9.45406C3.72381 9.3338 3.65625 9.1707 3.65625 9.00063C3.65625 8.83055 3.72381 8.66745 3.84407 8.54719C3.96433 8.42693 4.12743 8.35938 4.2975 8.35938H13.7025C13.8726 8.35938 14.0357 8.42693 14.1559 8.54719C14.2762 8.66745 14.3438 8.83055 14.3438 9.00063Z"
                      fill="white"
                    />
                  </svg>
                </label>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="mt-10 flex h-[52px] items-center justify-center gap-2 place-self-center rounded-[8px] bg-[#002ABA] px-52 text-primary-fourth duration-500 hover:bg-primary-first"
          >
            Create Team
          </button>
        </form>
      </section>
    </main>
  );
};

export default CreateTeam;
