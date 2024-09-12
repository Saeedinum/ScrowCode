import { Tteam } from "@/types";

import avialableIocn from "@/assets/global/available.svg";
import waitingIocn from "@/assets/global/waiting.svg";
import notavialableIocn from "@/assets/global/notAvailable.svg";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

const DetailsDialog = ({
  team,
  token,
  handlejoin,
}: {
  team: Tteam;
  token: string;
  handlejoin: ({ teamID, token }: { teamID: string; token: string }) => void;
}) => {
  return (
    <Dialog>
      <DialogTrigger className="flex h-[28px] w-[123px] items-center justify-center rounded-[8px] border-[1px] border-primary-first px-[28px] py-2 text-sm font-[400] text-primary-first outline-none">
        تفاصيل
      </DialogTrigger>
      <DialogContent dir="rtl" className="flex min-w-fit flex-col items-center">
        <DialogHeader className="">
          <p className="flex gap-2 text-[20px] font-[500] text-primary-first">
            <span>{team.name.arabic}</span> -<span> {team.name.english} </span>
          </p>
          <div className="flex justify-center gap-1">
            {team.status === "available" && (
              <>
                <span className="text-nowrap text-[#00D03A]">مكتمل</span>
                <img src={avialableIocn} alt="" className="w-[15px]" />
              </>
            )}
            {team.status === "notAvailable" && (
              <>
                <span className="text-nowrap text-[#FF0000]">غير مكتمل</span>
                <img src={notavialableIocn} alt="" className="w-[15px]" />
              </>
            )}
            {team.status === "pending" && (
              <>
                <span className="text-nowrap text-[#FFA800]">قيد الانتظار</span>
                <img src={waitingIocn} alt="" className="w-[15px]" />
              </>
            )}
          </div>
        </DialogHeader>

        <span className="h-[1px] w-[calc(50%)] place-self-center bg-Grey-first"></span>

        <div className="flex flex-col gap-3 px-10 font-semibold text-primary-first">
          <div className="flex gap-6">
            <p className="hidden h-[105px] min-w-[113px] content-center rounded-[10px] border-[1px] border-solid border-primary-first bg-[#EEF3FF] text-center text-base font-semibold text-primary-first lg:block">
              نبذه عامة
            </p>
            <div className="flex flex-col">
              <p className="">
                رقم المشروع :<span> </span>
              </p>
              <p className="">
                نوع المشروع :<span> {team.category} </span>
              </p>
              <p className="flex flex-col">
                وصف المشروع
                <span className="text-[15px] font-[400] text-[#95A3D5]">
                  {team.description}
                </span>
              </p>
            </div>
          </div>

          <span className="h-[1px] w-[calc(50%)] place-self-center bg-Grey-first"></span>

          <div className="flex gap-6">
            <p className="hidden h-[105px] w-[113px] content-center rounded-[10px] border-[1px] border-solid border-primary-first bg-[#EEF3FF] text-center text-base font-semibold text-primary-first lg:block">
              المشرفين
            </p>

            <div className="flex flex-col">
              <p className="flex gap-1">
                <span>اسم المشرف الرئيسي</span>
                <span className="text-[#95A3D5]">(عضو هيئة تدريس):</span>
                <span className="font-semibold text-primary-first">
                  {team.supervisor}
                </span>
              </p>
              <p className="flex gap-1">
                <span>اسم المشرف المساعد </span>
                <span className="text-[#95A3D5]">(معيد أو مدرس مساعد):</span>
                <span className="font-semibold text-primary-first">
                  {team.assistantSupervisor}
                </span>
              </p>
            </div>
          </div>

          <span className="h-[1px] w-[calc(50%)] place-self-center bg-Grey-first"></span>

          <div className="flex gap-6">
            <p className="hidden h-[105px] w-[113px] content-center rounded-[10px] border-[1px] border-solid border-primary-first bg-[#EEF3FF] text-center text-base font-semibold text-primary-first lg:block">
              اسماء الفريق
            </p>
            <div className="flex flex-col items-start">
              {team.tracks.map((track) => (
                <div className="flex flex-col">
                  {track.members.map((member) => (
                    <div className="mt-[2px] flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill=""
                        className="ml-1 size-6 fill-Grey-first"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 font-semibold">{member.name}</span>
                      <span className="text-xs font-normal text-[#95A3D5]">
                        {track.name}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          {team.status === "pending" ? (
            <button
              type="submit"
              className="flex h-[28px] w-[123px] items-center justify-center rounded-[8px] border-[1px] border-primary-first px-[28px] py-2 text-sm font-[400] text-primary-first"
            >
              الغاء الطلب
            </button>
          ) : (
            <button
              type="submit"
              disabled={team.status === "notAvailable"}
              onClick={() => {
                handlejoin({
                  token: token,
                  teamID: team.id,
                });
              }}
              className="flex h-[28px] w-[123px] items-center justify-center rounded-[8px] bg-primary-first px-[28px] py-2 text-sm font-[700] text-primary-fourth duration-100 hover:bg-primary-second disabled:bg-[#5D6A93]"
            >
              طلب انضمام
            </button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;
