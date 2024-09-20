import searchIcon from "@/assets/search/search.svg";
import avialableIocn from "@/assets/global/available.svg";
import waitingIocn from "@/assets/global/waiting.svg";
import notavialableIocn from "@/assets/global/notAvailable.svg";

import { Tteam } from "@/types";
import { useFetchTeamsQuery, useJoinTeamMutation } from "../api/findTeamAPI";

import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import DetailsDialog from "../components/DetailsDialog";

const FindTeam = () => {
  const { token } = useAppSelector((state) => state.auth.user);
  const { data, isLoading } = useFetchTeamsQuery({ token: token });
  const [joinTeam] = useJoinTeamMutation();

  const [teams, setTeams] = useState<Tteam[]>([]);

  const handleSearch = (text: string) => {
    if (text.length === 0) setTeams(data!);
    else {
      const filteredData = teams.filter((team) =>
        team.name.english.includes(text),
      );
      if (filteredData.length > 0) {
        setTeams(filteredData);
      } else {
        setTeams(data!);
      }
    }
  };

  useEffect(() => {
    if (!isLoading && data) {
      setTeams(data);
    }
  }, [isLoading, data]);

  return (
    <main className="flex flex-col items-center">
      <h1 className="mt-10 text-[32px] font-[700] text-primary-first">
        ابحث عن التيم
      </h1>
      <p className="text-[15px] font-[500] text-Grey-first">
        ابحث عن الفريق المناسب لك بما يناسب افكارك ومستواك
      </p>
      <div className="relative mt-2 flex w-full items-center justify-center">
        <div className="flex h-10 w-[382px] items-center justify-end gap-2 rounded-[100px] bg-Grey-fourth p-3 px-7">
          <input
            dir="rtl"
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="ابحث عن فريق بالسم الانجليزي"
            className="h-full flex-grow bg-transparent outline-none placeholder:absolute placeholder:right-1 placeholder:top-0 placeholder:text-sm placeholder:font-[400] placeholder:text-[#666666]"
          />
          <span className="text-2xl text-[#001354]">|</span>
          <img src={searchIcon} alt="search bar" className="w-[18px]" />
        </div>
      </div>
      <section className="mt-28 w-full px-4 sm:px-6 md:px-8 lg:px-14">
        <div className="flex grid-cols-1 flex-col items-start gap-8 gap-y-20 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {teams.map((team: Tteam) => (
            <div
              key={team.id}
              className={`relative flex h-[457px] max-w-[380px] flex-col items-center overflow-hidden rounded-[10px] border-[1px] px-8 ${team.status === "available" ? "border-[#00D03A]" : team.status === "pending" ? "border-[#FFA800]" : "border-[#FF0000]"}`}
            >
              <h2
                className="mt-3 text-nowrap text-center text-[20px] font-[500] text-primary-first"
                dir="rtl"
              >
                <span>{team.name.english}</span>
                <br />
                <span className="font-[600]">{team.name.arabic}</span>
              </h2>

              <div className="mt-1 flex w-full items-center justify-center gap-4">
                <div className="flex gap-1">
                  {team.status === "available" && (
                    <>
                      <span className="text-nowrap text-[#00D03A]">
                        {" "}
                        {team.members.current}/{team.members.max} مكتمل
                      </span>
                      <img src={avialableIocn} alt="" className="w-[15px]" />
                    </>
                  )}
                  {team.status === "notAvailable" && (
                    <>
                      <span className="text-nowrap text-[#FF0000]">
                        {team.members.current}/{team.members.max}
                        غير مكتمل
                      </span>
                      <img src={notavialableIocn} alt="" className="w-[15px]" />
                    </>
                  )}
                  {team.status === "pending" && (
                    <>
                      <span className="text-nowrap text-[#FFA800]">
                        {team.members.current}/{team.members.max}
                        قيد الانتظار
                      </span>
                      <img src={waitingIocn} alt="" className="w-[15px]" />
                    </>
                  )}
                </div>
              </div>
              <div dir="rtl">
                <p className="font-[400] text-primary-first">الوصف</p>
                <p className="text-[13px] font-[400] text-[#95A3D5]">
                  {team.description}{" "}
                  <span className="cursor-pointer text-primary-second">
                    عرض الكل
                  </span>{" "}
                </p>
              </div>

              <div className="mt-5 place-self-end">
                <h3 className="font-[400] text-primary-first">
                  {" "}
                  <span> ( العدد المطلوب {team.members.max} )</span> اعضاء
                  الفريق
                </h3>
              </div>
              <span className="my-1 h-[1px] w-[calc(100%+3rem)] bg-Grey-second"></span>

              <div className="w-full">
                {team?.tracks?.map((track) => (
                  <div
                    key={track.id}
                    className="flex items-center gap-1 text-sm font-[500]"
                  >
                    <img
                      src={notavialableIocn}
                      alt=""
                      className={`${track.maxmembers > track.members.length ? "block" : "opacity-0"}`}
                    />
                    <p
                      className={`${track.maxmembers === track.members.length ? "text-sm font-[500] text-primary-first" : "text-red-500"}`}
                    >
                      {track.name}
                    </p>
                    <div className="flex items-center">
                      {track?.members?.map((member) => (
                        <img
                          key={member.id}
                          src={member.imageURL}
                          alt={member.name}
                          className="h-[23px] w-[25px] rounded-full"
                        />
                      ))}
                      {track?.members?.map((member) => (
                        <p
                          key={member.id}
                          className="overflow-hidden text-nowrap text-[12px] font-[400] text-[#A0A1A3]"
                        >
                          {member.name},
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-6 mt-auto flex gap-5">
                <DetailsDialog
                  team={team}
                  token={token as string}
                  handlejoin={joinTeam}
                />

                {team.status === "pending" ? (
                  <button className="flex h-[28px] w-[123px] items-center justify-center rounded-[8px] border-[1px] border-primary-first px-[28px] py-2 text-sm font-[400] text-primary-first">
                    الغاء الطلب
                  </button>
                ) : (
                  <button
                    disabled={team.status === "notAvailable"}
                    onClick={() => {
                      joinTeam({
                        token: token,
                        teamID: team.id,
                      });
                    }}
                    className="flex h-[28px] w-[123px] items-center justify-center rounded-[8px] bg-primary-first px-[28px] py-2 text-sm font-[700] text-primary-fourth duration-100 hover:bg-primary-second disabled:bg-[#5D6A93]"
                  >
                    طلب انضمام
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default FindTeam;
