import backgroundleft from "/src/assets//home/background1.png";
import backgroundright from "/src/assets//home/background2.png";
import backgroundlines from "/src/assets//home/AbstractLine.png";

import dots from "/src/assets//home/dots.png";
import officeWorker from "/src/assets//home/officeWorker.png";
import Vector from "/src/assets//home/Vector.png";

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

import whiteLogo from "/src/assets/home/whiteLogo.svg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <main className="flex max-w-full flex-col">
        <section className="relative flex items-center justify-center overflow-x-clip">
          <img
            src={backgroundleft}
            alt="background image"
            className="absolute -left-32 top-0 z-0 w-56 md:top-[-50px]"
          />
          <img
            src={backgroundright}
            alt="background image"
            className="absolute -right-24 -top-10 z-50 w-56 overflow-hidden md:top-[-50px]"
          />
          <div className="relative mt-20 flex flex-col items-center gap-14 md:mt-32">
            <img
              src={backgroundlines}
              alt="background image"
              className="absolute -left-10 -top-10 hidden md:block"
            />
            <h1 className="flex flex-col items-center text-2xl font-bold text-primary-first md:text-5xl">
              <span>The best Way</span> to get your team
            </h1>
            <p className="text-1xl font-bold text-primary-second md:text-3xl">
              Easily , Friendly , and Collaborative.
            </p>
            <div className="flex flex-col gap-5 text-sm sm:flex-row md:text-base">
              <button className="rounded-lg bg-primary-first px-20 py-3 font-bold text-primary-fourth">
                Get started
              </button>
              <button className="rounded-lg border-2 border-solid border-primary-first px-20 py-3 font-bold text-primary-first">
                know More
              </button>
            </div>
          </div>
        </section>

        <section className="relative flex flex-col items-center justify-center gap-28 pb-20 sm:flex-row">
          <img
            src={officeWorker}
            alt=""
            className="w-72 max-w-96 md:w-fit lg:max-w-fit"
          />
          <div className="relative flex flex-col items-center justify-center gap-4">
            <img src={dots} alt="" className="absolute -left-20 -top-16" />
            <p className="text-3xl font-bold text-primary-first md:text-5xl">
              Who We Are
            </p>
            <p className="flex flex-col items-center text-center text-xs font-bold text-Grey-first md:text-lg">
              <span>We’re Scrow Team </span>
              <span>
                We are here to help you complete your projects quickly
              </span>
              <span>without wasting time on finding the right people</span>
            </p>
          </div>
          <img
            src={Vector}
            alt=""
            className="absolute bottom-0 w-80 sm:w-96 md:w-fit"
          />
        </section>
        {/* ******************************************************************************************* */}
        <section className="relative mt-20 flex flex-col items-center justify-center sm:gap-20">
          <img
            src={grayshadow1}
            alt=""
            className="absolute -left-1/2 top-0 -z-30 sm:-left-14"
          />
          <img
            src={background3}
            alt=""
            className="absolute right-0 top-32 -z-20 sm:top-0"
          />
          <div className="flex flex-col items-center gap-10">
            <h2 className="text-2xl font-bold text-primary-first sm:text-5xl">
              Our Services
            </h2>
            <p className="flex flex-col items-center justify-center text-[11px] font-bold text-Grey-first sm:text-lg">
              <span>Lorem ipsum dolor sit amet consectetur</span>
              <span>
                Posuere turpis nunc Lorem ipsum dolor sit amet consectetur
              </span>
              <span>Posuere turpis nunc proin .proin .</span>
            </p>
          </div>

          <section className="relative flex w-full flex-col items-center justify-end gap-20 sm:flex-row md:gap-0">
            <img
              src={teams}
              alt=""
              className="-left-28 top-0 -z-10 mr-48 w-[465px] sm:absolute md:mr-0 md:w-2/3 lg:w-fit"
            />
            <img
              src={star1}
              alt=""
              className="absolute left-1/2 top-0 z-30 hidden md:block"
            />
            <div className="flex flex-col items-center gap-7 sm:mr-32 sm:mt-28 lg:mt-64">
              <h3 className="flex flex-col items-center text-center text-2xl font-bold text-primary-first md:text-3xl">
                Join <span>Team Work</span>
              </h3>
              <p className="flex flex-col items-center text-center text-[11px] font-bold text-Grey-first md:text-lg">
                <span className="w-fit whitespace-nowrap">
                  Lorem ipsum dolor sit amet
                </span>
                <span> consectetur Posuere</span>
                <span>turpis nunc proin .</span>
              </p>
              <button className="whitespace-nowrap rounded-lg bg-primary-first px-20 py-3 text-base font-bold text-primary-fourth">
                Join Team
              </button>
            </div>
          </section>

          <section className="relative mt-20 flex w-full flex-col items-center justify-start gap-20 overflow-hidden sm:flex-row sm:pb-44 md:mt-64 md:gap-0 lg:pb-[30rem]">
            <img
              src={partners}
              alt=""
              className="right-0 top-0 -z-10 w-[465px] place-self-end sm:absolute md:mr-0 md:w-1/2 lg:w-2/3"
            />
            <img
              src={background3}
              alt=""
              className="absolute right-0 top-32 -z-20 sm:top-0"
            />
            <div className="relative flex flex-col items-center gap-7 sm:mr-[25rem] md:ml-10 md:mt-2">
              <img
                src={star2}
                alt=""
                className="absolute -top-20 right-0 z-30 w-28 sm:hidden"
              />
              <h3 className="flex flex-col items-center text-2xl font-bold text-primary-first md:text-3xl">
                Find Your <span>Study Partner</span>
              </h3>
              <p className="flex flex-col items-center text-center text-[11px] font-bold text-Grey-first md:text-lg">
                <span>Lorem ipsum dolor sit amet</span>
                <span> consectetur Posuere</span>
                <span>turpis nunc proin .</span>
              </p>
              <button className="rounded-lg bg-primary-first px-20 py-3 font-bold text-primary-fourth">
                Find Partner
              </button>
            </div>
          </section>

          <section className="relative mt-20 flex w-full flex-col items-center justify-end sm:mt-10 sm:flex-row sm:gap-20 md:gap-0">
            <img
              src={create}
              alt=""
              className="-left-28 top-0 -z-10 mr-48 w-[465px] sm:absolute md:mr-0 md:w-2/3 lg:w-fit"
            />
            <img
              src={grayshadow2}
              alt=""
              className="absolute -left-1/2 top-0 -z-30 sm:-left-14 md:-top-40"
            />
            <div className="flex flex-col items-center gap-7 sm:mr-32 sm:mt-28 lg:mt-64">
              <h3 className="flex flex-col items-center text-center text-2xl font-bold text-primary-first md:text-3xl">
                Create Your <span> Own Team Work</span>
              </h3>
              <p className="flex flex-col items-center text-center text-[11px] font-bold text-Grey-first md:text-lg">
                <span className="w-fit whitespace-nowrap">
                  Lorem ipsum dolor sit amet
                </span>
                <span> consectetur Posuere</span>
                <span>turpis nunc proin .</span>
              </p>
              <button className="whitespace-nowrap rounded-lg bg-primary-first px-20 py-3 text-base font-bold text-primary-fourth">
                Create team work
              </button>
            </div>
          </section>

          <section className="w-ful relative mt-32 flex w-full flex-col items-center justify-evenly gap-20 sm:mt-72 md:flex-row md:gap-28">
            <div className="relative ml-10 flex w-60 items-end place-self-start sm:ml-36 md:ml-10 lg:w-[20rem]">
              <img src={mobile1} alt="" className="w-full" />
              <img
                src={mobile2}
                alt=""
                className="absolute bottom-2 left-1/2 w-full"
              />
            </div>

            <div className="relative flex flex-col items-center gap-7">
              <img
                src={star2}
                alt=""
                className="absolute -top-20 right-0 z-30 sm:hidden"
              />
              <h3 className="flex flex-col items-center text-center text-2xl font-bold text-primary-first md:text-3xl">
                Download Our App
              </h3>
              <p className="flex flex-col items-center text-center text-[11px] font-bold text-Grey-first md:text-lg">
                <span>get our app now and Lorem ipsum dolor sit amet </span>
                <span> consectetur Posuere </span>
                <span>turpis nunc proin .</span>
              </p>
              <button className="whitespace-nowrap rounded-lg bg-primary-first px-36 py-3 text-base font-bold text-primary-fourth md:px-32">
                Downlaod Now
              </button>
            </div>
          </section>
{/* 
          <section className="relative mt-44 hidden w-full items-start justify-start gap-20 pl-32 lg:flex">
            <img
              src={grayshadow3}
              alt=""
              className="absolute -top-[570px] left-0 -z-10"
            />

            <div className="flex flex-col justify-start gap-10 rounded-[100px] bg-primary-second p-20 pr-24 text-primary-fourth">
              <p className="mr-20 flex flex-col items-center text-3xl">
                Get in Touch <span>with us</span>
              </p>
              <p className="mr-3 flex flex-col items-center text-2xl">
                Mail us <span>Scrow_code@gmail.com</span>
              </p>
            </div>

            <form className="flex flex-col items-center justify-center gap-10">
              <input
                type="text"
                placeholder="Your Name"
                className="w-96 border-b-2 border-solid border-primary-first bg-transparent pb-3 font-bold outline-none placeholder:text-primary-first"
              />
              <input
                type="text"
                placeholder="Your Email"
                className="w-96 border-b-2 border-solid border-primary-first bg-transparent pb-3 font-bold outline-none placeholder:text-primary-first"
              />
              <button className="mt-32 w-fit rounded-lg bg-primary-first px-14 py-3 font-bold text-primary-fourth">
                Contact US
              </button>
            </form>
          </section> */}
        </section>
      </main>
      <footer className="mt-64 flex flex-col items-center  md:items-start justify-center bg-primary-first p-20  pt-10 font-bold text-[#95A3D5]">
        <div className="flex flex-col items-start justify-center gap-10 md:flex-row md:gap-20 ">
          <img src={whiteLogo} alt="" className="" />
          <div className="flex flex-col gap-1 lg:ml-28">
            <p className="mb-4 text-primary-fourth"> Navigation</p>
            <Link to={""} className="hover:text-primary-third">
              home
            </Link>
            <Link to={""} className="hover:text-primary-third">
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
