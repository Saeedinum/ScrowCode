import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useVerifyEmailStudentMutation } from "@/features/auth/api/authAPI";
import { useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";

type Inputs = {
  otp: string[];
};

const VerifyEmail = ({ open }: { open: boolean }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<Inputs>();

  const inputsRef = useRef<HTMLInputElement[]>([]);

  const signupData = useAppSelector((state) => state.auth.signup);

  const [verifyEmailStudent, { data: verifyEmailStudenttData, error: error2 }] =
    useVerifyEmailStudentMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const otpCode = data.otp.join("");
    await verifyEmailStudent({
      code: otpCode,
      token: localStorage.getItem("token")!,
      data: {
        ...signupData.UniversityInformation,
        ...signupData.TrackInformation,
        department: "CS",
      },
    });
    console.log(verifyEmailStudenttData, error2);
    if (verifyEmailStudenttData?.data.status == "success") {
      navigate("/");
    }
  };

  const handleChange = (
    element: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = element.target.value;
    if (isNaN(Number(value))) return;
    setValue(`otp.${index}`, value);
    if (value !== "" && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (
      event.key === "Backspace" &&
      index > 0 &&
      !inputsRef.current[index].value
    ) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger></AlertDialogTrigger>
      <AlertDialogContent className="" dir="rtl">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex flex-col items-center justify-center text-2xl font-bold text-primary-first">
            سنرسل لك رمز التأكيد الخاص بك
            <p className="flex flex-col items-center justify-center gap-0 text-[15px] font-semibold text-[#5D6A93]">
              email@gmail.com
            </p>
          </AlertDialogTitle>
          <section
            dir="ltr"
            className="flex select-none flex-col items-center font-bold"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-full flex-col items-center justify-between gap-5"
            >
              <div className="flex gap-2">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    {...register(`otp.${index}`, { required: true })}
                    //@ts-expect-error no problem
                    ref={(el) => (inputsRef.current[index] = el)}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    type="text"
                    maxLength={1}
                    className="h-[69px] w-[68px] rounded-[8px] border-2 border-primary-second px-[20px] py-[4px] text-[40px] text-primary-second outline-none focus:border-primary-second"
                  />
                ))}
              </div>
              <button
                type="submit"
                className="ml-auto mr-auto h-[39px] rounded-[8px] bg-[#002ABA] px-10 font-bold text-primary-fourth"
              >
                تأكيد
              </button>
            </form>
            <p className="mt-8 text-[14px] text-Grey-first">
              لم يصل لك الكود ؟
              <button type="button" className="text-primary-second">
                اضغط لاعادة الارسال
              </button>
            </p>
          </section>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-4"></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default VerifyEmail;
