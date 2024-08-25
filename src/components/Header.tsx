import {NavLink} from "react-router-dom";

const auth = true;

const Header = () => {
	return (
		<>
			<header>
				<nav>
					<NavLink to={""}>home</NavLink>
					<NavLink to={"about"}>about</NavLink>
					<NavLink to={"FindTeam"}>joinTeam</NavLink>
					<NavLink to={"createTeam"}>createTeam</NavLink>
					<NavLink to={"findPartner"}>findPartner</NavLink>


					{auth ? (
						<>
							<NavLink to={"Notifications"}>Notifications</NavLink>
							<NavLink to={"profile"}>profile</NavLink>
						</>
					) : (
						<>
							<NavLink to={"login"}>login</NavLink>
							<NavLink to={"signup"}>signup</NavLink>
						</>
					)}
				</nav>
			</header>
		</>
	);
};

export default Header;
