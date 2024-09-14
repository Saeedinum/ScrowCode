import filterIcon from "@/assets/search/filter.svg";
import searchIcon from "@/assets/search/search.svg";
import menueIcon from "@/assets/search/menue.svg";
import sortIcon from "@/assets/search/sort.svg";
import avialableIocn from "@/assets/global/available.svg";
import waitingIocn from "@/assets/global/waiting.svg";
import notavialableIocn from "@/assets/global/notAvailable.svg";
import contactIocn from "@/assets/global/contact.svg";

import { Tpartner } from "@/types";

import { useGetStudentsQuery } from "../api/findPartnerAPI";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";

const FindPartner = () => {
  const token = useAppSelector((state) => state.auth.user.token);

  const { data, isLoading } = useGetStudentsQuery({ token });

  const [partners, setPartners] = useState<Tpartner[]>([]);

  useEffect(() => {
    if (!isLoading && data) {
      setPartners(data);
    }
  }, [isLoading, data]);

  return (
    <main className="flex flex-col items-center">
      <h1 className="mt-10 text-[32px] font-[700] text-primary-first">
        ابحث عن شريكك
      </h1>
      <p className="text-[15px] font-[500] text-Grey-first">
        ابحث عن الشريك المناسب لك بما يناسب فريقك
      </p>
      <div className="relative mt-2 flex w-full items-center justify-center">
        <div className="flex h-10 w-[382px] items-center justify-end gap-2 rounded-[100px] bg-Grey-fourth p-3 px-7">
          <input
            dir="rtl"
            type="text"
            placeholder="بحث عن شريك"
            className="h-full flex-grow bg-transparent outline-none placeholder:absolute placeholder:right-1 placeholder:top-0 placeholder:text-sm placeholder:font-[400] placeholder:text-[#666666]"
          />
          <span className="text-2xl text-[#001354]">|</span>
          <img src={searchIcon} alt="search bar" className="w-[18px]" />
        </div>
        <div className="absolute right-20 flex gap-[25px]">
          <div className="flex h-[31px] w-[88px] items-center justify-evenly rounded-[8px] border-[1px] border-solid border-primary-first">
            <img src={sortIcon} alt="filter" className="w-[18px]" />
            <span className="text-[13px] font-[700] text-[#001354]">ترتيب</span>
            <img src={menueIcon} alt="" className="w-2" />
          </div>
          <div className="flex h-[31px] w-[88px] items-center justify-evenly rounded-[8px] border-[1px] border-solid border-primary-first">
            <img src={filterIcon} alt="filter" className="w-[18px]" />
            <span className="text-[13px] font-[700] text-[#001354]">فلترة</span>
            <img src={menueIcon} alt="" className="w-2" />
          </div>
        </div>
      </div>

      <section className="mt-28 w-full px-4 sm:px-6 md:px-8 lg:px-14">
        <div className="flex grid-cols-1 flex-col items-center gap-8 gap-y-20 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {partners.map((partner: Tpartner) => (
            <div
              key={partner.id}
              className="relative flex max-w-[300px] flex-col items-center rounded-[10px] border-[1px] border-[#FFA800] px-12 pt-[71px]"
            >
              <img
                className="absolute -top-[50px] h-[125px] w-[121px] content-center rounded-[15px] border-[2px] border-solid border-[#FFA800] bg-white object-cover text-center font-bold text-primary-first"
                src={partner.imageURL}
                alt={partner.name}
              />
              <h2 className="mt-3 font-[500] text-primary-first" dir="rtl">
                {partner.name}
              </h2>

              <p className="text-nowrap font-[500] text-primary-first">
                {partner.track}
              </p>

              <div className="mt-1 flex w-full items-center justify-center gap-4">
                <div className="flex gap-1">
                  <button className="text-[#6694FF]">تواصل</button>
                  <img src={contactIocn} alt="" className="w-[19px]" />
                </div>
                <div className="flex gap-1">
                  {partner.status === "available" && (
                    <>
                      <span className="text-[ #00D03A] text-nowrap">متاح</span>
                      <img src={avialableIocn} alt="" className="w-[15px]" />
                    </>
                  )}
                  {partner.status === "notAvailable" && (
                    <>
                      <span className="text-nowrap text-[#FF0000]">
                        غير متاح
                      </span>
                      <img src={notavialableIocn} alt="" className="w-[15px]" />
                    </>
                  )}
                  {partner.status === "pending" && (
                    <>
                      <span className="text-nowrap text-[#FFA800]">
                        قيد الانتظار
                      </span>
                      <img src={waitingIocn} alt="" className="w-[15px]" />
                    </>
                  )}
                </div>
              </div>

              <span className="my-2 h-[1px] w-full bg-Grey-second"></span>

              <div className="flex flex-col justify-start">
                <p className="place-content-end text-primary-first" dir="rtl">
                  المهارات
                </p>
                <p className="text-[#95A3D5]">
                  {partner.skills.map((skill) => `${skill.name}, `)}
                </p>
              </div>

              <div className="mb-6 mt-3 flex flex-col gap-5">
                <button className="flex h-[28px] w-[123px] items-center justify-center rounded-[8px] bg-primary-first px-[28px] py-2 text-sm font-[700] text-primary-fourth duration-100 hover:bg-primary-second">
                  طلب انضمام
                </button>
                <button className="flex h-[28px] w-[123px] items-center justify-center rounded-[8px] border-[1px] border-primary-first px-[28px] py-2 text-sm font-[400] text-primary-first">
                  تفاصيل
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default FindPartner;
