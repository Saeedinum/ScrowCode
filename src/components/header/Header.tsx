import { useState } from "react"
import { Link, NavLink } from "react-router-dom"

import { useAppSelector } from "@/store/hooks"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import ProfileDropDown from "./ProfileDropDown"

import Notifications from "@/features/orders/components/Notifications"

import Logo from "@/assets/global/logo.svg"

import "../HeaderStyle.css"
import MobileMenu from "./MobileMenu"

const Header = () => {
  const user = useAppSelector(state => state.auth.user)

  const [isTeamsDropdownOpen, setIsTeamsDropdownOpen] = useState<boolean>(false)

  return (
    <header className="relative top-0 z-50 flex items-center justify-between bg-white p-4 px-12 text-base font-bold text-primary-first shadow-black sm:sticky sm:drop-shadow-lg lg:pl-20">
      <div dir="rtl" className="sm:hidden">
        <MobileMenu token={user?.token || ""} username={user?.username || ""} email={user?.email || ""} />
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
