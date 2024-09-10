import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

import Logo from "/src/assets/global/logo.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const user = useAppSelector((state) => state.auth.user);

  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isTeamsDropdownOpen, setIsTeamsDropdownOpen] =
    useState<boolean>(false);

  const handleItemClick = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className="top-0 z-50 flex items-center justify-between bg-white p-4 px-12 text-base font-bold text-primary-first shadow-black sm:sticky sm:drop-shadow-lg lg:pl-20">
      <div dir="rtl" className="sm:hidden">
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger
            className="outline-none"
            aria-label="Menu"
            aria-expanded={isDropdownOpen}
          >
            <svg
              width="24"
              height="16"
              viewBox="0 0 24 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
            >
              <rect width="24" height="2" rx="1" fill="#001354" />
              <rect y="7" width="24" height="2" rx="1" fill="#001354" />
              <rect y="14" width="24" height="2" rx="1" fill="#001354" />
            </svg>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="ml-2 text-center font-medium text-primary-first sm:hidden">
            {location.pathname !== "/" && (
              <Link
                to="/"
                className="block w-full py-2 hover:text-primary-third"
                onClick={handleItemClick}
              >
                الرئيسية
              </Link>
            )}
            <Link
              to="/FindTeam"
              className="block w-full py-2 hover:text-primary-third"
              onClick={handleItemClick}
            >
              البحث عن تيم
            </Link>
            <Link
              to="/createTeam"
              className="block w-full py-2 hover:text-primary-third"
              onClick={handleItemClick}
            >
              انشاء تيم
            </Link>
            <Link
              to="/findPartner"
              className="block py-2 hover:text-primary-third"
              onClick={handleItemClick}
            >
              ابحث عن شريك
            </Link>
            <div>
              {user?.token ? (
                <>
                  <Link
                    to="/Notifications"
                    className="block py-2 hover:text-primary-third"
                    onClick={handleItemClick}
                  >
                    Notifications
                  </Link>
                  <Link
                    to="/profile"
                    className="block py-2 hover:text-primary-third"
                    onClick={handleItemClick}
                  >
                    Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block py-2 hover:text-primary-third"
                    onClick={handleItemClick}
                  >
                    تسجيل دخول
                  </Link>
                  <Link
                    to="/signup"
                    className="block py-2 hover:text-primary-third"
                    onClick={handleItemClick}
                  >
                    انشاء حساب
                  </Link>
                </>
              )}
            </div>
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
        <NavLink to={"/about"} className="hover:text-primary-third">
          عن سكرو
        </NavLink>
        <DropdownMenu
          open={isTeamsDropdownOpen}
          onOpenChange={setIsTeamsDropdownOpen}
        >
          <DropdownMenuTrigger className="flex items-center gap-1 outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                clipRule="evenodd"
              />
            </svg>
            التيمات
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col items-center gap-3 p-3 font-medium text-primary-first">
            <Link
              onClick={() => setIsTeamsDropdownOpen(false)}
              to={"/FindTeam"}
            >
              البحث عن تيم
            </Link>
            <Link
              onClick={() => setIsTeamsDropdownOpen(false)}
              to={"/createTeam"}
            >
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
            <NavLink to={"/notifications"} className="hover:text-primary-third">
              Notifications
            </NavLink>
            <NavLink to={"/profile"} className="hover:text-primary-third">
              Profile
            </NavLink>
          </div>
        ) : (
          <div className="flex items-center gap-5">
            <Link to={"/login"} className="hover:text-primary-third">
              تسجيل دخول
            </Link>
            <Link
              to={"/signup"}
              className="cursor-pointer rounded-lg bg-primary-first px-[12px] py-1 text-primary-fourth"
            >
              انشاء حساب
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
