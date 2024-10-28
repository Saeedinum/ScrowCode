import background3 from "@/assets/home/background3.webp"
import grayshadow1 from "@/assets/home/grayshadow1.webp"
import grayshadow2 from "@/assets/home/grayshadow2.webp"
import teams from "@/assets/home/teams.webp"
import create from "@/assets/home/create.webp"
import partners from "@/assets/home/partners.webp"
import mobile1 from "@/assets/home/mobile1.webp"
import mobile2 from "@/assets/home/mobile2.webp"
import star1 from "@/assets/home/star1.svg"
import star2 from "@/assets/home/star2.svg"

import { Link } from "react-router-dom"

import { RefObject } from "react"

interface StartProps {
  startSection: RefObject<HTMLElement>
}

const Start = ({ startSection }: StartProps) => {
  return (
    <section ref={startSection} className="relative mt-20 flex flex-col items-center justify-center sm:gap-20">
      <img src={grayshadow1} alt="" className="absolute left-0 top-0 -z-30 max-md:w-[50%]" />
      <img src={background3} alt="" className="absolute right-0 top-0 -z-20 sm:top-0" />
      <div className="flex flex-col items-center gap-10">
        <h2 className="bg-gradient-to-r from-[#001354] to-[#002ABA] bg-clip-text text-2xl font-bold text-transparent sm:text-3xl md:text-[40px] lg:gap-7">خدمات سكرو</h2>
      </div>

      <section dir="ltr" className="relative flex w-full flex-col md:flex-row md:items-center md:gap-14">
        <img src={star1} alt="" loading="lazy" className="absolute left-1/2 top-0 z-30 hidden lg:block" />
        <img src={teams} alt="" className="-z-10 md:w-[60%]" />
        <div className="flex flex-col items-center gap-7">
          <h3 className="flex flex-col items-center text-center text-[24px] font-medium text-primary-first lg:text-[32px]">
            انضم الي <span> التيم المناسب لك</span>
          </h3>
          <p className="flex flex-col text-center text-base font-medium text-Grey-first">
            <span> من بين التيمات المتاحة</span>
            <span> ابحث عن التيم المناسب لك ولقدراتك !</span>
          </p>
          <Link to={"/FindTeam"} className="flex h-[52px] w-[281px] items-center justify-center gap-5 rounded-[8px] bg-primary-first text-[20px] font-semibold text-primary-fourth">
            انضم الي تيم
          </Link>
        </div>
      </section>

      <section dir="rtl" className="relative mt-10 flex w-full flex-col md:flex-row md:items-center md:gap-14">
        <img src={grayshadow1} alt="" className="absolute left-0 top-10 -z-30 max-md:w-[40%] md:hidden lg:top-10" />
        <img src={partners} alt="" className="-z-10 md:w-[60%]" />

        <div className="flex flex-col items-center gap-7">
          <img src={star2} alt="" className="absolute -top-20 right-0 -z-10 w-28 sm:hidden" />
          <h3 className="flex flex-col items-center text-center text-[24px] font-medium text-primary-first lg:text-[32px]">
            ابحث عن <span>شريك الدراسة المناسب لك</span>
          </h3>
          <p className="flex flex-col text-center text-base font-medium text-Grey-first">
            <span>البحث عن شخص مناسب لتكمل معه مشاريعك </span>
            <span>أمر سلس في سكرو الان !</span>
          </p>
          <Link to={"/FindPartner"} className="flex h-[52px] w-[281px] items-center justify-center gap-5 rounded-[8px] bg-primary-first text-[20px] font-semibold text-primary-fourth">
            ابحث عن شريك
          </Link>
        </div>
      </section>

      <section dir="ltr" className="relative mt-10 flex w-full flex-col md:flex-row md:items-center md:gap-14">
        <img src={create} alt="" className="-z-10 md:w-[60%]" />
        <img src={background3} alt="" className="absolute right-0 -z-20" />
        <img src={grayshadow2} alt="" className="absolute left-0 top-20 -z-30 hidden max-md:w-[40%] lg:top-10 lg:block" />
        <div className="flex flex-col items-center gap-7">
          <h3 className="flex flex-col items-center text-center text-[24px] font-medium text-primary-first lg:text-[32px]">
            انشئ <span> التيم الخاص بك</span>
          </h3>
          <p className="flex flex-col text-center text-base font-medium text-Grey-first">
            <span> يمكنك انشاء تيم خاص بك </span>
            <span>وتحديد جميع احتياجتك بسهولة !</span>
          </p>
          <Link to={"/CreateTeam"} className="flex h-[52px] w-[281px] items-center justify-center gap-5 rounded-[8px] bg-primary-first text-[20px] font-semibold text-primary-fourth">
            انشئ تيم
          </Link>
        </div>
      </section>

      <section dir="ltr" className="relative mt-28 flex w-full flex-col items-center md:flex-row md:items-center md:justify-between md:pr-10 lg:justify-center lg:gap-56">
        <div className="relative flex w-[30%] items-end sm:w-[35%] md:w-[35%] lg:w-[20%]">
          <img src={mobile1} alt="" className="w-full" />
          <img src={mobile2} alt="" className="absolute bottom-2 left-1/2 w-full" />
        </div>

        <div className="flex flex-col items-center gap-7">
          <img src={star2} alt="" className="absolute -top-20 right-0 z-30 hidden md:block" />
          <h3 className="flex flex-col items-center text-center text-[24px] font-medium text-primary-first lg:text-[32px]">حمل تطبيقنا</h3>
          <p className="flex flex-col text-center text-base font-medium text-Grey-first">
            <span>حمل تطبيقنا سكرو كود </span>
            <span> لاستفادة من خدماتنا بهاتفك الان لسهولة التصفح</span>
          </p>
          <button className="flex h-[52px] w-[300px] cursor-auto items-center justify-center gap-5 rounded-[8px] bg-gray-600 text-[20px] font-semibold text-primary-fourth lg:w-[448px]">
            تحميل الان
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97933 19.8043 4.588 19.413C4.19667 19.0217 4.00067 18.5507 4 18V15H6V18H18V15H20V18C20 18.55 19.8043 19.021 19.413 19.413C19.0217 19.805 18.5507 20.0007 18 20H6Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </section>
    </section>
  )
}

export default Start
