import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import searchIcon from "@/assets/search/search.svg"
import avialableIocn from "@/assets/global/available.svg"
import waitingIocn from "@/assets/global/waiting.svg"
import notavialableIocn from "@/assets/global/notAvailable.svg"
import contactIocn from "@/assets/global/contact.svg"
import useIcon from "@/assets/header/user.svg"

import { Tpartner } from "@/types"

import { useToast } from "@/hooks/use-toast"
import { useAppDispatch, useAppSelector } from "@/store/hooks"

import { useGetStudentsQuery, useSendOrderToStudentMutation } from "../api/findPartnerAPI"

import { getPartners, requestPartnerLocally, unrequestPartnerLocally } from "../partnersSlice"

import FindPartnerSkeleton from "../components/FindPartnerSkeleton"
import { Helmet } from "react-helmet"

const FindPartner = () => {
  const { toast } = useToast()
  const dispatch = useAppDispatch()
  const { token } = useAppSelector(state => state.auth.user)
  const partners = useAppSelector(state => state.partners)

  const { data, isLoading } = useGetStudentsQuery({ token })
  const [sendOrderToStudent] = useSendOrderToStudentMutation()

  const [filtredPartners, setFiltredPartners] = useState<Tpartner[]>([])

  const handleSearch = (text: string) => {
    if (!text) {
      setFiltredPartners(partners)
      return
    }
    const filteredData = partners.filter(team => team.name.toLowerCase().includes(text.toLowerCase()))
    setFiltredPartners(filteredData)
  }

  const handleRequestPartner = async (token: string, teamID: string) => {
    try {
      dispatch(requestPartnerLocally(teamID))
      await sendOrderToStudent({
        token: token,
        studentId: teamID
      }).unwrap()
    } catch (error) {
      console.error("Failed to join team:", error)
      toast({
        title: "Request failed",
        description: "Please try again later",
        variant: "destructive"
      })
      dispatch(unrequestPartnerLocally(teamID))
    }
  }

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(getPartners(data))
    }
  }, [isLoading, data, dispatch])

  useEffect(() => {
    setFiltredPartners(partners)
  }, [partners])

  return (
    <main className="flex flex-col items-center">
      <Helmet>
        <title>ابحث عن شريكك</title>
        <meta name="description" content="ابحث عن الشريك المناسب لك بما يناسب فريقك" />
      </Helmet>
      <h1 className="mt-10 text-[32px] font-[700] text-primary-first">ابحث عن شريكك</h1>
      <p className="text-[15px] font-[500] text-Grey-first">ابحث عن الشريك المناسب لك بما يناسب فريقك</p>
      <div className="mt-10 flex h-10 w-[382px] items-center justify-end gap-2 rounded-[100px] bg-Grey-fourth p-3 px-7">
        <input
          dir="ltr"
          type="text"
          onChange={e => handleSearch(e.target.value)}
          placeholder="only English"
          className="flex-grow bg-transparent text-center font-mono outline-none placeholder:font-[500] placeholder:text-[#666666]"
        />
        <span className="text-2xl text-[#001354]">|</span>
        <img src={searchIcon} alt="search bar" className="w-[18px]" />
      </div>

      {isLoading ? (
        <FindPartnerSkeleton />
      ) : (
        <section className="mt-28 w-full px-4 sm:px-6 md:px-8 lg:px-14">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-24">
            {filtredPartners.map((partner: Tpartner) => (
              <div
                key={partner.id}
                className={`relative flex h-[460px] w-[350px] flex-col items-center justify-start rounded-[10px] border-[1px] px-12 pt-[71px] ${
                  partner.status === "notAvailable" ? "border-red-500" : partner.status === "pending" ? "border-yellow-500" : "border-green-700"
                } `}
              >
                <img
                  className={`absolute -top-[50px] h-[125px] w-[121px] content-center rounded-[15px] border-[2px] border-solid bg-white object-cover text-center font-bold text-primary-first ${
                    partner.status === "notAvailable" ? "border-red-500" : partner.status === "pending" ? "border-yellow-500" : "border-green-700"
                  } `}
                  src={partner.imageURL || useIcon}
                  alt={partner.name}
                />
                <h2 className="mt-3 font-[500] text-primary-first" dir="rtl">
                  {partner.name}
                </h2>

                <p className="text-nowrap font-[500] text-primary-first">{partner.track}</p>

                <div className="mt-1 flex w-full items-center justify-center gap-4">
                  <div className="flex gap-1">
                    <button className="text-[#6694FF]">تواصل</button>
                    <img src={contactIocn} alt="" className="w-[19px]" />
                  </div>
                  <div className="flex gap-1">
                    {partner.status === "available" && (
                      <>
                        <span className="text-[ #00D03A] text-nowrap">متاح</span>
                        <img src={avialableIocn} alt="" className="w-[15px]" />
                      </>
                    )}
                    {partner.status === "notAvailable" && (
                      <>
                        <span className="text-nowrap text-[#FF0000]">غير متاح</span>
                        <img src={notavialableIocn} alt="" className="w-[15px]" />
                      </>
                    )}
                    {partner.status === "pending" && (
                      <>
                        <span className="text-nowrap text-[#FFA800]">قيد الانتظار</span>
                        <img src={waitingIocn} alt="" className="w-[15px]" />
                      </>
                    )}
                  </div>
                </div>

                <span className="my-2 h-[1px] w-full bg-Grey-second"></span>

                <div className="flex flex-col justify-start">
                  <p className="place-content-end text-primary-first" dir="rtl">
                    المهارات
                  </p>
                  <p className="text-[#95A3D5]">{partner.skills.map(skill => `${skill.name}, `)}</p>
                </div>

                <div className="mb-6 mt-auto flex flex-row gap-5 text-nowrap">
                  {partner.status === "pending" ? (
                    <button className="flex h-[28px] w-[123px] cursor-pointer items-center justify-center rounded-[8px] border-yellow-500 bg-white px-[28px] py-2 text-sm font-[700] text-yellow-500">
                      قيد الانتظار
                    </button>
                  ) : (
                    <button
                      disabled={partner.status === "notAvailable"}
                      onClick={() => handleRequestPartner(token!, partner.id)}
                      className="flex h-[28px] w-[123px] cursor-pointer items-center justify-center rounded-[8px] bg-primary-first px-[28px] py-2 text-sm font-[700] text-primary-fourth duration-100 hover:bg-primary-second disabled:cursor-default disabled:bg-Grey-first"
                    >
                      طلب انضمام
                    </button>
                  )}
                  <Link
                    to={`/profile/${partner.id}`}
                    className="flex h-[28px] w-[123px] items-center justify-center rounded-[8px] border-[1px] border-primary-first px-[28px] py-2 text-sm font-[400] text-primary-first"
                  >
                    تفاصيل
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

export default FindPartner
