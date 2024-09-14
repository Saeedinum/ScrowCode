import mainLogo from "@/assets/global/MainLogo.svg";
import Lottie from "lottie-react";
import lottie from "./lottie.json";

const NotFound = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center overflow-hidden">
      <img
        src={mainLogo}
        alt=""
        className="absolute top-0 w-24 place-self-start p-4"
      />
      <h1 className="text-[40px] font-bold text-primary-first">Not Found</h1>
      <Lottie animationData={lottie} loop={true} className="w-1/3" />;
    </main>
  );
};

export default NotFound;
