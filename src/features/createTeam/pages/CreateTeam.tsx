import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

import { useCreateTeamMutation, useGetTracksQuery } from "../api/createTeamAPI";

import { useRef } from "react";

import { TCreateTeamData } from "@/types";
import { useAppSelector } from "@/store/hooks";
import { Ttracks } from "@/types/auth";

import background from "/src/assets/create/create.png";
import Track from "../components/Track";

import { zodResolver } from "@hookform/resolvers/zod";
import { createTeamSchema } from "@/schema";

import "../index.css";

const CreateTeam = () => {
  const user = useAppSelector((state) => state.auth.user);

  const [createTeam] = useCreateTeamMutation();
  const { data: tracks } = useGetTracksQuery();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<TCreateTeamData>({
    shouldUnregister: true,
    resolver: zodResolver(createTeamSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "teamMembers",
  });

  const handleTrackNeeds = (index: number, value: number): void => {
    setValue(`requirement.${index}.number`, value);
  };

  const teamMembers = watch("teamMembers");
  const isLastMemberFilled = teamMembers?.length
    ? teamMembers[teamMembers.length - 1]?.arabicName?.trim() &&
      teamMembers[teamMembers.length - 1]?.username?.trim()
    : true;

  const addingButton = useRef<HTMLButtonElement>(null);
  const onSubmit: SubmitHandler<TCreateTeamData> = (data) => {
    const requirements = getValues()
      .requirement.filter((e) => e.trackID)
      .map((e) => [...Array(e.number).fill(e.trackID)])
      .flat();
    data = {
      ...data,
      category: getValues("category"),
      // @ts-expect-error ok to use
      teamMembers: data.teamMembers.map((e) => e.username),
      requirement: requirements,
    };
    if (user?.token) createTeam({ data, token: user?.token });
  };

  return (
    <main className="max-w-screen relative flex select-none justify-start overflow-hidden">
      <section className="relative hidden max-h-[1400px] flex-col items-start justify-center bg-Grey-fourth text-primary-first lg:flex">
        <img src={background} alt="" className="" />
        <img src={background} alt="" className="bg-Grey-fourth" />
      </section>
      <section className="flex w-1/2 flex-grow flex-col items-center justify-start px-5 py-0 font-bold">
        <h1 className="mt-5 text-[32px] text-primary-first">إنشاء تيم</h1>
        <p className="flex flex-col items-center text-[14px] text-[#6679BE]">
          املأ البيانات التالية و انشئ تيمك الان
          <span className="m-2 h-[1px] w-[calc(100%+2rem)] bg-[#6679BE]"></span>
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 flex w-full flex-col items-start"
        >
          <div className="w-full">
            <h2 dir="rtl" className="text-[20px] text-primary-first">
              1. تعيين تفاصيل المشروع
            </h2>
            <div
              dir="rtl"
              className="mb-5 mt-5 flex flex-wrap items-center justify-start gap-4"
            >
              <label
                dir="rtl"
                htmlFor="projectArabicName"
                className="relative w-[285px] text-sm md:w-[329px]"
              >
                <span className="mr-1 text-primary-first">
                  اسم المشروع باللغه العربية
                </span>
                <input
                  autoComplete="false"
                  id="projectArabicName"
                  type="text"
                  {...register("projectArabicName", {
                    required: "required",
                  })}
                  placeholder=" اسم المشروع باللغه العربية هنا"
                  className={`mt-2 h-[52px] w-[285px] rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] py-[14px] pr-2 outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-[#95A3D5] md:w-[329px] ${errors.projectArabicName ? "border-red-500" : ""} `}
                />
              </label>

              <label
                dir="rtl"
                htmlFor="projectEnglishName"
                className="relative w-[285px] text-sm md:w-[329px]"
              >
                <span className="mr-1 text-primary-first">
                  اسم المشروع باللغه الانجليزية
                </span>
                <input
                  autoComplete="false"
                  id="projectEnglishName"
                  type="text"
                  {...register("projectEnglishName", {
                    required: "required",
                  })}
                  placeholder="اسم المشروع باللغه الانجليزية"
                  className={`mt-2 h-[52px] w-[285px] rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] py-[14px] pr-2 outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-[#95A3D5] md:w-[329px] ${errors.projectEnglishName ? "border-red-500" : ""} `}
                />
              </label>

              <label
                dir="rtl"
                htmlFor="projectCategorie"
                className="relative w-[285px] text-sm md:w-[329px]"
              >
                <span className="ml-1 text-primary-first">تصنيف المشروع</span>

                <select
                  autoComplete="false"
                  id="projectCategorie"
                  {...register("category", {
                    required: "required",
                  })}
                  className={`mt-2 h-[52px] w-[285px] rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] py-[14px] pr-2 outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-[#95A3D5] md:w-[329px] ${errors.category ? "border-red-500" : ""} `}
                >
                  <option value="medical">medical</option>
                  {/* <option value="2">2</option> */}
                </select>
              </label>
            </div>
            <div dir="rtl">
              <label
                htmlFor="projectDescription"
                className="relative h-40 w-full"
              >
                <span className="mr-2 text-primary-first">وصف المشروع</span>
                <textarea
                  autoComplete="false"
                  id="projectDescription"
                  {...register("projectDescription", {
                    required: "required",
                  })}
                  placeholder="اكتب وصف مشروعك هنا .... مثال: فكرة المشروع واهدافه والاسباب والمشاكل والحلول"
                  className={`mt-2 h-[163px] max-h-[250px] min-h-[100px] w-full rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] px-[13px] py-[14px] outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-Grey-third lg:max-h-[180px] ${errors.projectDescription ? "border-red-500" : ""} `}
                ></textarea>
              </label>
            </div>
          </div>
          <span className="my-5 h-[1px] w-[calc(100%-5rem)] place-self-center bg-[#BCBCBC]"></span>
          <div dir="rtl" className="w-full">
            <div>
              <h2 className="flex items-end gap-2 text-[20px] text-primary-first">
                2. تحديد متطلبات التيم
                <span className="mr-1 text-[12px] font-[600] text-[#5D6A93]">
                  قم بادخال ما تريد من التراكات بما سيخص مشروعك
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
                      <span className="ml-3 flex h-4 w-4 items-center justify-center rounded border border-primary-first bg-white peer-checked:bg-primary-first">
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
          <span className="my-5 h-[1px] w-[calc(100%-5rem)] place-self-center bg-[#BCBCBC]"></span>
          <section
            dir="rtl"
            className="flex w-full flex-col items-start justify-start"
          >
            <h2 className="text-[20px] text-primary-first">
              3.اضافة اعضاء التيم
            </h2>
            <div
              dir="rtl"
              className="mb-5 mt-5 flex flex-wrap items-center justify-start gap-4"
            >
              <label
                dir="rtl"
                className="relative w-[285px] text-sm font-[500] md:w-[329px]"
              >
                <span className="mr-1 text-primary-first">العضو الأول</span>
                <input
                  type="text"
                  disabled
                  value={user.fullName!}
                  className={`mt-2 h-[52px] w-[285px] rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] py-[14px] pr-2 outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-[#95A3D5] md:w-[329px]`}
                />
              </label>
              <label
                dir="rtl"
                className="relative w-[285px] text-sm font-[500] md:w-[329px]"
              >
                <span className="mr-1 text-primary-first">
                  اسم المستخدم علي سكرو
                </span>
                <input
                  type="text"
                  disabled
                  value={user.username!}
                  className={`mt-2 h-[52px] w-[285px] rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] py-[14px] pr-2 outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-[#95A3D5] md:w-[329px]`}
                />
              </label>
              <p className="flex w-fit flex-col items-start font-[600]">
                <span className="text-primary-first"> لاحظ :</span>
                <span className="text-[#5D6A93]">
                  العضو الأول هو المسوؤل عن التيم
                </span>
                <span className="text-[#A0A1A3]">
                  يمكنك تغيير المسوؤل لاحقا
                </span>
              </p>
            </div>
            <div className="mb-5 mt-5 w-full">
              {fields.map((field, index) => (
                <div
                  key={field.username}
                  className="relative m-2 flex flex-row flex-wrap gap-4 p-1"
                >
                  <label
                    htmlFor="teamMembers"
                    className="relative w-[285px] text-sm font-[500] md:w-[329px]"
                  >
                    {index === fields.length - 1 && (
                      <span className="mr-1 text-primary-first">
                        {index == 0
                          ? "العضو الثاني"
                          : index == 1
                            ? "العضو الثالث"
                            : index == 2
                              ? "العضو الرابع"
                              : index == 3
                                ? "العضو الخامس"
                                : index == 4
                                  ? "العضو السادس"
                                  : index == 5
                                    ? "العضو السابع"
                                    : "العضو الثامن"}
                      </span>
                    )}
                    <input
                      id="teamMembers"
                      type="text"
                      {...register(`teamMembers.${index}.arabicName`, {
                        required: true,
                      })}
                      disabled={fields.length > index + 1}
                      placeholder="  يرجي ادخال الاسم رباعي "
                      className={`mt-2 h-[52px] w-[285px] rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] py-[14px] pr-2 text-[18px] text-primary-first outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-[#95A3D5] disabled:border-none md:w-[329px]`}
                    />
                  </label>
                  <label
                    key={field.id}
                    htmlFor="teamMembers"
                    className="relative w-[285px] text-sm font-[500] md:w-[329px]"
                  >
                    {index === fields.length - 1 && (
                      <span className="mr-1 text-primary-first">
                        اسم المستخدم علي سكرو
                      </span>
                    )}
                    <input
                      dir="ltr"
                      id="teamMembers"
                      type="text"
                      {...register(`teamMembers.${index}.username`, {
                        required: true,
                      })}
                      disabled={fields.length > index + 1}
                      placeholder="@example"
                      className={`mt-2 h-[52px] w-[285px] rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] py-[14px] pl-2 text-[18px] text-primary-first outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-[#95A3D5] disabled:border-none md:w-[329px]`}
                    />
                  </label>
                  <svg
                    onClick={() => remove(index)}
                    className="cursor-pointer self-center"
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
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <button
                ref={addingButton}
                onClick={() =>
                  append({
                    arabicName: "",
                    username: "",
                  })
                }
                type="button"
                disabled={fields.length >= 7 || !isLastMemberFilled}
                className={`flex h-[50px] w-[132px] items-center justify-center gap-[6px] text-nowrap rounded-[10px] bg-primary-third p-[10px] text-primary-fourth disabled:bg-[#5D6A93]`}
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="primary-third"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12.5" cy="12.5" r="12.5" fill="white" />
                  <path
                    d="M19.7913 13.5413H13.5413V19.7913H11.458V13.5413H5.20801V11.458H11.458V5.20801H13.5413V11.458H19.7913V13.5413Z"
                    fill="#6694FF"
                  />
                </svg>
                اضافة عضو
              </button>
              <p className="flex w-fit flex-col items-start font-[600]">
                <span className="text-primary-first"> لاحظ :</span>
                <span className="text-[#5D6A93]">
                  عدد الطلاب لا يزيد عن 8 ولا يقل عن 5
                </span>
                <span className="font-[700] text-[#5D6A93]">
                  يمكنك اضافة اقل من ذلك في حالة ان التيم ليس مكتمل
                </span>
              </p>
            </div>
          </section>
          <span className="my-5 h-[1px] w-[calc(100%-5rem)] place-self-center bg-[#BCBCBC]"></span>
          <section
            dir="rtl"
            className="mb-5 mt-5 flex w-full flex-wrap gap-4 place-self-start"
          >
            <h2 className="text-[20px] text-primary-first">
              4.اضافة المشرفين علي المشروع
            </h2>
            <div className="mr-2 mt-1 flex w-full flex-wrap gap-4 place-self-start">
              <label
                dir="rtl"
                className="relative w-[285px] text-sm font-[500] md:w-[329px]"
              >
                <span className="mr-1 text-primary-first">
                  اسم المشرف الرئيسي ( عضو هيئة التدريس )
                </span>
                <input
                  type="text"
                  {...register("supervisor", {
                    required: true,
                  })}
                  placeholder="اسم المشرف الرئيسي هنا"
                  className={`mt-2 h-[52px] w-[285px] rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] py-[14px] pr-2 text-[20px] text-primary-first outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-[#95A3D5] md:w-[329px] ${errors.supervisor ? "border-red-500" : ""} `}
                />
                <span className="text-xs font-[500] text-[#5D6A93]">
                  اختياري اذا لم تحدد المشرف الرئيسي
                </span>
              </label>
              <label
                dir="rtl"
                className="relative w-[285px] text-sm font-[500] md:w-[329px]"
              >
                <span className="mr-1 text-primary-first">
                  اسم المشرف المساعد ( معيد أو مدرس مساعد )
                </span>
                <input
                  type="text"
                  {...register("assistantSupervisor", {
                    required: true,
                  })}
                  placeholder="اسم المشرف المساعد هنا"
                  className={`mt-2 h-[52px] w-[285px] rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] py-[14px] pr-2 text-[20px] text-primary-first outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-[#95A3D5] md:w-[329px] ${errors.assistantSupervisor ? "border-red-500" : ""} `}
                />
                <span className="text-xs font-[500] text-[#5D6A93]">
                  اختياري اذا لم تحدد المشرف المساعد
                </span>
              </label>
            </div>
          </section>
          <button
            type="submit"
            className="my-10 h-[49px] w-[calc(70%)] place-self-center text-nowrap rounded-[8px] bg-[#002ABA] text-primary-fourth duration-500 hover:bg-primary-first"
          >
            انشاء التيم
          </button>
        </form>
      </section>
    </main>
  );
};

export default CreateTeam;
