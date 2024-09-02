import { Link } from "react-router-dom";

import PersonalInformation from "./components/PersonalInformation";
import TrackInformation from "./components/TrackInformation";
import UniversityInformation from "./components/UniversityInformation";

import background from "/src/assets//auth//signup.png";
import logo from "/src/assets/logo.svg";
import mainlogo from "/src/assets/MainLogo.svg";
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
      signup?.PersonalInformation.fullName === "" &&
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
      <section className="relative flex items-center justify-center bg-Grey-fourth text-primary-first">
        <img src={background} alt="" className="" />
        <img
          src={mainlogo}
          alt=""
          className="absolute left-9 top-3 w-16 select-none"
        />
        <div className="absolute top-72 flex items-end gap-5 text-center text-[32px] font-bold">
          <p className="flex flex-col">
            <span>Sign up to Discovering Your</span>
            <span> Team work.. </span>
          </p>
        </div>
        <div className="absolute flex flex-col items-center gap-2 text-center font-bold">
          <h2 className="text-xl text-[#001354]">
            {" "}
            {backgroundStep === 1 && "1. Personal Information"}
            {backgroundStep === 2 && "2. University Information"}
            {backgroundStep === 3 && "3. Track Information"}
          </h2>
          <p className="text-[#6679BE]">Step {backgroundStep} of 3</p>
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
        <div className="absolute bottom-10 flex flex-col gap-1 text-center font-bold text-primary-first">
          <p className="">created by scrow team</p>
          <Link to={"/contact"} className="text-Grey-first underline">
            contact us
          </Link>
        </div>
      </section>
      <section className="flex flex-grow flex-col items-center justify-start px-0 py-0 font-bold">
        <div className="flex w-full items-center justify-between px-20 pr-10 pt-5">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
          {google.profile ? (
            <div className="flex items-center gap-1 text-primary-first">
              <img
                src={google.profile.picture}
                alt=" "
                className="w-10 rounded-full"
                onError={() => console.error("Image failed to load")}
              />
              {google.profile.name}
            </div>
          ) : (
            <p className="font-bold text-[#6679BE]">
              Already Have An Account ?
              <Link
                to={"/login"}
                className="pl-1 text-primary-first underline decoration-2 underline-offset-4"
              >
                Log in
              </Link>
            </p>
          )}
        </div>
        <h1 className="mt-5 text-[32px] text-primary-first">
          Welcome To Scrow code
        </h1>
        <p className="flex flex-col items-center text-[14px] text-[#6679BE]">
          Register to Your Account
          <span className="m-2 h-[1px] w-[calc(100%+2rem)] bg-[#6679BE]"></span>
        </p>
        {section}
      </section>
    </main>
  );
};

export default SignUp;
