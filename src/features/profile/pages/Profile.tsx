import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfileSchema } from "@/schema/index.ts";
import { TEditProfileData } from "@/types/index.ts";

import { useAppSelector } from "@/store/hooks.ts";
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "../api/profileAPI.ts";

import avialableIocn from "@/assets/global/available.svg";
import notavialableIocn from "@/assets/global/notAvailable.svg";
import editIcon from "@/assets/profile/edit.svg";
import linkedinIcon from "@/assets/global/linkedin.svg";
import behanceIcon from "@/assets/global/behance.svg";
import githubIcon from "@/assets/global/github.svg";

import LoadingDialog from "../components/LoadingDialog.tsx";

const Profile = () => {
  const token = useAppSelector((state) => state.auth.user.token);

  const { id } = useParams();
  const { pathname } = useLocation();

  const [section, setSection] = useState<1 | 2>(1);
  const [editMode, setEditMode] = useState<boolean>(false);

  const { data, isLoading } = useGetMyProfileQuery({
    token: token!,
    id,
  });
  const [updateMyProfile] = useUpdateMyProfileMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TEditProfileData>({
    shouldUnregister: true,
    resolver: zodResolver(editProfileSchema),
  });

  const onSubmit: SubmitHandler<TEditProfileData> = (data) => {
    updateMyProfile({ token: token!, id, data });
    setEditMode(false);
  };

  useEffect(() => {
    if (!isLoading && data) {
      if (data.contact) {
        setValue("linkedin", data.contact.linkedin!);
        setValue("github", data.contact.github!);
        setValue("behance", data.contact.behance!);
      }
      setValue("arabicName", data.user.fullName);
    }
  }, [isLoading, data, setValue]);

  return (
    <>
      {isLoading && <LoadingDialog />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        dir="rtl"
        className="flex w-full flex-col gap-3 px-20 pt-16"
      >
        <section className="flex w-full justify-between">
          <div className="flex gap-5">
            <div className="flex flex-col items-center">
              <img
                src="/src/assets/global/userProfileIcon.png"
                alt=""
                className="h-[147px] w-[156px] rounded-[8px]"
              />
              {data?.team ? (
                <p className="mt-1 flex gap-2">
                  <img src={avialableIocn} alt="" />
                  <span className="font-medium text-green-600">
                    {" "}
                    منضم الي تيم
                  </span>
                </p>
              ) : (
                <p className="mt-1 flex gap-2">
                  <img src={notavialableIocn} alt="" />
                  <span className="font-medium text-red-600">
                    لم تنضم الي تيم
                  </span>
                </p>
              )}
            </div>
            <div>
              <h1 className="text-[20px] font-medium text-primary-first">
                {data?.user.fullName}
              </h1>
              <p className="text-[15px] text-[#5D6A93]">
                {data?.user.Username}
              </p>
              <p className="mt-2 text-[20px] font-semibold text-[#6694FF]">
                {data?.myTrack[0]}
              </p>
              <p className="text-base font-semibold">المهارات</p>
              <div className="flex flex-wrap gap-3">
                {data?.mySkills.map((skill) => (
                  <div
                    key={skill}
                    className={`relative flex h-[40px] w-fit items-center text-nowrap rounded-[8px] border border-[#407BFF] bg-[#E1EBFF] p-[10px] text-sm lowercase text-[#407BFF]`}
                  >
                    <input type="checkbox" className="hidden" />
                    <label className="relative flex flex-1 cursor-pointer items-center pl-1">
                      {skill}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {pathname === "/myProfile" && (
            <>
              {editMode ? (
                <button
                  type="submit"
                  className="flex h-[37px] w-[101px] items-center justify-center gap-2 rounded-[8px] border-[1px] border-solid bg-primary-first text-[15px] text-white"
                >
                  حفظ
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="flex h-[37px] w-[101px] items-center justify-center gap-2 rounded-[8px] border-[1px] border-solid border-primary-first text-[15px]"
                >
                  <img src={editIcon} alt="edit" className="size-[19px]" />
                  تعديل
                </button>
              )}
            </>
          )}
        </section>
        <div className="mr-2 flex gap-14 text-primary-first">
          <button
            onClick={() => setSection(1)}
            className={`text-[20px] font-semibold decoration-primary-second decoration-2 underline-offset-[18px] duration-100 ${section === 1 && "text-[#407BFF] underline"} `}
          >
            البيانات الشخصية
          </button>
          <button
            onClick={() => setSection(2)}
            className={`text-[20px] font-semibold decoration-primary-second decoration-2 underline-offset-[18px] duration-100 ${section === 2 && "text-[#407BFF] underline"} `}
          >
            البيانات الجامعية
          </button>
        </div>
        {section === 1 ? (
          <section className="rounded-[10px] border border-Grey-first p-4">
            <p className="flex items-center gap-1 font-semibold text-[#407BFF]">
              <svg
                width="13"
                height="14"
                viewBox="0 0 13 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.875 5.125H7.125V3.875H5.875M6.5 12C3.74375 12 1.5 9.75625 1.5 7C1.5 4.24375 3.74375 2 6.5 2C9.25625 2 11.5 4.24375 11.5 7C11.5 9.75625 9.25625 12 6.5 12ZM6.5 0.75C5.67924 0.75 4.86651 0.911661 4.10823 1.22575C3.34994 1.53984 2.66095 2.00022 2.08058 2.58058C0.90848 3.75269 0.25 5.3424 0.25 7C0.25 8.6576 0.90848 10.2473 2.08058 11.4194C2.66095 11.9998 3.34994 12.4602 4.10823 12.7742C4.86651 13.0883 5.67924 13.25 6.5 13.25C8.1576 13.25 9.74732 12.5915 10.9194 11.4194C12.0915 10.2473 12.75 8.6576 12.75 7C12.75 6.17924 12.5883 5.36651 12.2742 4.60823C11.9602 3.84994 11.4998 3.16095 10.9194 2.58058C10.3391 2.00022 9.65006 1.53984 8.89177 1.22575C8.13349 0.911661 7.32076 0.75 6.5 0.75ZM5.875 10.125H7.125V6.375H5.875V10.125Z"
                  fill="#407BFF"
                />
              </svg>
              نبذة عن
            </p>
            <div className="mr-3 mt-3 w-[367px] rounded-[8px] border border-[#95A3D5] px-[14px] py-[9px] font-medium text-[#5D6A93]">
              no data from backend
            </div>
            <p className="mt-6 font-semibold text-[#407BFF]">تواصل مع</p>

            <div className="mt-2 flex flex-col gap-5">
              <div className="flex items-center gap-1">
                <img src={linkedinIcon} alt="" />
                {editMode ? (
                  <input
                    type="text"
                    {...register("linkedin", {
                      required: true,
                    })}
                    dir="ltr"
                    placeholder="Linkedin account"
                    className={`mt-2 h-[52px] w-[285px] rounded-[8px] border-solid border-[#B4B4B4] bg-[#F9F9F9] py-[14px] pl-2 text-[20px] text-primary-first outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-[#95A3D5] md:w-[329px] ${errors.linkedin ? "border-red-500" : ""} `}
                  />
                ) : (
                  <>
                    {data?.contact?.linkedin ? (
                      <a
                        href={`https://linkedin.com/in/${data?.contact?.linkedin}`}
                        className="cursor-pointer font-semibold text-[#5D6A93] hover:text-primary-second"
                      >
                        {data?.contact?.linkedin}
                      </a>
                    ) : (
                      "not provided"
                    )}
                  </>
                )}
              </div>
              <div className="flex items-center gap-1">
                <img src={githubIcon} alt="github" />
                {editMode ? (
                  <input
                    type="text"
                    {...register("github", {
                      required: true,
                    })}
                    dir="ltr"
                    placeholder="github account"
                    className={`mt-2 h-[52px] w-[285px] rounded-[8px] border-solid border-[#B4B4B4] bg-[#F9F9F9] py-[14px] pl-2 text-[20px] text-primary-first outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-[#95A3D5] md:w-[329px] ${errors.github ? "border-red-500" : ""} `}
                  />
                ) : (
                  <>
                    {data?.contact?.github ? (
                      <a
                        href={`https://github.com/${data?.contact?.github}`}
                        className="cursor-pointer font-semibold text-[#5D6A93] hover:text-primary-second"
                      >
                        {data?.contact?.github}
                      </a>
                    ) : (
                      "not provided"
                    )}
                  </>
                )}
              </div>
              <div className="flex items-center gap-1">
                <img src={behanceIcon} alt="" />
                {editMode ? (
                  <input
                    type="text"
                    {...register("behance", {
                      required: true,
                    })}
                    dir="ltr"
                    placeholder="behance account"
                    className={`mt-2 h-[52px] w-[285px] rounded-[8px] border-solid border-[#B4B4B4] bg-[#F9F9F9] py-[14px] pl-2 text-[20px] text-primary-first outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-[#95A3D5] md:w-[329px] ${errors.behance ? "border-red-500" : ""} `}
                  />
                ) : (
                  <>
                    {data?.contact?.behance ? (
                      <a
                        href={`https://behance.net/${data?.contact?.behance}`}
                        className="cursor-pointer font-semibold text-[#5D6A93] hover:text-primary-second"
                      >
                        {data?.contact?.behance}
                      </a>
                    ) : (
                      "not provided"
                    )}
                  </>
                )}
              </div>
            </div>
          </section>
        ) : (
          <section className="flex flex-row gap-10 rounded-[10px] border border-Grey-first p-4 pb-16 text-primary-first">
            <div>
              <p className="flex flex-col gap-1">
                <span>الجامعة </span>
                <span className="text-[#5D6A93]">{data?.university}</span>
              </p>
              <p className="mt-8 flex flex-col gap-1">
                <span>الكلية</span>
                <span className="text-[#5D6A93]"> {data?.college}</span>
              </p>
            </div>
            <div>
              <p className="flex flex-col gap-1">
                <span>المرحلة</span>
                <span className="text-[#5D6A93]">{data?.level}</span>
              </p>
              <p className="mt-8 flex flex-col gap-1">
                <span>القسم</span>
                <span className="text-[#5D6A93]"> {data?.department}</span>
              </p>
            </div>
          </section>
        )}
      </form>
    </>
  );
};

export default Profile;
