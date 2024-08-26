import {NavLink} from "react-router-dom";

import Logo from "/src/assets/logo.svg";

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

const auth = false;

const Header = () => {
	return (
		<header className='flex  justify-center items-center gap-60 py-3 text-primary-first text-base font-bold bg-white drop-shadow-lg shadow-black z-50 sticky top-0 '>
			<img src={Logo} alt='logo' />

			<nav className='flex gap-5 items-center text-primary-first font-bold '>
				<NavLink to={""} className='hover:text-primary-third outline-none'>
					home
				</NavLink>
				<NavLink to={"about"} className='hover:text-primary-third'>
					about
				</NavLink>

				<DropdownMenu>
					<DropdownMenuTrigger className='outline-none'>Teams</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>
							<NavLink to={"FindTeam"}>join Team</NavLink>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<NavLink to={"createTeam"}>create Team</NavLink>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<NavLink to={"findPartner"} className='hover:text-primary-third'>
					find Partner
				</NavLink>
			</nav>

			<div>
				{auth ? (
					<div>
						<NavLink to={"Notifications"}>Notifications</NavLink>
						<NavLink to={"profile"}>profile</NavLink>
					</div>
				) : (
					<div className='flex items-center gap-5 '>
						<NavLink to={"login"} className={"hover:text-primary-third"}>
							Log in
						</NavLink>
						<NavLink to={"signup"} className='bg-primary-first text-primary-fourth rounded-[12px] px-[12px] py-1 '>
							Sign Up
						</NavLink>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
