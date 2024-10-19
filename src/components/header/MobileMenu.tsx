import { Link, useLocation } from "react-router-dom"

import { useAppDispatch } from "@/store/hooks"

import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"

import { logout } from "@/features/auth/authSlice"
import homeIcon from "@/assets/header/home.svg"
import findIcon from "@/assets/header/find.svg"
import loginIcon from "@/assets/header/login.svg"
import logoutIcon from "@/assets/header/logout.svg"
import scenariosIcon from "@/assets/header/scenarios.svg"
import signupIcon from "@/assets/header/signup.svg"
import userIcon from "@/assets/header/user.svg"
import teamsIcon from "@/assets/header/teams.png"
import partnerIcon from "@/assets/header/partner.png"
import arrow from "@/assets/header/arrow.png"

import { User } from "@/types/auth"

const MobileMenu = ({ user }: { user: User }) => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  return (
    <>
      <Drawer direction="top">
        <DrawerTrigger className="z-20 flex cursor-pointer flex-col items-center gap-1 *:h-[3px] *:w-6 *:rounded *:bg-blue-800" aria-label="Menu">
          <p></p> <p></p> <p></p>
        </DrawerTrigger>
        <DrawerContent className="menu -top-[10vh] h-[60vh] w-screen border-none bg-transparent outline-none backdrop-blur-3xl sm:hidden">
          <DrawerTitle className="bg-red-500"></DrawerTitle>
          {user.token && (
            <DrawerClose asChild>
              <Link className="flex items-center place-self-start text-nowrap text-lg" to={"/myProfile"}>
                <img src={userIcon} alt="" className="user" />
                <p className="flex flex-col">
                  <span className="text-[24px] font-bold">{user.username}</span>
                  <span className="text-lg font-medium text-Grey-first">{user.email}</span>
                </p>
              </Link>
            </DrawerClose>
          )}
          {location.pathname !== "/" && (
            <DrawerClose asChild>
              <Link to="/">
                الرئيسية
                <img src={homeIcon} alt="" className="" />
              </Link>
            </DrawerClose>
          )}
          <DrawerClose asChild>
            <Link to="/FindTeam" className="">
              البحث عن تيم
              <img src={findIcon} alt="" className="" />
            </Link>
          </DrawerClose>
          {!user.hasTeam && (
            <DrawerClose asChild>
              <Link to="/createTeam">
                انشاء تيم
                <img src={scenariosIcon} alt="" />
              </Link>
            </DrawerClose>
          )}

          <DrawerClose asChild>
            <Link to="/findPartner">
              ابحث عن شريك
              <img src={partnerIcon} alt="" />
            </Link>
          </DrawerClose>
          {user.token ? (
            <>
              {user.hasTeam && (
                <DrawerClose asChild>
                  <Link to={"/myTeam"}>
                    التيم الخاص بي
                    <img src={teamsIcon} alt="" />
                  </Link>
                </DrawerClose>
              )}

              <DrawerClose asChild>
                <button
                  onClick={() => {
                    dispatch(logout())
                  }}
                >
                  تسجيل خروج
                  <img src={logoutIcon} alt="" />
                </button>
              </DrawerClose>
            </>
          ) : (
            <>
              <Link to="/login" className="">
                تسجيل دخول
                <img src={loginIcon} alt="" className="rotate-180" />
              </Link>
              <Link to="/signup" className="">
                انشاء حساب
                <img src={signupIcon} alt="" className="rotate-180" />
              </Link>
            </>
          )}
          <DrawerClose>
            <img src={arrow} alt="close" className="mx-auto" />
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default MobileMenu
