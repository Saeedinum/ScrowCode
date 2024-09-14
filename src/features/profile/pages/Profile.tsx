import { useState } from "react";

import avialableIocn from "@/assets/global/available.svg";
import notavialableIocn from "@/assets/global/notAvailable.svg";
import editIcon from "@/assets/profile/edit.svg";

import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "../api/profileAPI.ts";
import { useAppSelector } from "@/store/hooks.ts";

const Profile = () => {
  const [section, setSection] = useState<1 | 2>(1);

  const token = useAppSelector((state) => state.auth.user.token);
  const { data, error, isLoading } = useGetMyProfileQuery({ token: token! });

  return (
    <main dir="rtl" className="flex w-full flex-col gap-3 px-20 pt-16">
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
            <p className="text-[15px] text-[#5D6A93]">{data?.user.Username}</p>
            <p className="mt-2 text-[20px] font-semibold text-[#6694FF]">
              {data?.myTracks}
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
        <button className="flex h-[37px] w-[101px] items-center justify-center gap-2 rounded-[8px] border-[1px] border-solid border-primary-first text-[15px]">
          <img src={editIcon} alt="edit" className="size-[19px]" />
          تعديل
        </button>
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
          <div className="mt-2 flex gap-5">
            <div className="flex items-center gap-1">
              <svg
                className="size-8"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM18.5 18.5V13.2C18.5 12.3354 18.1565 11.5062 17.5452 10.8948C16.9338 10.2835 16.1046 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C14.6813 12.17 15.0374 12.3175 15.2999 12.5801C15.5625 12.8426 15.71 13.1987 15.71 13.57V18.5H18.5ZM6.88 8.56C7.32556 8.56 7.75288 8.383 8.06794 8.06794C8.383 7.75288 8.56 7.32556 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C6.43178 5.19 6.00193 5.36805 5.68499 5.68499C5.36805 6.00193 5.19 6.43178 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z"
                  fill="#001354"
                />
              </svg>
              <a
                href=""
                className="cursor-pointer font-semibold text-[#5D6A93] hover:text-primary-second"
              >
                @Saeedinum
              </a>
            </div>
            <div className="flex items-center gap-1">
              <svg
                className="size-8"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 16.42 4.87 20.17 8.84 21.5C9.34 21.58 9.5 21.27 9.5 21V19.31C6.73 19.91 6.14 17.97 6.14 17.97C5.68 16.81 5.03 16.5 5.03 16.5C4.12 15.88 5.1 15.9 5.1 15.9C6.1 15.97 6.63 16.93 6.63 16.93C7.5 18.45 8.97 18 9.54 17.76C9.63 17.11 9.89 16.67 10.17 16.42C7.95 16.17 5.62 15.31 5.62 11.5C5.62 10.39 6 9.5 6.65 8.79C6.55 8.54 6.2 7.5 6.75 6.15C6.75 6.15 7.59 5.88 9.5 7.17C10.29 6.95 11.15 6.84 12 6.84C12.85 6.84 13.71 6.95 14.5 7.17C16.41 5.88 17.25 6.15 17.25 6.15C17.8 7.5 17.45 8.54 17.35 8.79C18 9.5 18.38 10.39 18.38 11.5C18.38 15.32 16.04 16.16 13.81 16.41C14.17 16.72 14.5 17.33 14.5 18.26V21C14.5 21.27 14.66 21.59 15.17 21.5C19.14 20.16 22 16.42 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2Z"
                  fill="#001354"
                />
              </svg>
              <a
                href=""
                className="cursor-pointer font-semibold text-[#5D6A93] hover:text-primary-second"
              >
                @Saeedinum
              </a>
            </div>
            <div className="flex items-center gap-1">
              <svg
                className="size-8"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.07 6.3496H15V7.7596H20.09L20.07 6.3496ZM19 16.0496C18.6154 16.3044 18.1612 16.4337 17.7 16.4196C17.3947 16.4514 17.0862 16.4199 16.7937 16.327C16.5011 16.2341 16.2309 16.0818 16 15.8796C15.5739 15.3949 15.3518 14.7643 15.38 14.1196H22C22.0472 13.4482 21.9899 12.7734 21.83 12.1196C21.6744 11.4978 21.403 10.9109 21.03 10.3896C20.6534 9.88491 20.1681 9.47138 19.61 9.1796C18.9881 8.87422 18.3028 8.72004 17.61 8.7296C16.9584 8.72537 16.3124 8.85115 15.71 9.0996C15.1584 9.33186 14.6586 9.67183 14.24 10.0996C13.8224 10.5357 13.499 11.0531 13.29 11.6196C13.0657 12.2312 12.9539 12.8782 12.96 13.5296C12.9493 14.1902 13.0577 14.8474 13.28 15.4696C13.4695 16.0327 13.7685 16.5527 14.16 16.9996C14.5659 17.4378 15.0648 17.7795 15.62 17.9996C16.2391 18.2355 16.8976 18.3509 17.56 18.3396C18.4894 18.3686 19.407 18.1253 20.2 17.6396C21.0015 17.0711 21.5783 16.2395 21.83 15.2896H19.62C19.5017 15.6037 19.284 15.8706 19 16.0496ZM15.57 11.9296C15.6478 11.6803 15.777 11.45 15.9493 11.2537C16.1215 11.0573 16.3329 10.8992 16.57 10.7896C16.8842 10.6489 17.2259 10.5806 17.57 10.5896C17.8186 10.5684 18.0689 10.6012 18.3036 10.6857C18.5384 10.7703 18.7521 10.9047 18.93 11.0796C19.2702 11.4953 19.4883 11.9972 19.56 12.5296H15.41C15.4262 12.3264 15.463 12.1253 15.52 11.9296H15.57ZM10.28 11.4496C10.789 11.2377 11.2312 10.8922 11.56 10.4496C11.8634 9.98014 12.0137 9.42808 11.99 8.8696C12.0089 8.3605 11.9096 7.85394 11.7 7.3896C11.5233 6.98752 11.2397 6.64163 10.88 6.3896C10.4993 6.12646 10.066 5.94905 9.61 5.8696C9.07087 5.75619 8.52088 5.70254 7.97 5.7096H2V18.2896H8.1C8.65666 18.2895 9.21106 18.2189 9.75 18.0796C10.2604 17.9465 10.7441 17.7267 11.18 17.4296C11.6026 17.1382 11.9462 16.7465 12.18 16.2896C12.4403 15.7795 12.5676 15.212 12.55 14.6396C12.5689 13.9303 12.37 13.2323 11.98 12.6396C11.5606 12.0435 10.9385 11.6205 10.23 11.4496H10.28ZM4.77 7.8596H7.36C7.59798 7.85844 7.83559 7.87852 8.07 7.9196C8.28622 7.95053 8.49381 8.0254 8.68 8.1396C8.86035 8.24162 9.00648 8.39471 9.1 8.5796C9.21673 8.80099 9.27198 9.04961 9.26 9.2996C9.27863 9.51484 9.24572 9.73142 9.16399 9.9314C9.08225 10.1314 8.95405 10.309 8.79 10.4496C8.43212 10.6956 8.00388 10.8185 7.57 10.7996H4.77V7.8596ZM9.61 15.2996C9.50646 15.5029 9.35127 15.6753 9.16 15.7996C8.9603 15.9238 8.74027 16.0118 8.51 16.0596C8.2541 16.1172 7.99226 16.144 7.73 16.1396H4.73V12.6896H7.73C8.24482 12.6671 8.75322 12.8108 9.18 13.0996C9.37281 13.2726 9.52217 13.4886 9.61599 13.7301C9.7098 13.9716 9.74543 14.2318 9.72 14.4896C9.74594 14.7645 9.7083 15.0416 9.61 15.2996Z"
                  fill="#001354"
                />
              </svg>
              <a
                href=""
                className="cursor-pointer font-semibold text-[#5D6A93] hover:text-primary-second"
              >
                @Saeedinum
              </a>
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
    </main>
  );
};

export default Profile;
