import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useSendToDoctorMutation } from "../api/profileAPI";

const SendDialog = ({
  children,
  token,
  id,
}: {
  children: React.ReactNode;
  token: string;
  id: string;
}) => {
  const [sendToDoctor] = useSendToDoctorMutation();

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex h-[37px] w-[116px] items-center justify-center gap-2 rounded-[8px] border-[1px] border-solid border-primary-first text-[15px]">
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="" dir="rtl">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex flex-col items-center justify-center text-2xl font-bold text-primary-first">
            تأكيد و ارسال المشروع
            <p className="text-[15px] font-semibold text-[#5D6A93]">
              سيتم ارسال المشروع الي المشرفين و انتظار قبول الفكرة
            </p>
          </AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col items-start">
            <p className="text-base font-semibold">
              لاحظ انه لن يتم قبول المشروع الا وتلك القواعد مطبقة علي بيانات
              المشروع :
            </p>
            <div className="dot-before flex w-full flex-col items-start rounded-[10px] bg-[#EEF3FF] p-4 text-base font-medium text-primary-first">
              <p>عدد الطلاب لايزيد عن 8 ولايقل عن 5</p>
              <p>ان يكون اسم المشروع علمي وليس اسم تجاري</p>
              <p>يكون يعيد عن تخصص نظم المعلومات</p>
              <p>كتابة اسماء الفريق رباعي</p>
              <p className="">
                عرض تقديمي يوضح (المشكلة - الدوافع - الاهداف - الادوات -
                المخرجات المتوقعة)
              </p>
              <p>كتابة اسم المشرف ثلاثي او رباعي</p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="my-5 flex gap-4 pl-6">
          <AlertDialogAction
            onClick={() => {
              sendToDoctor({
                token: token,
                id: id,
              });
            }}
            className="mr-auto h-[37px] w-[188px] rounded-[10px] border-[1px] border-solid bg-primary-first font-bold text-white"
          >
            تأكيد
          </AlertDialogAction>
          <AlertDialogCancel className="h-[37px] w-[188px] rounded-[10px] border-[1px] border-solid border-primary-first text-primary-first">
            الغاء
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SendDialog;
