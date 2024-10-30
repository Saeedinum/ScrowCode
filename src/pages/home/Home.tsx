import { useRef, lazy, Suspense } from "react"

import useSmoothScroll from "@/hooks/useSmoothScroll"

import backgroundleft from "@/assets/home/background1.webp"
import backgroundright from "@/assets/home/background2.webp"
import backgroundlines from "@/assets/home/AbstractLine.webp"
import dots from "@/assets/home/dots.webp"
import officeWorker from "@/assets/home/officeWorker.webp"
import Vector from "@/assets/home/Vector.webp"
import downloadIcon from "@/assets/home/download.svg"

const Footer = lazy(() => import("./components/Footer"))
const Start = lazy(() => import("./components/Start"))

import "./index.css"

const Home = () => {
  const smoothScroll = useSmoothScroll(500)

  const aboutSection = useRef<HTMLElement>(null)
  const startSection = useRef<HTMLElement>(null)

  return (
    <>
      <main dir="rtl" className="flex max-w-full flex-col">
        <section className="relative flex items-center justify-center overflow-x-clip">
          <img src={backgroundleft} rel="preload" alt="background image" className="absolute left-0 top-0 z-0 max-lg:w-[40%] lg:-top-24" />
          <img src={backgroundright} rel="preload" alt="background image" className="absolute right-0 top-0 z-0 max-lg:w-[40%] lg:-top-24" />
          <div className="relative mt-10 flex flex-col items-center gap-14 sm:mt-20 md:mt-32">
            <img src={backgroundlines} alt="background image" className="absolute -top-5 left-5 hidden md:block" />
            <h1 className="flex flex-col items-center gap-2 bg-gradient-to-r from-[#001354] to-[#002ABA] bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl lg:gap-7">
              <span> افضل طريقة لتكتشف</span>
              <span> التيمات المناسبة لك ..</span>
            </h1>
            <div className="flex flex-col gap-5 text-sm sm:flex-row md:text-base">
              <button
                onClick={() => smoothScroll(startSection)}
                className="flex h-[50px] w-[226px] items-center justify-center gap-5 rounded-[8px] bg-primary-first text-[20px] font-semibold text-primary-fourth"
              >
                أبدا الان
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path
                    fillRule="evenodd"
                    d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                onClick={() => smoothScroll(aboutSection)}
                className="flex h-[50px] w-[226px] cursor-pointer items-center justify-center rounded-[8px] border-2 border-solid border-primary-first bg-white text-[20px] font-semibold text-primary-first"
              >
                اعرف عنا
              </button>
            </div>
            <div className="flex flex-col items-center gap-6">
              <p className="flex gap-3 text-base font-medium text-primary-first">
                حمل تطبيق سكرو كود
                <img src={downloadIcon} alt="" />
              </p>
              <div className="rectangle ml-2">
                <div className="dot"></div>
              </div>
            </div>
          </div>
        </section>

        <section dir="ltr" ref={aboutSection} className="relative flex flex-col items-center justify-between pb-10 sm:flex-row lg:justify-center lg:gap-28">
          <img src={officeWorker} alt="" className="w-72 max-w-96 md:w-fit lg:max-w-fit" />
          <div className="relative flex flex-col items-center justify-center gap-4 sm:mr-10">
            <img src={dots} alt="" className="absolute -left-20 -top-16 max-md:size-32" />
            <p className="text-3xl font-bold text-primary-first md:text-5xl">من نحن ؟</p>
            <p className="flex flex-col items-center text-center text-xs font-bold text-Grey-first md:text-lg">
              <span className="text-nowrap">نحن تيم سكرو كود</span>
              <span className="text-nowrap">نحن هنا لتقديم المساعدة لتوفير امكانية اتمام مشروعاتك بسرعه</span>
              <span>بدون تضييع الوقت علي ايجاد الاشخاص المناسبة لمشروعك</span>
              <span>والانضمام بسهولة للتيمات المناسبة لاحتيجاتك .</span>
            </p>
          </div>
          <img src={Vector} alt="" className="absolute bottom-0 left-1/2 w-[70%] translate-x-[-50%] sm:w-[50%]" />
        </section>
        <Suspense>
          <Start startSection={startSection} />
        </Suspense>
      </main>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  )
}

export default Home
