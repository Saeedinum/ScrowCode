import { useState } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch } from "@/store/hooks";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { logout } from "@/features/auth/authSlice";

import logoutIcon from "@/assets/header/logout.svg";
import userIcon from "@/assets/header/user.svg";
import teamsIcon from "@/assets/header/teams.png";

const ProfileDropDown = ({
  username,
  email,
}: {
  username: string;
  email: string;
}) => {
  const dispatch = useAppDispatch();

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger className="outline-none">
        <div className="flex items-center gap-1">
          {username}
          <img src="/src/assets/profile/menu.svg" alt="" className="size-3" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex w-[200px] flex-col items-end gap-3 text-xs font-semibold text-primary-first">
        <Link
          className="flex gap-3 place-self-start text-nowrap"
          to={"/myProfile"}
          onClick={() => setIsDropdownOpen(false)}
        >
          <img src={userIcon} alt="" className="size-[40px]" />
          <p className="flex flex-col text-sm">
            <span>{username}</span>
            <span className="font-medium text-Grey-first">{email}</span>
          </p>
        </Link>
        <Link
          className="flex gap-3 text-lg hover:text-primary-third"
          to={"/myTeam"}
          onClick={() => setIsDropdownOpen(false)}
        >
          التيم الخاص بي
          <img src={teamsIcon} alt="" className="size-[35px]" />
        </Link>
        <button
          onClick={() => {
            dispatch(logout());
            setIsDropdownOpen(false);
          }}
          className="flex gap-3 text-lg hover:text-red-500"
        >
          تسجيل خروج
          <img src={logoutIcon} alt="" className="size-[35px]" />
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ProfileDropDown;
