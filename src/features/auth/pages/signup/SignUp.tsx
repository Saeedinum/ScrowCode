import { Link } from "react-router-dom";

import PersonalInformation from "./components/PersonalInformation";
import TrackInformation from "./components/TrackInformation";
import UniversityInformation from "./components/UniversityInformation";

import background from "/src/assets//auth//signup.png";
import logo from "/src/assets/logo.svg";
import mainlogo from "/src/assets/MainLogo.svg";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useEffect, useState } from "react";

import { useGetTracksQuery } from "../../api/authAPI";
import { getTracks } from "../../authSlice";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const signup = useAppSelector((state) => state.auth.signup);
  const [section, setSection] = useState(<></>);

  useEffect(() => {
    if (
      signup?.PersonalInformation.fullName === null &&
      signup.UniversityInformation.universityEmail === null &&
      signup.TrackInformation.github === null
    ) {
      setSection(<PersonalInformation />);
    } else if (
      signup?.UniversityInformation.university === null &&
      signup.TrackInformation.github === null
    ) {
      setSection(<UniversityInformation />);
    } else {
      setSection(<TrackInformation />);
    }
  }, [signup]);

  const { data } = useGetTracksQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
    refetchOnFocus: false,
  });

  useEffect(() => {
    if (data) {
      dispatch(getTracks(data.data));
    }
  }, [data, dispatch]);

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
          <p className="font-bold text-[#6679BE]">
            Already Have An Account ?
            <Link
              to={"/login"}
              className="pl-1 text-primary-first underline decoration-2 underline-offset-4"
            >
              Log in
            </Link>
          </p>
        </div>
        <h1 className="mt-5 text-[32px] text-primary-first">
          Welcome To Scrow code
        </h1>
        <p className="flex flex-col items-center text-[14px] text-[#6679BE]">
          Register to Your Account
          <hr className="m-2 h-[2px] w-[calc(100%+2rem)] bg-[#6679BE]" />
        </p>
        {section}
      </section>
    </main>
  );
};

export default SignUp;
