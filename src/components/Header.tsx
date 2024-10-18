import { useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "@/store/hooks"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import ProfileDropDown from "./ProfileDropDown"

import { logout } from "@/features/auth/authSlice"
import Notifications from "@/features/orders/components/Notifications"

import Logo from "@/assets/global/logo.svg"
import homeIcon from "@/assets/header/home.svg"
import findIcon from "@/assets/header/find.svg"
import loginIcon from "@/assets/header/login.svg"
import logoutIcon from "@/assets/header/logout.svg"
import scenariosIcon from "@/assets/header/scenarios.svg"
import signupIcon from "@/assets/header/signup.svg"
import userIcon from "@/assets/header/user.svg"
import teamsIcon from "@/assets/header/teams.png"
import partnerIcon from "@/assets/header/partner.png"

import "./HeaderStyle.css"

const Header = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const user = useAppSelector(state => state.auth.user)

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [isTeamsDropdownOpen, setIsTeamsDropdownOpen] = useState<boolean>(false)

  const handleItemClick = () => {
    setIsDropdownOpen(false)
  }

  return (
    <header className="relative top-0 z-50 flex items-center justify-between bg-white p-4 px-12 text-base font-bold text-primary-first shadow-black sm:sticky sm:drop-shadow-lg lg:pl-20">
      <div dir="rtl" className="sm:hidden">
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger className="flex flex-col gap-[1px] outline-none" aria-label="Menu" aria-expanded={isDropdownOpen}>
            <button className="z-20 flex cursor-pointer flex-col items-center gap-1 *:h-[3px] *:w-6 *:rounded *:bg-blue-800" aria-label="Menu">
              <p></p>
              <p></p>
              <p></p>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="menu ml-2 flex w-[280px] flex-col items-end p-3 pl-5 text-[25px] font-semibold text-primary-first sm:hidden">
            {user.token && (
              <>
                <Link className="place-self-start text-nowrap text-lg" to={"/myProfile"} onClick={handleItemClick}>
                  <img src={userIcon} alt="" className="user" />
                  <p className="flex flex-col text-[18px]">
                    <span>{user.username}</span>
                    <span className="font-medium text-Grey-first">{user.email}</span>
                  </p>
                </Link>
              </>
            )}
            {location.pathname !== "/" && (
              <Link to="/" onClick={handleItemClick}>
                الرئيسية
                <img src={homeIcon} alt="" className="" />
              </Link>
            )}
            <Link to="/FindTeam" onClick={handleItemClick}>
              البحث عن تيم
              <img src={findIcon} alt="" className="" />
            </Link>
            <Link to="/createTeam" onClick={handleItemClick}>
              انشاء تيم
              <img src={scenariosIcon} alt="" />
            </Link>
            <Link to="/findPartner" onClick={handleItemClick}>
              ابحث عن شريك
              <img src={partnerIcon} alt="" />
            </Link>
            {user?.token ? (
              <>
                <Link to={"/myTeam"} onClick={handleItemClick}>
                  التيم الخاص بي
                  <img src={teamsIcon} alt="" />
                </Link>
                <button
                  onClick={() => {
                    dispatch(logout())
                    handleItemClick()
                  }}
                >
                  تسجيل خروج
                  <img src={logoutIcon} alt="" />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="" onClick={handleItemClick}>
                  تسجيل دخول
                  <img src={loginIcon} alt="" className="rotate-180" />
                </Link>
                <Link to="/signup" className="" onClick={handleItemClick}>
                  انشاء حساب
                  <img src={signupIcon} alt="" className="rotate-180" />
                </Link>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Link to={"/"}>
        <img src={Logo} alt="logo" className="w-20 md:w-24" />
      </Link>
      <nav className="hidden items-center gap-5 font-bold text-primary-first sm:flex">
        <NavLink to={"/"} className="outline-none hover:text-primary-third">
          الرئيسية
        </NavLink>
        <DropdownMenu open={isTeamsDropdownOpen} onOpenChange={setIsTeamsDropdownOpen}>
          <DropdownMenuTrigger className="flex items-center gap-1 outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
              <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
            </svg>
            التيمات
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col items-center gap-3 p-3 font-medium text-primary-first">
            <Link onClick={() => setIsTeamsDropdownOpen(false)} to={"/FindTeam"}>
              البحث عن تيم
            </Link>
            <Link onClick={() => setIsTeamsDropdownOpen(false)} to={"/createTeam"}>
              انشاء تيم
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
        <NavLink to={"/findPartner"} className="hover:text-primary-third">
          ابحث عن شريك
        </NavLink>
      </nav>
      <div className="hidden items-center gap-5 sm:flex">
        {user?.token ? (
          <div className="flex items-center gap-5">
            <Notifications />
            <ProfileDropDown username={user.username!} email={user.email!} />
          </div>
        ) : (
          <div className="flex items-center gap-5">
            <Link to={"/login"} className="hover:text-primary-third">
              تسجيل دخول
            </Link>
            <Link to={"/signup"} className="cursor-pointer rounded-lg bg-primary-first px-[12px] py-1 text-primary-fourth">
              انشاء حساب
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
