import backgroundleft from "/src/assets//home/background1.png";
import backgroundright from "/src/assets//home/background2.png";
import backgroundlines from "/src/assets//home/AbstractLine.png";

import dots from "/src/assets//home/dots.png";
import officeWorker from "/src/assets//home/officeWorker.png";
import Vector from "/src/assets//home/Vector.png";
import downloadIcon from "@/assets/home/download.svg";
import background3 from "/src/assets/home//background3.png";
import grayshadow1 from "/src/assets/home/grayshadow1.png";
import grayshadow2 from "/src/assets/home/grayshadow2.png";
import teams from "/src/assets/home/teams.png";
import create from "/src/assets/home/create.png";
import partners from "/src/assets/home/partners.png";
import mobile1 from "/src//assets//home//mobile1.png";
import mobile2 from "/src//assets//home//mobile2.png";
import star1 from "/src/assets/home//star1.svg";
import star2 from "/src/assets/home//star2.svg";

import "./index.css";

import whiteLogo from "/src/assets/home/whiteLogo.svg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <main dir="rtl" className="flex max-w-full flex-col">
        <section className="relative flex items-center justify-center overflow-x-clip">
          <img
            src={backgroundleft}
            alt="background image"
            className="absolute left-0 top-0 z-0 max-lg:w-[40%] lg:-top-24"
          />
          <img
            src={backgroundright}
            alt="background image"
            className="absolute right-0 top-0 z-0 max-lg:w-[40%] lg:-top-24"
          />
          <div className="relative mt-10 flex flex-col items-center gap-14 sm:mt-20 md:mt-32">
            <img
              src={backgroundlines}
              alt="background image"
              className="absolute -top-5 left-5 hidden md:block"
            />
            <h1 className="flex flex-col items-center gap-2 bg-gradient-to-r from-[#001354] to-[#002ABA] bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl lg:gap-7">
              <span> افضل طريقة لتكتشف</span>
              <span> التيمات المناسبة لك ..</span>
            </h1>
            <div className="flex flex-col gap-5 text-sm sm:flex-row md:text-base">
              <button className="flex h-[50px] w-[226px] items-center justify-center gap-5 rounded-[8px] bg-primary-first text-[20px] font-semibold text-primary-fourth">
                أبدا الان
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <a
                href="#we"
                className="flex h-[50px] w-[226px] items-center justify-center rounded-[8px] border-2 border-solid border-primary-first bg-white text-[20px] font-semibold text-primary-first"
              >
                اعرف عنا
              </a>
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

        <section
          dir="ltr"
          id="we"
          className="relative flex flex-col items-center justify-between pb-10 sm:flex-row lg:justify-center lg:gap-28"
        >
          <img
            src={officeWorker}
            alt=""
            className="w-72 max-w-96 md:w-fit lg:max-w-fit"
          />
          <div className="relative flex flex-col items-center justify-center gap-4 sm:mr-10">
            <img
              src={dots}
              alt=""
              className="absolute -left-20 -top-16 max-md:size-32"
            />
            <p className="text-3xl font-bold text-primary-first md:text-5xl">
              من نحن ؟
            </p>
            <p className="flex flex-col items-center text-center text-xs font-bold text-Grey-first md:text-lg">
              <span className="text-nowrap">نحن تيم سكرو كود</span>
              <span className="text-nowrap">
                نحن هنا لتقديم المساعدة لتوفير امكانية اتمام مشروعاتك بسرعه
              </span>
              <span>بدون تضييع الوقت علي ايجاد الاشخاص المناسبة لمشروعك</span>
              <span>والانضمام بسهولة للتيمات المناسبة لاحتيجاتك .</span>
            </p>
          </div>
          <img
            src={Vector}
            alt=""
            className="absolute bottom-0 left-1/2 w-[70%] translate-x-[-50%] sm:w-[50%]"
          />
        </section>
        {/* ******************************************************************************************* */}
        <section className="relative mt-20 flex flex-col items-center justify-center sm:gap-20">
          <img
            src={grayshadow1}
            alt=""
            className="absolute left-0 top-0 -z-30 max-md:w-[50%]"
          />
          <img
            src={background3}
            alt=""
            className="absolute right-0 top-0 -z-20 sm:top-0"
          />
          <div className="flex flex-col items-center gap-10">
            <h2 className="bg-gradient-to-r from-[#001354] to-[#002ABA] bg-clip-text text-2xl font-bold text-transparent sm:text-3xl md:text-[40px] lg:gap-7">
              خدمات سكرو
            </h2>
            <p className="text-base font-medium text-Grey-first">في سكرو كود</p>
          </div>

          <section
            dir="ltr"
            className="relative flex w-full flex-col md:flex-row md:items-center"
          >
            <img
              src={star1}
              alt=""
              className="absolute left-1/2 top-0 z-30 hidden lg:block"
            />
            <img src={teams} alt="" className="-z-10 md:w-[60%]" />
            <div className="flex flex-col items-center gap-7">
              <h3 className="flex flex-col items-center text-center text-[24px] font-medium text-primary-first lg:text-[32px]">
                انضم الي <span> التيم المناسب لك</span>
              </h3>
              <p className="flex flex-col text-center text-base font-medium text-Grey-first">
                <span> من بين التيمات المتاحة</span>
                <span> ابحث عن التيم المناسب لك ولقدراتك !</span>
              </p>
              <button className="flex h-[52px] w-[281px] items-center justify-center gap-5 rounded-[8px] bg-primary-first text-[20px] font-semibold text-primary-fourth">
                انضم الي تيم
              </button>
            </div>
          </section>

          <section
            dir="rtl"
            className="relative flex w-full flex-col md:flex-row md:items-center"
          >
            <img
              src={grayshadow1}
              alt=""
              className="absolute left-0 top-10 -z-30 max-md:w-[40%] md:hidden lg:top-10"
            />
            <img src={partners} alt="" className="-z-10 md:w-[60%]" />

            <div className="flex flex-col items-center gap-7">
              <img
                src={star2}
                alt=""
                className="absolute -top-20 right-0 z-30 w-28 sm:hidden"
              />
              <h3 className="flex flex-col items-center text-center text-[24px] font-medium text-primary-first lg:text-[32px]">
                ابحث عن <span>شريك الدراسة المناسب لك</span>
              </h3>
              <p className="flex flex-col text-center text-base font-medium text-Grey-first">
                <span>البحث عن شخص مناسب لتكمل معه مشاريعك </span>
                <span>أمر سلس في سكرو الان !</span>
              </p>
              <button className="flex h-[52px] w-[281px] items-center justify-center gap-5 rounded-[8px] bg-primary-first text-[20px] font-semibold text-primary-fourth">
                ابحث عن شريك
              </button>
            </div>
          </section>

          <section
            dir="ltr"
            className="relative flex w-full flex-col md:flex-row md:items-center"
          >
            <img src={create} alt="" className="-z-10 md:w-[60%]" />
            <img src={background3} alt="" className="absolute right-0 -z-20" />
            <img
              src={grayshadow2}
              alt=""
              className="absolute left-0 top-20 -z-30 hidden max-md:w-[40%] lg:top-10 lg:block"
            />
            <div className="flex flex-col items-center gap-7">
              <h3 className="flex flex-col items-center text-center text-[24px] font-medium text-primary-first lg:text-[32px]">
                انشئ <span> التيم الخاص بك</span>
              </h3>
              <p className="flex flex-col text-center text-base font-medium text-Grey-first">
                <span> يمكنك انشاء تيم خاص بك </span>
                <span>وتحديد جميع احتياجتك بسهولة !</span>
              </p>
              <button className="flex h-[52px] w-[281px] items-center justify-center gap-5 rounded-[8px] bg-primary-first text-[20px] font-semibold text-primary-fourth">
                انشئ تيم
              </button>
            </div>
          </section>

          <section
            dir="ltr"
            className="relative flex w-full mt-28  items-center flex-col md:flex-row md:justify-between lg:justify-center lg:gap-56 md:pr-10 md:items-center"
          >
            <div className="relative w-[30%] sm:w-[35%] md:w-[35%] lg:w-[20%]  flex items-end">
              <img src={mobile1} alt="" className="w-full" />
              <img
                src={mobile2}
                alt=""
                className="absolute bottom-2 left-1/2 w-full"
              />
            </div>

            <div className="flex flex-col items-center gap-7">
              <img
                src={star2}
                alt=""
                className="absolute -top-20 right-0 z-30 hidden md:block"
              />
              <h3 className="flex flex-col items-center text-center text-[24px] font-medium text-primary-first lg:text-[32px]">
                حمل تطبيقنا
              </h3>
              <p className="flex flex-col text-center text-base font-medium text-Grey-first">
                <span>حمل تطبيقنا سكرو كود </span>
                <span> لاستفادة من خدماتنا بهاتفك الان لسهولة التصفح</span>
              </p>
              <button className="flex h-[52px] w-[300px]  lg:w-[448px] items-center justify-center gap-5 rounded-[8px] bg-primary-first text-[20px] font-semibold text-primary-fourth">
                تحميل الان
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97933 19.8043 4.588 19.413C4.19667 19.0217 4.00067 18.5507 4 18V15H6V18H18V15H20V18C20 18.55 19.8043 19.021 19.413 19.413C19.0217 19.805 18.5507 20.0007 18 20H6Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </section>
        </section>
      </main>
      <footer className=" mt-52 lg:mt-[25rem] xl:mt-28 flex flex-col items-center justify-center bg-primary-first p-20 pt-10 font-bold text-[#95A3D5] md:items-start">
        <div className="flex flex-col items-start justify-center gap-10 md:flex-row md:gap-20">
          <img src={whiteLogo} alt="" className="" />
          <div className="flex flex-col gap-1 lg:ml-28">
            <p className="mb-4 text-primary-fourth"> Navigation</p>
            <Link to={""} className="hover:text-primary-third">
              home
            </Link>
            <Link to={"/about"} className="hover:text-primary-third">
              About us
            </Link>
            <Link to={""} className="hover:text-primary-third">
              Teams
            </Link>
            <Link to={""} className="hover:text-primary-third">
              find partner
            </Link>
          </div>
          <div className="flex flex-col lg:ml-28">
            <p className="mb-4 text-primary-fourth"> LEGAL</p>
            <Link to={""} className="hover:text-primary-third">
              General Info
            </Link>
            <Link to={""} className="hover:text-primary-third">
              Privacy Policy
            </Link>
            <Link to={""} className="hover:text-primary-third">
              Terms of Service
            </Link>
          </div>
          <div className="flex flex-col">
            <p className="mb-4 text-primary-fourth"> Talk To US</p>
            <Link to={""}> Scrow_code@gmail.com</Link>
          </div>
        </div>
      </footer> 
    </>
  );
};

export default Home;
