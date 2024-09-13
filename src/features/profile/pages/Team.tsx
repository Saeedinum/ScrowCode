import { useForm, SubmitHandler } from "react-hook-form";

import SendDialog from "../components/SendDialog";
import FileUploadComponent from "../components/FileUploadComponent";

import editIcon from "@/assets/profile/edit.svg";
import menueIcon from "@/assets/profile/menu.svg";
import fileIcon from "@/assets/profile/file.svg";
import vectorIcon from "@/assets/profile/Vector.svg";
import uploadIcon from "@/assets/profile/upload.svg";
import avialableIocn from "@/assets/global/available.svg";
import sendIcon from "@/assets/profile/send.svg";
import waitingIocn from "@/assets/global/waiting.svg";
import notavialableIocn from "@/assets/global/notAvailable.svg";

import {
  useGetMyTeamQuery,
  useChooseLeaderMutation,
  useUpdateTeamMutation,
} from "../api/profileAPI";

import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { emptyTeam, TCreateTeamData, Tteam } from "@/types";

import "../index.css";
import { createTeamSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";

const Team = () => {
  const user = useAppSelector((state) => state.auth.user);

  const { data, error, isLoading } = useGetMyTeamQuery({ token: user.token });

  const [editMode, setEditMode] = useState<boolean>(false);
  const [team, setTeam] = useState<Tteam & { admin: boolean }>(emptyTeam);
  useEffect(() => {
    if (!isLoading && data) {
      setTeam(data);
    }
  }, [isLoading, data]);

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

  console.log(team);

  const onSubmit: SubmitHandler<TCreateTeamData> = (data) => {
    console.log(data);
  };

  return (
    <main dir="rtl" className="w-full px-20 pt-10">
      <section className="flex flex-col items-start">
        <h1 className="text-[29px] font-bold text-primary-first">
          التيم الخاص بي
        </h1>
        <div className="flex w-full justify-between">
          <p className="mr-2 flex items-center gap-2 text-[15px] font-normal text-[#FF0000]">
            {team.status === "available" && (
              <>
                <span className="text-nowrap text-[#FF0000]">
                  {team.members.current}/{team.members.max} غير مكتمل
                </span>

                <img src={notavialableIocn} alt="" className="w-[15px]" />
              </>
            )}
            {team.status === "notAvailable" && (
              <>
                <span className="text-nowrap text-[#00D03A]">
                  {team.members.current}/{team.members.max}
                  مكتمل
                </span>
                <img src={avialableIocn} alt="" className="w-[15px]" />
              </>
            )}
            {team.status === "pending" && (
              <>
                <span className="text-nowrap text-[#FFA800]">
                  {team.members.current}/{team.members.max}
                  قيد الانتظار
                </span>
                <img src={waitingIocn} alt="" className="w-[15px]" />
              </>
            )}
          </p>
          <div className="flex gap-5 font-[600] text-primary-first">
            {editMode ? (
              <button
                onClick={() => setEditMode(false)}
                className="flex h-[37px] w-[101px] items-center justify-center gap-2 rounded-[8px] border-[1px] border-solid bg-primary-first text-[15px] text-white"
              >
                حفظ
              </button>
            ) : (
              <>
                {team.admin && (
                  <>
                    <button
                      onClick={() => setEditMode(true)}
                      className="flex h-[37px] w-[101px] items-center justify-center gap-2 rounded-[8px] border-[1px] border-solid border-primary-first text-[15px]"
                    >
                      <img src={editIcon} alt="edit" className="size-[19px]" />
                      تعديل
                    </button>

                    <SendDialog token={user.token as string} id={team.id}>
                      <img src={sendIcon} alt="send" className="size-[13px]" />
                      تأكيد وارسال
                    </SendDialog>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <span className="h-[1px] w-[calc(10rem)] bg-Grey-first"></span>
      </section>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-start"
      >
        <section>
          <h2 className="text-[20px] font-bold text-[#6694FF]">عن التيم</h2>
          <div className="flex flex-wrap gap-5">
            <label
              dir="rtl"
              htmlFor="projectArabicName"
              className="relative flex w-[285px] flex-col text-sm md:w-[329px]"
            >
              <span className="mr-1 text-primary-first">
                اسم المشروع باللغه العربية
              </span>
              <input
                disabled={!editMode && team.admin}
                autoComplete="false"
                id="projectArabicName"
                type="text"
                value={team.name.arabic}
                placeholder=" اسم المشروع باللغه العربية هنا"
                className={`mt-2 h-[52px] w-[285px] rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] py-[14px] pr-2 text-[20px] text-primary-first outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-[#95A3D5] disabled:border-none md:w-[329px] ${errors.projectArabicName ? "border-red-500" : ""} `}
              />
              <span className="text-xs font-medium text-[#5D6A93]">
                اسم المشروع لابد ان يكون اسم علمي وليس تجاري
              </span>
            </label>
            <label
              dir="rtl"
              htmlFor="projectEnglishName"
              className="relative flex w-[285px] flex-col text-sm md:w-[329px]"
            >
              <span className="mr-1 text-primary-first">
                اسم المشروع باللغه الانجليزية
              </span>
              <input
                disabled={!editMode && team.admin}
                dir="ltr"
                autoComplete="false"
                id="projectEnglishName"
                type="text"
                value={team.name.english}
                placeholder="اسم المشروع باللغه الانجليزية"
                className={`mt-2 h-[52px] w-[285px] rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] py-[14px] pl-2 text-[20px] text-primary-first outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-[#95A3D5] disabled:border-none md:w-[329px] ${errors.projectEnglishName ? "border-red-500" : ""} `}
              />
              <span className="text-xs font-medium text-[#5D6A93]">
                اسم المشروع لابد ان يكون اسم علمي وليس تجاري
              </span>
              <span className="text-xs font-medium text-[#5D6A93]"></span>
            </label>
            <label
              dir="rtl"
              htmlFor="projectCategorie"
              className="relative flex w-[285px] flex-col text-sm md:w-[329px]"
            >
              <span className="ml-1 text-primary-first">تصنيف المشروع</span>

              <select
                disabled={!editMode && team.admin}
                autoComplete="false"
                id="projectCategorie"
                className={`mt-2 h-[52px] w-[285px] rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] py-[14px] pr-2 text-[20px] text-primary-first outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-[#95A3D5] disabled:border-none md:w-[329px] ${errors.projectCategorie ? "border-red-500" : ""} `}
              >
                <option value={team.category}>{team.category}</option>
              </select>
            </label>
          </div>
          <div className="flex w-full justify-between">
            <div className="">
              <label
                htmlFor="projectDescription"
                className="relative flex max-h-[400px] min-h-[150px] flex-col"
              >
                <span className="mr-2 text-primary-first">وصف المشروع</span>
                <textarea
                  disabled={!editMode && team.admin}
                  autoComplete="false"
                  id="projectDescription"
                  value={team.description}
                  placeholder="اكتب وصف مشروعك هنا .... مثال: فكرة المشروع واهدافه والاسباب والمشاكل والحلول"
                  className={`mt-2 max-h-[400px] min-h-[150px] w-[639px] rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] px-[13px] py-[14px] text-[#95A3D5] outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-Grey-third disabled:border-none lg:max-h-[180px] ${errors.projectDescription ? "border-red-500" : ""} `}
                ></textarea>
              </label>
              <p className="my-5 h-[1px] w-[639px] bg-Grey-first"></p>

              <div>
                <h2 className="text-[20px] font-bold text-[#6694FF]">
                  متطلبات التيم
                </h2>
                <div className="grid grid-cols-2 gap-5">
                  {team?.tracks?.map((track) => (
                    <div
                      key={track.id}
                      className="flex items-center gap-4 "
                    >
                      <p className="h-[27px] w-[26px] rounded-[5px] bg-[#EEF3FF] text-center text-[20px] font-semibold text-[#5D6A93]">
                        {track.members.length}
                      </p>
                      <p className="flex flex-col text-[20px] font-semibold text-primary-first">
                        {track.name}
                        <span className="text-sm font-semibold text-[#5D6A93]">
                          {track.maxmembers - track.members.length === 0
                            ? `متبقي ${track.maxmembers - track.members.length}`
                            : `مكتمل`}
                          مكتمل
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
                <p className="my-5 h-[1px] w-[639px] bg-Grey-first"></p>
              </div>
            </div>
            <span className="h-[calc(30rem)] w-[1px] bg-Grey-first"></span>
            <div className="mt-10">
              <p className="flex gap-1 font-semibold text-primary-first">
                <img src={vectorIcon} alt="" />
                ارفع ملف المشروع
                <img src={fileIcon} alt="" />
              </p>
              <p className="flex flex-col text-xs font-medium text-[#5D6A93]">
                <span>
                  الملف يكون عبارة عن document يحتوي علي تفاصيل المشروع كاملا{" "}
                </span>
                <span>سيظهر الملف لاعضاء الفريق والمشرفين فقط</span>
              </p>

              <FileUploadComponent />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-[20px] font-semibold text-[#6694FF]">
            اعضاء التيم
          </h2>
          <p className="flex gap-3 text-sm text-primary-first">
            <span>عدد الاعضاء 8</span>
            <span>مكتمل :{team.members.current}</span>
            {team.members.current === 8 ? (
              ""
            ) : (
              <span className="text-red-500">
                باقي : {8 - team.members.current}
              </span>
            )}
          </p>
          <div className="grid grid-cols-2 gap-5">
            {team.tracks.map((track) => (
              <div className="flex flex-col">
                {track.members.map((member) => (
                  <div className="flex items-center gap-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill=""
                      className="size-[30px] fill-Grey-first"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="flex flex-col text-sm font-semibold text-primary-first">
                      {member.name}
                    </p>
                    <span className="text-sm font-semibold text-[#5D6A93]">
                      {track.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
            {Array(8 - team.members.current)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill=""
                    className="size-[20px] fill-Grey-first"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm font-semibold text-[#B4B4B4]">
                    لم يتم الانضمام
                  </p>
                </div>
              ))}
          </div>
        </section>

        <p className="my-5 h-[1px] w-[639px] bg-Grey-first"></p>
        <section
          dir="rtl"
          className="mb-5 mt-5 flex w-full flex-wrap gap-4 place-self-start"
        >
          <h2 className="text-[20px] font-bold text-[#6694FF]">
            المشرفين علي المشروع
          </h2>
          <div className="mr-2 mt-1 flex w-full flex-wrap gap-4 place-self-start">
            <label
              dir="rtl"
              className="relative w-[285px] text-sm font-[500] md:w-[329px]"
            >
              <span className="mr-1 font-medium text-primary-first">
                اسم المشرف الرئيسي ( عضو هيئة التدريس )
              </span>
              <input
                disabled={!editMode && team.admin}
                type="text"
                value={team.supervisor}
                placeholder="اسم المشرف الرئيسي هنا"
                className={`mt-2 h-[52px] w-[285px] rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] py-[14px] pr-2 text-[20px] text-primary-first outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-[#95A3D5] disabled:border-none md:w-[329px]`}
              />
            </label>
            <label
              dir="rtl"
              className="relative w-[285px] text-sm font-[500] md:w-[329px]"
            >
              <span className="mr-1 font-medium text-primary-first">
                اسم المشرف المساعد ( معيد أو مدرس مساعد )
              </span>
              <input
                disabled={!editMode && team.admin}
                type="text"
                placeholder="اسم المشرف المساعد هنا"
                value={team.assistantSupervisor}
                className={`mt-2 h-[52px] w-[285px] rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] py-[14px] pr-2 text-[20px] text-primary-first outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-[#95A3D5] disabled:border-none md:w-[329px]`}
              />
            </label>
          </div>
        </section>
      </form>
    </main>
  );
};

export default Team;
