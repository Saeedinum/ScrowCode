import { Link } from "react-router-dom";

import PersonalInformation from "./components/PersonalInformation";
import TrackInformation from "./components/TrackInformation";
import UniversityInformation from "./components/UniversityInformation";

import background from "/src/assets//auth//login.png";
import logo from "/src/assets/global/logo.svg";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";

import { useGetTracksQuery } from "../../api/authAPI";
import ContinueSigningIn from "./components/ContinueSigningIn";

const SignUp = () => {
  const signup = useAppSelector((state) => state.auth.signup);
  const google = useAppSelector((state) => state.auth.google);
  const [section, setSection] = useState(<></>);
  const [backgroundStep, setBackgroundStep] = useState<number>();

  useEffect(() => {
    if (
      signup?.PersonalInformation.arabicName === "" &&
      signup.UniversityInformation.universityEmail === "" &&
      signup.TrackInformation.github === ""
    ) {
      google.user === null
        ? setSection(<PersonalInformation />)
        : setSection(<ContinueSigningIn />);
      setBackgroundStep(1);
    } else if (
      signup?.UniversityInformation.university === "" &&
      signup.TrackInformation.github === ""
    ) {
      setSection(<UniversityInformation />);
      setBackgroundStep(2);
    } else {
      setSection(<TrackInformation />);
      setBackgroundStep(3);
    }
  }, [signup, google]);

  useGetTracksQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
    refetchOnFocus: false,
  });

  return (
    <main className="relative flex select-none justify-start">
      <section
        dir="rtl"
        className="relative flex max-h-screen w-[calc(40%)] flex-col items-center justify-center bg-Grey-fourth text-primary-first"
      >
        <img src={background} alt="" className="" />
        <img src={background} alt="" className="bg-Grey-fourth" />
        <div className=" absolute flex flex-col items-center gap-5 text-center text-[32px]">
          <p className="flex flex-col font-bold">
            <span>انشئ حسابك لتكتشف</span>
            <span> التيمات المناسبة لك </span>
          </p>
          <div className=" flex flex-col items-center gap-2 text-center ">
          <h2 className="text-xl font-medium text-[#001354]">
            {backgroundStep === 1 && "1. البيانات الشخصية"}
            {backgroundStep === 2 && "2. البيانات الجامعية"}
            {backgroundStep === 3 && "3. التراك الخاص بك"}
          </h2>
          <p className="text-[#6679BE] text-[13px]">خطوة {backgroundStep} من 3</p>
          <div className="flex gap-2">
            {backgroundStep === 1 && (
              <p className="h-[3px] w-[53px] bg-primary-second"></p>
            )}
            <p className="h-[3px] w-[31px] bg-primary-first"></p>
            {backgroundStep === 2 && (
              <p className="h-[3px] w-[53px] bg-primary-second"></p>
            )}
            <p className="h-[3px] w-[24px] bg-primary-first"></p>
            {backgroundStep === 3 && (
              <p className="h-[3px] w-[53px] bg-primary-second"></p>
            )}
          </div>
        </div>
        </div>
        {/* <div dir="rtl" className="absolute bottom-0 flex flex-row gap-2 text-center font-bold text-primary-first">
          <p className="">تم الانشاء عن طريق تيم سكرو</p>
          <Link to={"/contact"} className="text-Grey-first underline">
            تواصل معنا
          </Link>
        </div> */}
      </section>

      <section className="flex flex-grow flex-col items-center justify-start font-bold">
        <div className="flex w-full items-center justify-between px-16 pr-10 pt-5">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
          {google.profile ? (
            <div className="flex items-center gap-1 text-primary-first">
              <img
                src={google.profile.picture}
                alt="profile"
                className="w-10 rounded-full"
                onError={() => console.error("Image failed to load")}
              />
              {google.profile.name}
            </div>
          ) : (
            <p className="font-bold text-[#6679BE]">
              لديك حساب بالفعل؟
              <Link
                to={"/login"}
                className="pl-1 text-primary-first underline decoration-2 underline-offset-4"
              >
                تسجيل الدخول
              </Link>
            </p>
          )}
        </div>
        <h1 className="mt-2 text-[32px] text-primary-first">
          مرحبا بك في سكرو
        </h1>
        <p className="flex flex-col items-center text-[14px] text-[#6679BE]">
          ! انشئ حسابك الان لتسطيع الدخول في تيم بسرعه
          <span className="m-2 h-[1px] w-[calc(100%+2rem)] bg-[#6679BE]"></span>
        </p>
        {section}

      </section>
    </main>
  );
};

export default SignUp;
