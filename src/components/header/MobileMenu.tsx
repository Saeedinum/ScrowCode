import { useAppDispatch } from "@/store/hooks"

import { logout } from "@/features/auth/authSlice"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import homeIcon from "@/assets/header/home.svg"
import findIcon from "@/assets/header/find.svg"
import loginIcon from "@/assets/header/login.svg"
import logoutIcon from "@/assets/header/logout.svg"
import scenariosIcon from "@/assets/header/scenarios.svg"
import signupIcon from "@/assets/header/signup.svg"
import userIcon from "@/assets/header/user.svg"
import teamsIcon from "@/assets/header/teams.png"
import partnerIcon from "@/assets/header/partner.png"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

const MobileMenu = ({ token, username, email }: { token: string; username: string; email: string }) => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

  const handleItemClick = () => {
    setIsDropdownOpen(false)
  }

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger className="flex flex-col gap-[1px] outline-none" aria-label="Menu" aria-expanded={isDropdownOpen}>
        <button className="z-20 flex cursor-pointer flex-col items-center gap-1 *:h-[3px] *:w-6 *:rounded *:bg-blue-800" aria-label="Menu">
          <p></p>
          <p></p>
          <p></p>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="menu ml-2 flex w-[280px] flex-col items-end p-3 pl-5 text-[25px] font-semibold text-primary-first sm:hidden">
        {token && (
          <>
            <Link className="place-self-start text-nowrap text-lg" to={"/myProfile"} onClick={handleItemClick}>
              <img src={userIcon} alt="" className="user" />
              <p className="flex flex-col text-[18px]">
                <span>{username}</span>
                <span className="font-medium text-Grey-first">{email}</span>
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
        {token ? (
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
  )
}

export default MobileMenu
