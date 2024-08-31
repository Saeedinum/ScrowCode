import { Link, NavLink } from "react-router-dom";
import Logo from "/src/assets/logo.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const auth = false;

const Header = () => {
  return (
    <header className="top-0 z-50 flex items-center justify-between bg-white p-5 text-base font-bold text-primary-first shadow-black md:sticky md:drop-shadow-lg">
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger
            className="outline-none"
            aria-label="Menu"
            aria-expanded="false"
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
          <DropdownMenuContent className="w-full">
            <DropdownMenuItem>
              <Link
                to={"/"}
                className="block w-full py-2 hover:text-primary-third"
              >
                Home
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                to={"/about"}
                className="block w-full py-2 hover:text-primary-third"
              >
                About
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to={"/FindTeam"} className="block w-full py-2">
                Join Team
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={"/createTeam"} className="block w-full py-2">
                Create Team
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                to={"/findPartner"}
                className="block w-full py-2 hover:text-primary-third"
              >
                Find Partner
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <div>
              {auth ? (
                <div>
                  <Link to={"Notifications"} className="block w-full py-2">
                    Notifications
                  </Link>
                  <Link to={"profile"} className="block w-full py-2">
                    Profile
                  </Link>
                </div>
              ) : (
                <>
                  <DropdownMenuItem>
                    <Link to={"/login"} className="block w-full py-2">
                      Log in
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      to={"/signup"}
                      className="block w-full rounded-lg bg-primary-first px-[10px] py-2 text-center text-primary-fourth"
                    >
                      Sign Up
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <img src={Logo} alt="logo" className="w-20 md:w-24" />
      <nav className="hidden items-center gap-5 font-bold text-primary-first md:flex">
        <NavLink to={""} className="outline-none hover:text-primary-third">
          Home
        </NavLink>
        <NavLink to={"about"} className="hover:text-primary-third">
          About
        </NavLink>
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            Teams
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <NavLink to={"FindTeam"}>Join Team</NavLink>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <NavLink to={"createTeam"}>Create Team</NavLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <NavLink to={"findPartner"} className="hover:text-primary-third">
          Find Partner
        </NavLink>
      </nav>
      <div className="hidden items-center gap-5 md:flex">
        {auth ? (
          <div className="flex items-center gap-5">
            <NavLink to={"Notifications"} className="hover:text-primary-third">
              Notifications
            </NavLink>
            <NavLink to={"profile"} className="hover:text-primary-third">
              Profile
            </NavLink>
          </div>
        ) : (
          <div className="flex items-center gap-5">
            <Link to={"/login"} className="hover:text-primary-third">
              Log in
            </Link>
            <Link
              to={"/signup"}
              className="rounded-lg bg-primary-first px-[12px] py-1 text-primary-fourth cursor-pointer"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
