import { useEffect, useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editTeamSchema } from "@/schema";

import { useAppSelector } from "@/store/hooks";
import { useGetTracksQuery } from "@/features/createTeam/api/createTeamAPI";
import { useGetMyTeamQuery, useUpdateTeamMutation } from "../api/profileAPI";

import { emptyTeam, TEditTeamData, Tteam } from "@/types";
import { Ttracks } from "@/types/auth";

import { compareArrays } from "@/utils/compareArrays";

import SendDialog from "../components/SendDialog";
import FileUploadComponent from "../components/FileUploadComponent";
import UserDropDown from "../components/UserDropDown";
import LoadingDialog from "../components/LoadingDialog";

import editIcon from "@/assets/profile/edit.svg";
import fileIcon from "@/assets/profile/file.svg";
import vectorIcon from "@/assets/profile/Vector.svg";
import avialableIocn from "@/assets/global/available.svg";
import sendIcon from "@/assets/profile/send.svg";
import waitingIocn from "@/assets/global/waiting.svg";
import notavialableIocn from "@/assets/global/notAvailable.svg";

import Track from "@/features/createTeam/components/Track";

import "../index.css";

const Team = () => {
  const user = useAppSelector((state) => state.auth.user);

  const { data: tracks } = useGetTracksQuery();
  const { data, isLoading } = useGetMyTeamQuery({
    token: user.token!,
    tracks: tracks!,
  });
  const [updateTeam] = useUpdateTeamMutation();

  const [editMode, setEditMode] = useState<boolean>(false);
  const [team, setTeam] = useState<Tteam & { admin: boolean }>(emptyTeam);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<TEditTeamData>({
    shouldUnregister: true,
    resolver: zodResolver(editTeamSchema),
  });

  const handleDeleteUser = (id: string) => {
    if (getValues("deletedMembers"))
      setValue("deletedMembers", [...getValues("deletedMembers"), id]);
    else setValue("deletedMembers", [id]);
    setValue(
      "teamMembers",
      getValues("teamMembers").filter((e) => e !== id),
    );
  };
  const handleTrackNeeds = (index: number, value: number): void => {
    setValue(`requirement.${index}.number`, value);
  };

  const onSubmit: SubmitHandler<TEditTeamData> = (data) => {
    const requirements = getValues()
      .requirement.filter((e) => e.trackID)
      .map((e) => [...Array(e.number).fill(e.trackID)])
      .flat();
    const { addedElements, removedElements } = compareArrays(
      team.tracks.map((t) => t.members.map((m) => m.id)).flat(),
      requirements,
    );
    data = {
      ...data,
      category: getValues("category"),
      teamMembers: getValues("teamMembers"),
      deletedMembers: getValues("deletedMembers"),
      requirement: requirements,
      requirementAdded: addedElements,
      requirementDelete: removedElements,
    };
    updateTeam({ id: team.id, data, token: user.token! });
    setEditMode(false);
  };

  useEffect(() => {
    if (!isLoading && data) {
      setTeam(data);
      setValue("projectArabicName", data.name.arabic);
      setValue("projectEnglishName", data.name.english);
      setValue("projectDescription", data.description);
      setValue("category", data.category);
      setValue("supervisor", data.supervisor);
      setValue("assistantSupervisor", data.assistantSupervisor);
      setValue(
        "teamMembers",
        data.tracks.map((t) => t.members.map((m) => m.id)).flat(),
      );
    }
  }, [isLoading, data, setValue]);

  return (
    <>
      {isLoading && <LoadingDialog />}

      <form
        onSubmit={handleSubmit(onSubmit)}
        dir="rtl"
        className="w-full px-20 pt-10"
      >
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
                  type="submit"
                  // onClick={() => setEditMode(false)}
                  className="flex h-[37px] w-[101px] items-center justify-center gap-2 rounded-[8px] border-[1px] border-solid bg-primary-first text-[15px] text-white"
                >
                  حفظ
                </button>
              ) : (
                <>
                  {team.admin && (
                    <>
                      <button
                        type="button"
                        onClick={() => setEditMode(true)}
                        className="flex h-[37px] w-[101px] items-center justify-center gap-2 rounded-[8px] border-[1px] border-solid border-primary-first text-[15px]"
                      >
                        <img
                          src={editIcon}
                          alt="edit"
                          className="size-[19px]"
                        />
                        تعديل
                      </button>

                      <SendDialog token={user.token as string} id={team.id}>
                        <img
                          src={sendIcon}
                          alt="send"
                          className="size-[13px]"
                        />
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

        <section className="flex w-full flex-col items-start">
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
                  {...register("projectArabicName", {
                    required: "required",
                  })}
                  disabled={!editMode && team.admin}
                  id="projectArabicName"
                  type="text"
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
                  {...register("projectEnglishName", {
                    required: "required",
                  })}
                  disabled={!editMode && team.admin}
                  dir="ltr"
                  autoComplete="false"
                  id="projectEnglishName"
                  type="text"
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
                  {...register("category", {
                    required: "required",
                  })}
                  disabled={!editMode && team.admin}
                  autoComplete="false"
                  id="projectCategorie"
                  className={`mt-2 h-[52px] w-[285px] rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] py-[14px] pr-2 text-[20px] text-primary-first outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-[#95A3D5] disabled:border-none md:w-[329px] ${errors.category ? "border-red-500" : ""} `}
                >
                  <option selected value={team.category}>
                    {team.category}
                  </option>
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
                    {...register("projectDescription", {
                      required: "required",
                    })}
                    disabled={!editMode && team.admin}
                    autoComplete="false"
                    id="projectDescription"
                    placeholder="اكتب وصف مشروعك هنا .... مثال: فكرة المشروع واهدافه والاسباب والمشاكل والحلول"
                    className={`mt-2 max-h-[400px] min-h-[150px] w-[639px] rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] px-[13px] py-[14px] text-[#95A3D5] outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-Grey-third disabled:border-none lg:max-h-[180px] ${errors.projectDescription ? "border-red-500" : ""} `}
                  ></textarea>
                </label>
                <p className="my-5 h-[1px] w-[639px] bg-Grey-first"></p>

                <div className=" ">
                  <h2 className="text-[20px] font-bold text-[#6694FF]">
                    متطلبات التيم
                  </h2>

                  {editMode ? (
                    <div className="my-6 grid grid-cols-1 gap-5 text-nowrap sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {tracks?.map((track: Ttracks, index) => (
                        <div
                          key={track._id}
                          className="relative my-5 flex items-center"
                        >
                          <input
                            {...register(`requirement.${index}.trackID`)}
                            type="checkbox"
                            defaultChecked={team.tracks.some(
                              (teamNeed) => teamNeed.id === track._id,
                            )}
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
                            min={
                              team.tracks.find(
                                (teamNeed) => teamNeed.id === track._id,
                              )?.members.length as number
                            }
                            handleNeeds={handleTrackNeeds}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid h-full grid-cols-2 gap-5">
                      {team?.tracks?.map((track) => (
                        <div key={track.id} className="flex items-center gap-4">
                          <p
                            className={`h-[27px] w-[26px] rounded-[5px] bg-[#EEF3FF] text-center text-[20px] font-semibold text-[#5D6A93] ${
                              track.maxmembers - track.members.length === 0
                                ? ""
                                : "border-2 border-red-500 pb-1"
                            } `}
                          >
                            {track.maxmembers}
                          </p>
                          <p className="flex flex-col text-[20px] font-semibold text-primary-first">
                            {track.name}
                            <span className="text-sm font-semibold text-[#5D6A93]">
                              {track.maxmembers - track.members.length === 0
                                ? `مكتمل`
                                : `متبقي ${track.maxmembers - track.members.length}`}
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <p className="my-5 h-[1px] w-[639px] bg-Grey-first"></p>
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
            <div className="grid grid-cols-2 gap-5 gap-x-[10rem]">
              {team.tracks.map((track) => (
                <div className="flex flex-col">
                  {track.members.map((member) => (
                    <div className="flex items-center gap-4">
                      {editMode && (
                        <UserDropDown
                          handleDeleteUser={handleDeleteUser}
                          token={user.token!}
                          id={member.id}
                        />
                      )}
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
                      <div className="flex flex-col items-center">
                        <p className="flex flex-col font-semibold text-primary-first">
                          {member.name}
                        </p>
                        <p className="text-sm font-semibold text-[#407BFF]">
                          {track.name}
                        </p>
                      </div>
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
                  className={`mt-2 h-[52px] w-[285px] rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] py-[14px] pr-2 text-[20px] text-primary-first outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-[#95A3D5] disabled:border-none md:w-[329px]`}
                />
              </label>
            </div>
          </section>
        </section>
      </form>
    </>
  );
};

export default Team;
