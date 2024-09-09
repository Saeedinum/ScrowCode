import { useForm, SubmitHandler } from "react-hook-form";

import editIcon from "@/assets/profile/edit.svg";

import menueIcon from "@/assets/profile/menu.svg";
import fileIcon from "@/assets/profile/file.svg";
import vectorIcon from "@/assets/profile/Vector.svg";
import uploadIcon from "@/assets/profile/upload.svg";

import avialableIocn from "@/assets/global/available.svg";
import sendIcon from "@/assets/profile/send.svg";
import waitingIocn from "@/assets/global/waiting.svg";
import notavialableIocn from "@/assets/global/notAvailable.svg";

import "../index.css";
import SendDialog from "../components/SendDialog";

const Team = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = () => {};

  return (
    <main dir="rtl" className="w-full px-20 pt-10">
      <section className="flex flex-col items-start">
        <h1 className="text-[29px] font-bold text-primary-first">تيمي</h1>
        <div className="flex w-full justify-between">
          <p className="mr-2 flex items-center gap-2 text-[15px] font-normal text-[#FF0000]">
            <img src={notavialableIocn} alt="" className="w-[15px]" />
            <span className="text-nowrap text-[15px] font-normal text-[#FF0000]">
              غير مكتمل
            </span>
            7/8
          </p>
          <div className="flex gap-5 font-[600] text-primary-first">
            <button className="flex h-[37px] w-[101px] items-center justify-center gap-2 rounded-[8px] border-[1px] border-solid border-primary-first text-[15px]">
              <img src={editIcon} alt="edit" className="size-[19px]" />
              تعديل
            </button>

            <SendDialog>
              <button className="flex h-[37px] w-[116px] items-center justify-center gap-2 rounded-[8px] border-[1px] border-solid border-primary-first text-[15px]">
                <img src={sendIcon} alt="send" className="size-[13px]" />
                تأكيد وارسال
              </button>
            </SendDialog>
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
            {" "}
            <label
              dir="rtl"
              htmlFor="projectArabicName"
              className="relative flex w-[285px] flex-col text-sm md:w-[329px]"
            >
              <span className="mr-1 text-primary-first">
                اسم المشروع باللغه العربية
              </span>
              <input
                autoComplete="false"
                id="projectArabicName"
                type="text"
                placeholder=" اسم المشروع باللغه العربية هنا"
                className={`mt-2 h-[52px] w-[285px] rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] py-[14px] pr-2 outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-[#95A3D5] md:w-[329px] ${errors.projectArabicName ? "border-red-500" : ""} `}
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
                autoComplete="false"
                id="projectEnglishName"
                type="text"
                placeholder="اسم المشروع باللغه الانجليزية"
                className={`mt-2 h-[52px] w-[285px] rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] py-[14px] pr-2 outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-[#95A3D5] md:w-[329px] ${errors.projectEnglishName ? "border-red-500" : ""} `}
              />
              <span className="text-xs font-medium text-[#5D6A93]"></span>
            </label>
            <label
              dir="rtl"
              htmlFor="projectCategorie"
              className="relative flex w-[285px] flex-col text-sm md:w-[329px]"
            >
              <span className="ml-1 text-primary-first">تصنيف المشروع</span>

              <select
                autoComplete="false"
                id="projectCategorie"
                className={`mt-2 h-[52px] w-[285px] rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] py-[14px] pr-2 outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-[#95A3D5] md:w-[329px] ${errors.projectCategorie ? "border-red-500" : ""} `}
              >
                <option value="1">1</option>
                <option value="2">2</option>
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
                  autoComplete="false"
                  id="projectDescription"
                  value={
                    "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك"
                  }
                  placeholder="اكتب وصف مشروعك هنا .... مثال: فكرة المشروع واهدافه والاسباب والمشاكل والحلول"
                  className={`mt-2 max-h-[400px] min-h-[150px] w-[639px] rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] px-[13px] py-[14px] text-[#95A3D5] outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-Grey-third lg:max-h-[180px] ${errors.projectDescription ? "border-red-500" : ""} `}
                ></textarea>
              </label>
              <p className="my-5 h-[1px] w-[639px] bg-Grey-first"></p>

              <div>
                <h2 className="text-[20px] font-bold text-[#6694FF]">
                  متطلبات التيم
                </h2>
                <div className="grid grid-cols-2 gap-5">
                  <div className="flex items-center gap-4">
                    <p className="h-[27px] w-[26px] rounded-[5px] bg-[#EEF3FF] text-center text-[20px] font-semibold text-[#5D6A93]">
                      2
                    </p>
                    <p className="flex flex-col text-[20px] font-semibold text-primary-first">
                      Frontend Developer
                      <span className="text-sm font-semibold text-[#5D6A93]">
                        مكتمل
                      </span>
                    </p>
                    <img src={menueIcon} alt="" className="mb-3" />
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="h-[27px] w-[26px] rounded-[5px] bg-[#EEF3FF] text-center text-[20px] font-semibold text-[#5D6A93]">
                      2
                    </p>
                    <p className="flex flex-col text-[20px] font-semibold text-primary-first">
                      Frontend Developer
                      <span className="text-sm font-semibold text-[#5D6A93]">
                        مكتمل
                      </span>
                    </p>
                    <img src={menueIcon} alt="" className="mb-3" />
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="h-[27px] w-[26px] rounded-[5px] bg-[#EEF3FF] text-center text-[20px] font-semibold text-[#5D6A93]">
                      2
                    </p>
                    <p className="flex flex-col text-[20px] font-semibold text-primary-first">
                      Frontend Developer
                      <span className="text-sm font-semibold text-[#5D6A93]">
                        مكتمل
                      </span>
                    </p>
                    <img src={menueIcon} alt="" className="mb-3" />
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="h-[27px] w-[26px] rounded-[5px] bg-[#EEF3FF] text-center text-[20px] font-semibold text-[#5D6A93]">
                      2
                    </p>
                    <p className="flex flex-col text-[20px] font-semibold text-primary-first">
                      Frontend Developer
                      <span className="text-sm font-semibold text-[#5D6A93]">
                        مكتمل
                      </span>
                    </p>
                    <img src={menueIcon} alt="" className="mb-3" />
                  </div>
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

              {/* <div className="dashed mt-7 flex h-[253px] w-[271px] flex-col items-center justify-center gap-2 rounded-[10px]">
                <img src={uploadIcon} alt="" />
                <p className="text-[20px] font-semibold text-primary-first">
                  ارفع الملف هنا
                </p>
                <p className="text-xs font-semibold text-[#5D6A93]">
                  أقصي حجم 20 ميحا
                </p>
              </div> */}

              <label className="dashed mt-7 cursor-pointer flex h-[253px] w-[271px] flex-col items-center justify-center gap-2 rounded-[10px]" htmlFor="file">
              <img src={uploadIcon} alt="" />
                <p className="text-[20px] font-semibold text-primary-first">
                  ارفع الملف هنا
                </p>
                <p className="text-xs font-semibold text-[#5D6A93]">
                  أقصي حجم 20 ميحا
                </p>
                <input id="file" type="file" className="hidden" />
              </label>


            </div>
          </div>
        </section>

        <section>
          <h2 className="text-[20px] font-semibold text-[#6694FF]">
            اعضاء التيم
          </h2>
          <p className="flex gap-3 text-sm text-primary-first">
            <span>عدد الاعضاء 8</span>
            <span>مكتمل : 6</span>
            <span className="text-red-500">باقي : 1</span>
          </p>
          <div className="grid grid-cols-2 gap-5">
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
                نشوة احمد محمد عبد القادر
                <span className="text-sm font-semibold text-[#5D6A93]">
                  Fronted Developer
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2">
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
                type="text"
                placeholder="اسم المشرف الرئيسي هنا"
                className={`mt-2 h-[52px] w-[285px] rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] py-[14px] pr-2 text-[20px] text-primary-first outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-[#95A3D5] md:w-[329px]`}
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
                type="text"
                placeholder="اسم المشرف المساعد هنا"
                className={`mt-2 h-[52px] w-[285px] rounded-[8px] border-[1px] border-solid border-[#B4B4B4] bg-[#F9F9F9] py-[14px] pr-2 text-[20px] text-primary-first outline-none placeholder:pl-1 placeholder:text-sm placeholder:text-[#95A3D5] md:w-[329px]`}
              />
            </label>
          </div>
        </section>
      </form>
    </main>
  );
};

export default Team;
